const pageToken = process.env.reactor_console_token;
if (!pageToken) {
    console.log("no client restrictions - missing console token!!!");
    console.log("no client restrictions - missing console token!!!");
    console.log("no client restrictions - missing console token!!!");
    console.log("no client restrictions - missing console token!!!");
    console.log("no client restrictions - missing console token!!!");
}

function isTokenValid(token) {
    return !pageToken || token === pageToken;
}

let io = undefined

export function config(socketIO) {
    io = socketIO
    io.on('connection', socket => {
        sendEventWrapper(createWrapper());
        socket.on('command', commandWrapper => {
            if (isTokenValid(commandWrapper.token)) {
                forceDispatchCommand("panel", commandWrapper.command);
            }
        });
    });
}

function getChannelName(target) {
    if (!target) return;
    return target.substring(1);
}

function isMessageHighLighted(context) {
    return context["msg-id"] === "highlighted-message";
}

function getEvent(target, context, msg) {
    if (!context) return;
    let highlight = isMessageHighLighted(context);
    let bitAmount = parseInt(context.bits) || 0;
    let founder = false;
    let vip = false;
    if (context.badges) {
        founder = !!context.badges["founder"];
        vip = !!context.badges["vip"];
    }
    return {
        "user-id": context["user-id"],
        channelName: getChannelName(target),
        sender: context["display-name"],
        bits: bitAmount,
        tags: {
            founder: founder,
            vip: vip,
            mod: context.mod,
            subscriber: context.subscriber,
            highlight: highlight
        },
        message: msg,
        color: context.color
    };
}

function createWrapper(message) {
    return {
        message: message,
    };
}

function sendEventWrapper(messageWrapper) {
    io.sockets.emit('chat', JSON.stringify(messageWrapper));
}

function sendSingleEvent(event, value) {
    io.sockets.emit(event, value);
}

function handleColorEvent(color) {
    if (color === "r") {
        sendSingleEvent("color", "");
        return;
    }
    if (color) {
        sendSingleEvent("color", color);
    }
}

function handleSuperText(text) {
    if (text === "r") {
        sendSingleEvent("supertext", "");
        return;
    }
    if (text) {
        sendSingleEvent("supertext", text);
    }
}

function handleDisco() {
    sendSingleEvent("disco", "");
}

function handleClearPage() {
    sendSingleEvent("clear", "");
}

function handleReloadPage() {
    sendSingleEvent("reload", "");
}

const changeEnabledUsers = ["stubfx"];

function handleSuperTextColor(data) {
    if (data) {
        sendSingleEvent("sprcolor", data);
    }
}

function isUserCommandEnabled(sender) {
    return changeEnabledUsers.includes(sender.toLowerCase());
}

function showLine(value) {
    sendSingleEvent("line", value);
}

function authenticatedDispatchCommand(sender, command) {
    if (!isUserCommandEnabled(sender)) return;
    dispatchCommand(sender, command);
}

function forceDispatchCommand(sender, command) {
    dispatchCommand(sender, command);
}

function showWebpage(data) {
    sendSingleEvent("webpage", data);
}

function showAudioWebpage(data) {
    sendSingleEvent("audio-webpage", data);
}

// command = {name, value}
function dispatchCommand(sender, command) {
    let value = command.value;
    console.log(`${sender} used --> ${command.name},${command.value}`);
    switch (command.name) {
        case "disco":
            handleDisco();
            break;
        case "color":
            handleColorEvent(value);
            break;
        case "text":
            handleSuperText(value);
            break;
        case "text_color":
            handleSuperTextColor(value);
            break;
        case "line":
            showLine(value);
            break;
        case "webpage":
            showWebpage(value);
            break;
        case "audio-webpage":
            showAudioWebpage(value);
            break;
        case "clear":
            handleClearPage();
            break;
        case "reload":
            handleReloadPage();
            break;
        default:
            console.log(`unknown command ${command.name}`);
    }
}

export function cheerHandler(target, context) {
    messageHandler(target, context);
}

export function messageHandler(target, context, msg, self) {
    if (self) return; // Ignore messages from the bot
    if (!msg) return;
    let event = getEvent(target, context, msg);
    sendEventWrapper(createWrapper(event));
}