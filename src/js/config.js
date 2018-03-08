require.config({
	baseUrl : "/",
	paths : {
		jquery : "lib/jquery/jquery-1.12.4.min",
		cookie : "lib/jquery_plugins/jquery.cookie",
		zoom : "lib/jquery_plugi ns/jquery.elevateZoom-3.0.8.min",
		carousel : "lib/jquery_plugins/jquery.xmcarousel",
		template : "lib/artTemplate/template",
		load : "js/loadHeaderFooter"
	},
	shim : {   //不遵循amd规范的，把依赖关系赋给jQuery
		carousel : {
			deps : ["jquery"]
		},
		zoom : {
			deps : ["jquery"]
		}
	}
});