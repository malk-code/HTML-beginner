document.getElementById("btnId1").addEventListener("click", function() {
	var a = [];
	var txt = "";
	for(var i = 0; i < 10; i++) {
		a[i] = function() {
			txt = txt + " " + i.toString();
			console.log(i);
		};
	}
	a[6](); // 10
	a[7](); // 10
	a[8](); // 10
	a[9](); // 10
	document.getElementById("var_let").innerHTML = txt;
}, false);
document.getElementById("btnId2").addEventListener("click", function() {
	var a = [];
	var txt = "";
	for(let i = 0; i < 10; i++) {
		a[i] = function() {
			txt = txt + " " + i.toString();
			console.log(i);
		};
	}
	a[6](); // 10
	a[7](); // 10
	a[8](); // 10
	a[9](); // 10
	document.getElementById("var_let").innerHTML = txt;
}, false);