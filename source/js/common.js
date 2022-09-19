const versionProduct = "0.61";
if (localStorage.getItem("versionProduct") !== versionProduct) {
  localStorage.clear();
  console.log("clear st");
}
localStorage.setItem("versionProduct", versionProduct);

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

// initialButton.addEventListener("click", () => {
//   progressActive();
// });

// function progressActive() {
//   progressBar.classList.toggle("--startBar");
//   progressNumber.innerHTML = "23%";
//   initialButton.innerHTML = "Stop";
// }

const panel = document.querySelector(".panel-selector");

let panelTab = "step";
panel.addEventListener("click", function (e) {
  const selectorItems = document.querySelectorAll(".panel-selector__item");
  const target = e.target;
  localStorage.setItem('panelTab', target.getAttribute('data-value'))
  Array.from(selectorItems).forEach((item) => {
    item.classList.remove("_active-selector");
  });
  panelTab = target.getAttribute("data-value");
  target.classList.add("_active-selector");
})
if(localStorage.getItem('panelTab')) {
  panelTab = localStorage.getItem('panelTab')
  document.querySelector(`.panel-selector__item[data-value="${panelTab}"]`).click();
}

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

document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("input", (e) => {
    console.log(e.target.value);
  });
});

const pathAPI = "http://52.58.115.17:3000/api";
// const
let indicator = null;
if (!localStorage.getItem("indicator")) {
  localStorage.setItem("indicator", "stoch");
}
indicator = localStorage.getItem("indicator") || "stoch";

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
    document.querySelector(".expert__button-total").textContent =
      calcExpert().toFixed() + ' проходов';
  })
);
window.addEventListener("click", (e) => {
  if (!e.target.closest(".indicator")) {
    document.querySelector(".indicator").classList.remove("active");
  }
});
document.querySelectorAll(".expert__value-row").forEach((item) => {
  if (!item.querySelector('.expert__button input[type="checkbox"]').checked) {
    item
      .querySelectorAll('input[type="number"]')
      .forEach((i) => (i.disabled = true));
  }
  item
    .querySelector('.expert__button input[type="checkbox"]')
    .addEventListener("change", (e) => {
      if (!e.target.checked) {
        item
          .querySelectorAll('input[type="number"]')
          .forEach((i) => (i.disabled = true));
      } else {
        item
          .querySelectorAll('input[type="number"]')
          .forEach((i) => (i.disabled = false));
      }
    });
});

let currency = null;
if (localStorage.getItem("currency")) {
  currency = JSON.parse(localStorage.getItem("currency"));
  document.querySelectorAll(".hidden-cells__item input").forEach(item => {
    if(currency.includes(item.id)) {
      item.checked = true
    } else {
      item.checked = false
    }
  })
} else {
  currency = [];
  document.querySelectorAll(".hidden-cells__item input").forEach((item) => {
    if (item.checked) {
      currency.push(item.id);
    }
  });
  localStorage.setItem("currency", JSON.stringify(currency));
}
document.querySelectorAll(".hidden-cells__item input").forEach((item) =>
  item.addEventListener("change", (e) => {
    if (e.target.checked) {
      currency.push(e.target.id);
    } else {
      currency = currency.filter((c) => c !== e.target.id);
    }
    localStorage.setItem("currency", JSON.stringify(currency));
  })
);

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
    elem.querySelector("._table-active-btn").addEventListener("click", () => {
      document.querySelector(".custom-graph").style.display = "flex";
      areaSeries.setData(item.graphData);
      if (document.querySelector(".graph-info")) {
        document.querySelector(".graph-info").remove();
      }
      const graphInfo = document.createElement("DIV");
      graphInfo.classList.add("graph-info");
      graphInfo.innerHTML = `
        <div class="graph-info__item">
          Params 1 - ${item.data.params[0].join(", ")}
        </div>
        <div class="graph-info__item">
          Params 2 - ${item.data.params[1].join(", ")}
        </div>
        <div class="graph-info__item">
          Params 3 - ${item.data.params[2].join(", ")}
        </div>
        <div class="graph-info__item">
          Params deposit - ${item.data.params[3].deposit}
        </div>
        <div class="graph-info__item">
          Params lotPersent - ${item.data.params[3].lotPersent}
        </div>
        <div class="graph-info__item">
          Params leverage - ${item.data.params[3].leverage}
        </div>
        <div class="graph-info__item">
          Params commission - ${item.data.params[3].commission}
        </div>
        <div class="graph-info__item">
          Начало - ${moment(item.data.startTime).format("MM-DD-YYYY hh:mm:ss")}
        </div>
        <div class="graph-info__item">
          Конец - ${moment(item.data.endTime).format("MM-DD-YYYY hh:mm:ss")}
        </div>
        <div class="graph-info__item">
          Итоговый баланс - ${item.data.totalBalance.toFixed(1)}$
        </div>
        <div class="graph-info__item">
          Чистая прибыльность - ${item.data.profit.toFixed(1)}$
        </div>
        <div class="graph-info__item">
          Прибыль за месяц - ${item.data.monthProfit.toFixed(1)}%
        </div>
        <div class="graph-info__item">
          Матожидание - ${item.data.expectationProfit.toFixed(1)}%
        </div>
        <div class="graph-info__item">
          Макс. Просадка - ${item.data.subsidence.toFixed()}%
        </div>
        <div class="graph-info__item">
          Кол-во сделок - ${item.data.dealQty.toFixed()}
        </div>
        <div class="graph-info__item">
          Кол-во Long сделок - ${item.data.longDealPercent.toFixed()}%
        </div>
        <div class="graph-info__item">
          Кол-во Short сделок - ${item.data.shortDealPercent.toFixed()}%
        </div>
        <div class="graph-info__item">
          Кол-во убыточных сделок - ${item.data.lossDealPercent.toFixed()}%
        </div>
        <div class="graph-info__item">
          profitDealPercent - ${item.data.profitDealPercent.toFixed()}%
        </div>
        <div class="graph-info__item">
          Фактор восстановления - ${item.data.recoveryFactor.toFixed(3)}
        </div>
        <div class="graph-info__item">
          profitFactor - ${item.data.profitFactor.toFixed(3)}
        </div>
        <div class="graph-info__item">
          maxlossDealSeries - ${item.data.maxlossDealSeries}
        </div>
      `;
      document.querySelector(".tv-lightweight-charts").append(graphInfo);
    });
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
                elem
                  .querySelector("._table-active-btn")
                  .addEventListener("click", () => {
                    document.querySelector(".custom-graph").style.display =
                      "flex";
                    areaSeries.setData(item.graphData);
                    if (document.querySelector(".graph-info")) {
                      document.querySelector(".graph-info").remove();
                    }
                    const graphInfo = document.createElement("DIV");
                    graphInfo.classList.add("graph-info");
                    graphInfo.innerHTML = `
                    <div class="graph-info__item">
                      Params 1 - ${item.data.params[0].join(", ")}
                    </div>
                    <div class="graph-info__item">
                      Params 2 - ${item.data.params[1].join(", ")}
                    </div>
                    <div class="graph-info__item">
                      Params 3 - ${item.data.params[2].join(", ")}
                    </div>
                    <div class="graph-info__item">
                      Params deposit - ${item.data.params[3].deposit}
                    </div>
                    <div class="graph-info__item">
                      Params lotPersent - ${item.data.params[3].lotPersent}
                    </div>
                    <div class="graph-info__item">
                      Params leverage - ${item.data.params[3].leverage}
                    </div>
                    <div class="graph-info__item">
                      Params commission - ${item.data.params[3].commission}
                    </div>
                    <div class="graph-info__item">
                      Начало - ${moment(item.data.startTime).format(
                        "MM-DD-YYYY hh:mm:ss"
                      )}
                    </div>
                    <div class="graph-info__item">
                      Конец - ${moment(item.data.endTime).format(
                        "MM-DD-YYYY hh:mm:ss"
                      )}
                    </div>
                    <div class="graph-info__item">
                      Итоговый баланс - ${item.data.totalBalance.toFixed(1)}$
                    </div>
                    <div class="graph-info__item">
                      Чистая прибыльность - ${item.data.profit.toFixed(1)}$
                    </div>
                    <div class="graph-info__item">
                      Прибыль за месяц - ${item.data.monthProfit.toFixed(1)}%
                    </div>
                    <div class="graph-info__item">
                      Матожидание - ${item.data.expectationProfit.toFixed(1)}%
                    </div>
                    <div class="graph-info__item">
                      Макс. Просадка - ${item.data.subsidence.toFixed()}%
                    </div>
                    <div class="graph-info__item">
                      Кол-во сделок - ${item.data.dealQty.toFixed()}
                    </div>
                    <div class="graph-info__item">
                      Кол-во Long сделок - ${item.data.longDealPercent.toFixed()}%
                    </div>
                    <div class="graph-info__item">
                      Кол-во Short сделок - ${item.data.shortDealPercent.toFixed()}%
                    </div>
                    <div class="graph-info__item">
                      Кол-во убыточных сделок - ${item.data.lossDealPercent.toFixed()}%
                    </div>
                    <div class="graph-info__item">
                      profitDealPercent - ${item.data.profitDealPercent.toFixed()}%
                    </div>
                    <div class="graph-info__item">
                      Фактор восстановления - ${item.data.recoveryFactor.toFixed(
                        3
                      )}
                    </div>
                    <div class="graph-info__item">
                      profitFactor - ${item.data.profitFactor.toFixed(3)}
                    </div>
                    <div class="graph-info__item">
                      maxlossDealSeries - ${item.data.maxlossDealSeries}
                    </div>
                  `;
                    document
                      .querySelector(".tv-lightweight-charts")
                      .append(graphInfo);
                  });
              });
            });
        })
      );
    });
});

let period = JSON.parse(localStorage.getItem("period")) || [];
document.querySelectorAll(".selector-row__item").forEach((item) => {
  if (period.find((c) => c === item.getAttribute("data-value"))) {
    item.classList.add("_selector-active");
  } else {
    item.classList.remove("_selector-active");
  }
});
document.querySelectorAll(".selector-row__item").forEach((item) =>
  item.addEventListener("click", () => {
    item.classList.toggle("_selector-active");
    period = [];
    document.querySelectorAll(".selector-row__item").forEach((elem) => {
      if (elem.classList.contains("_selector-active")) {
        period.push(elem.getAttribute("data-value"));
      }
    });
    localStorage.setItem("period", JSON.stringify(period));
  })
);

let timeFrom = localStorage.getItem("timeFrom") || null;
if (timeFrom) {
  document.querySelector(`.steps-list__total input[name="timeFrom"]`).value =
    timeFrom;
}
document
  .querySelector('.steps-list__total input[name="timeFrom"]')
  .addEventListener("change", (e) => {
    timeFrom = e.target.value;
    localStorage.setItem("timeFrom", timeFrom);
  });
let timeTo = localStorage.getItem("timeTo") || null;
if (timeTo) {
  document.querySelector(`.steps-list__total input[name="timeTo"]`).value =
    timeTo;
}
document
  .querySelector('.steps-list__total input[name="timeTo"]')
  .addEventListener("change", (e) => {
    timeTo = e.target.value;
    localStorage.setItem("timeTo", timeTo);
  });

let expertError = false;

const defaultExpert = {
  hmaFilterStart: 0,
  hmaFilterStop: 0,
  hmaFilterStep: 1,
};

const calcExpert = () => {
  let totalSteps = 1;
  expertError = false;

  document
    .querySelectorAll(`#expert .expert__value-row.${indicator}`)
    .forEach((item, index) => {
      let itemError = false;

      const itemCheck = item.querySelector(
        '.expert__button input[type="checkbox"]'
      );
      const itemStart = item.querySelector('input[type="number"][name$=Start]');
      const itemStep = item.querySelector('input[type="number"][name$=Step]');
      const itemStop = item.querySelector('input[type="number"][name$=Stop]');

      if (itemCheck.checked) {
        document.querySelector("#expert-trigger").style.outlineColor = "";
        item
          .querySelectorAll('input[type="number"]')
          .forEach(
            (i) => (i.closest(".expert__value-item").style.borderColor = "")
          );

        if (+itemStart.value < 0 || itemStart.value === "") {
          itemStart.closest(".expert__value-item").style.borderColor = "red";
          setTimeout(() => {
            document.querySelector("#expert-trigger").style.outlineColor =
              "red";
          }, 10);
          itemError = true;
          expertError = true;
        }
        if (+itemStep.value <= 0) {
          itemStep.closest(".expert__value-item").style.borderColor = "red";
          setTimeout(() => {
            document.querySelector("#expert-trigger").style.outlineColor =
              "red";
          }, 10);
          itemError = true;
          expertError = true;
        }
        if (+itemStop.value < 0 || itemStop.value === "") {
          itemStop.closest(".expert__value-item").style.borderColor = "red";
          setTimeout(() => {
            document.querySelector("#expert-trigger").style.outlineColor =
              "red";
          }, 10);
          itemError = true;
          expertError = true;
        }
        if (+itemStop.value < +itemStart.value) {
          itemStart.closest(".expert__value-item").style.borderColor = "red";
          itemStop.closest(".expert__value-item").style.borderColor = "red";
          setTimeout(() => {
            document.querySelector("#expert-trigger").style.outlineColor =
              "red";
          }, 10);
          itemError = true;
          expertError = true;
          console.log(expertError);
        }
        if (+itemStart.value === +itemStop.value && +itemStep.value !== 1) {
          itemStep.closest(".expert__value-item").style.borderColor = "red";
          setTimeout(() => {
            document.querySelector("#expert-trigger").style.outlineColor =
              "red";
          }, 10);
          itemError = true;
          expertError = true;
        }
        if (
          +itemStart.value < +itemStop.value &&
          +itemStop.value - +itemStart.value < +itemStep.value
        ) {
          itemStep.closest(".expert__value-item").style.borderColor = "red";
          setTimeout(() => {
            document.querySelector("#expert-trigger").style.outlineColor =
              "red";
          }, 10);
          itemError = true;
          expertError = true;
        }
      } else {
        if(typeof defaultExpert[itemStart.name] && typeof defaultExpert[itemStop.name] && typeof defaultExpert[itemStep.name]) {
          console.log(itemStart.name, (defaultExpert[itemStop.name] - defaultExpert[itemStart.name]) / defaultExpert[itemStep.name] + 1)
          totalSteps *= ((defaultExpert[itemStop.name] - defaultExpert[itemStart.name]) / defaultExpert[itemStep.name] + 1)
          itemError = true
        }
      }

      if (!itemError) {
        console.log(itemStart.name, (+itemStop.value - +itemStart.value) / +itemStep.value + 1);
        totalSteps *= ((+itemStop.value - +itemStart.value) / +itemStep.value + 1);
      }
    });

  return totalSteps;
};

let expert = {};
if (localStorage.getItem("expert")) {
  expert = JSON.parse(localStorage.getItem("expert"));
} else {
  document.querySelectorAll('#expert input[type="number"]').forEach((item) => {
    expert[item.name] = item.value;
  });
  localStorage.setItem("expert", JSON.stringify(expert));
}
for (item in expert) {
  document.querySelector(`#expert input[name="${item}"][type="number"]`).value =
    expert[item];
}
document.querySelectorAll('#expert input[type="number"]').forEach((item) => {
  item.addEventListener("change", (e) => {
    expert[e.target.name] = e.target.value;
    localStorage.setItem("expert", JSON.stringify(expert));
  });
  item.addEventListener("input", () => {
    document.querySelector(".expert__button-total").textContent =
      calcExpert().toFixed() + ' проходов';
  });
});
document.querySelectorAll('#expert .expert__button input[type="checkbox"]').forEach((item) => {
  item.addEventListener("change", (e) => {
    document.querySelector(".expert__button-total").textContent =
      calcExpert().toFixed() + ' проходов';
  });
});
setTimeout(() => {
  document.querySelector(".expert__button-total").textContent =
      calcExpert().toFixed() + ' проходов';
}, 0);

const filters = JSON.parse(localStorage.getItem("filters")) || {};
for (item in filters) {
  document.querySelector(
    `#filter-modal input[type="text"][name="${item}"]`
  ).value = filters[item];
}
document
  .querySelectorAll('#filter-modal input[type="text"]')
  .forEach((item) => {
    filters[item.name] = +item.value;
    localStorage.setItem("filters", JSON.stringify(filters));
  });
document
  .querySelectorAll('#filter-modal input[type="text"]')
  .forEach((item) => {
    item.addEventListener("change", (e) => {
      filters[e.target.name] = +e.target.value;
      localStorage.setItem("filters", JSON.stringify(filters));
    });
  });

let wft = {};
if (localStorage.getItem("wft")) {
  wft = JSON.parse(localStorage.getItem("wft"));
  for (item in wft) {
    document.querySelector(`#wtfModal input[name="${item}"]`).value = wft[item];
  }
} else {
  document.querySelectorAll("#wtfModal input").forEach((item) => {
    if (item.name === "timeFrom" || item.name === "timeTo") {
      wft[item.name] = item.value;
    } else {
      wft[item.name] = +item.value;
    }
  });
  JSON.stringify(localStorage.setItem("wft", wft));
}
document.querySelectorAll("#wtfModal input").forEach((item) => {
  if (item.name === "timeFrom" || item.name === "timeTo") {
    wft[item.name] = item.value;
  } else {
    wft[item.name] = +item.value;
  }
  localStorage.setItem("wft", JSON.stringify(wft));
});
document.querySelectorAll("#wtfModal input").forEach((item) => {
  item.addEventListener("change", (e) => {
    if (e.target.name === "timeFrom" || e.target.name === "timeTo") {
      wft[e.target.name] = e.target.value;
    } else {
      wft[e.target.name] = +e.target.value;
    }
    localStorage.setItem("wft", JSON.stringify(wft));
  });
});

let stepModal = {};
if (localStorage.getItem("stepModal")) {
  stepModal = JSON.parse(localStorage.getItem("stepModal"));
  for (item in stepModal) {
    document.querySelector(`#stepsModal input[name="${item}"]`).value =
      stepModal[item];
  }
} else {
  document.querySelectorAll("#stepsModal input").forEach((item) => {
    if (
      item.name === "optimizationFrom" ||
      item.name === "optimizationTo" ||
      item.name === "testFrom" ||
      item.name === "testTo"
    ) {
      stepModal[item.name] = item.value;
    } else {
      stepModal[item.name] = +item.value;
    }
  });
  JSON.stringify(localStorage.setItem("stepModal", stepModal));
}
document.querySelectorAll("#stepsModal input").forEach((item) => {
  if (
    item.name === "optimizationFrom" ||
    item.name === "optimizationTo" ||
    item.name === "testFrom" ||
    item.name === "testTo"
  ) {
    stepModal[item.name] = item.value;
  } else {
    stepModal[item.name] = +item.value;
  }
  localStorage.setItem("stepModal", JSON.stringify(stepModal));
});
document.querySelectorAll("#stepsModal input").forEach((item) => {
  item.addEventListener("change", (e) => {
    if (
      e.target.name === "optimizationFrom" ||
      item.name === "optimizationTo" ||
      item.name === "testFrom" ||
      item.name === "testTo"
    ) {
      stepModal[e.target.name] = e.target.value;
    } else {
      stepModal[e.target.name] = +e.target.value;
    }
    localStorage.setItem("stepModal", JSON.stringify(stepModal));
  });
});

const config = JSON.parse(localStorage.getItem("config")) || {};
for (item in config) {
  document.querySelector(
    `#optimization input[type="text"][name="${item}"]`
  ).value = config[item];
}
document
  .querySelectorAll('#optimization input[type="text"]')
  .forEach((item) => {
    config[item.name] = +item.value;
    localStorage.setItem("config", JSON.stringify(config));
  });
document
  .querySelectorAll('#optimization input[type="text"]')
  .forEach((item) => {
    item.addEventListener("change", (e) => {
      config[e.target.name] = +e.target.value;
      localStorage.setItem("config", JSON.stringify(config));
    });
  });

const helperItem = (elem) => {
  if (
    !document
      .querySelector(`input[name="${elem}Start"]`)
      .closest(".expert__value-row")
      .querySelector('input[type="checkbox"]').checked
  ) {
    console.log(1123);
    return [0, 0, 1];
  }
  // console.log(document.querySelector(`input[name="${elem}Start"]`).closest('.expert__value-row').querySelector('input[type="checkbox"]').checked, document.querySelector(`input[name="${elem}Start"]`).closest('.expert__value-row').querySelector('input[type="checkbox"]'));
  return [
    +document.querySelector(`input[name="${elem}Start"]`).value,
    +document.querySelector(`input[name="${elem}Stop"]`).value,
    +document.querySelector(`input[name="${elem}Step"]`).value,
  ];
};

document.querySelector(".progress__button").addEventListener("click", () => {
  let error = false;
  if (!currency.length) {
    error = true;
    document.querySelector("._hiddenTrigger").style.outline = "1px solid red";
    setTimeout(() => {
      document.querySelector("._hiddenTrigger").style.outline = "";
    }, 2000);
  }
  if (!period.length) {
    error = true;
    document.querySelector(".selector-row._gap-row").style.outline =
      "1px solid red";
    setTimeout(() => {
      document.querySelector(".selector-row._gap-row").style.outline = "";
    }, 2000);
  }
  const formData = {
    indicators: {
      name: indicator,
      hmaFilter: {
        period: helperItem("hmaFilter"),
      },
    },
    symbol: currency,
    timeFrame: period,
    params: {
      stopLoss: helperItem("stopLoss"),
      takeProfit: helperItem("takeProfit"),
      breakevenLevel: helperItem("breakevenLevel"),
      indentBreakevenLevel: helperItem("indentBreakevenLevel"),
    },
    // filters: filters,
    config: config,
  };
  const customFilters = {};
  for (const key in filters) {
    if (
      document
        .querySelector(`#filter-modal input[name="${key}"]`)
        .closest(".filter-row__item")
        .querySelector('input[type="checkbox"]').checked
    ) {
      customFilters[key] = filters[key];
    } else {
      customFilters[key] =
        key === "maxlossDealSeries" ||
        key === "lossDealPercent" ||
        key === "subsidence"
          ? 100000000
          : -10000000;
    }
  }
  formData.filters = customFilters;
  if (indicator === "stoch") {
    formData.indicators.stoch = {
      kPeriod: helperItem("kPeriod"),
      kSmoothingPeriod: helperItem("kSmoothingPeriod"),
      dPeriod: helperItem("dPeriod"),
    };
    // formData.indicators.hmaFilter = {
    //   period: helperItem('hmaFilter')
    // };
    formData.indicators.hma = {
      period: helperItem("hma"),
    };
  }
  if (indicator === "macd") {
    formData.indicators.macd = {
      fastPeriod: helperItem("fastPeriod"),
      slowPeriod: helperItem("slowPeriod"),
      signalPeriod: helperItem("signalPeriod"),
    };
    // formData.indicators.hmaFilter = {
    //   period: helperItem('hmaFilter')
    // };
    formData.indicators.hmaShort = {
      period: helperItem("hmaShort"),
    };
    formData.indicators.hmaLong = {
      period: helperItem("hmaLong"),
    };
  }
  if (panelTab === "step") {
    formData.tbp = {
      optimizationFrom: moment(stepModal.optimizationFrom).valueOf(),
      optimizationTo: moment(stepModal.optimizationTo).valueOf(),
      testFrom: moment(stepModal.testFrom).valueOf(),
      testTo: moment(stepModal.testTo).valueOf(),
    };
  }
  if (panelTab === "wft") {
    formData.wft = {
      ...wft,
      timeFrom: moment(wft.timeFrom).valueOf(),
      timeTo: moment(wft.timeTo).valueOf(),
    };
  }
  if (error) {
    console.error(error);
  }
  // console.log(JSON.stringify(formData));
  console.log(formData);
  if (expertError) {
    return;
  }
  if (panelTab === "wft") {
    // document.querySelector('.progress__btn').textContent = 'Stop'
    fetch(`${pathAPI}/wft`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  if (panelTab === "step") {
    // document.querySelector('.progress__btn').textContent = 'Stop'
    fetch(`${pathAPI}/testbyperiod`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
});

setInterval(() => {
  fetch(`${pathAPI}/progress`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".progress__counter").textContent = data + "%";
      document.querySelector(".progress__percent").classList.add("--startBar");
      document.querySelector(".progress__percent").style.width = data + "%";
    })
    .catch((err) => console.log(err));
}, 1000);

function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
  var switcherElement = document.createElement("div");
  switcherElement.classList.add("switcher");

  var intervalElements = items.map(function (item) {
    var itemEl = document.createElement("button");
    itemEl.innerText = item;
    itemEl.classList.add("switcher-item");
    itemEl.classList.toggle("switcher-active-item", item === activeItem);
    itemEl.addEventListener("click", function () {
      onItemClicked(item);
    });
    switcherElement.appendChild(itemEl);
    return itemEl;
  });

  function onItemClicked(item) {
    if (item === activeItem) {
      return;
    }

    intervalElements.forEach(function (element, index) {
      element.classList.toggle("switcher-active-item", items[index] === item);
    });

    activeItem = item;

    activeItemChangedCallback(item);
  }

  return switcherElement;
}

var switcherElement = createSimpleSwitcher(
  ["Courier New", "Arial", "Times New Roman"],
  "Trebuchet MS",
  function (fontFamily) {
    chart.applyOptions({
      layout: {
        fontFamily: fontFamily,
      },
    });
  }
);

const chartElement = document.createElement("div");
chartElement.classList.add("custom-graph");
const closeGraph = document.createElement("div");
closeGraph.classList.add("custom-graph__close");
setTimeout(() => {
  chartElement.querySelector(".tv-lightweight-charts").append(closeGraph);
}, 100);
closeGraph.addEventListener("click", () => {
  chartElement.style.display = "";
});

var chart = LightweightCharts.createChart(chartElement, {
  width: 600,
  height: 300,
  layout: {
    fontFamily: "Comic Sans MS",
  },
  rightPriceScale: {
    borderColor: "rgba(197, 203, 206, 1)",
  },
  timeScale: {
    borderColor: "rgba(197, 203, 206, 1)",
  },
});

document.body.appendChild(chartElement);
document.body.appendChild(switcherElement);

var areaSeries = chart.addAreaSeries({
  topColor: "rgba(33, 150, 243, 0.56)",
  bottomColor: "rgba(33, 150, 243, 0.04)",
  lineColor: "rgba(33, 150, 243, 1)",
  lineWidth: 2,
});

areaSeries.setData([
  {
    time: "2021-02-07",
    value: 903252.305660776,
  },
  {
    time: "2021-02-08",
    value: 824555.4617612461,
  },
  {
    time: "2021-02-09",
    value: 822088.6458040659,
  },
  {
    time: "2021-02-10",
    value: 993728.6420772834,
  },
  {
    time: "2021-02-11",
    value: 1012611.6495196922,
  },
  {
    time: "2021-02-12",
    value: 1011348.7299382992,
  },
  {
    time: "2021-02-13",
    value: 676622.0512403984,
  },
  {
    time: "2021-02-14",
    value: 1215981.6471389318,
  },
  {
    time: "2021-02-15",
    value: 1190471.6115654416,
  },
  {
    time: "2021-02-16",
    value: 1205548.9793737128,
  },
  {
    time: "2021-02-17",
    value: 1187515.8836830312,
  },
  {
    time: "2021-02-18",
    value: 802206.012761356,
  },
  {
    time: "2021-02-19",
    value: 1131819.9950706863,
  },
  {
    time: "2021-02-20",
    value: 1139871.3435704936,
  },
  {
    time: "2021-02-21",
    value: 947395.1412238004,
  },
  {
    time: "2021-02-22",
    value: 1447358.0619556052,
  },
  {
    time: "2021-02-23",
    value: 1509853.410942378,
  },
  {
    time: "2021-02-24",
    value: 1611618.2179830277,
  },
  {
    time: "2021-02-25",
    value: 1345575.196351628,
  },
  {
    time: "2021-02-26",
    value: 1337254.5485194686,
  },
  {
    time: "2021-02-27",
    value: 727076.1894724783,
  },
  {
    time: "2021-02-28",
    value: 1205021.402361486,
  },
  {
    time: "2021-03-01",
    value: 1471661.3231036644,
  },
  {
    time: "2021-03-02",
    value: 1035013.4829769675,
  },
  {
    time: "2021-03-03",
    value: 1474423.881218233,
  },
  {
    time: "2021-03-04",
    value: 1584659.0605415185,
  },
  {
    time: "2021-03-05",
    value: 1159779.4589191857,
  },
  {
    time: "2021-03-06",
    value: 1215205.9402876454,
  },
  {
    time: "2021-03-07",
    value: 1266078.1552065795,
  },
  {
    time: "2021-03-08",
    value: 1312550.4040613947,
  },
]);
