//##通识/公选抢课脚本
//###内部交流，强烈谢绝外传！
//author:lxiange

//使用方法：登陆desktop.nju.edu.cn（必须登陆这个教务系统，登陆其他两个的话请自己修改源代码）
//打开通识/公选课补选界面，选择校区，刷新出那个课程表格
//如果是挑想想要的课刷，就把课添加到classlist数组里，然后执行selectMyClass函数，默认是选任何有的课（修改文末注释即可）
//然后配置选项，选择公选课还是通识课
//在控制台输入以下全部代码，然后默默等待吧，如果选课成功会有窗口提示
//PS. 想选自己想要的课时，请先确保时间不冲突！否则白搭。。
//PPS. 如果提示正常进度也没法选。。。

function getClassId(myClass){
	classTable=document.getElementById("tbCourseList");
	if(classTable!=null){
		for (var i =0;i<classTable.rows.length;i++){
			var targetStr=classTable.rows[i].innerHTML;
			if(targetStr.match(myClass)==myClass){
				var classStr=String(rexp.exec(targetStr));
				var myclassNum=Number(classStr.slice(21));
				return myclassNum
			}
		}
	}
}

function select(id){
	var geturl="http://desktop.nju.edu.cn:8080/jiaowu/student/elective/courseList.do?method=submit"+Type+"Renew&classId=" + id + "&campus=" + Campus;
	xmlhttp.open("GET",geturl,true);
	xmlhttp.send();
}

function check(){
	if(xmlhttp.responseText.match('已经选过该课程了')!=null){
		alert('恭喜，选课成功了！\n\n    by lxiange@gmail.com');
	}
}

function selectMyClass(){ //选想要的课
	for(var i=0;i<classlist.length;i++){
		className=classlist[i];
		classId=getClassId(className);
		select(classId);
	}
}

function selectAnyClass(){ //选任何存在的课
	classTable=document.getElementById("tbCourseList");
	if(classTable!=null){
		for (var i =0;i<classTable.rows.length;i++){
			if(classTable.rows[i].cells[9].innerHTML!=''){
				var targetStr=classTable.rows[i].innerHTML;
				var classStr=String(rexp.exec(targetStr));
				var myclassNum=Number(classStr.slice(21));
				select(myclassNum);
			}
		}
	}
}


pattern = /showCourseDetailInfo\(\d+/;
rexp = new RegExp(pattern);
xmlhttp=new XMLHttpRequest();
classTable=document.getElementById("tbCourseList");

/******************选项*************************/
Campus='仙林校区'//'鼓楼校区'
Type='Discuss'//通识课
//Type='Public'//公选课
classlist=['创业管理与行为博弈','Historical'];//想选的课列表，课程名字只要输入部分确保不会匹配多个就行
interval=700//提交间隔，单位毫秒，别太贪哦~
/***********************************************/

//setInterval(selectMyClass,interval);//选自己想要的那些课
setInterval(selectAnyClass,interval);//选任何存在的课

setInterval(check,400);//或许是因为异步get的原因，才这样写的。
