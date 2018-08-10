function setupWebViewJavascriptBridge(callback) {
	//第一次调用这个方法的时候，为false
	if(window.WebViewJavascriptBridge) {
		return callback(WebViewJavascriptBridge);
	}
	//第一次调用的时候，为false
	if(window.WVJBCallbacks) {
		return window.WVJBCallbacks.push(callback);
	}
	//把callback对象赋值给对象
	window.WVJBCallbacks = [callback];
	//加载WebViewJavascriptBridge_JS中的代码
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'https://__bridge_loaded__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() {
		document.documentElement.removeChild(WVJBIframe)
	}, 0);
}

function registerNatvieCommonBridge() {
	//驱动所有hander的初始化
	setupWebViewJavascriptBridge(function(bridge) {
		//把WEB中要注册的方法注册到bridge里面
		bridge.registerHandler('XueBankWebViewNativeBridge', function(data, responseCallback) {
			//OC中传过来的数据
			log('ObjC called testJavascriptHandler with', data);
			//JS返回数据
			var responseData = {
				'Javascript Says': 'Right back atcha!'
			};
			log('JS responding with', responseData)
			responseCallback(responseData);
		});
	});
}

function callMineCommonBridge() {
	setupWebViewJavascriptBridge(function(bridge) {
		// data可省略 {}
		bridge.callHandler("MineNativeBridge", {
			"action": "test"
		}, function(responseData) {

			alert(responseData);
		})
	})
}

function callNativeCommonBridge() {
	setupWebViewJavascriptBridge(function(bridge) {
		bridge.callHandler("XueBankWebViewJavascriptBridge", {
			"action": "UUID",
			"data": {}
		}, function(responseData) {

			alert(JSON.parse(responseData).data.uuid);
		})
	})
}

function callNativeCommonBridge_microphone() {
	setupWebViewJavascriptBridge(function(bridge) {
		bridge.callHandler("XueBankWebViewJavascriptBridge", {
			"action": "MicrophoneComponent",
			"data": {}
		}, function(responseData) {
			// 系统不允许同时弹出多个视图控制器，否则就会闪退 -  Warning: Attempt to present xxx
			var obj = JSON.parse(responseData);
			document.getElementById('microphone').innerHTML = obj.error;

			if(obj.code == "0") {
				document.getElementById('audioaudio').src = obj.data.mp3Url;
			}
		})
	})
}

function callNativeCommonBridge_palyAudio() {
	setupWebViewJavascriptBridge(function(bridge) {
		bridge.callHandler("AudioAutoPlay", {
			"audio": "audioaudio"
		}, function(responseData) {

			// 43.自动播放：iOS浏览器对Html有限制，需要被动（手动触摸）触发才能播放。点击Audio/Video才会播放，js调用play是无效的，但可通过桥接让原生WebView调用可生效
			document.getElementById('microphone').innerHTML = JSON.parse(responseData).code;
		})
	})
}
var uniqueId = 1;

function log(message, data) {
	var log = document.getElementById('log')
	var el = document.createElement('div')
	el.className = 'logLine'
	el.innerHTML = uniqueId++ + '.  ' + message + ':<br/>' + JSON.stringify(data)
	if(log.children.length) {
		log.insertBefore(el, log.children[0])
	} else {
		log.appendChild(el)
	}
}