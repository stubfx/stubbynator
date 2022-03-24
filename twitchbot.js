import tmi from "tmi.js";
// Define configuration options
const opts = {
    identity: {
        username: process.env.username,
        password: process.env.twitch_token
    },
    channels: [
        "stubFX",
        "sypherludica",
        "sammykirito",
        "mrinvidioso",
        "pastelladigranchio",
        "waven87",
        "isofls",
        "zeb89",
        "onestonedguy",
        "marcomerrino",
        "matteohs",
        "gskianto",
        "homyatol",
        "patanux",
        "pow3rtv",
        "LCK_Korea",
        "summit1g",
        "lck",
        "flashpoint",
        "Sabaku_no_Sutoriimaa",
        "ilgattosultubo",
        "s1mpleyrqb",
        "weplayesport_ru",
        "therealknossi"
    ]
};

// Create a client with our options
const twitchClient = new tmi.client(opts);

// noinspection JSCheckFunctionSignatures
twitchClient.on('connected', (addr, port) => {
    // Called every time the bot connects to Twitch chat
    console.log(`* Connected to ${addr}:${port}`);
});

let onChatMessageCallback = function (target, context, msg, self) {
    // do nothing here, should be override.
}

export function onChatMessage (callback) {
    onChatMessageCallback = callback
}

twitchClient.on('message', (target, context, msg, self) => {
    // invoke the callback
    // console.log(context.username + " : " + msg)
    onChatMessageCallback(target, context, msg, self)
});

// Connect to Twitch:
twitchClient.connect();