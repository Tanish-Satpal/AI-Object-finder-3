video="";
objectDetector="";
Status="";
alarm="";
objects="";
x="";
y="";
object_name="";

function Start(){
    object_name=document.getElementById("object_input").value;
    console.log(object_name);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";     
}
function preload(){
    video=createCapture(VIDEO);
    video.hide();
}
function setup(){
    canvas = createCanvas(480,280);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    canvas.center();   
}

function draw(){    
    image(video,0,0,480,380);
    if(Status!=""){
        objectDetector.detect(video,gotResult);
        for (i=0; i< objects.length; i++){
            console.log(x+y+width+height);
            console.log(objects[i].label);
            console.log(objects[i].confidence);
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            x=objects[i].x;
            y=objects[i].y;

            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == object_name){
                document.getElementById("status").innerHTML = "Status : Object Detected";
            video.stop();
        }
    }
}
}


function modelLoaded(){
    console.log("Model LOADED");
    Status=true;
    
}

function gotResult(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
    
}
