const socket = io();
socket.on('chat', function (text) {
    addDrop(JSON.parse(text));
});
socket.on('reload', function () {
    location.reload();
});