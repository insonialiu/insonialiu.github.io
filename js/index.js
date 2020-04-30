require.config({
	baseUrl: 'js',
	waitSeconds: 0
});

require(['app'], function(App){//app为首页
	var app = new App();
	app.init();
});
