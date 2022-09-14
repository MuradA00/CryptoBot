const selectorBtns = document.querySelectorAll(".selector-row__item"),
  optimModal = document.getElementById("optimization"),
  optimTrigger = document.getElementById("optim-trigger"),
  closeOptimModal = document.getElementById("optim-close"),
  expertModal = document.getElementById("expert"),
  expertTrigger = document.getElementById("expert-trigger"),
  closeExpertModal = document.getElementById("expert-close"),
  filterModal = document.getElementById("filter-modal"),
  filterTrigger = document.getElementById("filterTrigger"),
  filterCloseIcon = document.getElementById("filterClose"),
  stepsTrigger = document.querySelector("._stepsTrigger"),
  wtfTrigger = document.querySelector("._wtfTrigger"),
  testingTrigger = document.getElementById("testingTrigger"),
  wtfModal = document.getElementById("wtfModal"),
  stepsModal = document.getElementById("stepsModal"),
  closeStepsIcon = document.getElementById("stepsClose"),
  closeWtfIcon = document.getElementById("wtfClose"),
  journalModal = document.getElementById("journalModal"),
  journalCloseIcon = document.getElementById("journalClose"),
  journalTrigger = document.getElementById("journalTrigger"),
  hiddenCells = document.querySelector(".hidden-cells"),
  hiddenTrigger = document.querySelector("._hiddenTrigger button");

hiddenTrigger.addEventListener("click", () => {
  hiddenCells.classList.toggle("_active-cells");
  hiddenTrigger.classList.toggle("_noTouch");
});

window.addEventListener("click", (e) => {
  if (!e.target.closest("._hiddenTrigger")) {
    hiddenCells.classList.remove("_active-cells");
    hiddenTrigger.classList.remove("_noTouch");
  }
});

journalTrigger.addEventListener("click", () => {
  openModal(journalModal, journalCloseIcon);
});

// selectorBtns.forEach((selectorBtn) => {
//   selectorBtn.addEventListener("click", () => {
//     selectorBtn.classList.toggle("_selector-active");
//   });
// });

function openModal(currentModal, closeModal) {
  currentModal.classList.add("--show-modal");
  closeModal.addEventListener("click", () => {
    currentModal.classList.remove("--show-modal");
  });
}

expertTrigger.addEventListener("click", function () {
  openModal(expertModal, closeExpertModal);
});

optimTrigger.addEventListener("click", function () {
  openModal(optimModal, closeOptimModal);
});

filterTrigger.addEventListener("click", function () {
  openModal(filterModal, filterCloseIcon);
});

gsap.fromTo(
  ".main",
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 1, ease: Power4.ease }
);
gsap.fromTo(
  ".header",
  { opacity: 0, y: -75 },
  { opacity: 1, y: 0, duration: 0.8, ease: Power4.ease, delay: 0.3 }
);

gsap.fromTo(
  ".panel",
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 1, ease: Power4.ease, delay: 0 }
);
gsap.fromTo(
  ".progress",
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 0.8, ease: Power4.ease, delay: 0.3 }
);

const progressButton = document.querySelector(".progress__button"),
  progressCounter = document.querySelector(".progress__counter"),
  initialButton = progressButton,
  progressBar = document.querySelector(".progress__percent"),
  progressNumber = document.querySelector(".progress__counter");

initialButton.addEventListener("click", () => {
  progressActive();
});

function progressActive() {
  progressBar.classList.toggle("--startBar");
  progressNumber.innerHTML = "23%";
  initialButton.innerHTML = "Stop";
}

const panel = document.querySelector(".panel-selector");

panel.addEventListener("click", function (e) {
  const selectorItems = document.querySelectorAll(".panel-selector__item");
  const target = e.target;
  Array.from(selectorItems).forEach((item) => {
    item.classList.remove("_active-selector");
  });
  target.classList.add("_active-selector");
});

closeWtfIcon.addEventListener("click", () => {
  wtfModal.classList.remove("--show-modal");
});

stepsClose.addEventListener("click", () => {
  stepsModal.classList.remove("--show-modal");
});

function openWtfModal() {
  wtfModal.classList.add("--show-modal");
}

const openStepModal = () => stepsModal.classList.add("--show-modal");

testingTrigger.addEventListener("click", () => {
  if (wtfTrigger.classList.contains("_active-selector")) {
    openWtfModal();
  } else {
    openStepModal();
  }
});

const pathAPI = "/api";
// const
let indicator = localStorage.getItem("indicator") || "stoch";

document.querySelector(".indicator button span").textContent =
  document.querySelector(
    `.indicator__name[data-value='${indicator}']`
  ).textContent;
document.querySelector(".indicator button").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".indicator").classList.toggle("active");
});
document
  .querySelectorAll(".expert__value-row")
  .forEach((i) =>
    i.classList.contains(indicator)
      ? (i.style.display = "")
      : (i.style.display = "none")
  );
document.querySelectorAll(".indicator__item").forEach((item) =>
  item.addEventListener("click", (e) => {
    item.querySelector(".indicator__name").textContent.trim() === "Stochatic"
      ? (indicator = "stoch")
      : (indicator = "macd");
    localStorage.setItem("indicator", indicator);
    document.querySelector(".indicator").classList.remove("active");
    document.querySelector(".indicator ._btn-primary span").textContent = item
      .querySelector(".indicator__name")
      .textContent.trim();
    document
      .querySelectorAll(".expert__value-row")
      .forEach((i) =>
        i.classList.contains(indicator)
          ? (i.style.display = "")
          : (i.style.display = "none")
      );
  })
);
window.addEventListener("click", (e) => {
  if (!e.target.closest(".indicator")) {
    document.querySelector(".indicator").classList.remove("active");
  }
});

let currenty = JSON.parse(localStorage.getItem("currency")) || []
currenty.forEach(item => {
  document.querySelector(`.hidden-cells__item input[id="${item}"]`).checked = true
})
document.querySelectorAll('.hidden-cells__item input').forEach(item => item.addEventListener('change', e => {
  if(e.target.checked) {
    currenty.push(e.target.id)
  } else {
    currenty = currenty.filter(c => c !== e.target.id)
  }
  localStorage.setItem('currency', JSON.stringify(currenty))
}))

fetch(`${pathAPI}/last`).then(async (response) => {
  const res = await response.json();

  // document.querySelectorAll('.table__inner').forEach(item => item.remove())

  res.forEach((item, index) => {
    const elem = document.createElement("div");
    elem.classList.add("table__inner");
    elem.innerHTML = `
        <div class="table__inner-item _table-item-short">
          ${index + 1}
        </div>
        <div class="table__inner-item">
          ${item.data.totalBalance.toFixed(1)}$
        </div>
        <div class="table__inner-item">
          ${item.data.profit.toFixed(1)}$
        </div>
        <div class="table__inner-item">
          ${item.data.monthProfit.toFixed(1)}%
        </div>
        <div class="table__inner-item">
          ${item.data.expectationProfit.toFixed(1)}%
        </div>
        <div class="table__inner-item">
          ${item.data.subsidence.toFixed()}%
        </div>
        <div class="table__inner-item">
          ${item.data.dealQty.toFixed()}
        </div>
        <div class="table__inner-item">
          ${item.data.longDealPercent.toFixed()}%
        </div>
        <div class="table__inner-item">
          ${item.data.shortDealPercent.toFixed()}%
        </div>
        <div class="table__inner-item">
          ${item.data.lossDealPercent.toFixed()}%
        </div>
        <div class="table__inner-item">
          ${item.data.recoveryFactor.toFixed(3)}
        </div>
        <button class="table__button _table-active-btn">
          Link
        </button>
      `;
    document.querySelector(".table").append(elem);
  });
});

document.querySelector("#journalTrigger").addEventListener("click", (e) => {
  fetch(`${pathAPI}/results`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      document
        .querySelectorAll(".journal-list__item")
        .forEach((item) => item.remove());
      data.forEach((item) => {
        // console.log(moment.form);
        const dateSec = +item.replace(/.json$/, "");
        const elem = document.createElement("li");
        elem.classList.add("journal-list__item");
        elem.classList.add("steps-list__item");
        elem.innerHTML = `
        <div class="journal-list__item-inner steps-list__item-inner">
          <div class="journal-list__info">
            ${moment(dateSec).format("MM-DD-YYYY hh:mm:ss")}
          </div>
          <a href="#" data-path="${dateSec}" class="journal-list__link _active-optim-btn modal-btn _optim-btn">
            Link
          </a>
        </div>
      `;
        document.querySelector(".journal-list").append(elem);
      });

      document.querySelectorAll(".journal-list__link").forEach((item) =>
        item.addEventListener("click", (e) => {
          e.preventDefault();
          document
            .querySelector("#journalModal")
            .classList.remove("--show-modal");
          // console.log(`${pathAPI}/result/${e.target.getAttribute('data-path')}`)
          // const asdasd =
          fetch(`${pathAPI}/result/${e.target.getAttribute("data-path")}`)
            .then((res) => res.json())
            .then((data) => {
              document
                .querySelectorAll(".table__inner")
                .forEach((item) => item.remove());
              data.forEach((item, index) => {
                const elem = document.createElement("div");
                elem.classList.add("table__inner");
                elem.innerHTML = `
              <div class="table__inner-item _table-item-short">
                ${index + 1}
              </div>
              <div class="table__inner-item">
                ${item.data.totalBalance.toFixed(1)}$
              </div>
              <div class="table__inner-item">
                ${item.data.profit.toFixed(1)}$
              </div>
              <div class="table__inner-item">
                ${item.data.monthProfit.toFixed(1)}$
              </div>
              <div class="table__inner-item">
                ${item.data.expectationProfit.toFixed(1)}%
              </div>
              <div class="table__inner-item">
                ${item.data.subsidence.toFixed()}%
              </div>
              <div class="table__inner-item">
                ${item.data.dealQty.toFixed()}
              </div>
              <div class="table__inner-item">
                ${item.data.longDealPercent.toFixed()}%
              </div>
              <div class="table__inner-item">
                ${item.data.shortDealPercent.toFixed()}%
              </div>
              <div class="table__inner-item">
                ${item.data.lossDealPercent.toFixed()}%
              </div>
              <div class="table__inner-item">
                ${item.data.recoveryFactor.toFixed(3)}
              </div>
              <button class="table__button _table-active-btn">
                Link
              </button>
            `;
                document.querySelector(".table").append(elem);
              });
            });
        })
      );
    });
});

let some = JSON.parse(localStorage.getItem("some")) || [];

document.querySelectorAll(".selector-row__item").forEach((item) => {
  if (some.find((c) => c === item.textContent.trim())) {
    item.classList.add("_selector-active");
  } else {
    item.classList.remove("_selector-active");
  }
});

document.querySelectorAll(".selector-row__item").forEach((item) =>
  item.addEventListener("click", () => {
    item.classList.toggle("_selector-active");
    some = [];
    document.querySelectorAll(".selector-row__item").forEach((elem) => {
      if (elem.classList.contains("_selector-active")) {
        some.push(elem.textContent.trim());
      }
    });
    localStorage.setItem("some", JSON.stringify(some));
  })
);


const expert = JSON.parse(localStorage.getItem('expert')) || {}
for (item in expert) {
  document.querySelector(`.expert input[name="${item}"]`).value = expert[item]
}
document.querySelectorAll('.expert input').forEach(item => {
  item.addEventListener('change', e => {
    expert[e.target.name] = e.target.value
    localStorage.setItem('expert', JSON.stringify(expert))
  })
})

const helperItem = (elem) => {
  return [
    +document.querySelector(`input[name="${elem}Start"]`).value,
    +document.querySelector(`input[name="${elem}Step"]`).value,
    +document.querySelector(`input[name="${elem}Stop"]`).value,
  ];
};

helperItem("fastPeriod");

document.querySelector(".progress__button").addEventListener("click", () => {
  const formData = {
    timeFrom: null,
    timeFrom: null,
    indicators: {
      name: indicator,
      hmaFilter: helperItem('hmaFilter')
    },
    symbol: currenty,
    timeFrame: some,
    params: {
      stopLoss: helperItem('stopLoss'),
      stopLtakeProfitoss: helperItem('takeProfit'),
      breakevenLevel: helperItem('breakevenLevel'),
      indentBreakevenLevel: helperItem('indentBreakevenLevel'),
    }
  };
  if (indicator === "stoch") {
    formData.indicators.stoch = {
      kPeriod: helperItem('kPeriod'),
      kSmoothingPeriod: helperItem('kSmoothingPeriod'),
      dPeriod: helperItem('dPeriod')
    };
    formData.indicators.hmaFilter = {
      period: helperItem('hmaFilter')
    };
    formData.indicators.hma = {
      period: helperItem('hma')
    };
  }
  if (indicator === "macd") {
    formData.indicators.macd = {
      fastPeriod: helperItem('fastPeriod'),
      slowPeriod: helperItem('slowPeriod'),
      signalPeriod: helperItem('signalPeriod')
    };
    formData.indicators.hmaFilter = {
      period: helperItem('hmaFilter')
    };
    formData.indicators.hmaShort = {
      period: helperItem('hmaShort')
    };
    formData.indicators.hmaLong = {
      period: helperItem('hmaLong')
    };
  }
  console.log(formData);
});
