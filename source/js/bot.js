document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".popup__close").forEach((i) => {
    i.addEventListener("click", (e) => {
      e.target.closest(".popup").classList.remove("active");
      setTimeout(() => {
        e.target.closest(".popup").style = "";
      }, 300);
    });
  });
});

const pathAPI = "/api";
// const pathAPI = "http://52.29.157.23:3000/api";

const headers = () => {
  return {
    api_key: document.querySelector('input[name="api-key"]').value,
    api_secret: document.querySelector('input[name="api-secret"]').value,
  };
};

// Indicator
let indicator = "stoch";
if (!localStorage.getItem("bot-indicator")) {
  localStorage.setItem("bot-indicator", "stoch");
}
indicator = localStorage.getItem("bot-indicator") || "stoch";
document.querySelector(".indicator button span").textContent =
  document.querySelector(
    `.indicator__name[data-value='${indicator}']`
  ).textContent;
document
  .querySelectorAll(".popup[data-name=expertSettings] .popup__item")
  .forEach((i) => {
    if (i.classList.contains(indicator)) {
      i.style.display = "flex";
    } else {
      i.style.display = "none";
    }
  });
document.querySelector(".indicator button").addEventListener("click", (e) => {
  document.querySelector(".indicator").classList.toggle("active");
});
document.querySelectorAll(".indicator__item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelector(".indicator .header__btn span").textContent =
      item.querySelector(".indicator__name").textContent;
    localStorage.setItem(
      "bot-indicator",
      item.querySelector(".indicator__name").getAttribute("data-value")
    );
    indicator = item
      .querySelector(".indicator__name")
      .getAttribute("data-value");
    document.querySelector(".indicator").classList.toggle("active");
    document
      .querySelectorAll(".popup[data-name=expertSettings] .popup__item")
      .forEach((i) => {
        if (
          i.classList.contains(
            item.querySelector(".indicator__name").getAttribute("data-value")
          )
        ) {
          i.style.display = "flex";
        } else {
          i.style.display = "none";
        }
      });
  });
});
window.addEventListener("click", (e) => {
  if (!e.target.closest(".indicator")) {
    document.querySelector(".indicator").classList.remove("active");
  }
});

const statPositionLables = {
  symbol: {
    title: "Валютная пара",
  },
  data: {
    title: "Дата и время открытия сделки",
  },
  entryPrice: {
    title: "Цена открытия",
    endSymbol: "$",
  },
  stopLoss: {
    title: "Цена Стоп-Лосс",
    endSymbol: "$",
  },
  takeProfit: {
    title: "Цена Тейк-Профит",
    endSymbol: "$",
  },
  curentPNL: {
    title: "Текущий P&L в $ (%)",
    endSymbol: "%",
  },
  stopLossPNL: {
    title: "Расчетный  P&L в $ (%) если сработает Стоп-Лосс",
  },
  takeProfitPNL: {
    title: "Расчетный  P&L в $ (%) если сработает Тейк-Профит",
    endSymbol: "%",
  },
  // symbol: {
  //   title: 'Риск на депозит в $ (%)',
  //   endSymbol: '%'
  // },
};

const formatStatPositionLabel = (key, value) => {
  if (key === "data") {
    return moment(value).format("HH:mm DD.MM.YYYY");
  }

  if (!isNaN(+value)) {
    if (key.endSymbol) {
      return value.toFixed(2) + key.endSymbol;
    }
    return value.toFixed(2);
  } else {
    return value;
  }
};

// Symbol
if (localStorage.getItem("bot-symbol")) {
  document.querySelector(
    `input[name=symbol][id=${localStorage.getItem("bot-symbol")}]`
  ).checked = true;
}
document.querySelectorAll("input[name=symbol]").forEach((item) =>
  item.addEventListener("input", (e) => {
    localStorage.setItem("bot-symbol", e.target.id);
  })
);

// Expert
const expertFields = document.querySelectorAll(
  ".popup[data-name=expertSettings] input.popup__input"
);

if (localStorage.getItem("bot-expert")) {
  const botExpertObject = JSON.parse(localStorage.getItem("bot-expert"));
  for (key in botExpertObject) {
    document.querySelector(
      `.popup[data-name=expertSettings] input.popup__input[name=${key}]`
    ).value = botExpertObject[key];
  }
}
const saveExpert = () => {
  const newValues = {};
  expertFields.forEach((item) => {
    newValues[item.name] = item.value;
  });
  localStorage.setItem("bot-expert", JSON.stringify(newValues));
};
expertFields.forEach((item) =>
  item.addEventListener("input", () => {
    saveExpert();
  })
);

// General
const generalFields = document.querySelectorAll(
  ".popup[data-name=generalSettings] input"
);

if (localStorage.getItem("bot-general")) {
  const botGeneralObject = JSON.parse(localStorage.getItem("bot-general"));
  for (key in botGeneralObject) {
    if (
      document.querySelector(
        `.popup[data-name=generalSettings] input[name=${key}]`
      )
    ) {
      document.querySelector(
        `.popup[data-name=generalSettings] input[name=${key}]`
      ).value = botGeneralObject[key];
    }
  }
}
const saveGeneral = () => {
  const newValues = {};
  generalFields.forEach((item) => {
    newValues[item.name] = item.value;
  });
  localStorage.setItem("bot-general", JSON.stringify(newValues));
};
generalFields.forEach((item) =>
  item.addEventListener("input", () => {
    saveGeneral();
  })
);

// Period
if (localStorage.getItem("bot-period")) {
  document
    .querySelectorAll(".selector-row__item")
    .forEach((i) => i.classList.remove("_selector-active"));
  document
    .querySelector(
      `.selector-row__item[data-value='${localStorage.getItem("bot-period")}']`
    )
    .classList.add("_selector-active");
}
document.querySelectorAll(".selector-row__item").forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".selector-row__item")
      .forEach((i) => i.classList.remove("_selector-active"));
    item.classList.toggle("_selector-active");
    localStorage.setItem("bot-period", item.getAttribute("data-value"));
  });
});
document
  .querySelector("input[name=leverage]")
  .addEventListener("input", (e) => {
    const value = e.target.value.replace(/\D/g, "");
    console.log(value);
    if (+value > 25) {
      e.target.value = 25;
    } else if (+value < 0) {
      e.target.value = 0;
    } else {
      e.target.value = value;
    }
  });

document
  .querySelector("._hiddenTrigger button")
  .addEventListener("click", () => {
    document.querySelector(".hidden-cells").classList.toggle("_active-cells");
    document
      .querySelector("._hiddenTrigger button")
      .classList.toggle("_noTouch");
  });

window.addEventListener("click", (e) => {
  if (!e.target.closest("._hiddenTrigger")) {
    document.querySelector(".hidden-cells").classList.remove("_active-cells");
    document
      .querySelector("._hiddenTrigger button")
      .classList.remove("_noTouch");
  }
});

document
  .querySelectorAll(".header__row--right .header__button-row > button")
  .forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        !document
          .querySelector(`.popup[data-name=${item.id}]`)
          .classList.contains("active")
      ) {
        document.querySelector(`.popup[data-name=${item.id}]`).style =
          "display: flex !important";
        setTimeout(() => {
          document
            .querySelector(`.popup[data-name=${item.id}]`)
            .classList.add("active");
        }, 10);
      }
    });
  });

// {
//   api_key: 'balabalalba',
//   api_secret 'lewjrojweoirj',
//   config: {
//     params: {
//       macd: {
//         fastPeriod: 10,
//         slowPeriod: 16,
//         signalPeriod: 11,
//       },
//       hma: {
//         hmaFilter: 0,
//         hmaShort: 6,
//         hmaLong: 10,
//       },
//       params: {
//         stopLoss: 2,
//         takeProfit: 3,
//         breakevenLevel: 1,
//         indentBreakevenLevel: 1,
//       },
//       config: {
//         deposit: 1000000,
//         lotPersent: 10,
//         leverage: 10,
//         commission: 0.01,
//       },
//       timeFrame: "1m",
//       symbol: "BTCUSDT",
//     },
//   };
// }

const loadBalance = () => {
  axios
    .get(`${pathAPI}/bot/balance`, {
      headers: headers(),
    })
    .then(({ data }) => {
      if (data.balance) {
        document.querySelector(".chart-block__price").textContent =
          data.balance.toFixed() + "$";
      }
    });
};

axios
  .get(`${pathAPI}/bot/positions`, { headers: headers() })
  .then(({ data }) => {
    data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("stat__item");
      div.innerHTML = `
        <div class="stat__text">${item.symbol} ${moment(item.data).format(
        "HH:mm DD.MM.YYYY"
      )} - ${item.side}</div>
        <button data-popup="statPos" class="stat__btn">Link</button>
      `;
      document.querySelector("#openPositionList").append(div);
      div.querySelector(".stat__btn").addEventListener("click", (e) => {
        const statPopup = document.querySelector(
          `.popup[data-name=${div
            .querySelector(".stat__btn")
            .getAttribute("data-popup")}]`
        );
        statPopup.style = "display: flex !important";
        statPopup.classList.add("active");

        statPopup.querySelectorAll(".popup__item").forEach((i) => i.remove());
        for (key in statPositionLables) {
          if (item[key]) {
            const div = document.createElement("div");
            div.classList.add("popup__item");
            div.innerHTML = `
              <div class="popup__text">
                ${statPositionLables[key].title}
              </div>

              <div class="popup__some">
                ${formatStatPositionLabel(key, item[key])}
              </div>
            `;
            statPopup.querySelector(".popup__content").append(div);
          }
        }
      });
    });
  });

loadBalance();
document
  .querySelector(".popup[data-name=generalSettings] .popup__close")
  .addEventListener("click", loadBalance);

document
  .querySelectorAll("input[name=takeProfit], input[name=stopLoss]")
  .forEach((item) => {
    item.addEventListener("input", (e) => {
      item.value = item.value.replace(/\,/g, ".");
    });
  });

document.querySelector(".start-stream").addEventListener("click", () => {
  const formData = {
    hmaFilter: +document.querySelector("input[name=hmaFilter]").value,
    stopLoss: +document.querySelector("input[name=stopLoss]").value,
    takeProfit: +document.querySelector("input[name=takeProfit]").value,
    breakevenLevel: +document.querySelector("input[name=breakevenLevel]").value,
    indentBreakevenLevel: +document.querySelector(
      "input[name=indentBreakevenLevel]"
    ).value,
    lotPersent: +document.querySelector("input[name=lotPersent]").value,
    leverage: +document.querySelector("input[name=leverage]").value,
    maxPositions: +document.querySelector("input[name=maxPositions]").value,
    timeFrame: document
      .querySelector(".selector-row__item._selector-active")
      .getAttribute("data-value"),
    symbol: document.querySelector("input[name=symbol]:checked").id,
  };
  if (indicator === "stoch") {
    formData.kPeriod = +document.querySelector("input[name=kPeriod]").value;
    formData.kSmoothingPeriod = +document.querySelector(
      "input[name=kSmoothingPeriod]"
    ).value;
    formData.dPeriod = +document.querySelector("input[name=dPeriod]").value;
    formData.hmaShort = +document.querySelector("input[name=hma]").value;
  }
  if (indicator === "macd") {
    formData.fastPeriod = +document.querySelector("input[name=fastPeriod]")
      .value;
    formData.slowPeriod = +document.querySelector("input[name=slowPeriod]")
      .value;
    formData.signalPeriod = +document.querySelector("input[name=signalPeriod]")
      .value;
    formData.hmaShort = +document.querySelector("input[name=hmaShort]").value;
    formData.hmaLong = +document.querySelector("input[name=hmaLong]").value;
  }

  axios
    .post(`${pathAPI}/bot/trader`, formData, {
      headers: headers(),
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

const loadTraders = () => {
  axios
    .get(`${pathAPI}/bot/traders`, {
      headers: headers(),
    })
    .then((data) => {
      document
        .querySelectorAll('.popup[data-name="trade"] .popup__item')
        .forEach((item) => item.remove());
      data.data.forEach((item) => {
        const elem = document.createElement("div");
        elem.classList.add("popup__item");
        elem.innerHTML = `
        <div class="popup__text">
          ${item.symbol} ${moment(item.startDate).format("DD.MM.YYYY HH:mm")}
        </div>
        <button class="btn-red popup__btn">Stop</button>
      `;
        elem.querySelector(".btn-red").addEventListener("click", () => {
          deleteTrader(item.symbol);
        });
        document
          .querySelector('.popup[data-name="trade"] .popup__content')
          .append(elem);
      });
    });
};

const deleteTrader = (symbol) => {
  console.log(symbol);
  axios
    .delete(`${pathAPI}/bot/trader`, {
      headers: headers(),
      data: { symbol },
    })
    .then(function (response) {
      loadTraders();
    })
    .catch(function (error) {
      console.log(error);
    });
};

document.querySelector("#trade.header__btn").addEventListener("click", (e) => {
  loadTraders();
  document
    .querySelectorAll('.popup[data-name="trade"] .popup__item')
    .forEach((item) => item.remove());
  e.preventDefault();
  fetch(`${pathAPI}/bot/traders`, {})
    .then(async (response) => {
      const res = await response.json();
      res.forEach((item) => {
        const elem = document.createElement("div");
        elem.classList.add("popup__item");
        elem.innerHTML = `
          <div class="popup__text">
            ${item.symbol} ${moment(item.startDate).format("DD.MM.YYYY HH:mm")}
          </div>
          <button class="btn-red popup__btn">Stop</button>
        `;
        elem.querySelector(".btn-red").addEventListener("click", () => {
          axios
            .delete(`${pathAPI}/bot/trader`, {
              headers: headers,
              data: { symbol: item.symbol },
            })
            .then(function (response) {
              elem.remove();
            })
            .catch(function (error) {
              console.log(error);
            });
        });
        document
          .querySelector('.popup[data-name="trade"] .popup__content')
          .append(elem);
      });
    })
    .catch((err) => console.log(err));
});

var chartElement = document.createElement("div");
chartElement.classList.add("graph-custom");

document.querySelector(".chart-block").appendChild(chartElement);

window.addEventListener("resize", () => {
  chart.resize(document.querySelector(".graph-custom").offsetWidth, 300);
});

var chart = LightweightCharts.createChart(chartElement, {
  width: document.querySelector(".graph-custom").offsetWidth,
  height: 300,
  priceScale: "left",
  layout: {
    backgroundColor: "transparent",
    textColor: "rgba(255, 255, 255, 0.9)",
    fontFamily: "Comic Sans MS",
    fontFamily: "Inter",
  },
  grid: {
    vertLines: {
      color: "rgba(197, 203, 206, 0.5)",
    },
    horzLines: {
      color: "rgba(197, 203, 206, 0.5)",
    },
  },
  leftPriceScale: {
    visible: true,
    borderColor: "rgba(197, 203, 206, 1)",
  },
  rightPriceScale: {
    visible: false,
    borderColor: "rgba(197, 203, 206, 1)",
  },
  timeScale: {
    borderColor: "rgba(197, 203, 206, 1)",
  },
});

var areaSeries = chart.addAreaSeries({
  topColor: "rgba(94, 213, 168, 0.15)",
  bottomColor: "rgba(94, 213, 168, 0.15)",
  lineColor: "rgba(94, 213, 168, 1)",
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

// new Chartist.Line('#chart1', {
//   labels: [1, 2, 3, 4, 5, 6, 7, 8],
//   series: [[9.3, 8, 9.5, 7, 7.5, 5, 9.2, 8]]
// }, {
//   width: '100%',
//   height: '400px',
//   showArea: true,
//   color: '#5ED5A8',
//   showPoint: false,
//   fullWidth: true,
//   axisY: {
//     offset: 40,
//     labelInterpolationFnc: function(value) {
//       return `$${value}M`
//     },
//     scaleMinSpace: 15,
//     onlyInteger: true
//   },
//   high: 10,
//   low: 0,
//   divisor: 1
// });

fetch(`${pathAPI}/last`).then(async (response) => {
  const res = await response.json();
});
