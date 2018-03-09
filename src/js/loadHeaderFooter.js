define(["jquery", "cookie"], function() {   //定义模块
	$("header").load("/html/include/header.html", function(){
		/* 绑定搜索键盘事件 */
		$(".search :text").on("keyup", function(){
			// jsonp 接口
		let val = $(this).val(),
			url = `https://suggest.taobao.com/sug?code=utf-8&q=${val}&callback=?`;
			$.ajax({
				type : "get",
				url : url,
				dataType : "jsonp",
				success : function(data){
					// console.log(data);
					let html = "";
					data.result.forEach(function(curr){
						html += `<div>${curr[0]}</div>`;
					});
					$(".suggest_info").html(html);
				}
			});
		});

		//阻止事件冒泡，点击除了搜索框的其他部分下拉菜单消失
		$(".search").click(function(event){
			event.stopPropagation();    
		});

		$("body").on("click",$("body").not(".search"),function(){
			$(".suggest_info").empty();
		});
	//选择菜单项，显示到搜索框中
		$(".suggest_info").on("click", "div", function(){
			$(".search :text").val($(this).text());
			$(".suggest_info").empty();
		})

		/* 查询是否有登录用户 */
		let user = $.cookie("loginUser");
		if (user)
			$(".login_reg").html(`<a href="${user}"></a>`);
	});
	//加载尾部
	$.get("/html/include/footer.html", function(data){
		$("footer").append(data);
	});
	//加载aside
	$.get("/html/include/aside.html", function(data){
		$("aside").append(data);
	});
});