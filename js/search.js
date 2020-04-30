define(['js/utils/common.js'], function(CommonApi){	
	var searchPage = function(){};
	searchPage.prototype = {
		initPara: function(containerId){
			this.CommonApiObj = new CommonApi();
			this.containerId=containerId;
		},
		noResult:function(){
			var jq=jQuery;
			document.getElementById("search_page_search_menu_body").innerHTML="";
			var html="<div class=\"search_no_result_container\">";
				html+="<img src=\"img/no_result.png\"/>";
				html+="<div style=\"margin-top:0.9em\"><div class=\"content_inner_text\" style=\"font-size:0.48em\">没有找到您搜索的内容</div></div>";
				html+="<div><div class=\"content_inner_text\"  style=\"font-size:0.48em\">请换一个试试</div></div>";
			html+="</div>";
			jq("#search_page_search_menu_body").append(html);
		},
		insertRow:function(data){
		    var html="";
			var jq=jQuery;
			var containerId=this.containerId;
			var CommonApiObj=this.CommonApiObj;
			document.getElementById("search_page_search_menu_body").innerHTML="";
			for(var i = 0; i < data.length; i++) { 
				html+="<div class=\"search_menu_row\" data-name=\""+data[i].name+"\" data-category=\""+data[i].category+"\">";
					html+="<div><div>"+data[i].name+"</div></div>";
					html+="<img src=\"img/goto.png\"/>";
				html+="</div>"
			};
			jq("#search_page_search_menu_body").append(html);
			jq("#search_page_search_menu_body").find(".search_menu_row").each(function(){
				jq(this).unbind().bind('click', function () {
					var searchResultObj={
						name:jq(this).attr("data-name"),
						category:jq(this).attr("data-category"),
					};
					console.log(searchResultObj);
					var path="js/search_result.js";
					CommonApiObj.togglePage(path,searchResultObj);
				})
			});
		},
		monitorSize:function(winHeight){
			var jq=jQuery;
			var newHeight = jq(window).height();
			var self=this;
			if(newHeight!=winHeight){
				setTimeout(function () {//判断软键盘是否收起
					self.monitorSize(newHeight)
				}, 250);
			}
			else{
				jq("#waste_sorting_body_search_bottom_audio_container").show()
			}
		},
		init: function(containerId){
			var self=this;
			this.initPara(containerId);
			var jq=jQuery;
			var container=document.getElementById(containerId);
			jq("#"+containerId+"").append("<div id=\"search_page_body\" style=\"position:relative;width:100%;height:auto\"></div>")
			var html="<div id=\"search_page_container\" class=\"search_container\" style=\"margin-top:-3px\">";
				html+="<div class=\"search_input_container\">";
					html+="<div>";
						html+="<div>";
							html+="<form action=\"javascript:return true\" id=\"search_page_form\" style=\"height:0.64em\"><input id=\"search_page_input\" class=\"search_input\"/></form>";
						html+="</div>";
					html+="</div>";
				html+="</div>";
			html+="</div>";
			jq("#search_page_body").append(html);
			
			if(typeof searchKeywordSample!="undefined"){  
				html+="<div class=\"search_menu_body\">";
					html+="<div class=\"seack_key_word_sample_titile\">";
						html+="<div style=\"height:100%;font-size:0.36em;color:#3b3b3b\">您可以这么问</div>";
					html+="</div>"
					html+="<div class=\"page_input_container_search\" style=\"margin-top:-0.22em;border:0;height:auto\">";
						var noteHtml="";
						var noteList=searchKeywordSample;
						for(var i = 0; i < noteList.length; i++) {  
							//var padding=(i==0?"":"style=\"padding-left:0.23em\"")
							var padding=("style=\"padding-right:0.23em\"")
							//noteHtml+=("<div class=\"page_tab_container\" "+padding+"><div class=\"page_tab_search\"><div>"+noteList[i]+"</div></div></div>")
							noteHtml+=("<div class=\"page_tab_container\" "+padding+"><div class=\"page_tab_search\"><div>"+noteList[i]+"</div></div></div>")
						};
						html+=noteHtml
					html+="</div>"
				html+="</div>";
				/*
				var <div class="page_input_container" style="border:0;height:auto">
				
						var noteHtml="";
						var noteList=searchKeywordSample;
						for(var i = 0; i < noteList.length; i++) {  
							//var padding=(i==0?"":"style=\"padding-left:0.23em\"")
							var padding=("style=\"padding-right:0.23em\"")
							noteHtml+=("<div class=\"page_tab_container\" "+padding+"><div class=\"page_tab\"><div>"+noteList[i]+"</div></div></div>")
						};
						html+=noteHtml
						html+="</div>";
				*/
			};
			
			/*
			var html="<div id=\"search_page_search_menu_body\" class=\"search_menu_body\">";
				var html="<div class=\"seack_key_word_sample_titile\">";
					html+="<div style=\"height:100%;font-size:0.36em;color:#3b3b3b\">您可以这么问</div>";
					html+="</div>"
				html+="</div>"
			html+="</div>"
			*/
			
			jq("#search_page_body").append(html);
			var html="<div id=\"search_page_search_menu_body\" class=\"search_menu_body\">";
			html+="</div>"
			jq("#search_page_body").append(html);
			var node = document.createElement("div");
			node.id = ""+containerId+"_search_bottom_audio_container";
			node.className = "search_bottom_audio_container";
			container.appendChild(node); 
			jq("#"+containerId+"_search_bottom_audio_container").append("<div class=\"search_bottom_audio_title\"><div id=\""+containerId+"_search_audio_touch_text\">按下说话</div></div><div id=\""+containerId+"_search_bottom_img_container\" class=\"search_bottom_img_container\"><div id=\""+containerId+"_audio_touch_icon\" class=\"seach_audio_touch_icon\"></div></div>");
			jq("#search_page_input").focus(function(){
				jq("#waste_sorting_body_search_bottom_audio_container").hide()
			});
			jq("#search_page_input").blur(function(){
				var winHeight = jq(window).height();
				setTimeout(function () {//判断软键盘是否收起
					self.monitorSize(winHeight)
				}, 250);
			});
			
			//模拟 
			/*
			 var jq=jQuery;
				var CommonApiObj=self.CommonApiObj;
				var name= "报纸";
				var city=((typeof garbageClassificationCity=="undefined")?"":garbageClassificationCity);
				CommonApiObj.searchGarbageClassificationDataByKeyword(name,city,function(data){
					var formatData=CommonApiObj.formatTextSearchData(data);
					self.insertRow(formatData);
				});
				*/
				
		/*		
				var  formatData=[{
			"name": "报纸1",
			"category": "可回收垃圾"
		}, {
			"name": "报纸2",
			"category": "可回收垃圾"
		}, {
			"name": "报纸3",
			"category": "可回收垃圾"
		}, {
			"name": "报纸4",
			"category": "可回收垃圾"
		}, {
			"name": "报纸5",
			"category": "可回收垃圾"
		}];
				self.insertRow(formatData);
			*/
			
			jq("#search_page_form").submit(function(){
				event.preventDefault() //阻止form表单默认提交
			    var jq=jQuery;
				var CommonApiObj=self.CommonApiObj;
				var name=jq("#search_page_input").val();
				var city=((typeof garbageClassificationCity=="undefined")?"":garbageClassificationCity);
				CommonApiObj.searchGarbageClassificationDataByKeyword(name,city,function(data){
					var formatData=CommonApiObj.formatTextSearchData(data);
					self.insertRow(formatData);
				},function(){
					self.noResult()
				});
				document.getElementById("search_page_input").blur();
				return false;
			});
			
			
			var button = document.getElementById(""+containerId+"_audio_touch_icon");
			
			//模拟
			/*
			button.addEventListener("click",function(e){
			   e.preventDefault();
			   this.style.backgroundImage="url(img/touch_start.png)"
			   jq("#"+containerId+"_search_audio_touch_text").text("松开完成")
            })
             */
			
			button.addEventListener("touchstart",function(e){
			   e.preventDefault();
			   this.style.backgroundImage="url(img/touch_start.png)"
			   jq("#"+containerId+"_search_audio_touch_text").text("松开完成")
            })
			button.addEventListener("touchend",function(e){
			   e.preventDefault();
               this.style.backgroundImage="url(img/touch_end.png)";
			   jq("#"+containerId+"_search_audio_touch_text").text("按下说话")
            })
			
		}
	};
	return searchPage
})