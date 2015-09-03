//##通识/公选抢课脚本 v2.1
//###内部交流，强烈谢绝外传！
//author:lxiange

//中午写脚本时傻逼了，重复从document获取table就当成刷新表格了，naive！
//JS异步请求真JB蛋疼，，折腾半天，被坑不少时间，，还好最后弄出来了，差点就滚去用Python重构了。。。

//使用方法：登陆desktop.nju.edu.cn（必须登陆这个教务平台，登陆其他两个的话请自己修改源代码）
//打开通识课补选界面，选择校区，然后把整个代码全部复制进去执行默认就是去抢通识课
//如果是想选公选课，以及挑选想要的课刷，就修改Type以及classlist
//然后修改文末注释以执行selectMyClass函数

//输入完回车后就默默等待吧，如果选课成功会有窗口提示的
//PS. 想选自己想要的课时，请先确保时间不冲突！否则白搭。。
//PPS. 如果提示正常进度也没法选。。。

function getClassId(myClass){
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
	xmlhttp.onreadystatechange=function(){
		if (xhr.readyState==4){
			if(xmlhttp.responseText.match('课程选择成功')!=null){
				alert('恭喜，选课成功了！\n\n    by lxiange@gmail.com');
			}
		}
	};
	xmlhttp.open("GET",geturl,true);
	xmlhttp.send();
}

function selectMyClass(){ //选想要的课
	reFresh2(Type);
}

function selectAnyClass(){ //选任何存在的课
	reFresh1(Type);
}

function StrToDom(html){
    var div= document.createElement("div");
    div.innerHTML=html;
    return div;
}

function reFresh1(classType){
	xhr=new XMLHttpRequest();
	url="http://desktop.nju.edu.cn:8080/jiaowu/student/elective/courseList.do?method="+classType.toLowerCase()+"RenewCourseList&campus="+Campus;
	xhr.onreadystatechange=function(){
		if (xhr.readyState==4){
			xmlStr=xhr.response;
			classTable=StrToDom(xmlStr).getElementsByTagName("table")[0];
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
	};
	xhr.open("GET",url,true);
	xhr.send();
}

function reFresh2(classType){
	xhr=new XMLHttpRequest();
	url="http://desktop.nju.edu.cn:8080/jiaowu/student/elective/courseList.do?method="+classType.toLowerCase()+"RenewCourseList&campus="+Campus;
	xhr.onreadystatechange=function(){
		if (xhr.readyState==4){
			xmlStr=xhr.response;
			classTable=StrToDom(xmlStr).getElementsByTagName("table")[0];
			for(var i=0;i<classlist.length;i++){
				className=classlist[i];
				classId=getClassId(className);
				select(classId);
			}
		}
	};
	xhr.open("GET",url,true);
	xhr.send();
}


pattern = /showCourseDetailInfo\(\d+/;
rexp = new RegExp(pattern);
xmlhttp=new XMLHttpRequest();
classTable=''

/******************选项*************************/
Campus='仙林校区'//'鼓楼校区'
Type='Discuss'//通识课
//Type='Public'//公选课
classlist=['创业管理与行为博弈'];//想选的课列表，课程名字只要输入部分确保不会匹配多个就行，目前只能输入一门课，填多个只会去提交最后一个，如果想多选的话就多开几个窗口分别刷，不过估计这个功能用的人不多。就不修补这个bug了吧
interval=700//刷新间隔，单位毫秒，别太贪哦~
/***********************************************/

//setInterval(selectMyClass,interval);//选自己想要的那些课
setInterval(selectAnyClass,interval);//选任何存在的课

