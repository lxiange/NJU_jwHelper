/********************************
*   ##通识/公选抢课脚本 v2.3    *
*   ###内部交流，强烈谢绝外传！ *
*   author: lxiange@gmail.com   *
*   Special Edition for LiHan   *
********************************/


/***************************************

使用方法：登陆教务平台
打开通识或课补选界面，选择校区，然后 Ctrl-Shift-J (In Chrome)打开控制台，
用 Ctrl-A 把整个代码全部复制(废话都在注释中，不影响代码)，然后粘贴进控制台，回车执行即可。
（不做任何修改，默认就是去抢通识课）
如果是想选公选课，以及挑选想要的课刷，就修改Type以及classlist
然后修改文末注释以执行selectMyClass函数

输入完回车后就默默等待吧，如果选课成功会有窗口提示的
PS. 想选自己想要的课时，请先确保时间不冲突！否则白搭。。
PPS. 如果选通识课时提示在同年级学生中属于正常进度也没法选。。。

********************************************/


/***Notes for LiHan:

###你需要做的是：
首先阅读上述使用说明。知道在何处、如何打开控制台。
按照样例修改classlist变量，填入你想选的课。然后在控制台中将全部代码粘贴进去敲击回车执行即可。
其他参数已经帮你设置好了。

Have a nice day! ^_^
--
lxiange
2015/9/5

*************************/


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
//Type='Discuss'//通识课
Type='Public'//公选课
classlist=['创业管理与行为博弈','Relations of East Asia','谈判与冲突管理','网球'];
//想选的课列表。惰性匹配，课程名字只要输入部分，以确保不会匹配多个就行，
//（输少了不怕，但多输了空格之类的无关信息，就可能匹配不到了）

interval=800//刷新间隔，单位毫秒，别太贪哦~，，太快会让服务器崩的。。。

/***********************************************/


setInterval(selectMyClass,interval);//选自己想要的那些课
//setInterval(selectAnyClass,interval);//选任何存在的课


