function pomodoro() {
  // Pomofocus
  const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    LongBreakInterval: 4,
    sessions: 0,
  };

  let interval;

  const modeButtons = document.querySelector("#js-mode-buttons");
  modeButtons.addEventListener("click", handleMode);

  function handleMode(event) {
    const {
      mode
    } = event.target.dataset;

    if (!mode) return;

    switchMode(mode);
    stopTimer();
  }

  // Function Switch mode
  function switchMode(mode) {
    timer.mode = mode;
    timer.remainingTime = {
      total: timer[mode] * 60,
      minutes: timer[mode],
      seconds: 0,
    };

    document
      .querySelectorAll("button[data-mode]")
      .forEach((e) => e.classList.remove("active"));
    document.querySelector(`[data-mode="${mode}"]`).classList.add("active");

    // Style for background body
    document.body.style.backgroundColor = `var(--${mode})`;
    document.body.style.transition = ".4s";

    // Set attribute for progress bar
    document
      .getElementById("js-progress")
      .setAttribute("max", timer.remainingTime.total);

    // set color for button main
    const btnMain = document.querySelector(".main-button");
    btnMain.style.color = `var(--${mode})`;

    updateClock();
  }

  // Function get remaining Time
  function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;

    const total = Number.parseInt(difference / 1000, 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);

    return {
      total,
      minutes,
      seconds,
    };
  }

  // Function start timer
  function startTimer() {
    let {
      total
    } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;

    if (timer.mode === "pomodoro") timer.sessions++;

    mainBtn.dataset.action = "stop";
    mainBtn.textContent = "stop";
    mainBtn.classList.add("active");
    mainBtn.style.transform = "translateY(6px)";
    mainBtn.style.boxShadow = "none";
    mainBtn.style.transition = ".4s";

    document.querySelector(".btn-next").style.display = "block";

    interval = setInterval(() => {
      timer.remainingTime = getRemainingTime(endTime);
      updateClock();

      total = timer.remainingTime.total;
      if (total <= 0) {
        clearInterval(interval);

        switch (timer.mode) {
          case "pomodoro":
            if (timer.sessions % timer.LongBreakInterval === 0) {
              switchMode("longBreak");
            } else {
              switchMode("shortBreak");
            }
            break;
          default:
            switchMode("pomodoro");
        }
      }
    }, 1000);
  }

  // Function stop timer
  function stopTimer() {
    clearInterval(interval);

    mainBtn.dataset.action = "start";
    mainBtn.textContent = "start";
    mainBtn.classList.remove = "active";
    mainBtn.style.boxShadow = "rgb(235, 235, 235) 0px 6px 0px";
    mainBtn.style.transform = "translateY(0)";
    mainBtn.style.transition = ".4s";
    document.querySelector(".btn-next").style.display = "none";
  }

  function nextTimer() {
    clearInterval(interval);

    switch (timer.mode) {
      case "pomodoro":
        if (timer.sessions % timer.LongBreakInterval === 0) {
          switchMode("longBreak");
        } else {
          switchMode("shortBreak");
        }
        break;
      default:
        switchMode("pomodoro");
    }
  }

  const mainBtn = document.getElementById("js-btn");
  mainBtn.addEventListener("click", () => {
    const {
      action
    } = mainBtn.dataset;
    if (action === "start") {
      startTimer();
    } else {
      stopTimer();
    }
  });

  const nextBtn = document.getElementById("next-btn");
  nextBtn.addEventListener("click", () => {
    nextTimer();
    stopTimer();
  });

  // Function update clock
  function updateClock() {
    const {
      remainingTime
    } = timer;
    const minutes = `${remainingTime.minutes}`.padStart(2, "0");
    const seconds = `${remainingTime.seconds}`.padStart(2, "0");

    const min = document.getElementById("js-minutes");
    const sec = document.getElementById("js-seconds");
    min.textContent = minutes;
    sec.textContent = seconds;

    const progress = document.getElementById("js-progress");
    progress.value = timer[timer.mode] * 60 - timer.remainingTime.total;
  }

  // Set default mode
  document.addEventListener("DOMContentLoaded", () => {
    switchMode("pomodoro");
  });
}

export default pomodoro;
