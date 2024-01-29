
let wWidth = window.innerWidth;
console.log("window width:" + wWidth);
if (wWidth < 1200) {
    let bs = document.getElementById("beat-saber");
    bs.hidden = true;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// console.log("ODNF");

// let Btop = Math.round(randomInt(0,2)/3 * 1000) / 10;
// let Bleft = randomInt(0,3)/4*100
// Btop += "%"
// Bleft += "%"
// document.getElementById("hitB").style.top = Btop;                   
// document.getElementById("hitB").style.left = Bleft;

// let Rtop = Math.round(randomInt(-1,1)/3 * 1000) / 10;
// let Rleft = randomInt(0,3)/4*100
// Rtop += "%"
// Rleft += "%"
// document.getElementById("hitR").style.top = Rtop;                   
// document.getElementById("hitR").style.left = Rleft;

async function blueNote() {

    const blueNote = document.createElement("div");
    blueNote.id = "noteB";
    blueNote.style = `transform: translate(${randomInt(0,3)}00%, ${randomInt(0,2)}00%);`
    blueNote.onclick = blueGone;
    document.getElementById('beat-saber').appendChild(blueNote);

    await new Promise(resolve => setTimeout(resolve, 2000));

    blueNote.remove();

}

async function redNote() {

    const redNote = document.createElement("div");
    redNote.id = "noteR";
    redNote.style = `transform: translate(${randomInt(0,3)}00%, ${randomInt(0,2)}00%);`
    redNote.onclick = redGone;
    document.getElementById('beat-saber').appendChild(redNote);

    await new Promise(resolve => setTimeout(resolve, 2000));

    redNote.remove();

}

async function noteLoop () {
    blueNote();
    await new Promise(resolve => setTimeout(resolve, 1000));
    redNote();
}

setInterval(noteLoop, 2000);

async function blueGone() {
    noteCLick("noteB");
}
async function redGone() {
    noteCLick("noteR");
}
async function noteCLick(id) {
    let note = document.getElementById(id);
    note.animate([
        { opacity: 1, margin: '0px' },
        { opacity: 0, margin: '-150px' }
    ], {
        duration: 150,
        iterations: 1
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    note.remove();
}