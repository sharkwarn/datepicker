/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.8
 *
 */
(function($) {

  $.fn.extend({
    YBJdatepicker: function(options) {

     
	  this.each(function(){
		  var me=this;
		  var weekstr='      <tr>'
		+			 '         <td><span></span></td>'
		+			  '        <td><span></span></td>'
		+			   '       <td><span></span></td>'
		+			  '        <td><span></span></td>'
		+			  '        <td><span></span></td>'
		+			  '        <td><span></span></td>'
		+			  '        <td><span></span></td>'
		+			  '      </tr>';

	      $(me).append('					<span class="riqixuanze"></span>'
				+			'<div class="rilibiao">'
				+			 ' <div class="rilitit">'
				+			  '  <b id="jinri">今日</b>'
				+			   ' <button class="pre"><</button>'
				+			    '<span class="rilixianshi"></span>'
				+			    '<button class="next">></button>'
				+			    '<b id="benyue">本月</b>'
				+			  '</div>'
				+			  '<table nianyue="">'
				+			     ' <thead>'
				+			    '    <tr>'
				+			     '     <th>一</th>'
				+			    '     <th>二</th>'
				+			    '      <th>三</th>'
				+			    '      <th>四</th>'
				+			    '      <th>五</th>'
				+			     '     <th>六</th>'
				+			   '       <th>日</th>'
				+			  '      </tr>'
				+			  '    </thead>'
				+			  '    <tbody>'
				+			  weekstr
				+			   weekstr
				+			   weekstr
				+			   weekstr
				+			  weekstr
				+			  weekstr
				+'			      </tbody>'
				+'			    </table>'
				+'			</div>');
			var rilijibiaoji = 1;
			var riliqishi = "";
			var rilizhongzhi = "";
			/*日历的展开*/
			$(me).find(".riqixuanze").click(function(){
				$(me).find(".rilibiao").toggle();
				if(riliqishi!=''&&rilizhongzhi!=''){
					$(me).find(".riqixuanze").html(riliqishi+"  -  "+rilizhongzhi);
				}
				return false;
			});
			$("body").click(function(){
				$(me).find(".rilibiao").hide();
				if(riliqishi!=''&&rilizhongzhi!=''){
					$(me).find(".riqixuanze").html(riliqishi+"  -  "+rilizhongzhi);
				}
			});
			$(me).find(".rilibiao").click(function(){
				return false;
			});
			/*$(me).find(".rilibiao table tbody tr td").click(function(){
				if( $(this).attr("class") == "active1"){
					$(me).find(".rilibiao table tbody tr td").removeClass("active1");
					$(me).find(".rilibiao table tbody tr td").removeClass("active2");
					rilijibiaoji = 1;
				}else{
					if( rilijibiaoji == 1){
						$(this).addClass("active1");
						rilijibiaoji = 2;
						riliqishi = $(me).find(".rilibiao table").attr("nianyue")+"/"+$(this).find("span").html();
					}else{
						$(me).find(".rilibiao table tbody tr td").removeClass("active2")
						$(this).addClass("active2");
						rilizhongzhi = $(me).find(".rilibiao table").attr("nianyue")+"/"+$(this).find("span").html();
					}
				}
			});*/

			var day1='';
			var day2='';
			$(me).find(".rilibiao table tbody tr td").click(function(){
				if($(this).find("span").html() == ""){
					return;
				}
				if($(this).hasClass('active1')){
					//第二次点到起始日期，截止日期变为起始日期，截止日期为空
					   $(this).removeClass('active1');
					   riliqishi=rilizhongzhi;
					   $(me).find(".rilibiao table tbody tr .active2").removeClass('active2').addClass('active1');
					   rilizhongzhi='';
					   return false;
				}
				if($(this).hasClass('active2')){
					//第二次点到截止日期，截止日期清空
					   $(this).removeClass('active2');
					   rilizhongzhi='';
					   return false;
				}
				if(!$(this).hasClass('active1')&&!$(this).hasClass('active2')){
					 if(rilizhongzhi==''&&riliqishi==''){
						 //第一次点日期，设置起始日期
							$(this).addClass('active1');
							riliqishi=$(me).find(".rilibiao table").attr("nianyue")+"/"+$(this).find("span").html();
					}else if(rilizhongzhi==''&&riliqishi!=''){
						//第二次点日期
						if(new Date(riliqishi)<=new Date($(me).find(".rilibiao table").attr("nianyue")+"/"+$(this).find("span").html())){
							//原本起始日期小于此次点击日期,设置截止日期
							$(this).addClass('active2');
							rilizhongzhi=$(me).find(".rilibiao table").attr("nianyue")+"/"+$(this).find("span").html();	
						}else{
							//原本起始日期大于此次点击日期，则此次点击日期覆盖起始日期
							$(me).find(".rilibiao table tbody tr .active1").removeClass('active1').addClass('active2');
							$(this).addClass('active1');
							rilizhongzhi=riliqishi;
							riliqishi=$(me).find(".rilibiao table").attr("nianyue")+"/"+$(this).find("span").html();							
						}
					}else if(rilizhongzhi!=''&&riliqishi==''){
						//不太可能出现此状况了
							$(this).addClass('active1');
							riliqishi=$(me).find(".rilibiao table").attr("nianyue")+"/"+$(this).find("span").html();					
					}else{
						//两个日期都有设置，判断大小
						if(new Date(riliqishi)<=new Date($(me).find(".rilibiao table").attr("nianyue")+"/"+$(this).find("span").html())){
							//原本起始日期小于此次点击日期，则此次点击日期覆盖截止日期
							$(me).find(".rilibiao table tbody tr .active2").removeClass('active2');
							$(this).addClass('active2');
							rilizhongzhi=$(me).find(".rilibiao table").attr("nianyue")+"/"+$(this).find("span").html();	
						}else{
							//原本起始日期大于此次点击日期，则此次点击日期覆盖起始日期
							$(me).find(".rilibiao table tbody tr .active1").removeClass('active1');
							$(this).addClass('active1');
							riliqishi=$(me).find(".rilibiao table").attr("nianyue")+"/"+$(this).find("span").html();	
						}
					}
				}
			});
			/*今日*/
				$(me).find("#jinri").click(function(){
					dateyear = dangqianriqi.getFullYear();
					datemonth = dangqianriqi.getMonth()+1;
					var dateday = dangqianriqi.getDate();
					arr[0] = dangqianriqi.getFullYear();
					arr[1] = dangqianriqi.getMonth()+1;
					var str2 = arr.join("/");
					var jinristr = '[date="'+dateyear+'/'+datemonth+'/'+dateday+'"]';
					xuanranshuju(str2);
					$(me).find(".rilixianshi").html(arr[0]+"年"+arr[1]+"月");
					$(me).find(".rilibiao table").attr("nianyue",arr[0]+"/"+arr[1]);
					var obj = $(me).find('td'+jinristr);
					if(!$(obj).hasClass('active1')&&!$(obj).hasClass('active2')){
						 if(rilizhongzhi==''&&riliqishi==''){
							 //第一次点日期，设置起始日期
								$(obj).addClass('active1');
								riliqishi=$(me).find(".rilibiao table").attr("nianyue")+"/"+$(obj).find("span").html();
						}else if(rilizhongzhi==''&&riliqishi!=''){
							//第二次点日期
							if(new Date(riliqishi)<=new Date($(me).find(".rilibiao table").attr("nianyue")+"/"+$(obj).find("span").html())){
								//原本起始日期小于此次点击日期,设置截止日期
								$(obj).addClass('active2');
								rilizhongzhi=$(me).find(".rilibiao table").attr("nianyue")+"/"+$(obj).find("span").html();	
							}else{
								//原本起始日期大于此次点击日期，则此次点击日期覆盖起始日期
								$(me).find(".rilibiao table tbody tr .active1").removeClass('active1').addClass('active2');
								$(obj).addClass('active1');
								rilizhongzhi=riliqishi;
								riliqishi=$(me).find(".rilibiao table").attr("nianyue")+"/"+$(obj).find("span").html();							
							}
						}else if(rilizhongzhi!=''&&riliqishi==''){
							//不太可能出现此状况了
								$(obj).addClass('active1');
								riliqishi=$(me).find(".rilibiao table").attr("nianyue")+"/"+$(obj).find("span").html();					
						}else{
							//两个日期都有设置，判断大小
							if(new Date(riliqishi)<=new Date($(me).find(".rilibiao table").attr("nianyue")+"/"+$(obj).find("span").html())){
								//原本起始日期小于此次点击日期，则此次点击日期覆盖截止日期
								$(me).find(".rilibiao table tbody tr .active2").removeClass('active2');
								$(obj).addClass('active2');
								rilizhongzhi=$(me).find(".rilibiao table").attr("nianyue")+"/"+$(obj).find("span").html();	
							}else{
								//原本起始日期大于此次点击日期，则此次点击日期覆盖起始日期
								$(me).find(".rilibiao table tbody tr .active1").removeClass('active1');
								$(obj).addClass('active1');
								riliqishi=$(me).find(".rilibiao table").attr("nianyue")+"/"+$(obj).find("span").html();	
							}
						}
					}
				});
			/*本月*/
				$(me).find("#benyue").click(function(){
					dateyear = dangqianriqi.getFullYear();
					datemonth = dangqianriqi.getMonth()+1;
					arr[0] = dangqianriqi.getFullYear();
					arr[1] = dangqianriqi.getMonth()+1;
					var str2 = arr.join("/");
					xuanranshuju(str2);
					$(me).find(".rilixianshi").html(arr[0]+"年"+arr[1]+"月");
					$(me).find(".rilibiao table").attr("nianyue",arr[0]+"/"+arr[1]);
				});


			/*双击选择同一日期*/
			$(me).find(".rilibiao table tbody tr td").dblclick(function(){
				if( $(this).find("span").html() == "" ){
					return;
				}
				riliqishi = $(me).find(".rilibiao table").attr("nianyue")+"/"+$(this).find("span").html();
				rilizhongzhi = $(me).find(".rilibiao table").attr("nianyue")+"/"+$(this).find("span").html();
				$(me).find(".rilibiao").hide();
				$(me).find(".riqixuanze").html(riliqishi+"  -  "+rilizhongzhi);
			})
			/*日历部分-日历表*/
			var dangqianriqi = new Date();
			var dangqianyear = dangqianriqi.getFullYear();
			var dangqianyue = dangqianriqi.getMonth()+1;
			var str = dangqianyear+"/"+dangqianyue+"/1";
			var arr = str.split("/");
			$(me).find(".rilixianshi").html(arr[0]+"年"+arr[1]+"月");
			$(me).find(".rilibiao table").attr("nianyue",arr[0]+"/"+arr[1]);
			var datemonth = parseInt(arr[1]);
			var dateyear = parseInt(arr[0]);
			$(me).find(".pre").click(function(){
			  datemonth--;
			  if( datemonth == 0 ){
				datemonth = 12;
				dateyear --;
			  }
			  arr[1] = datemonth;
			  arr[0] = dateyear;
			  var str2 = arr.join("/");
			  console.log(str2);
			  xuanranshuju(str2);
			  $(me).find(".rilixianshi").html(arr[0]+"年"+arr[1]+"月");
			  $(me).find(".rilibiao table").attr("nianyue",arr[0]+"/"+arr[1]);
			});
			$(me).find(".next").click(function(){
			  datemonth++;
			  if( datemonth == 13 ){
				datemonth = 1;
				dateyear ++;
			  }
			  arr[1] = datemonth;
			  arr[0] = dateyear;
			  var str2 = arr.join("/");
			  xuanranshuju(str2);
			  $(me).find(".rilixianshi").html(arr[0]+"年"+arr[1]+"月");
			  $(me).find(".rilibiao table").attr("nianyue",arr[0]+"/"+arr[1]);

			});
			function xuanranshuju(str0){
			  $(me).find("tbody tr td span").html("");
			  var date=new Date(str0);
			  var month = date.getMonth();
			  var yuechu = date.getDay()-1;
			  var zhou = 0;
			  var years = date.getFullYear();
			  var max =getmonthday(month,years);
			  var premax = getmonthday(month-1,years);
			  var nextmax = getmonthday(month+1,years);
			  console.log(max);
			  $(me).find(".rilibiao table tbody tr td").removeClass('active1');
			  $(me).find(".rilibiao table tbody tr td").removeClass('active2');
			  for(var i = 1 ; i<max ; i++){
				if( yuechu == (-1)){
				  yuechu=6;
				}
				$(me).find("tbody").find("tr").eq(zhou).find("td").eq(yuechu).attr('date',years+'/'+datemonth+'/'+i);
				$(me).find("tbody").find("tr").eq(zhou).find("td").eq(yuechu).find("span").html(i);
				if(years+'/'+datemonth+'/'+i==riliqishi){
					$(me).find("tbody").find("tr").eq(zhou).find("td").eq(yuechu).addClass('active1');
				}
				if(years+'/'+datemonth+'/'+i==rilizhongzhi){
					$(me).find("tbody").find("tr").eq(zhou).find("td").eq(yuechu).addClass('active2');
				}
				  yuechu++;
				  if( yuechu >= 7 ){
					zhou++;
					yuechu=0;
				  }
				  if( i>=max ){
					i=1;

				  }
			  }
			}
			xuanranshuju(str);
				/*判断本月天数*/
			function getmonthday(num,years){
			  if((num == 3)||(num == 5)||(num == 8)||(num == 10)){
				return 31;
			  }else if( num == 1){
				if( ((years%4 == 0) && (years%100 !=0 ))||(years%400 == 0)){
				  return 30;
				}else{
				  return 29;
				}
			  }else{
				return 32;
			  }
			}
	  });

      // maintain chainability
      return this;
    }
  });

  $.fn.extend({
    ybjdatepicker: $.fn.YBJdatepicker
  });

})(jQuery);
