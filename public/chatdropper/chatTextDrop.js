class ChatTextDrop {

    constructor(messageWrapper, x, y) {
        this.channel = messageWrapper.message.channelName;
        this.sender = messageWrapper.message.sender;
        this.tags = messageWrapper.message.tags;
        this.message = messageWrapper.message.message;
        this.subscriber = messageWrapper.message.subscriber;
        this.highlight = messageWrapper.message.highlight;
        this.color = messageWrapper.color;
        this.isdead = false;
        this.pos = createVector(x, y);
        this.labelsTextSize = 15;
        this.textsize = 35;
        this.messageSeparator = " : ";
        this.mod = this.tags.mod;
        this.textColor = this.color || this.getRandomColor();
        this.textSpeed = this.tags.highlight ? 1 : 3;
        this.subscriber = this.tags.subscriber;
        this.founder = this.tags.founder;
        this.vip = this.tags.vip;
    }

    update() {
        this.pos.add(0, this.textSpeed);
        if (this.pos.y >= h*1.5 + this.textsize) {
            this.isdead = true;
        }
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    draw() {
        noStroke();
        fill(this.textColor);
        let displayName = this.sender;
        const displayNameLenght = textWidth(displayName);
        textSize(this.labelsTextSize);
        text(this.channel, this.pos.x, this.pos.y);
        textSize(this.textsize);
        text(displayName, this.pos.x, this.pos.y + this.textsize);
        let info = this.mod ? "mod " : "";
        if (this.tags) {
            info += this.subscriber ? "sub " : this.founder ? "founder " : "";
        }
        info += this.vip ? "vip " : "";
        textSize(this.labelsTextSize);
        text(info, this.pos.x + displayNameLenght - textWidth(info), this.pos.y + this.textsize + this.labelsTextSize * 1.5);
        textSize(this.textsize);
        fill(255);
        text(this.messageSeparator + this.message, this.pos.x + displayNameLenght, this.pos.y + this.textsize);
    }

}