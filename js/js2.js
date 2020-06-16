function alertExt(txt) {
//	window.alert("外部JavaScript文件");
	alert(txt + ": " + typeof(txt) + "\n\n 换 \n\n 行");
	
	console.log("写入到控制台");
	
	arr = [0, 1, 2];
	
	for (var t in arr) {
		
		console.log(t);
	}
}
