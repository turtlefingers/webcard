// 전역변수 Global
let faceType = 1;
let faceX = 200;
let faceY = 150;
let faceScale = 0.5;

// 눈 변수
let snow1;
let snow2;
let snow1Y = 0;
let snow2Y = 0;

function preload(){
  snow1 = loadImage("snow1.png");
  snow2 = loadImage("snow2.png");
}

// 프로젝트가 처음 실행될때 1번 호출되는 함수
function setup() {
  createCanvas(400, 600);
  getParam();
}

// 프로젝트가 실행되는동안 일정빈도로 계속 호출되는 함수
function draw() {
  background("green");

  // mouseX, mouseY
  noStroke();
  fill(235);
  ellipse(200,450,250,250);
  fill(245);
  ellipse(200,300,200,200);
  face(faceX,faceY,faceType);
  
  snow();
  
}

function snow(){
  snow1Y = (snow1Y + 0.5)%height;

  image(snow1,0,snow1Y-height,400,600);
  image(snow1,0,snow1Y,400,600);
  
  snow2Y = (snow2Y + 1)%height;
  image(snow2,0,snow2Y-height,400,600);
  image(snow2,0,snow2Y,400,600);
}

// 마우스를 클릭했을때 호출되는 함수
function mouseClicked(){
  let d = dist(faceX,faceY,mouseX,mouseY);
  
  if(d < 150*faceScale){
    faceType = faceType + 1;
    if(faceType > 3){
       faceType = 1;
    }
    setParam();
  }
}

function setParam(){
  let url = new URL(location.href); // 주소가져오기
  url.searchParams.set("faceType",faceType); // 주소에 값넣기
  history.pushState({},null,url); // 주소창에 반영하기
}

function getParam(){
  let url = new URL(location.href);
  faceType = url.searchParams.get("faceType");
  if(faceType == null){
    faceType = 1;
  }
}

function face(x,y,type){
  let d = dist(x,y,mouseX,mouseY);
  
  push();
    translate(x,y);
    scale(faceScale);
    noStroke();
  
    // 조건문 - 소괄호의 조건에따라 중괄호가 실행된다
    // 소괄호의 조건이 참이면 실행된다
    // 참 true
    // 거짓 false
    // 비교연산자 > < == >= <=
    if(d < 150*faceScale){
       
       fill("pink");
    }
    else{
      
      fill("white");
      
    }
  
  
    ellipse(0,0,300,300);
  
    fill("#dddddd");
    ellipse(-60,0,100,100);
    ellipse(60,0,100,100);
  
    fill("gray");
    ellipse(-60,0,50,50);
    ellipse(60,0,50,50);
  
    // 코1
    if(type == 1){
      rectMode(CENTER);
      rect(0,60,20,60);
      ellipse(0,90,80,20);
    }
    
    // 코2
    if(type == 2){
       ellipse(0,60,50,20);
        noFill();
        stroke("gray");
        strokeWeight(10);
        arc(0,0,200,200,radians(60),radians(120));
     }
    
    // 코3
    if(type == 3){
      strokeWeight(5);
      push();
        translate(0,40);
        triangle(
          100,0,
          0,-20,
          0,20
        );
      pop();
      rectMode(CENTER);
      rect(0,90,100,10);
      noFill();
      stroke("gray");
      strokeWeight(5);
      arc(-50,90,30,30,radians(120),radians(270));
      arc(50,90,30,30,radians(-90),radians(60));
    }
  
    // 0 ~ 360
    // 0 ~ TWO_PI 호도법
    // radians(각도)
    
    // 눈썹
    stroke("grey");
    strokeWeight(20);
    line(-100,-70,-20,-90);
    line(100,-70,20,-90);
  
    // 왼쪽 귀
    rectMode(CENTER);
    noStroke();
    fill("white");
    rect(-60,-150,70,80,30,30,0,0);
    
    fill("gray");
    rect(-60,-140,50,60,30,30,0,0);
  
    // 오른쪽 귀
    fill("white");
    rect(60,-150,70,80,30,30,0,0);
    fill("gray");
    rect(60,-140,50,60,30,30,0,0);
  pop();
  
  // line(x,y,mouseX,mouseY);
  // text(d,mouseX,mouseY);
}