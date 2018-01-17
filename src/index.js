export class Paper {
    constructor() {
        this.text = '';
    }

    addText(text) {
        this.text += text;
    }

    getText() {
        return this.text;
    }
}

export class Pencil {
    constructor(paper) {
        this.paper = paper;
        this.durability = 5;
    }

    write(text) {    
        this.paper.addText(text);
        for (let letter of text){
            this.durability -= 1;
        }
    }

    getDurability() {
        return this.durability;
    }
}