export default class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".minutes"),
            seconds: root.querySelector(".seconds"),
            pause: root.querySelector(".pause"),
            reset: root.querySelector(".reset"),
            m: root.querySelector(".m"),
            s: root.querySelector(".s"),
            add: root.querySelector(".add"),
            adder: root.querySelector(".adder")
        };

        this.interval = null;
        this.remaining = 0;
        this.delay = 1000;

        this.updateButtons();

        this.el.pause.addEventListener("click", () => {
            if (this.interval == null) {
                this.start(this.delay);
            } else {
                this.stop();
            }
        });
        this.el.reset.addEventListener("click", () => {
            let inputMin = parseInt(this.el.m.value);
            let inputSec = parseInt(this.el.s.value);
            let inputAdd = parseInt(this.el.add.value);

            if(!inputMin){inputMin=0};
            if(!inputSec){inputSec=0};
            if(!inputAdd){inputAdd=0};
            
            if (inputMin <= 99 && inputSec <= 59) {
                this.stop();
                this.remaining = inputMin * 60 + inputSec;
                this.delay = ((this.remaining + parseInt(inputAdd)) / this.remaining) * 1000;
                this.updateTimer();
            }
        });
    }

    updateTimer() {
        const minutes = Math.floor(this.remaining/60);
        const seconds = this.remaining % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateButtons() {
        if (this.interval === null) { // pause
            this.el.pause.innerHTML = 'Start';
            this.el.pause.classList.add("start");
            this.el.pause.classList.remove("stop");
            this.el.pause.classList.add("btn-success");
            this.el.pause.classList.remove("btn-warning");
            this.el.adder.style.cssText = 'transform:translateY(0in);';
        } else { // start
            this.el.pause.innerHTML = 'Pause';
            this.el.pause.classList.add("stop");
            this.el.pause.classList.remove("start");
            this.el.pause.classList.add("btn-warning");
            this.el.pause.classList.remove("btn-success");
            this.el.adder.style.cssText = 'transform:translateY(6969in);';
        }
    }

    start(ms) {
        if (this.remaining == 0) return;

        this.interval = setInterval(() => {
            this.remaining--;
            this.updateTimer();

            if (this.remaining == 0) {
                this.stop();
            }
        }, ms);

        this.updateButtons();
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.updateButtons();
    }

    static getHTML() {
        return `
            <h1 class="pop the-timer text-center" style="font-size:18vw;" id="time">
                <span class="timer minutes">00</span><span class="timer">:</span><span class="timer seconds">00</span>
            </h1>
            <span>
                <button class="btn btn-lg btn-success pause start fs-1 me-2" type="button" style="height:100px; width:150px;">Start</button>
                <button class="btn btn-lg btn-primary reset fs-1" type="button" style="height:100px; width:150px;">Apply</button>
            </span>

            <div class="fs-1 row g-2 justify-content-center w-100 mt-3">
                <div class="col-1" style="height:fit-content; width:100px">
                  <input type="text" class="form-control h-100 fs-1 text-center m" placeholder="m" aria-label="m">
                </div>
                <div class="col-auto fs-1 pt-2" style="height:fit-content;">:</div>
                <div class="col-1" style="height:fit-content; width:100px">
                  <input type="text" class="form-control h-100 fs-1 text-center s" placeholder="s" aria-label="s">
                </div>
            </div>
            <div class="fs-1 row g-2 justify-content-center w-100 mt-1 adder" style="transform:translateY(0in);">
                <div class="col-1" style="height:fit-content; width:81px">
                </div>
                <div class="col-auto fs-1 pt-2" style="height:fit-content;">+</div>
                <div class="col-1" style="height:fit-content; width:100px">
                  <input type="text" class="form-control h-100 fs-1 text-center add" placeholder="s" aria-label="add">
                </div>
            </div>
        `;
    }
}

new Timer(
    document.querySelector(".the-timer")
);