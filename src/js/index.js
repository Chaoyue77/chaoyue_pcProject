require(["config"], function(){
	require(["jquery", "template", "load"], function($, template){
		//加载商品数据
		$.getJSON("/mock/list.json", function(data){
			let data1 = {list : data.res_body.data};
			let html = template("list_template", data1);
			$(".kh-products").html(html);
		}),

		$.getJSON("/mock/list2.json",function(data){
			let data2 = {list2 : data.res_body.data};
			let html = template("face_template" , data2);
			$(".face-products").html(html);
		}),

		//点击购买，到详情页面
		$(function(){
			$(".main").on("click" , ".buy", function(){
				// window.location.href="/html/detail.html";
				// $.cookie.json = true;
				let pid = $(this).parent().find(".id").text();
				window.location.href="/html/detail.html?" + pid;
			})
		})		
	});
});