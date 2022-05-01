import axios from "axios";

const time_to_change_back_lights = 10 * 1000// timeout to bring the lights to the original colors.
const special_command_timeout = 120 * 1000 // 120 secs = 2 minutes.
let ifttt_color_change_allowed = true
let last_special_command = Date.now()
let iSChangeEnabled = false
const IFTTT_URLS = {
    private_key: process.env.ifttt_key,
    hue_color: "https://maker.ifttt.com/trigger/hue_color/with/key/",
    blink: "https://maker.ifttt.com/trigger/blink/with/key/",
    toggleHUE_bedroom: "https://maker.ifttt.com/trigger/toggleHUE_bedroom/with/key/"
}

const def_colors = [
    {
        left: 'red',
        right: 'blue'
    },
    // nuclear baguette
    {
        left: 'red',
        right: 'white'
    },
    // bibipino
    {
        left: 'aqua',
        right: 'lime'
    },
    // pastelladigranchio
    {
        left: '#293133',
        right: '#4b0082'
    },
    // alezm
    {
        left: '#8e44ad',
        right: '#8e44ad'
    }
]

function getRandomDefColor() {
    return def_colors[Math.floor(Math.random() * def_colors.length)];
}

function _ifTTT_ColorWebhook(right, left, backToNormal) {
    if (!ifttt_color_change_allowed) {
        // this means that we are waiting for the previous color cycle to end.
        console.log("cannot call IFTTT, color command to fast.")
        return
    }
    // yes, prevent the other to change it in this moment
    ifttt_color_change_allowed = false

    // this function MUST remain private
    // because it doesn't handle the timeout.
    function httpCall(right, left) {
        let data = {
            // value 1 is currently ignored cause the right light is used as custom rim light.
            // "value1": right,//right light
            "value2": left ? left : right//left light
        }
        axios.post(IFTTT_URLS.hue_color + IFTTT_URLS.private_key, data)
            .then((res) => {
                console.log(`IFTTT Status: ${res.status}`)
                // do we need to show the body? naaaah.
                //console.log('Body: ', res.data);
            }).catch((err) => {
            console.error(err)
        });
    }

// after this timeout bring everything back to normal
    setTimeout(function () {
        // if backToNormal is enable then change the color back to normal (what a genius.)
        if (backToNormal) {
            console.log("changing colors back to random normal.")
            let color = getRandomDefColor()
            httpCall(color.right, color.left)
        }
        ifttt_color_change_allowed = true
    }, time_to_change_back_lights)

    // anyway is time to make this call.
    // event going to be fired to IFTTT webhook
    httpCall(right, left)
}

/**
 * if color by name doesn't work on hue lights (for some reason)
 * translate it in hex color
 * @param color
 * @returns {string|undefined|*}
 */
function fixColor(color) {
    if (!color) {
        return '#ff0000';
    }
    switch (color) {
        // pink wont work for some reason?
        case 'pink':
            return '#ff00c9';
        default:
            return color;
    }
}

function _enableColor(enable) {
    iSChangeEnabled = enable
    if (iSChangeEnabled) {
        _ifTTT_ColorWebhook("green", "green", false);
    } else {
        let color = getRandomDefColor()
        _ifTTT_ColorWebhook(color.right, color.left, false);
    }
}

/**
 * change the lights color.
 * @param right - right light color (hex accepted)
 * @param left - left light color (hex accepted)
 */
function _colorChange(right, left) {
    // some colors are not working for some reason
    // need to fix before sending it to the lights
    let right_color = fixColor(right)
    let left_color = fixColor(left)
    // _ifTTT_ColorWebhook(right_color, left_color, true);
    _ifTTT_ColorWebhook(right_color, left_color, false);
}

function _blinkCommand() {
    let time = Date.now()
    if (time - last_special_command > special_command_timeout) {
        console.log("activating blink command")
        // we can actually activate the special command
        last_special_command = time
        axios.post(IFTTT_URLS.blink + IFTTT_URLS.private_key)
            .then((res) => {
                console.log(`IFTTT Status: ${res.status}`)
                // do we need to show the body? naaaah.
                //console.log('Body: ', res.data);
            }).catch((err) => {
            console.error(err)
        });
    } else {
        console.log("special command too fast.")
    }

}

export function commandChecker (username, msg) {
    if (!iSChangeEnabled) return // save performance.
    let reg, res
    reg = /^!colou?r (?<value1>[\w#]*)( (?<value2>[\w#]*))?/// !color arg1 arg2
    res = msg.match(reg)
    if (res && res.groups) {
        console.log("color command recognized")
        // value 2 may be null, cause the user may be using "!color blue"
        let right = res.groups.value1
        let left = res.groups.value2
        if (!left) {
            // if left is null, just copy right.
            left = right
        }
        _colorChange(right, left)
        return true
    }
    reg = /^!flashbang$/// !color arg1 arg2
    res = msg.match(reg)
    if (res) {
        console.log("flashbang command recognized")
        _colorChange("white", "white")
        return true
    }
    reg = /^!blink$/// !color arg1 arg2
    res = msg.match(reg)
    if (res) {
        console.log("blink command recognized")
        _blinkCommand()
        return true
    }
}

export function toggleHUE_bedroom () {
    axios.post(IFTTT_URLS.toggleHUE_bedroom + IFTTT_URLS.private_key)
        .then(() => {
            // congratulations, we just toggled the lights!
            console.log('toggle lights confirmed from IFTTT')
        }).catch((err) => {
        console.error(err)
    });
}

export function enableColor (enable) {
    if (typeof enable !== "boolean") {
        console.error('enable value must be boolean.')
        return
    }
    console.log("Color change is : " + iSChangeEnabled)
    _enableColor(enable)
}