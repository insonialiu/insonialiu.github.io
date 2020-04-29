define(['js/utils/common.js'], function(CommonApi){	
	var App = function(){};
	App.prototype = {
		calcFont:function(containerId){
			document.getElementById(containerId).style.fontSize = 100*(document.body.clientWidth/750)+'px';
		},
		init: function(){
			this.calcFont("app");
			var self=this;
			window.onresize = function(){
				self.calcFont("app");
			};
			var jq=jQuery;
			jq("#app").append("<div class=\"nav_header\"><img id=\"nav_header_back\" src=\"img/back.png\" class=\"nav_header_back\" style=\"display:none\"/><div id=\"nav_header_title\" class=\"nav_header_title\"><div style=\"font-size:0.36em\">垃圾分类助手</div></div></div>");
			jq("#app").append("<div id=\"waste_sorting_body\" class=\"page-view\"></div>");
			var CommonApiObj = new CommonApi();
			window.lastPageList=["js/index_page.js"];//第一页
			document.getElementById("nav_header_back").onclick=function(){
				CommonApiObj.backPage()
			};
			require(['js/demo.js'], function(curpage){
				var curpage = new curpage();
				curpage.init("waste_sorting_body", '可回收物');
				// curpage.init("waste_sorting_body", '其他垃圾');
				// curpage.init("waste_sorting_body", '有害垃圾');
				// curpage.init("waste_sorting_body", '厨余垃圾');
			})
			/*
			require(['js/search.js'], function(curpage){
				var curpage = new curpage();
		        curpage.init("waste_sorting_body");
			})
			*/
		}
	};
	return App
})
