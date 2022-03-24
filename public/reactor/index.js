
const solidBlack = "solid_black";

const socket = io();

function getRandomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function changeColor(color) {
    let colorLayer = $("#colorLayer");
    if (color === solidBlack) {
        colorLayer.css("background-color", "black").css("opacity", "1");
        return;
    }
    colorLayer.css("background-color", color).css("opacity", "0.3");
}

let discoInterval = undefined;

function disableDisco() {
    if (discoInterval) {
        clearInterval(discoInterval);
        discoInterval = undefined;
        // then clear the color.
        changeColor("");
    }
}

function handleDisco() {
    if (!discoInterval) {
        discoInterval = setInterval(() => {
            changeColor(getRandomColor());
        }, 100);
    } else {
        clearInterval(discoInterval);
        discoInterval = undefined;
        // then clear the color.
        changeColor("");
    }
}

socket.on('color', function (color) {
    disableDisco();
    changeColor(color);
});

socket.on('disco', function (text) {
    handleDisco();
});
socket.on('supertext', function (text) {
    $("#textLayer").text(text);
});
socket.on('sprcolor', function (color) {
    $("#textLayer").css("color", color);
});
socket.on('reload', function () {
    location.reload();
});
socket.on('webpage', function (url) {
    $("#my-iframe").attr('src',url);
});
socket.on('audio-webpage', function (url) {
    var audio = new Audio(url);
    let promise = audio.play();
});
socket.on('clear', function () {
    $("#colorLayer").css("background-color", "");
    $("#textLayer").text("");
    $("#my-iframe").attr('src',"");
    disableDisco();
});