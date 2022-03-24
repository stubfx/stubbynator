

let pickedColor = "#000000";
$('#color-picker').spectrum({
    type: "flat",
    preferredFormat: "hex",
    showAlpha: false,
    allowEmpty: false,
    showButtons: false,
    containerClassName: 'colorPicker',
    move: x => pickedColor = x.toHexString()
});
$('#text-color-picker').spectrum({
    type: "color",
    showAlpha: false,
    allowEmpty: false,
    containerClassName: 'colorPicker',
    change: x => sendCommand("text_color", `${x.toHexString()}`)
});
const socket = io();
const urlParams = new URLSearchParams(window.location.search);

function sendCommand(name, command = "") {
    console.log(`sending ${command}`);
    let token = urlParams.get("token");
    if (!token) {
        console.log("missing token");
    }
    socket.emit("command", {token: token, command: {name : name, value: command}});
}