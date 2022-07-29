var mstatus = "";
var objects = []; 
var inputobject = "";


function setup() {
  canvas=createCanvas(430,380);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(430,380);
  video.hide();
}

function start() {
  inputobject=document.getElementById('input').value;
  console.log(inputobject);
  document.getElementById('found').innerHTML="Finding " + inputobject;
  objectDetector=ml5.objectDetector('cocossd',modelLoaded);
  document.getElementById('status').innerHTML="Status: Detecting objects";
}

function modelLoaded() {
  console.log('model loaded');
  mstatus=true;
}

function gotResult(error, results) {
if (error) {
console.log(error);
}
console.log(results);
objects=results;
}

function draw() {
  image(video,0,0,430,380);
if (mstatus != "") {
  objectDetector.detect(video, gotResult);
for (i=0; i<objects.length; i++) {
document.getElementById('status').innerHTML="Status: Detected objects";
if (objects[i].label == inputobject){
  document.getElementById('found').innerHTML=inputobject + " found";
  synth = window.speechSynthesis;
  utterthis = new SpeechSynthesisUtterance(inputobject + " is found");
  synth.speak(utterthis);
}

else {
  document.getElementById('found').innerHTML=inputobject + " not found";
  synth = window.speechSynthesis;
  utterthis = new SpeechSynthesisUtterance(inputobject + " is not found");
  synth.speak(utterthis);
}
fill('red');
percent=floor(objects[i].confidence*100);
text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 20);
noFill();
stroke('red');
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
}
}
}