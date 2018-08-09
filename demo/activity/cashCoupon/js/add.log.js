/**
 * Created by pb on 2017/9/13.
 */
function ajax(){
  var ajaxData = {
    type:arguments[0].type || "GET",
    url:arguments[0].url || "",
    async:arguments[0].async || "true",
    data:arguments[0].data || null,
    dataType:arguments[0].dataType || "text",
    contentType:arguments[0].contentType || "application/x-www-form-urlencoded",
    beforeSend:arguments[0].beforeSend || function(){},
    success:arguments[0].success || function(){},
    error:arguments[0].error || function(){}
  }
  ajaxData.beforeSend()
  var xhr = createxmlHttpRequest();
  xhr.responseType=ajaxData.dataType;
  xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);
  xhr.setRequestHeader("Content-Type",ajaxData.contentType);
  xhr.send(convertData(ajaxData.data));
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if(xhr.status == 200){
        ajaxData.success(xhr.response)
      }else{
        ajaxData.error()
      }
    }
  }
}

function createxmlHttpRequest() {
  if (window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
}

function convertData(data){
  if( typeof data === 'object' ){
    var convertResult = "" ;
    for(var c in data){
      convertResult+= c + "=" + data[c] + "&";
    }
    convertResult=convertResult.substring(0,convertResult.length-1)
    return convertResult;
  }else{
    return data;
  }
}

//发送ajax记录用户信息
ajax({
  type:"POST",
  url:"/eduboot/userActivity/addLog",
  dataType:"json",
  contentType: "application/json; charset=utf-8",
  data: JSON.stringify(GetJsonData()),
  beforeSend:function(){
    //some js code
  },
  success:function(msg){
    console.log(msg)
  },
  error:function(){
    console.log("error")
  }
})

function GetJsonData() {
  var json = {
    "pageUrl":location.href,
    "pageName": document.title
  };
  return json;
}

//腾讯的纪录
if(location.origin.indexOf("m.xuebank.com") > "-1"){
  //生产监控
  var _mtac = {};
  (function() {
    var mta = document.createElement("script");
    mta.src = "https://pingjs.qq.com/h5/stats.js?v2.0.2";
    mta.setAttribute("name", "MTAH5");
    mta.setAttribute("sid", "500495224");
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(mta, s);
  })();
}else {
  //测试监控
  var _mtac = {};
  (function() {
    var mta = document.createElement("script");
    mta.src = "https://pingjs.qq.com/h5/stats.js?v2.0.2";
    mta.setAttribute("name", "MTAH5");
    mta.setAttribute("sid", "500540857");
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(mta, s);
  })();
}