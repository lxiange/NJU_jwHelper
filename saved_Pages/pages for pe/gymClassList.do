


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>南京大学教务系统</title>
    <base href="http://jwas3.nju.edu.cn:8080/jiaowu/">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link href="css/inner.css" rel="stylesheet" type="text/css">  
  </head>
  <!--[if lte IE 6.0000]>
  	<script language="javascript" src="js/pngfix.js"></script>
  <![endif]--> 
  <body >
 
	<div id="Header">
		




 
<div id="Logo"><a href="student/index.do#"><img src="image/student/Logo_Student.jpg" border="0"></a></div>
<div id="TopLink"><img src="image/Icon_Help.gif"><a href="student/index.do#">帮助</a>&nbsp;&nbsp;&nbsp;&nbsp;<img src="image/Icon_Exit.gif"><a href="exit.do?type=student">退出</a></div>
<div id="UserInfo">欢迎您：李想&nbsp;&nbsp;&nbsp;&nbsp;当前身份：学生</div>
		
<script type="text/javascript" language="javascript" src="js/prototype.js"></script>
<div id="Nav">
  <ul>
    <li id="homepage"><a href="student/index.do">首  页</a></li>
    <li id="studentinfo"><a href="student/studentinfo/index.do">个人信息</a></li>
    <li id="teachinginfo"><a href="student/teachinginfo/index.do">教学信息</a></li>
    <li id="teachinginfo"><a href="student/elective/index.do">学期选课</a></li>
    <li id="teachinginfo"><a href="student/signup/index.do">报名系统</a></li>
    <li id="studentinfo"><a href="student/dissertation/index.do">论文信息</a></li>
    <li id="studentinfo"><a href="student/evalcourse/list.do">课程评估</a></li>
    <li id="studentinfo"><a href="student/exchange/index.do">校际交换</a></li>    	
  </ul>
</div>
	</div>
	


<link href="css/student/elective/gymClass.css" rel="stylesheet" type="text/css">


<script language="javascript">
<!--	
	window.onload=function(){		
		initClassList();
	}
		
	function initClassList(){
		var pars = 'method=gymCourseList';	
		var myAjax = new Ajax.Updater(
			'courseList',
			'/jiaowu/student/elective/courseList.do',
			{
				method : 'post',
				parameters : pars,
				evalScript : true
			}
		);
	}
	
	function selectedClass(classId){
		document.getElementById('courseList').disabled = true;
		if(!confirm("选中课程后将无法重选，你确定选择此课程吗？")) {
			document.getElementById('courseList').disabled = false;
			return;
		}
	
		var pars = 'method=addGymSelect&classId=' + classId;	
		var myAjax = new Ajax.Request(
			'/jiaowu/student/elective/selectCourse.do',
			{
				method : 'post',
				parameters : pars,
				onComplete : onSelectedEnd
			}
		);
	}
	
	function onSelectedEnd(response){
		document.getElementById('courseList').disabled = false;
		$('courseOperation').innerHTML = response.responseText;
		initClassList();
		if(document.getElementById('errMsg')!=null){
			alert(document.getElementById('errMsg').title);
		}
	}
	
	function refreshCourseList(){
		initClassList();
	}
	
	var handle = {
		onCreate: function() {
			$('operation').style.visibility = "visible";
		},
		onComplete: function(){
			if(Ajax.activeRequestCount == 0){
				$('operation').style.visibility = "hidden";
			}
		}
	}
	
	Ajax.Responders.register(handle);
//-->
</script>
<div id="courseList"></div>
<div id="courseElective">
	<div id="operation" style="visibility:hidden">正在处理中...</div>
	<div id="courseOperation"></div>
	<div id="comment">
	选课说明：<br>
	1、所有“提高班”的课程均要求具有一定的基础，如果没有修过“基础班”课程，则请慎重选择对应项目的“提高班”的课程。<br>
    2、只有一、二年级的同学才能参加体育选课。体育课程的上课时间是根据本专业课表限定的，不能选择其他时间段的班级。<br>
    3、体育选课采取“直选式”，先到先得，每位同学只有一次选择的机会，选中后不能更改。<br>
    4、如果你看到的体育课时间和你自己课表上的体育上课时间不符，请不要选课，并及时将情况反馈给教务员老师。<br>
    5、体育选课是必修课程，如学生不在规定时间进行体育选课，则必须服从体育部的安排加到某个班级项目中学习，为保证课程资源公平分配和学生全面发展，请大家选课时尽量不要选择之前已经修过的项目。<br>
    6、羽毛球，网球，乒乓球等项目要自己准备球拍。<br>
    </div>
</div>
  </body>


</html>
