require(["config"], function(){
	require(["jquery", "load"], function($){
		$.getJSON("/mock/login.json", function(data){
			console.log(data);
		});
	});
});