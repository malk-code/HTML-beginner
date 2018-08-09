$(function(){

	var Popup = $(".popup");
	var Window = $(".popup .window");
	var test = null;
	var uid = getParam("uid");
	/*console.log(uid)*/
	loading();
		
	//关闭浮层
	Popup.click(function(){
		$(this).hide();
	});
	//点击弹窗不关闭
	Window.click(function(){
		return false;
	});
	//确定按钮弹框隐藏
	$(".btn .copy").click(function(){
		$(".btn").hide();
	});
	//立即领取弹框
	$(".diately img").click(function(){
		getCash();		
	});
	$(".success").click(function(){
		$(".shade").hide();
	})
	//查看代金券弹框
	$(".my_diate a").click(function(){
		var Value = $(".check .invita span");
		if(!Value.html()){
			$(".btn .ba_conten i").html("您还未领取代金券");
			$(".btn").show();			
		}else{
			$(".check").show();
		}		
	});
	
	//进入页面加载
	 function loading(){
	 	console.log(location.origin.indexOf("test.xuebank")== "-1");
	 	if(uid == null){
	 		if(location.origin.indexOf("test.xuebank") == "-1"){
//	 			location.href = "http://m.xuebank.com/wechatservice/mp/oauth/authorize/wxccc47e7a62520271?url=" + location.origin + "/html/activity/cashCoupon/cash.html";
	 		}else{
	 			location.href = "http://test.xuebank.com/wechatservice/mp/oauth/authorize/wx6895b60a8c0568f3?url=" + location.origin + "/html/activity/cashCoupon/cash.html";
	 		}
	 		uid = getParam("uid");
	 	}
	 }
	// 生产: wxccc47e7a62520271
	//获取uid的值
	function getParam(name){
			var reg = new RegExp("(^|&)" +name+ "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg);  //匹配目标参数
			if (r != null) return unescape(r[2]); return null; //返回参数值
	}

	//获取兑换码接口
	function getCash(){
		$.ajax({
		    type: "POST",
	      	url: "/eduboot/activity/getCoupon/" + uid,
		    data:{},
	      	dataType: "json",
	      	contentType: "application/json; charset=utf-8",
	      	success: function (msg) {
	      		//console.log(msg);
	      		test = msg.result;
	      		if(msg.code == "000001"){	      			
	      			$(".invita span").html(test);
	      			$(".go").show();
	      		}else if(msg.code == "000003"){
	      			$(".ba_conten i").html("您已领取过");
	      			$(".invita span").html(test);
	      			$(".go").show();
	      		}else{
	      			$(".btn .ba_conten i").html(msg.message);
	      			$(".btn").show();
	      		}
		    },
			error: function (msg) {				
				console.log("失败");
			}
    	});
	};
	
	//分享
	WechatSharing.init({
	    title: '超简单！双11专享代金券点击即送～',
	    desc: '工银e校园课程代金券免费领',
	    icon: window.location.origin + '/html/activity/cashCoupon/img/doubleEleven.jpg',
	    link: location.origin + location.pathname
	}, null);
})
