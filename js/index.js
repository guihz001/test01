window.onload = function () {
//背景动画
    turn();
    var swiperSlide = document.querySelectorAll(".swiper-slide");
    var screenWidth = swiperSlide[0].offsetWidth;
    var screenHeight = swiperSlide[0].offsetHeight;
    for (var i = 0; i < swiperSlide.length; i++) {
        swiperSlide[i].style.backgroundSize = screenWidth + "px " + screenHeight + "px";
    }
    var tLine = document.querySelectorAll(".t-line");
    var tx = document.querySelectorAll(".t-x");
    var olList = document.querySelectorAll("ol li");
    var dLine = document.querySelectorAll(".d-line");
    var sp = document.querySelectorAll(".s-p");
    var outRound = document.querySelectorAll(".out-round");
    var inRound = document.querySelectorAll(".in-round");
    var skill = document.querySelectorAll(".skill");
    var arrRound = [{x: olList[0].offsetLeft, y: olList[0].offsetTop}, {x: olList[1].offsetLeft, y: olList[1].offsetTop}
        , {x: olList[2].offsetLeft, y: olList[2].offsetTop}, {x: olList[3].offsetLeft, y: olList[3].offsetTop}
        , {x: olList[4].offsetLeft, y: olList[4].offsetTop}, {x: olList[5].offsetLeft, y: olList[5].offsetTop}
        , {x: olList[6].offsetLeft, y: olList[6].offsetTop}];
    var arrDLine = [];
    var arr = [{x: tx[0].offsetLeft, y: tx[0].offsetTop}, {x: tx[1].offsetLeft, y: tx[1].offsetTop}
        , {x: tx[2].offsetLeft, y: tx[2].offsetTop}, {x: tx[3].offsetLeft, y: tx[3].offsetTop}
        , {x: tx[4].offsetLeft, y: tx[4].offsetTop}, {x: tx[5].offsetLeft, y: tx[5].offsetTop}
        , {x: tx[6].offsetLeft, y: tx[6].offsetTop}];
    var arrdeg = [];
    var arrx = ["12px", "14px", "-4px", "10px", "13px", "11px"];
    var arry = ["9px", "-11px", "-10px", "-8px", "-19px", "-11px"];
    var arrdeg2 = [0, 180, 182, 172, 182, 179];
    var arrLength = [];
    third();
    function third(){
        for (var i = 0; i < arr.length - 1; i++) {
            arrdeg.push(angle(arr[i], arr[i + 1]));
            arrLength.push(length(arr[i], arr[i + 1]));
            tLine[i].style.transform = "rotateZ(" + (arrdeg[i] + arrdeg2[i]) + "deg) translate(" + arrx[i] + "," + arry[i] + ")";
        }
        for (var i = 0; i < arrRound.length; i++) {
            arrDLine.push(Math.abs(arr[i].x - arrRound[i].x));
            if (i == 0 || i == 3) {
                //dLine[i].style.width = arrDLine[i] - 25 + "px";
                dLine[i].style.transform = "translate(" + (arrDLine[i] + 15) + "px,20px) rotateZ(-180deg)";
            } else {
                //dLine[i].style.width = arrDLine[i] - 5 + "px";
                dLine[i].children[0].style.left = arrDLine[i] / 2 - 7 + "px";
                dLine[i].style.transform = "translate(" + (-arrDLine[i] + 5) + "px,20px)";
            }

        }
        sp[0].style.left = arrDLine[0] / 2 + 5 + "px";
        sp[3].style.left = arrDLine[3] / 2 + 5 + "px";
    }
    //全屏滚动插件
    var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        direction: 'vertical',
        //initialSlide :4,
        onSlideChangeEnd: function (swiper) {
            var index = swiper.activeIndex;
            if(index==4){
                spans();
            }else{
                document.querySelector(".c_bg").innerHTML="";
            }
            var skillHeader = document.querySelector(".skill-header");
            resize();
            document.querySelector(".current").classList.remove("current");
            swiperSlide[index].classList.add("current");
            skillHeader.addEventListener("animationend", function () {
                tx[0].style.opacity = 1;
                tx[0].addEventListener("transitionend", txend)
            })
        }
    })
        function txend() {
            tLine[0].style.width = arrLength[0] + "px";
            dLine[0].style.width = arrDLine[0] - 25 + "px";
            tEnd(0);
        }
    function resize(){
        for(var i=0;i<dLine.length;i++){
            dLine[i].style.width = 0;
            tx[i].style.opacity = 0;
            outRound[i].style.opacity = 0;
            inRound[i].style.opacity = 0;
            skill[i].style.opacity = 0;
            if(i<dLine.length-1){
                tLine[i].style.width = 0;
            }
            sp[i].classList.remove("down");
        }
        if (document.querySelector(".light")) {
            document.querySelector(".light").classList.remove("light");
        }
    }
    function tEnd(index) {
        opacity(index);
        tLine[index].addEventListener("transitionend", function () {
            tx[index + 1].style.opacity = 1;
            tx[index + 1].addEventListener("transitionend", function () {
                tLine[index + 1].style.width = arrLength[index + 1] + "px";
                opacity(index + 1);
                if (index == 2) {
                    dLine[index + 1].style.width = arrDLine[index + 1] - 25 + "px";
                } else {
                    dLine[index + 1].style.width = arrDLine[index + 1] - 5 + "px";
                }
                if (index < 4) {
                    tEnd(index + 1);
                } else {
                    tLine[index + 1].addEventListener("transitionend", function () {
                        tx[index + 2].style.opacity = 1;
                        tx[index + 2].addEventListener("transitionend", function () {
                            dLine[index + 2].style.width = arrDLine[index + 1] - 5 + "px";
                            opacity(index + 2);
                        })
                    })
                }
            })
        })
        function opacity(index) {
            dLine[index].addEventListener("transitionend", function () {
                outRound[index].style.opacity = 1;
                inRound[index].style.opacity = 1;
                skill[index].style.opacity = 1;
                skill[index].addEventListener("transitionend", function () {
                    sp[index].classList.add("down");
                })
            })
        }
    }
    frist();
    var info=document.querySelectorAll(".second div");
    for(var i=0;i<info.length-2;i++){
        if(i%2==0){
            secondleft(info[i+1],info[i]);
        }
    }
    var contactList=document.querySelectorAll(".contact-words ul li");
    contactList[2].style.left=contactList[0].offsetWidth+screenWidth/5+"px";

}
function frist(){
    var lis=document.querySelectorAll(".frist>ul>li");
    var ulWidth=document.querySelector(".frist>ul").offsetWidth;
    lis[0].style.transform="translateY("+ulWidth*Math.sqrt(3)/6+"px) translateX("+ulWidth+"px) rotateZ(180deg)";
    lis[1].style.transform="translateY("+ulWidth*Math.sqrt(3)/6+"px)  rotateZ(-60deg)";
    lis[2].style.transform="translateY("+-ulWidth*Math.sqrt(3)/3+"px) rotateZ(60deg)";
    lis[3].style.transform="translateY("+-ulWidth*Math.sqrt(3)/6+"px) translateX("+ulWidth/2+"px) rotateZ(120deg)";
    lis[4].style.transform="translateY("+ulWidth*Math.sqrt(3)/3+"px) rotateZ(-120deg)";
    lis[5].style.transform="translateY("+-ulWidth*Math.sqrt(3)/6+"px) translateX("+-ulWidth/2+"px)" ;
}
//求角度
function angle(start, end) {
    var diff_x = end.x - start.x,
        diff_y = end.y - start.y;
    //返回角度,不是弧度
    return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
}
//求线长
function length(start, end) {
    var diff_x = end.x - start.x,
        diff_y = end.y - start.y;
    return Math.sqrt(diff_x * diff_x + diff_y * diff_y);
}
//轮播图
function turn() {
    var bg = document.querySelectorAll(".bg");
    //var bgSpans=document.querySelectorAll("span");
    var carouselWidth = bg[0].offsetWidth;
    var carouselHeight = document.querySelector(".bg-carousel").offsetHeight;
    for (var i = 0; i < bg.length; i++) {
        bg[i].style.top = i / 10 * carouselHeight;
        bg[i].children[0].style.transform = "translateZ(" + (carouselWidth
            * 0.866) + "px)";
        bg[i].children[3].style.transform = "translateZ(" + (-carouselWidth * 0.866) + "px) rotateY(180deg)";
        for (var j = 0; j < 6; j++) {
            bg[i].children[j].style.backgroundPositionY = -i / 10 * carouselHeight + "px";
            bg[i].children[j].style.backgroundSize = carouselWidth + "px " + carouselHeight + "px";
        }
    }
    var index = 0;
    var carousel = document.querySelector(".bg-carousel");
    var startx = 0;
    var endx = 0;
    var distancex = 0;
    var starty = 0;
    var endy = 0;
    var index1 = 0;
    var distancey = 0;
    var flag = true;
    var turnNav = document.querySelectorAll(".turn-nav li");
    carousel.addEventListener("touchstart", function (e) {
        startx = e.targetTouches[0].clientX;
        starty = e.targetTouches[0].clientY;
    })
    carousel.addEventListener("touchend", function (e) {
        endx = e.changedTouches[0].clientX;
        endy = e.changedTouches[0].clientY;
        distancex = endx - startx;
        distancey = endy - starty;
        if (Math.abs(distancex) - Math.abs(distancey) > 0 && flag == true) {
            if (distancex > 0) {
                index--;
                //if (index < 0) {
                //    var a = Math.abs(Math.floor(index / 6));
                //    console.log(a);
                //    index1 = Math.abs(index + 6 * a) % 6;
                //} else {
                //    index1 = index % 6;
                //}
            }
            if (distancex < 0) {
                index++;
            }
            if(index<0){
                var a = Math.abs(Math.floor(index / 6));
                //console.log(a);
                index1 = Math.abs(index + 6 * a) % 6;
            }else {
                index1 = index % 6;
            }
            //console.log(index1);
            flag = false
            rotateY();
            document.querySelector(".light").classList.remove("light");
            turnNav[index1].classList.add("light");
        }
        startx = 0;
        endx = 0;
        distancex = 0;
        starty = 0;
        endy = 0;
        distancey = 0;
    })
    function rotateY() {
        for (var i = 0; i < bg.length; i++) {
            bg[i].style.transitionDelay = 0.1 * i + "s";
            if (i % 2 == 0) {
                bg[i].style.transform = "rotateY(" + (-index * 60) + "deg)";
            } else {
                bg[i].style.transform = "rotateY(" + (index * 60) + "deg)";
            }
        }
    }
    carousel.addEventListener("animationend", function () {
        if (document.querySelector(".light")) {
            document.querySelector(".light").classList.remove("light");
        }
        turnNav[index1].classList.add("light");
    })

    bg[9].addEventListener("transitionend", function () {
        flag = true;
    })
}
//二屏left
function secondleft(target,element){
    var left=element.offsetLeft+element.offsetWidth;
    target.style.left=left+"px";
}
//生成多个span
function spans(){
    var picW=document.querySelector(".c_pic").offsetWidth;
    var picH=document.querySelector(".c_pic").offsetHeight;
    var str="";
    for(var i=0;i<25;i++){
        str+="<span class='ewm' style='width:"+picW/5+"px ; height:"+picH/5+"px ; position: absolute; top: "+Math.floor(i/5)*picH/5+"px;" +
            "left: "+(i%5)*picW/5+"px;background: url(images/ewm1.jpg) no-repeat "+-(i%5)*picW/5+"px "+-Math.floor(i/5)*picH/5+"px;background-size:"+picW+"px "+picH+"px;'></span>"
    }
    document.querySelector(".c_bg").innerHTML=str;
    var spanObjs=document.querySelectorAll(".ewm");
    for(var i=0;i<spanObjs.length;i++){
        spanObjs[i].style.animation="spanPic 1s linear "+(0.1*i+5.5)+"s forwards";
    }
}