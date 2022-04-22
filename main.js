gesture_1 = "";
gesture_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id= "captured_img" src="' + data_uri + '"/>';
    });
}

console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JwAGDkPac/model.json', modelLoaded);

function modelLoaded() {
    console.log('model Loaded!');
}

function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotresults);
}

function gotresults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        gesture = results[0].label;
        tospeak = "";
        if (gesture == "best") {
            tospeak = "all the best";
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        } else if (gesture == "amazing") {
            tospeak = "this looks amazing";
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        } else if (gesture == "victory") {
            tospeak = "wonderful victory";
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
        speak()
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data = tospeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}