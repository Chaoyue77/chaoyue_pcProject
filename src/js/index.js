require(["config"], function(){
	require(["jquery", "template", "load"], function($, template){
		$.getJSON("/mock/list.json", function(data){
			var data1 = {list : data.res_body.data};
			var facedata = {list : data.res_body.facedata};
			let html = template("list_template", data1),
				facehtml = template("face_template", facedata);
			$(".kh-products").html(html);
			$(".face-products").html(facehtml);
		});
		
	});
});