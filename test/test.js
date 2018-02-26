import Mocha from 'mocha';
import { expect } from 'chai';
import { Paper, Pencil } from '../src/index';

describe("Canary test", () => {
    it("True equals true", () => {
        expect(true).to.equal(true);
    });
});

describe("Pencil durability", () => {

    describe("Write function", () => {
        let paper;
        let pencil;

        beforeEach(() => {
            paper = new Paper();
            pencil = new Pencil(paper, 100);
        });

        it("Write returns a string", () => {
            pencil.write("She sells sea shells");

            expect(paper.getText()).to.equal("She sells sea shells");
        });
        it("Write appends text", () => {
            pencil.write("She sells sea shells");
            pencil.write(" down by the sea shore");

            expect(paper.getText()).to.equal("She sells sea shells down by the sea shore");
        });
    });

    describe("Point degradation", () => {
        let paper;
        let pencil;

        beforeEach(() => {
            paper = new Paper();
            pencil = new Pencil(paper, 5);
        });

        it("Lowercase letter degrades durability by 1", () => {
            pencil.write("u");

            expect(pencil.getDurability()).to.equal(4);
        });
        it("Uppercase letter degrades durability by 2", () => {
            pencil.write("U");

            expect(pencil.getDurability()).to.equal(3);
        });
        it("Spaces & new lines don't reduce durability", () => {
            pencil.write(" ");
            pencil.write("\n");

            expect(pencil.getDurability()).to.equal(5);
        });
        it("Return spaces when 0 durability", () => {
            pencil.write("TExt");

            expect(paper.getText()).to.equal("TEx ");
        });
    });

    describe("Sharpen function", () => {
        let paper;
        let pencil;

        beforeEach(() => {
            paper = new Paper();
            pencil = new Pencil(paper, 5, 5);
        });

        it("Sharpening reduces pencil length", () => {
            pencil.write("Text");
            pencil.sharpen();

            expect(pencil.getLength()).to.equal(4);
        });
        it("Sharpening restores durability", () => {
            pencil.write("Text");
            pencil.sharpen();

            expect(pencil.getDurability()).to.equal(5);
        });
        it("Sharpening when length is 0 doesn't restore durability", () => {
            pencil.write("Text");
            pencil.sharpen();
            pencil.write("Text");
            pencil.sharpen();
            pencil.write("Text");
            pencil.sharpen();
            pencil.write("Text");
            pencil.sharpen();
            pencil.write("Text");
            pencil.sharpen();
            pencil.write("Text");
            pencil.sharpen();

            expect(pencil.getDurability()).to.equal(0);
        });
    });
    describe("Eraser function", () => {
        let paper;
        let pencil;

        beforeEach(() => {
            paper = new Paper();
            pencil = new Pencil(paper, 100, 5);
        });

        it("Erase a single instance", () => {
            pencil.write("How much wood could a woodchuck");
            pencil.erase("woodchuck");

            expect(paper.getText()).to.equal("How much wood could a          ");
        });
        it("Erase most recent instance", () => {
            pencil.write("How much wood could a woodchuck chuck if a woodchuck could chuck wood");
            pencil.erase("woodchuck");

            expect(paper.getText()).to.equal("How much wood could a woodchuck chuck if a           could chuck wood");
        });
    });
    describe("Eraser degradation", () => {
        let paper;
        let pencil;

        beforeEach(() => {
            paper = new Paper();
            pencil = new Pencil(paper, 100, 5, 5);

        });
        it("Erase function degrades eraser duarbility", () => {
            pencil.write("text");
            pencil.erase("text");

            expect(pencil.getEraserDurability()).to.equal(1);
        });
        it("Eraser durability can't be negative", () => {
            pencil.write("booths");
            pencil.erase("booths");

            expect(pencil.getEraserDurability()).to.equal(0);
        });
        it("Returns letter when eraserDurabilty reaches 0", () => {
            pencil.write("booths");
            pencil.erase("booths");

            expect(paper.getText()).to.equal("b     ");
        });
    });
    describe("Edit function", () => {
        let paper;
        let pencil;

        beforeEach(() => {
            paper = new Paper();
            pencil = new Pencil(paper, 40, 5, 10);
        })
        it("Edit a word", () => {
            pencil.write("Bill");
            pencil.erase("Bill");
            pencil.edit("Mark");

            expect(paper.getText()).to.equal("Mark");
        });
        it("Edit word in middle of sentence", () => {
            pencil.write("An apple a day keeps the doctor away");
            pencil.erase("apple");
            pencil.edit("onion");

            expect(paper.getText()).to.equal("An onion a day keeps the doctor away");
        });
        it("Return @ when letters clash", () => {
            pencil.write("An apple a day keeps the doctor away");
            pencil.erase("apple");
            pencil.edit("artichoke");

            expect(paper.getText()).to.equal("An artich@k@ay keeps the doctor away");
        })
    });
});