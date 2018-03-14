require(["config"], function(){
	require(["jquery", "template", "load"], function($, template){
		//加载商品数据
		let pid = Number(location.search.slice(1));
		$.getJSON({
			url : "/mock/detail.json",
			success : function(data){
				let data1 =  data.res_body.data[exist(pid, data.res_body.data)];
				let html = template("detail_template", data1);
				$(".detail").append(html);
			}
		})

/****************************加入购物车****************************************/
		$(function(){
			$(".detail").on("click", ".addToCart",function(){
				// console.log($(this).parent());
				// 当前选购商品对象
				let product = {
					id:$(".detail").find(".id").text(),
					title:$(".detail").find(".title").text(),
					price:$(".detail").find(".price").text(),
					img:$(".detail").find(".img").attr("src"),
					amount:1
				};
				console.log(product);
				/*********cookie*************/
				$.cookie.json = true;
				//先查找cookie中是否已有购物车数据
				let _products = $.cookie("products") || [],
					index = exist(product.id, _products);
				if(index == -1){  //cookie中没有该商品，新添加
					_products.push(product);
				}else{
					_products[index].amount++;
				}
				// console.log(_products[index].amount);
				//重新保存回cookie中
				$.cookie("products",_products, {expires:7, path:"/"});
				alert("加入购物车成功");

				/* 显示选购的所有商品数量 */
				let sum = 0;
				_products.forEach(function(prod){
					sum += Number(prod.amount);
				});
				$(".pro-amounts").text(sum);
				return false;
			});
		});
		//根据id查找商品
		function exist(id, products) {
			for (let i = 0, len = products.length; i < len; i++) {
				if (products[i].id == id)
					return i;
			}
			return -1;
		}
	});
});