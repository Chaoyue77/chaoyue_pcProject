require(["config"], function(){
	require(["jquery", "load", "cookie"], function($){
			/* 显示购物车数据 */
			$.cookie.json = true;
			// 读取cookie中保存的购物车数据
			let _products = $.cookie("products") || [];
			// 判断是否有购物车商品
			if (_products.length === 0) {
				$(".cart_empty").show().next(".cart_table").hide();
				return;
			} else {
				$(".cart_empty").hide().next(".cart_table").show();
			}
			// 渲染模板
			let rendData = { products : _products },
				html = template("cart_template", rendData);
			$(".cart_table > tbody").html(html);

			// 将_products中每个元素缓存到行中
			$(".cart_table > tbody > tr").each(function(index, element){
				// 在当前遍历到的行中缓存与之对应的商品对象数据
				$(this).data("prod", _products[index]);
			});

			/*************************************************/
			/***********购物车操作****************************/
			/* 删除商品：事件委派 */
			$(".cart_table").on("click", ".del", function(){
				// 获取当前删除行中的商品对象
				let _prod = $(this).parents("tr").data("prod");
				// 查找其在_products数组中的索引
				let _index = $.inArray(_prod, _products);
				// 从数组中删除元素
				_products.splice(_index, 1);
				// 从cookie中删除(覆盖保存 _products 到 cookie 中)
				$.cookie("products", _products, {expires:7, path:"/"});
				// 从DOM中删除
				$(this).parents("tr").remove();
				// 计算合计
				calcTotal();
			});
			/* 数量+/- */
			$(".cart_table").on("click", ".add,.minus", function(){
				// 找出所在行中的商品对象
				let _prod = $(this).parents("tr").data("prod");
				// 数量+/-
				let _amount = Number(_prod.amount);
				if ($(this).is(".add")) { // 加
					_amount++;
				} else { // 减
					if (_amount <= 1)
						return;
					_amount--;
				}
				_prod.amount = _amount;
				// 保存cookie
				$.cookie("products", _products, {expires:7, path:"/"});
				// 页面渲染
				$(this).siblings(".amount").val(_amount);
				$(this).parents("tr").children(".sub").text((_prod.price * _amount).toFixed(2));

				// 计算合计
				calcTotal();
			});
			// 输入数量修改
			$(".cart_table").on("blur", ".amount", function(){
				let _prod = $(this).parents("tr").data("prod");
				_prod.amount = $(this).val();
				// 保存cookie
				$.cookie("products", _products, {expires:7, path:"/"});
				// 页面渲染
				$(this).parents("tr").children(".sub").text((_prod.price * _prod.amount).toFixed(2));

				// 计算合计
				calcTotal();
			});
			/* 全选 */
			$(".ck_all").click(function(){
				// 获取“全选”复选框选中状态
				let status = $(this).prop("checked");
				// 设置所有行前复选框选中状态与“全选”一致
				$(".ck_prod").prop("checked", status);
				// 计算合计
				calcTotal();
			});
			/* 部分选中 */
			$(".cart_table").on("click", ".ck_prod", function(){
				$(".ck_all").prop("checked", $(".ck_prod:checked").length === _products.length)
				// 计算合计
				calcTotal();
			});
			/* 计算合计金额 */
			function calcTotal() {
				let total = 0;
				$(".ck_prod:checked").each(function(){
					total += Number($(this).parents("tr").children(".sub").text())
				});
				$(".cart_table > tfoot td:last").text(total);
			}
		});
	});