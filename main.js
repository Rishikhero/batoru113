status = "";
objects = [];

function preload(){
    
}

function setup(){
    canvas = createCanvas(480, 280);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}
function start(){
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "STATUS : DETECTING OBJECTS";
object_name = document.getElementById("input").value;
}

function modelLoaded(){
    console.log(" MODEL LOADED!");
    status = true;
   
}

function draw()
{
    image(video, 0, 0, 480, 280);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "STATUS : OBJECTS DETECTED";
           

            fill("#008000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#008000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
    


if(objects[i].label == object_name){
    video.stop();
    objectDetector.detect(gotResult);
    document.getElementById("found_not").innerHTML = object_name + "FOUND";
    synth = window.speechSynthesis;
    utterThis = new SpeechSynthesisUtterance(object_name + "found");
    synth.speak(utterThis);
}
else{
    document.getElementById("found_not").innerHTML = object_name + " NOT FOUND";
}
    }
}
}


function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}