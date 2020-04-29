define(['js/utils/common.js'], function(CommonApi){	
	var searchPage = function(){};
	searchPage.prototype = {
		initPara: function(){
			this.CommonApiObj = new CommonApi();
		},
		insertRow:function(data){
		    var html="";
			var jq=jQuery;
			document.getElementById("search_page_search_menu_body").innerHTML="";
			for(var i = 0; i < data.length; i++) { 
				html+="<div class=\"search_menu_row\">";
					html+="<div><div>"+data[i].name+"</div></div>";
					html+="<img src=\"img/goto.png\"/>";
				html+="</div>"
			};
			jq("#search_page_search_menu_body").append(html)
		},
		init: function(containerId){
			var self=this;
			this.initPara();
			var jq=jQuery;
			var container=document.getElementById(containerId);
			var html="<div id=\"search_page_container\" class=\"search_container\" style=\"margin-top:-3px\">";
				html+="<div class=\"search_input_container\">";
					html+="<div>";
						html+="<div>";
							html+="<form id=\"search_page_form\" style=\"height:0.64em\"><input id=\"search_page_input\" class=\"search_input\"/></form>";
						html+="</div>";
					html+="</div>";
				html+="</div>";
			html+="</div>";
			jq("#"+containerId+"").append(html);
			var html="<div id=\"search_page_search_menu_body\" class=\"search_menu_body\">";
			html+="</div>"
			jq("#"+containerId+"").append(html);
			/*
			var node = document.createElement("div");
			node.className = "search_bottom_audio_container";
			container.appendChild(node); //学校分类
			node.addEventListener("touchstart",function(e){
			   e.preventDefault();
               this.innerHTML="按下"
            })
			node.addEventListener("touchend",function(e){
			   e.preventDefault();
              this.innerHTML="松开"
            })
			*/
			jq("#search_page_form").submit(function() {
				event.preventDefault() //阻止form表单默认提交
			    var jq=jQuery;
				var CommonApiObj=self.CommonApiObj;
				var name=jq("#search_page_input").val();
				var city=((typeof garbageClassificationCity=="undefined")?"":garbageClassificationCity);
				CommonApiObj.searchGarbageClassificationDataByKeyword(name,city,function(data){
					var formatData=CommonApiObj.formatTextSearchData(data);
					self.insertRow(formatData);
				});
				document.getElementById("search_page_input").blur();
				return false;
			});
		}
	};
	return searchPage
})