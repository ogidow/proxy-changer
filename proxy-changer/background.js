window.onload=function(){
  document.getElementById("scholl").addEventListener("click", changeShollProxy);
  document.getElementById("outer").addEventListener("click", changeOuterProxy);
}

var config = {
    mode: "fixed_servers",
    rules: {
      proxyForHttp: {
        scheme: "http",
        host: "xx.x.x.xx",
        port: xxxx
      },
      bypassList: ["127.0.0.1"]
    }
  };


function changeShollProxy(){
  chrome.proxy.settings.set(
    {value: config, scope: "regular"},
    function(){}
  );
}

function changeOuterProxy(){
  config.mode = "auto_detect";
  chrome.proxy.settings.set(
    {value: config, scope: "regular"},
    function(){}
  );

}
