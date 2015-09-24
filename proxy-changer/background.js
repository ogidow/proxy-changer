var targetObj;
var config = {
    mode: "fixed_servers",
    rules: {
      proxyForHttp: {
        scheme: "http",
        host: "xx.xx.xx.xx",
        port: xxxx
      },
      bypassList: ["127.0.0.1"]
    }
  };

window.onload=function(){
  document.getElementById("scholl").addEventListener("click", changeShollProxy);
  document.getElementById("auto-detect").addEventListener("click", changeAutoDetectProxy);

  chrome.storage.sync.get(null, function(items){console.log(items)});
  chrome.proxy.settings.get({'incognito': false}, function(obj){
    console.log(obj);
    if (obj.value.mode == "auto_detect"){
      targetObj = document.getElementsByName("auto-detect")[0];
      targetObj.id = "target";
    } else {
      chrome.storage.sync.get(null, function(items){
        
        for(key in items){
          console.log(items[key]);
          if (items[key] == obj.value.rules.proxyForHttp.host){
            targetObj = document.getElementsByName(key)[0];        
          }
        }
        targetObj.id = "target";
      });
    }
    
  });
}

function changeShollProxy(obj){
  config.mode = "fixed_servers";
  changeTarget(obj.target.parentNode);
  chrome.proxy.settings.set(
    {value: config, scope: "regular"},
    function(){}
  );
}

function changeAutoDetectProxy(obj){
  config.mode = "auto_detect";
  changeTarget(obj.target.parentNode);
  
  chrome.proxy.settings.set(
    {value: config, scope: "regular"},
    function(){
    }
  );
}

function changeTarget(newTarget){
  targetObj.id = "";
  targetObj = newTarget;
  targetObj.id = "target";
}
