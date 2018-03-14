require(["config"], function(){
	require(["jquery", "load", "cookie"], function($){
		$(".login_form").submit(function(){
			let a = $(".email").val(),
				b = $(".password").val();
			$.post({
				url : "http://127.0.0.1/php/login.php",
				data : {
					email : a,
					password : b
				},
				dataType : "json",
				success : function(data){
					if(data.res_code == 0){
						//登录成功，保存登录信息到cookie中
						$.cookie.json = true; // 自动调用JSON.stringify()、JSON.parse()来转换JS值与JSON字符串
						$.cookie("loginUser", data.res_body, {path:"/"});
						location = "/index.html";
					}else{
						$(".error").text("用户名或密码错误");
					}
				}
			});
			return false;
		});
	});
});