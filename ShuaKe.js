
function getClassIdifValid(myClass){
    if(classTable!=null){
        for (var i =0;i<classTable.rows.length;i++){
            if(classTable.rows[i].cells[9].innerHTML!=''){      //  Attention! if can't be selected, will return null!!
                var targetStr=classTable.rows[i].innerHTML;
                if(targetStr.match(myClass)==myClass){
                    var classStr=String(rexp.exec(targetStr));
                    var myclassNum=Number(classStr.slice(21));
                    return myclassNum
                }
            }
        }
    }
    return null;
}

function select(id){
    var geturl="/jiaowu/student/elective/courseList.do?method=submit"+Type+"Renew&classId=" + id + "&campus=" + Campus;
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4){
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
    var xhr=new XMLHttpRequest();
    var url="/jiaowu/student/elective/courseList.do?method="+classType.toLowerCase()+"RenewCourseList&campus="+Campus;
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4){
            var xmlStr=xhr.response;
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
    delete xhr;
}

function reFresh2(classType){
    var xhr=new XMLHttpRequest();
    var url="/jiaowu/student/elective/courseList.do?method="+classType.toLowerCase()+"RenewCourseList&campus="+Campus;
    xhr.onreadystatechange=function(){
        if (xhr.readyState==4){
            var xmlStr=xhr.response;
            classTable=StrToDom(xmlStr).getElementsByTagName("table")[0];
            for(var i=0;i<classlist.length;i++){
                var className=classlist[i];
                var classId=getClassIdifValid(className);
                //console.log(classId)
                if(classId != null){
                    select(classId);
                }
            }
        }
    };
    xhr.open("GET",url,true);
    xhr.send();
    delete xhr;
}


pattern = /showCourseDetailInfo\(\d+/;
rexp = new RegExp(pattern);
xmlhttp=new XMLHttpRequest();
classTable=''

/******************选项*************************/
Campus='仙林校区'//'鼓楼校区'
Type='Discuss'//通识课
//Type='Public'//公选课
classlist=['创业管理与行为博弈','Relations of East Asia','谈判与冲突管理','网球'];
//想选的课列表。惰性匹配，课程名字只要输入部分，以确保不会匹配多个就行，
//（输少了不怕，但多输了空格之类的无关信息，就可能匹配不到了）

interval=800//刷新间隔，单位毫秒，别太贪哦~，，太快会让服务器崩的。。。

/***********************************************/

// TODO(lxiange): Optimize the "selectMyClass" performance
//setInterval(selectMyClass,interval);//选自己想要的那些课
setInterval(selectAnyClass,interval);//选任何存在的课


