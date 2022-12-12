// if(token)

const errors = {
  modelTesting: false,
  export: false,
  symbol: false,
  indicator: false,
  optimization: false
}

if((moment().valueOf() - localStorage.getItem('token')) < 86400000) {
  document.body.classList.add('show')
} else {
  document.querySelector('.popup').style.display = 'flex'
  document.querySelector('.popup').style.opacity = 1
}
document.querySelector('.enter-form').addEventListener('submit', e => {
  e.preventDefault()
  if(e.target.querySelector('.popup__input').value.trim() === 'v4d-Dg9-sAf-8gr') {
    document.body.classList.add('show')
    document.querySelector('.popup').remove()
    localStorage.setItem('token', moment().valueOf())
  }
})

const versionProduct = "0.66";
if (localStorage.getItem("versionProduct") !== versionProduct) {
  localStorage.clear();
  console.log("clear st");
}
localStorage.setItem("versionProduct", versionProduct);

// const iii = prompt('asd')

// console.log(iii);

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
  if(target.getAttribute("data-value") === 'step') {
    validationStepModalInputs()
  } else if(target.getAttribute("data-value") === 'wft') {
    validationWft()
  }
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


let pathAPI = "/api";
// let pathAPI = "http://52.29.157.23:3000/api";
// let pathAPI = "http://localhost:5000"

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
    item.querySelector(".indicator__name").textContent.trim() === "Stochastic"
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

fetch(`${pathAPI}/last`)
.then(res => res.json())
.then(data => {
  console.log(data)

  const newData = []
  data.forEach(item => {
    const {testingGAGR, optimizationGAGR} = item.data.GAGR
    newData.push([testingGAGR, optimizationGAGR, 0.2])
  })
  myChart.hideLoading()
  myChart.setOption({
    series: {
      data: newData
    }
  })

  // document.querySelectorAll('.table__inner').forEach(item => item.remove())

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
    elem.querySelector("._table-active-btn").addEventListener("click", () => {
      document.querySelector(".custom-graph").style.display = "flex";
      console.log(item);
      areaSeries.setData(item.graphData);
      if (document.querySelector(".graph-info")) {
        document.querySelector(".graph-info").remove();
      }
      const graphInfo = document.createElement("DIV");
      graphInfo.classList.add("graph-info");
      graphInfo.innerHTML = ''
      if(item.data.params.hasOwnProperty('macd')) {
        graphInfo.innerHTML += `
          <div class="graph-info__item">
            Индикатор - MACD
          </div>
          <div class="graph-info__item">
            Fast Period - ${item.data.params.macd.fastPeriod}
          </div>
          <div class="graph-info__item">
            Slow Period  - ${item.data.params.macd.slowPeriod}
          </div>
          <div class="graph-info__item">
            Signal Period - ${item.data.params.macd.signalPeriod}
          </div>
          <div class="graph-info__item">
            HMA Short - ${item.data.params.hma.hmaShort}
          </div>
          <div class="graph-info__item">
            HMA Long- ${item.data.params.hma.hmaLong}
          </div>
          <div class="graph-info__item">
            HMA Filter - ${item.data.params.hmaFilter}
          </div>
        `
      } else if(item.data.params.hasOwnProperty('stoch')) {
        graphInfo.innerHTML += `
          <div class="graph-info__item">
            Индикатор - Stochastic
          </div>
          <div class="graph-info__item">
            K Period - ${item.data.params.stoch.kPeriod}
          </div>
          <div class="graph-info__item">
            K Smoothing Period - ${item.data.params.stoch.kSmoothingPeriod}
          </div>
          <div class="graph-info__item">
            D Period - ${item.data.params.stoch.dPeriod}
          </div>
          <div class="graph-info__item">
            HMA - ${item.data.params.hma.hma}
          </div>
          <div class="graph-info__item">
            HMA Filter - ${item.data.params.hma.hmaFilter}
          </div>
        `
      }
      graphInfo.innerHTML += `
        <div class="graph-info__item">
          Stop Loss - ${item.data.params.params.stopLoss}
        </div>
        <div class="graph-info__item">
          Take Profit - ${item.data.params.params.takeProfit}
        </div>
        <div class="graph-info__item">
          Breakeven Level - ${item.data.params.params.breakevenLevel}
        </div>
        <div class="graph-info__item">
          Indent Breakeven Level  - ${item.data.params.params.indentBreakevenLevel}
        </div>
        <div class="graph-info__item">
          Тайм фрейм - ${item.data.params.timeFrame}
        </div>
        <div class="graph-info__item">
          Валюты - ${item.data.params.symbol}
        </div>
        <div class="graph-info__item">
          Стартовый депозит - ${item.data.params.config.deposit}$
        </div>
        <div class="graph-info__item">
          Объем лота - ${item.data.params.config.lotPersent}%
        </div>
        <div class="graph-info__item">
          Размер плеча - ${item.data.params.config.leverage}
        </div>
        <div class="graph-info__item">
          Комиссия - ${item.data.params.config.commission}
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
      document.querySelector(".custom-graph__content").append(graphInfo);
      if(document.querySelector(".custom-graph__content .graph-positions")) {
        document.querySelector(".custom-graph__content .graph-positions").remove();
      }
      document.querySelector('.custom-graph__content').scrollTo(0, 0)
      const graphPositions = document.createElement('DIV')
      if(item.positions) {
        graphPositions.classList.add('graph-positions')
        document.querySelector(".custom-graph__content").append(graphPositions)
        const graphPositionsButton = document.createElement('BUTTON')
        graphPositionsButton.classList.add('graph-positions__more')
        graphPositionsButton.textContent = 'Загрузить больше информации'
        graphPositions.append(graphPositionsButton)
        graphPositionsButton.addEventListener('click', e => {
          graphPositionsButton.remove()
          graphPositions.classList.add('active')
          item.positions.forEach(i => {
            const graphPositionsItem = document.createElement('PRE')
            graphPositionsItem.innerHTML = ''
            for (let key in i) {
              graphPositionsItem.innerHTML += `<div>${key}: ${i[key]}</div>`
            }
            graphPositions.append(graphPositionsItem)
          })
        })
      }
    });
  });
})
.catch(err => console.log(err))

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
              const newData = []
              data.forEach(item => {
                if(item.data.GAGR)
                {
                  const {testingGAGR, optimizationGAGR} = item.data.GAGR
                  newData.push([testingGAGR, optimizationGAGR, 0.2])
                }
              })
              myChart.setOption({
                series: {
                  data: newData
                }
              })
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
                    console.log(item.data.params);
                    graphInfo.innerHTML = ''
                    if(item.data.params.hasOwnProperty('macd')) {
                      graphInfo.innerHTML += `
                        <div class="graph-info__item">
                          Индикатор - MACD
                        </div>
                        <div class="graph-info__item">
                          Fast Period - ${item.data.params.macd.fastPeriod}
                        </div>
                        <div class="graph-info__item">
                          Slow Period  - ${item.data.params.macd.slowPeriod}
                        </div>
                        <div class="graph-info__item">
                          Signal Period - ${item.data.params.macd.signalPeriod}
                        </div>
                        <div class="graph-info__item">
                          HMA Short - ${item.data.params.hma.hmaShort}
                        </div>
                        <div class="graph-info__item">
                          HMA Long- ${item.data.params.hma.hmaLong}
                        </div>
                        <div class="graph-info__item">
                          HMA Filter - ${item.data.params.hmaFilter}
                        </div>
                      `
                    } else if(item.data.params.hasOwnProperty('stoch')) {
                      graphInfo.innerHTML += `
                        <div class="graph-info__item">
                          Индикатор - Stochastic
                        </div>
                        <div class="graph-info__item">
                          K Period - ${item.data.params.stoch.kPeriod}
                        </div>
                        <div class="graph-info__item">
                          K Smoothing Period - ${item.data.params.stoch.kSmoothingPeriod}
                        </div>
                        <div class="graph-info__item">
                          D Period - ${item.data.params.stoch.dPeriod}
                        </div>
                        <div class="graph-info__item">
                          HMA - ${item.data.params.hma.hma}
                        </div>
                        <div class="graph-info__item">
                          HMA Filter - ${item.data.params.hma.hmaFilter}
                        </div>
                      `
                    }
                    graphInfo.innerHTML += `
                      <div class="graph-info__item">
                        Stop Loss - ${item.data.params.params.stopLoss}
                      </div>
                      <div class="graph-info__item">
                        Take Profit - ${item.data.params.params.takeProfit}
                      </div>
                      <div class="graph-info__item">
                        Breakeven Level - ${item.data.params.params.breakevenLevel}
                      </div>
                      <div class="graph-info__item">
                        Indent Breakeven Level  - ${item.data.params.params.indentBreakevenLevel}
                      </div>
                      <div class="graph-info__item">
                        Тайм фрейм - ${item.data.params.timeFrame}
                      </div>
                      <div class="graph-info__item">
                        Валюты - ${item.data.params.symbol}
                      </div>
                      <div class="graph-info__item">
                        Стартовый депозит - ${item.data.params.config.deposit}$
                      </div>
                      <div class="graph-info__item">
                        Объем лота - ${item.data.params.config.lotPersent}%
                      </div>
                      <div class="graph-info__item">
                        Размер плеча - ${item.data.params.config.leverage}
                      </div>
                      <div class="graph-info__item">
                        Комиссия - ${item.data.params.config.commission}
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
                    document.querySelector(".custom-graph__content").append(graphInfo);
                    if(document.querySelector(".custom-graph__content .graph-positions")) {
                      document.querySelector(".custom-graph__content .graph-positions").remove();
                    }
                    document.querySelector('.custom-graph__content').scrollTo(0, 0)
                    const graphPositions = document.createElement('DIV')
                    if(item.positions) {
                      graphPositions.classList.add('graph-positions')
                      document.querySelector(".custom-graph__content").append(graphPositions)
                      const graphPositionsButton = document.createElement('BUTTON')
                      graphPositionsButton.classList.add('graph-positions__more')
                      graphPositionsButton.textContent = 'Загрузить больше информации'
                      graphPositions.append(graphPositionsButton)
                      graphPositionsButton.addEventListener('click', e => {
                        graphPositionsButton.remove()
                        graphPositions.classList.add('active')
                        item.positions.forEach(i => {
                          const graphPositionsItem = document.createElement('PRE')
                          graphPositionsItem.innerHTML = ''
                          for (let key in i) {
                            graphPositionsItem.innerHTML += `<div>${key}: ${i[key]}</div>`
                          }
                          graphPositions.append(graphPositionsItem)
                        })
                      })
                    }
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
          totalSteps *= ((defaultExpert[itemStop.name] - defaultExpert[itemStart.name]) / defaultExpert[itemStep.name] + 1)
          itemError = true
        }
      }

      if (!itemError) {
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
  if(expert[item] === false || expert[item] === true) {
    document.querySelector(`#expert input[name="${item}"]`).checked =
        expert[item];
    } else {
    document.querySelector(`#expert input[name="${item}"]`).value =
      expert[item];
  }
}
document.querySelectorAll('#expert .expert__value-row:last-child').forEach(item => {
  if(!item.querySelector('#toggle-btn').checked) {
    item.querySelectorAll('input[type=number]').forEach(i => i.disabled = true)
  }
})
document.querySelectorAll('#expert input[type="number"]').forEach((item) => {
  item.addEventListener("change", (e) => {
    expert[e.target.name] = e.target.value;
    localStorage.setItem("expert", JSON.stringify(expert));
  });
  item.addEventListener("input", () => {
    console.log(expert)
    document.querySelector(".expert__button-total").textContent =
      calcExpert().toFixed() + ' проходов';
  });
});
document.querySelector('#expert input[name=hmaFilterEnableb]').addEventListener("change", (e) => {
  expert[e.target.name] = e.target.checked;
  console.log(expert.hmaFilterEnableb, e.target.checked);
  localStorage.setItem("expert", JSON.stringify(expert));
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



let wft = {}
function validationWft () {
  let error = false
  if(document.querySelector('#wtfModal input[name="optimizationContinuity"]') && document.querySelector('#wtfModal input[name="testContinuity"]')) {
    const countMonthTest = +document.querySelector('#wtfModal input[name="optimizationContinuity"]').value + +document.querySelector('#wtfModal input[name="testContinuity"]').value
    document.querySelector('#wtfModal input[name="timeFrom"]').setAttribute('max', moment(document.querySelector('#wtfModal input[name="timeTo"]').value).subtract(countMonthTest, 'months').subtract(1, 'days').format('YYYY-MM-DD'))
  }
  document.querySelectorAll('#wtfModal input[type=number], #wtfModal input[type=date]').forEach(item => {
    if(item.validity.valid && item.value) {
      item.parentNode.style.outlineColor = ''
    } else {
      item.parentNode.style.outlineColor = 'red'
      error = true
    }
  })
  if(error) {
    document.querySelector('#testingTrigger').style.outlineColor = 'red'
    errors.modelTesting = true
  } else {
    document.querySelector('#testingTrigger').style.outlineColor = ''
    errors.modelTesting = false
  }
}
if (localStorage.getItem("wft")) {
  wftLocal = JSON.parse(localStorage.getItem("wft"))
  for (item in wftLocal) {
    document.querySelector(`#wtfModal input[name="${item}"]`).value = wftLocal[item]
  }
} else {
  if(document.querySelector('#wtfModal input[type="date"][name$=From]')) {
    document.querySelector('#wtfModal input[type="date"][name$=From]').value = moment().subtract(3, 'months').subtract(1, 'days').format('YYYY-MM-DD')
  }
  if(document.querySelector('#wtfModal input[type="date"][name$=To]')) {
    document.querySelector('#wtfModal input[type="date"][name$=To]').value = moment().format('YYYY-MM-DD')
  }
}
document.querySelectorAll("#wtfModal input[type=number], #wtfModal input[type=date]").forEach(item => {
  if(item.name.match(/To$/)) {
    item.setAttribute('max', moment().format('YYYY-MM-DD'))
  }
  if (item.type === "number") {
    wft[item.name] = +item.value;
  } else {
    wft[item.name] = item.value;
  }
})
localStorage.setItem("wft", JSON.stringify(wft))
if(panelTab === 'wft') {
  validationWft()
}
document.querySelectorAll('#wtfModal input[type=number], #wtfModal input[type=date]').forEach(item => {
  item.addEventListener("input", () => {
    if(item.type === 'number') {
      wft[item.name] = +item.value
    } else {
      wft[item.name] = item.value
    }
    localStorage.setItem("wft", JSON.stringify(wft))
    validationWft()
  })
})

const stepModal = {}
function validationStepModal(element) {
  if(element.name.match(/From$/)) {
    if(document.querySelector(`#stepsModal input[type="date"][name="${element.name.replace(/From$/, 'To')}"]`)) {
      document.querySelector(`#stepsModal input[type="date"][name="${element.name.replace(/From$/, 'To')}"]`).setAttribute('min', moment(element.value).add(1, 'days').format('YYYY-MM-DD'))
    } else {
      element.setAttribute('max', moment().subtract(1, 'days').format('YYYY-MM-DD'))
    }
  } else if(element.name.match(/To$/)) {
    if(document.querySelector(`#stepsModal input[type="date"][name="${element.name.replace(/To$/, 'From')}"]`)) {
      document.querySelector(`#stepsModal input[type="date"][name="${element.name.replace(/To$/, 'From')}"]`).setAttribute('max', moment(element.value).subtract(1, 'days').format('YYYY-MM-DD'))
    }
    element.setAttribute('max', moment().format('YYYY-MM-DD'))
  }
}
function validationStepModalInputs() {
  let validationStepModalInputsError = false
  document.querySelectorAll('#stepsModal input[type="date"]').forEach(element => {
    let error = false
    if(element.getAttribute('min') && element.getAttribute('max')) {
      error = !moment(element.value).isBetween(moment(element.getAttribute('min')).subtract(1, 'days').format('YYYY-MM-DD'), moment(element.getAttribute('max')).add(1, 'days').format('YYYY-MM-DD'))
    } else if(element.getAttribute('max')) {
      error = !moment(element.value).isSameOrBefore(moment(element.getAttribute('max')).format('YYYY-MM-DD'))
    } else if(element.getAttribute('min')) {
      error = !moment(element.value).isSameOrAfter(moment(element.getAttribute('min')).format('YYYY-MM-DD'))
    } else {
      error = !moment(element.value).isValid()
    }
    if(error) {
      validationStepModalInputsError = true
      element.parentNode.style.outlineColor = 'red'
    } else {
      element.parentNode.style.outlineColor = ''
    }
  })
  if(validationStepModalInputsError) {
    document.querySelector('#testingTrigger').style.outlineColor = 'red'
    errors.modelTesting = true
  } else {
    document.querySelector('#testingTrigger').style.outlineColor = ''
    errors.modelTesting = false
  }
  return validationStepModalInputsError
}
if (localStorage.getItem("stepModal")) {
  stepModalLocal = JSON.parse(localStorage.getItem("stepModal"))
  for (item in stepModalLocal) {
    if(document.querySelector(`#stepsModal input[type="date"][name="${item}"]`)) {
      document.querySelector(`#stepsModal input[type="date"][name="${item}"]`).value = stepModalLocal[item]
    }
  }
}
document.querySelectorAll('#stepsModal input[type="date"]').forEach(item => {
  if(!item.value) {
    if(item.name.match(/From$/)) {
      item.value = moment().subtract(1, 'days').format('YYYY-MM-DD')
    } else if(item.name.match(/To$/)) {
      item.value = moment().format('YYYY-MM-DD')
    } else {
      item.value = moment().format('YYYY-MM-DD')
    }
  }
  validationStepModal(item)
  stepModal[item.name] = item.value
})
if(panelTab === 'step') {
  validationStepModalInputs()
}
localStorage.setItem("stepModal", JSON.stringify(stepModal))
document.querySelectorAll("#stepsModal input").forEach(item => {
  item.addEventListener("input", e => {
    console.log(1);
    const validationError = validationStepModal(item)
    if(!validationError) {
      item.parentNode.style.outlineColor = 'red'
    } else {
      item.parentNode.style.outlineColor = ''
    }
    stepModal[item.name] = e.target.value
    validationStepModalInputs()
    localStorage.setItem("stepModal", JSON.stringify(stepModal))
  })
})


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
  if (error || errors.modelTesting) {
    console.log(11);
    return
  }
  console.log(formData);
  if (expertError) {
    return;
  }
  console.log(formData)
  if (panelTab === "wft") {
    document.querySelector('.progress__btn').textContent = 'Stop'
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
    document.querySelector('.progress__btn').textContent = 'Stop'
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
    // .catch((err) => console.log(err));
}, 1000);

// function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
//   var switcherElement = document.createElement("div");
//   switcherElement.classList.add("switcher");

//   var intervalElements = items.map(function (item) {
//     var itemEl = document.createElement("button");
//     itemEl.innerText = item;
//     itemEl.classList.add("switcher-item");
//     itemEl.classList.toggle("switcher-active-item", item === activeItem);
//     itemEl.addEventListener("click", function () {
//       onItemClicked(item);
//     });
//     switcherElement.appendChild(itemEl);
//     return itemEl;
//   });

//   function onItemClicked(item) {
//     if (item === activeItem) {
//       return;
//     }

//     intervalElements.forEach(function (element, index) {
//       element.classList.toggle("switcher-active-item", items[index] === item);
//     });

//     activeItem = item;

//     activeItemChangedCallback(item);
//   }

//   return switcherElement;
// }

// var switcherElement = createSimpleSwitcher(
//   ["Courier New", "Arial", "Times New Roman"],
//   "Trebuchet MS",
//   function (fontFamily) {
//     chart.applyOptions({
//       layout: {
//         fontFamily: fontFamily,
//       },
//     });
//   }
// );

const chartElement = document.createElement("div");
chartElement.classList.add("custom-graph");
const chartElementWrap = document.createElement("div");
chartElementWrap.classList.add("custom-graph__wrap");
chartElement.append(chartElementWrap)
const chartElementContent = document.createElement("div");
chartElementContent.classList.add("custom-graph__content");
chartElementWrap.append(chartElementContent)
const closeGraph = document.createElement("div");
closeGraph.classList.add("custom-graph__close");
setTimeout(() => {
  chartElementContent.append(closeGraph);
}, 100);
closeGraph.addEventListener("click", () => {
  chartElement.style.display = "";
});

var chart = LightweightCharts.createChart(chartElementContent, {
  width: 800,
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
// document.body.appendChild(switcherElement);

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


var myChart = echarts.init(document.getElementById('main'));

// var data1 = [];
// // var data2 = [];
// // var data3 = [];
// var random = function (max) {
//   return (Math.random() * max).toFixed(3);
// };
// var randomM = function (max) {
//   return (Math.random() * max - max / 2).toFixed(3);
// };
// for (var i = 0; i < 50; i++) {
//   data1.push([random(15), randomM(10), 0.2]);
//   // data2.push([random(10), randomM(10), 0.2]);
//   // data3.push([random(15), randomM(10), 0.2]);
// }
option = {
  // width: document.querySelector('.main__table .table').clientWidth,
  animation: false,
  // legend: {
  //   data: ['scatter', 'scatter2', 'scatter3']
  // },
  grid: {
    top: '2%',
    left: '5%',
    right: '3%',
    bottom: '8%',
  },
  tooltip: {
    show: true,
    formatter: function (param) {
      console.log(param);
      return '<div class="sss">testingGAGR: ' + param.value[0] + '<br>optimizationGAGR: ' + param.value[1] + '</div>';
    },
  },
  xAxis: {
    splitLine: {
      lineStyle: {
        color: '#595959',
        width: 1
      }
    },
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#b3b3b3',
        width: 1
      }
    },
    axisTick: {
      show: false
    }
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        color: '#595959',
        width: 1
      }
    },
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#b3b3b3',
        width: 1
      }
    },
    axisTick: {
      show: false
    }
  },
  dataZoom: [
    // {
    //   type: 'slider',
    //   show: true,
    //   xAxisIndex: [0],
    //   start: 1,
    //   end: 35
    // },
    // {
    //   type: 'slider',
    //   show: true,
    //   yAxisIndex: [0],
    //   left: '93%',
    //   start: 29,
    //   end: 36
    // },
    {
      type: 'inside',
      xAxisIndex: [0],
      rangeMode: 2
      // end: 2
      // start: 1,
      // end: 35
    },
    {
      type: 'inside',
      yAxisIndex: [0],
      rangeMode: 2
      // start: 1,
      // end: 36
    }
  ],
  series: [
    {
      name: 'scatter',
      type: 'scatter',
      itemStyle: {
        normal: {
          opacity: 0.8
        }
      },
      // colorBy: '#5ed5a8',
      itemStyle: {
        color: '#5ed5a8'
      },
      symbolSize: function (val) {
        return val[2] * 40;
      },
      // data: data1
    },
    // {
    //   name: 'scatter2',
    //   type: 'scatter',
    //   itemStyle: {
    //     normal: {
    //       opacity: 0.8
    //     }
    //   },
    //   symbolSize: function (val) {
    //     return val[2] * 40;
    //   },
    //   data: data2
    // },
    // {
    //   name: 'scatter3',
    //   type: 'scatter',
    //   itemStyle: {
    //     normal: {
    //       opacity: 0.8
    //     }
    //   },
    //   symbolSize: function (val) {
    //     return val[2] * 40;
    //   },
    //   data: data3
    // }
  ]
};

myChart.setOption(option);

window.addEventListener('resize', () => {
  myChart.resize({
    // width: document.querySelector('.main__table .table').clientWidth
  })
})

myChart.showLoading({
  maskColor: 'rgba(255, 255, 255, 0.4)'
})

myChart.on('click', function(params) {
  document.querySelectorAll('.main .table .table__inner button')[params.dataIndex].click()
});
