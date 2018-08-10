function js3_1(id) {
	
	alert(txt)
	
	var txt = "7.如果重新声明 JavaScript 变量，但没有赋值操作，该变量的值不会丢失："
	
	document.getElementById(id).innerHTML = txt
	
	var txt;
	
	console.log(txt)
}

function js3_2(num, id) {
	alert(num);
	
	var num = 12e5;
	
	document.getElementById(id).innerHTML = num
}

function js3_3(id) {
	
	var p = {
		name: "person",
		favor: "edit code"
	}
	
	alert(p.name);
//	document.getElementById(id).innerHTML = p.favor;
	document.getElementById(id).innerHTML = p["favor"];
}

function js3_4(id) {
	
	// 修改id
	var d = document.getElementById(id);
	d.id = "id1";

	document.getElementById("id1").innerHTML ="laoxu is db";
}

function js3_5(id) {
	
	var p = {
		name: "person",
		favor: "edit code",
		fun: function() {
			return "this is a function";
		},
		// 使用箭头函数定义函数时可以省略 function 关键字
		fun2: () => {
			return "anonymity function";
		}
	}
	// 调用方法，不是属性：需要添加圆括号调用
	document.getElementById(id).innerHTML = p["fun2"]();
}
