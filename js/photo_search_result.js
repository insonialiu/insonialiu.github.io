define(['js/utils/common.js'], function(CommonApi){	
	var searchPage = function(){};
	searchPage.prototype = {
		initPara: function(containerId){
			this.CommonApiObj = new CommonApi();
			this.containerId=containerId;
		},
		init: function(containerId,searchResultObj){
			this.initPara(containerId);
			var self=this;
			var jq=jQuery;
			var searchResultObj=searchResultObj;
			var CommonApiObj=this.CommonApiObj;
			var garbageCategoryConfig=CommonApiObj.getgarbageCategoryConfig();
			var guide="";
			var itemImage="";
			var title="";
			var iconSrc="";
			for(var i = 0; i < garbageCategoryConfig.length; i++) {
				if(garbageCategoryConfig[i].name==searchResultObj.category){
					console.log(garbageCategoryConfig[i]);
					iconSrc=garbageCategoryConfig[i].icon;
					guide=garbageCategoryConfig[i].guide;
					itemImage=garbageCategoryConfig[i].itemImage;
					title=garbageCategoryConfig[i].title
					break;
				}
			};
			var html="<div id=\""+containerId+"_photo_search_result_page\" class=\"search_result_page_container\">"
				html+="<div class=\"photo_search_result_top_container\">";
					html+="<div class=\"search_result_top_container\" style=\"height:5.03em;position:absolute;bottom:0;margin-top:0;left:50%;margin-left:-3.41em\"></div>"
					html+="<img src=\"img/post1.png\"/>";
				html+="</div>";
			html+="</div>";
			jq("#"+containerId+"").append(html);
			var html="<div class=\"search_result_top_title\" style=\"margin-top:1.85em\"><div class=\"content_inner_text\" style=\"font-size:0.3em\">"+searchResultObj.name+"</div></div>";
			html+="<div class=\"search_result_top_category\"><div class=\"content_inner_text\" style=\"font-size:0.36em\">属于"+title+"</div></div>";
			html+="<img src=\""+iconSrc+"\"/>";
			jq("#"+containerId+"_photo_search_result_page").find(".search_result_top_container").append(html);
			var html="<div class=\"search_result_body_container\">"
			html+="</div>";
			jq("#"+containerId+"_photo_search_result_page").append(html);
			var html="<img class=\"search_result_body_guide\" src=\""+guide+"\"/>";
			html+="<img class=\"search_result_body_guide\" src=\""+itemImage+"\" style=\"width:5.75em;margin-top:0.62em;margin-bottom:0.15em\"/>";
			jq("#"+containerId+"_photo_search_result_page").find(".search_result_body_container").append(html);
			return;

			
			
			var guide="";
			var itemImage="";
			for(var i = 0; i < garbageCategoryConfig.length; i++) {
				if(garbageCategoryConfig[i].title==searchResultObj.category){
					console.log(garbageCategoryConfig[i]);
					iconSrc=garbageCategoryConfig[i].icon;
					guide=garbageCategoryConfig[i].guide;
					itemImage=garbageCategoryConfig[i].itemImage;
					break;
				}
			};
			console.log(iconSrc);
			var jq=jQuery;
			var html="<div id=\""+containerId+"_search_result_page\" class=\"search_result_page_container\">"
				html+="<div class=\"search_result_top_container\">"
				html+="</div>"
			html+="</div>";
			jq("#"+containerId+"").append(html);
			var html="<div class=\"search_result_top_title\"><div class=\"content_inner_text\" style=\"font-size:0.3em\">"+searchResultObj.name+"</div></div>";
			html+="<div class=\"search_result_top_category\"><div class=\"content_inner_text\" style=\"font-size:0.36em\">属于"+searchResultObj.category+"</div></div>";
			html+="<img src=\""+iconSrc+"\"/>";
			jq("#"+containerId+"_search_result_page").find(".search_result_top_container").append(html);
			var html="<div class=\"search_result_body_container\">"
			html+="</div>";
			jq("#"+containerId+"_search_result_page").append(html);
			var html="<img class=\"search_result_body_guide\" src=\""+guide+"\"/>";
			html+="<img class=\"search_result_body_guide\" src=\""+itemImage+"\" style=\"width:5.75em;margin-top:0.62em;margin-bottom:0.15em\"/>";
			jq("#"+containerId+"_search_result_page").find(".search_result_body_container").append(html);
		}
	};
	return searchPage
})