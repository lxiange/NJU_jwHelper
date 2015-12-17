function selectedClass(classId){
	document.getElementById('courseList').disabled = true;
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
}

Cols=2; 		//2 is teacher, 0 is classname
myClass="数字"  //Change it! Teacher's name or the class's name.
interval=500  //The interval of refresh..don't too zuo die...

pattern = /selectedClass\(\d+/;
rexp = new RegExp(pattern);

function I_hate_taichi(){
	initClassList();
	classTable=document.getElementById("tbCourseList");
	if(classTable!=null){
		for (var i =0;i<classTable.rows.length;i++){
			targetStr=classTable.rows[i].innerHTML;
			secretStr=classTable.rows[i].cells[5].innerHTML;
			if(targetStr.match(myClass)==myClass){
				classStr=String(rexp.exec(secretStr));
				classNum=Number(classStr.slice(14));
				selectedClass(classNum);
				//break;
			}
		}
	}
	//alert('test');
}
setInterval(I_hate_taichi,interval);

/*
test mode:
testrex=/javascript:showClassInfo\(event,'\d+/
rexp= new RegExp(testrex);
*/