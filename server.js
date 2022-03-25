import * as twitchBot from "./twitchbot.js";
import * as discordBot from "./discordbot.js";
import * as hueLights from "./huelights.js";
import express from "express";
import {createServer} from "http";
import { Server } from "socket.io";
import {config, cheerHandler, messageHandler} from "./chatreactor.js";

const dirname = process.cwd();

const app = express();
const httpServer = createServer(app);
const options = { /* ... */};
// noinspection JSValidateTypes
const io = new Server(httpServer, options);
io.on("connection", socket => {
    // logs? maybe, not today tho.
    console.log("connected.")
});
config(io)
// WARNING !!! app.listen(3000); will not work here, as it creates a new HTTP server
httpServer.listen(3000);
app.use(express.static("public"));
app.get('/reactorconsole', (request, response) => {
    // this line is for the socket? don't remember
    response.setHeader("Access-Control-Allow-Origin", "*");
    if (request.query.token !== process.env.reactor_console_token) {
        response.send("access denied");
        return;
    }
    response.sendFile(dirname + "/console/reactor.html");
});
app.get('/feedSnake', (req, res) => {
    if (!isTokenValid(req.query.token)) {
        res.send('REQUEST DENIED.')
        return
    }
    feedSnake()
    res.sendStatus(200)
})

app.get('/toggleHUE_bedroom', (req, res) => {
    if (!isTokenValid(req.query.token)) {
        res.send('REQUEST DENIED.')
        return
    }
    hueLights.toggleHUE_bedroom()
    res.sendStatus(200)
})

app.get('/enableColor', (req, res) => {
    if (!isTokenValid(req.query.token)) {
        res.send('REQUEST DENIED.')
        return
    }
    if(req.query.enable !== undefined) {
        hueLights.enableColor(req.query.enable === 'true')// we need a boolean.
        res.send('Color change is now : ' + (req.query.enable === 'true'))
        return
    }
    res.send('missing enable param')
})
app.get('/projecthorizon', (req, res) => {
    res.redirect('/projecthorizon.html')
})

twitchBot.onChatMessage((target, context, msg, self) => {
    // check if the bot wrote the message
    if (self) {
        // in this case, do nothing.
        return
    }
    discordBot.sendTwitchMessage(target, context.username, msg)
    commandChecker(context.username, msg)
    messageHandler(target, context, msg, self)
    cheerHandler(target, context, msg, self)
})

function isTokenValid(token) {
    return token === process.env.query_token
}

function feedSnake() {
    io.emit('random_feed');
}

function feedSnakeAt(x, y) {
    io.emit('feed', x, y);
}

/**
 * this function checks and dispatches commands, this function doesn't prevent spam,
 * it should be checked in the specific module.
 * @param username - message sender's username.
 * @param msg - the message to analyze.
 * @returns true if a command has been found and the event has been fired to the specific module, false otherwise.
 */
function commandChecker(username, msg) {
    hueLights.commandChecker(username, msg)
    let reg, res
    reg = /^!feed$/// !feed, emits a random feed event
    res = msg.match(reg)
    if (res) {
        feedSnake()
        return true
    }
    reg = /^!feed (?<x>[\d]+)( (?<y>[\d]+))/// !feed x y, emits a feed event
    res = msg.match(reg)
    if (res && res.groups) {
        feedSnakeAt(res.groups.x, res.groups.y)
        return true
    }
    reg = /^!move (?<x>-?[\d]+)/// !move 50   ^!move (l|L|r|R)
    res = msg.match(reg)
    if (res && res.groups) {
        moveSpacecraft(res.groups.x)
        return true
    }
    reg = /^(?<x>[rRlL])$/// matches one of the letters in the brackets.
    res = msg.match(reg)
    if (res) {
        moveSpacecraftWithDirection(res.groups.x)
        return true
    }
    reg = /^!magicc$/// !magicc, emits a reload event
    res = msg.match(reg)
    if (res) {
        reload(username)
        return true
    }
    return false
}

function moveSpacecraftWithDirection(x) {
    switch (x){
        case 'l':
            moveSpacecraft(-100)
            break
        case 'L':
            moveSpacecraft(-150)
            break
        case 'r':
            moveSpacecraft(100)
            break
        case 'R':
            moveSpacecraft(150)
            break
    }
}

function moveSpacecraft(x){
    io.emit('move_spacecraft', x)
}

function reload(username) {
    // WARNING. NEVER CHANGE THIS LINE, NEVER.
    // (unless you are me, so you already know you are gonna destroy everything.)
    if (username === "stubfx" || username === "tschnaz") {
        io.emit('reload');
    }
}


