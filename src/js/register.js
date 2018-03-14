require(["config"], function(){
	require(["jquery", "load"], function($){
		/*验证注册的邮箱是否被占用*/
		let isExist = true;
		$(".reg_form :text[name = 'email']").blur(function(){
			$.getJSON("http://127.0.0.1/php/check.php",{email:$(this).val()},function(data){
				if(data.res_body.status == 0){
					isExist = false;
					$(".email_info").text("邮箱可用");
				}else{
					isExist = true;
					$(".email_info").text("邮箱已被注册，请重新输入");
				}
			});
		});	

		/*提交注册表单，注册用户*/
		$(".reg_form").submit(function(){
			if(!isExist){
				//邮箱未被占用，则提交注册信息
				$.ajax({
					type:"post",
					url:"http://127.0.0.1/php/register.php",
					data: $(this).serialize(),
					dataType: "json",
					success: function(data){
						if(data.res_code === 0){
							// 保存注册成功的用户信息到 cookie 中
							$.cookie.json = true; // 自动调用JSON.stringify()、JSON.parse()来转换JS值与JSON字符串
							$.cookie("loginUser", data.res_body, {path:"/"});
							location = "/index.html";
						} else {
							$(".error").text("用户注册失败，请稍后重试...");
						} 
					}
				});
			}
			return false;
		});
	});
});