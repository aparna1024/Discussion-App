console.log("javascript is working");
var count=0;
const subject=document.getElementById("subject");
const question=document.getElementById("question");
var submit=document.getElementById("submit");
var Svalue=subject.value;
var Qvalue=question.value;

function getQuestions(){
var locData=localStorage.getItem("questData");
console.log("get loc storage "+locData);
if(locData===null){
    localStorage.setItem("questData",JSON.stringify([]));
}else{
locData=JSON.parse(locData);

const locData1=locData.sort((a,b)=>(b.star)-(a.star));
locData1.forEach(function(x){
    addUserQues(x.sub,x.que,x.star,x.yr,x.month,x.dt,x.hor,x.min,x.sec);
})
}
}
getQuestions();
var TSub;
var TQue;

var date=new Date();
console.log("date= "+date);
var yr=date.getFullYear();
var dt=date.getDate();
var month=date.getMonth();
var hor=date.getHours();
var min=date.getMinutes();
var sec=date.getSeconds();

// console.log(`yr ${yr}, month ${month}, date ${dt} , hour ${hor} ,min ${min} ,sec ${sec}`)
var format= /^[A-Za-z]/; 

submit.addEventListener('click',function(){
    subject.innerHTML="please enter subject";
    if(subject.value===""){
        
        alert("please enter subject");
    }else if(!(subject.value).match(format)){
        alert("please enter valid subject");
    }
    else if(!(question.value).match(format)){
        alert("please enter question");
    }
    else if(question.value===""){
        alert("please enter your disscussion question");
    }
    else{
    var dateis=new Date();
   
    var newdata={
        sub:subject.value,
        que:question.value,
        star:false,
        yr:dateis.getFullYear(),
        dt:dateis.getDate(),
        month:dateis.getMonth(),
        hor:dateis.getHours(),
        min:dateis.getMinutes(),
        sec:dateis.getSeconds()
    };

    var getingLocData=localStorage.getItem("questData");
    getingLocData=JSON.parse(getingLocData);
    getingLocData.push(newdata);
    localStorage.setItem("questData",JSON.stringify(getingLocData));
    addUserQues(subject.value,question.value,false,dateis.getFullYear(),dateis.getMonth(),dateis.getDate(),dateis.getHours(),dateis.getMinutes(),dateis.getSeconds());
    subject.value="";
    question.value="";
}
})

function addUserQues(SV,QV,str,yr,month,dt,hor,min,sec){
    console.log("str SV QV"+str+" "+SV+" "+QV);
    console.log("submittion for adding question")
    var list=document.getElementById("questionList");
    var addQues=document.createElement("div");
    addQues.setAttribute("id",count);
    addQues.setAttribute("class","class");
    var indiv=document.createElement("div");
    indiv.style.paddingLeft="7px";

    count=count+1; 
    var userSub=document.createElement('p');
    userSub.innerText=SV;
    userSub.setAttribute("id","usersub");
    userSub.setAttribute("class","userdata")
    var userQues=document.createElement('p');
    userQues.innerText=QV;
    userQues.setAttribute("id","userQues");
    var starDiv=document.createElement("div");
    var star=document.createElement("star")
    starDiv.setAttribute("class","star");
    star.style.float="right";

    if(str===false){
        star.setAttribute("name","false")
    star.innerHTML= "&#9734";
    }else{
        star.setAttribute("name","true")
        star.innerHTML= "&#9733";
    }
    starDiv.appendChild(star);
    addQues.appendChild(starDiv);
    var divTime=document.createElement("div");
    divTime.setAttribute("id","divTime");
    var pre=document.createElement("pre");
    // divTime.style.float="right";

    setInterval(function(){
    var date=new Date();
    var Nyr=date.getFullYear();
    var Ndt=date.getDate();
    var Nmonth=date.getMonth();
    var Nhor=date.getHours();
    var Nmin=date.getMinutes();
    var Nsec=date.getSeconds();

    Nyr-=yr;
    Nmonth=Math.abs(Nmonth-month);
    Ndt=Math.abs(Ndt-dt);
    Nhor=Math.abs(Nhor-hor);
    Nmin=Math.abs(Nmin-min);
    Nsec=Math.abs(Nsec-sec);

        if(Nyr!==0){
            pre.innerText=Nyr+" year ago"

        }
        else if(Nmonth!==0){
            pre.innerText=Nmonth+" month ago";
        }
        else if(Ndt!==0){
            pre.innerText=Ndt+" day ago"
        }
        else if(Nhor!==0){
            pre.innerText=Nhor+" hour ago"
        }
        else if(Nmin!==0){
            pre.innerText=Nmin+" min ago"
        }
        else {
            pre.innerText="few second ago";
        }
        
    },100)
    indiv.appendChild(userSub);
    indiv.appendChild(userQues);
    divTime.appendChild(pre);
    // addQues.appendChild(divTime);
    addQues.appendChild(indiv);
    addQues.appendChild(divTime);
    
    var hr=document.createElement("hr");
    addQues.appendChild(hr);
    list.append(addQues);

    starDiv.addEventListener("click",function(){
        
        var q=localStorage.getItem("questData");
        q=JSON.parse(q);
        console.log("start div for local storage is ",q);
        var name=star.getAttribute("name");
        console.log("name=",name)
        if(name==="true"){
            star.innerHTML="&#9734";
            star.setAttribute("name","false");
            q.forEach(function(value,index){
                if(value.sub===SV && value.que===QV){
                value.star=false
                }
            })
            console.log("r if 1 true",q);
            localStorage.setItem("questData",JSON.stringify(q));
        }
        else{
            star.innerHTML="&#9733"
            star.setAttribute("name","true");
            q.forEach(function(value){
                if(value.sub===SV && value.que===QV){
                value.star=true
                }
            })
            localStorage.setItem("questData",JSON.stringify(q));
            console.log("r if 1 false",q);
        }
        
        const e=document.getElementsByClassName("class");
        
        if(e!==null){
            o=Array.from(e)
            for(i of o)
            i.remove();
            getQuestions();
        }
    });
        

indiv.addEventListener("click",function(){
        TSub=SV;
        TQue=QV;
        const a=document.getElementsByTagName("ap");
        console.log("check for response "+a);
        if(a!==null){
            t=Array.from(a)
            for(i of t)
            i.remove();
        }
        
    var resData=localStorage.getItem("responseData");
    if(resData===null){
        localStorage.setItem("responseData",JSON.stringify([]));
    }
    else{
        resData=JSON.parse(resData);
        var commRes=resData.filter(function(value){
            if(value.sub===SV && value.que===QV){
                return value;
            }
        })

        var commRes1=commRes.sort((a,b)=> b.diff-a.diff);
        commRes1.forEach(function(x){
            addCommRes(x.name,x.comm,x.like,x.dislike);
        })
    }
    console.log("question clicking=",addQues);
    console.log("response js is working");
    var pre=document.getElementById("questionDiv");
    if(pre.style.display==="block"){
    pre.style.display="none";
    }

    const check=document.getElementById("selectedQuestion");
    console.log("checking "+check);
    if(check!==null){
        check.remove();
        console.log("removed the before selected question")
        
    }
    const resQuestionIs=document.getElementById("resQuestion");
    var queIs=document.createElement("div");
    queIs.setAttribute("id","selectedQuestion");
    var userResSub=document.createElement('p');
    userResSub.innerHTML=SV;
    userResSub.setAttribute("class","userdata")
    var userResQues=document.createElement('p');
    userResQues.innerHTML=QV;
    queIs.appendChild(userResSub);
    queIs.appendChild(userResQues);
    resQuestionIs.appendChild(queIs);
    var post=document.getElementById("responseDiv");
    post.style.display="block";
})

}

const ResName=document.getElementById("name");
const comment=document.getElementById("comment");
var commentSubmit=document.getElementById("submitRes");
commentSubmit.addEventListener("click",function(){
    if(!(ResName.value).match(format)){
        alert("please enter Name");
    }else if(!(comment.value).match(format)){
        alert("please enter response");
    }else{
    
    var newResData={sub:TSub,que:TQue,name:ResName.value,comm:comment.value,like:0,dislike:0 ,diff:0};
    var gettingResData=localStorage.getItem("responseData");
    gettingResData=JSON.parse(gettingResData);
    gettingResData.push(newResData);
    localStorage.setItem("responseData",JSON.stringify(gettingResData));
    addCommRes(ResName.value,comment.value,"0","0")

    ResName.value="";
    comment.value="";
    }
})

function addCommRes(name,comm,lik,dislik){
    
console.log("res submit with name and comment");
    
    const area=document.getElementById("ResponseArea");
    const resDiv=document.createElement("ap");
    resDiv.setAttribute("id","resSelecedQuestion")
    var commUser=document.createElement('p');
    commUser.innerText=name;
    commUser.setAttribute("class","userdata")
    var commData=document.createElement('p');
    commData.innerText=comm;
    var votediv=document.createElement("div");
    votediv.setAttribute("id","votediv");
    
    const like=document.createElement("i");
    like.setAttribute("class","fa fa-thumbs-o-up");
    like.innerText=lik;
    
    like.style.float="left";
    const dislike=document.createElement("i");
    dislike.setAttribute("class","fa fa-thumbs-o-down");
    dislike.innerText=dislik;

    
    dislike.style.float="rigth";
    
    var hr =document.createElement("hr");
    resDiv.appendChild(commUser);
    votediv.appendChild(like);
    votediv.appendChild(dislike);
    resDiv.appendChild(votediv);
    resDiv.appendChild(commData);
    resDiv.appendChild(hr);
    area.appendChild(resDiv);

    var u=localStorage.getItem("responseData");
    u=JSON.parse(u);
    like.addEventListener("click",function(){
        var upvote=+(like.innerText);
        upvote+=1;
        like.innerText=upvote;
        u.forEach(function(value){
            if(value.name===name && value.comm===comm)
            value.like=upvote;
            value.diff=Math.abs(value.like-value.dislike);
        })
        localStorage.setItem("responseData",JSON.stringify(u));

    })
    dislikevote=document.getElementsByClassName("fa fa-thumbs-o-down")
    dislike.addEventListener("click",function(){
        var downvote=+(dislike.innerText);
        downvote+=1;
        dislike.innerText=downvote;
        u.forEach(function(value){
            if(value.name===name && value.comm===comm)
            value.dislike=downvote;
        value.diff=Math.abs(value.like-value.dislike);
        })
        localStorage.setItem("responseData",JSON.stringify(u));
    })

}
const back=document.getElementById("resolve");
back.addEventListener("click",backToForm)

function backToForm(){
    var pre=document.getElementById("questionDiv");
    if(pre.style.display==="none"){
    pre.style.display="block";
    }
    var post=document.getElementById("responseDiv");
    post.style.display="none";
}

const newForm=document.getElementById("newques");
newForm.addEventListener("click",backToForm)

// searching
const search=document.getElementById("search_que");
function searchFun(){
    console.log("searching function is working");
    const SerchValue=search.value.toUpperCase();
    var list=document.getElementById("questionList");
    console.log("list is:= "+list.textContent);
    var AllQue=list.getElementsByTagName('div');
    console.log(AllQue);
    let ListSub
    for(var i=0;i<AllQue.length;i++){
        ListSub=AllQue[i].getElementsByTagName('p')[0];
        ListQue=AllQue[i].getElementsByTagName('p')[1];
    console.log("List Subjects "+ListSub);
    if(ListSub){
        let SubValue=ListSub.innerText;
        let QueValue=ListQue.innerText;
        console.log("SubValue "+SubValue)
        if(SubValue.toUpperCase().indexOf(SerchValue)>-1 || QueValue.toUpperCase().indexOf(SerchValue)>-1 ){
            AllQue[i].style.display="";
        }else{
            AllQue[i].style.display="none";
        }
}
}
}

function SortByStar(){
    console.log("sort by start function calling");
    var list=document.getElementById("questionList");
    var AllQue=list.getElementsByTagName('div');
    // console.log(typeof(AllQue));
    // for(var i=0;i<AllQue.length;i++){
    //     AllQue[i].sort();
    // }
    AllQue.sort(function(a,b){
        AllQue[0].style
    })
}