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


let panelTab = 'stage'
panel.addEventListener("click", function (e) {
  const selectorItems = document.querySelectorAll(".panel-selector__item");
  const target = e.target;
  Array.from(selectorItems).forEach((item) => {
    item.classList.remove("_active-selector");
  });
  panelTab = target.getAttribute('data-value')
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

// document.querySelectorAll('input[type="number"]').forEach(input => {
//   input.addEventListener('input', e => {
//     console.log(e.target.value);
//     const value = e.target.value
//     e.target.value = value.replace(/\d/, '')
//   })
// })

const pathAPI = "http://52.29.157.23:3000/api";
// const
let indicator = null;
if(!localStorage.getItem("indicator")) {
  localStorage.setItem("indicator", "stoch")
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
  })
);
window.addEventListener("click", (e) => {
  if (!e.target.closest(".indicator")) {
    document.querySelector(".indicator").classList.remove("active");
  }
});
document.querySelectorAll('.expert__value-row').forEach(item => {
  item.querySelector('.expert__button input').addEventListener('change', e => {
    if(e.target.checked) {
      item.querySelectorAll('input[type="number"]').forEach(i => i.disabled = true)
    } else {
      item.querySelectorAll('input[type="number"]').forEach(i => i.disabled = false)
    }
  })
})

let currency = null
if(localStorage.getItem("currency")) {
  currency = JSON.parse(localStorage.getItem("currency"))
  currency.forEach(item => {
    document.querySelector(`.hidden-cells__item input[id="${item}"]`).checked = true
  })
} else {
  currency = []
  document.querySelectorAll('.hidden-cells__item input').forEach(item => {
    if(item.checked) {
      currency.push(item.id)
    }
  })
  localStorage.setItem('currency', JSON.stringify(currency))
}

document.querySelectorAll('.hidden-cells__item input').forEach(item => item.addEventListener('change', e => {
  if(e.target.checked) {
    currency.push(e.target.id)
  } else {
    currency = currency.filter(c => c !== e.target.id)
  }
  localStorage.setItem('currency', JSON.stringify(currency))
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

let period = JSON.parse(localStorage.getItem("period")) || [];
document.querySelectorAll(".selector-row__item").forEach((item) => {
  if (period.find((c) => c === item.getAttribute('data-value'))) {
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
        period.push(elem.getAttribute('data-value'));
      }
    });
    localStorage.setItem("period", JSON.stringify(period));
  })
);


let timeFrom = localStorage.getItem('timeFrom') || null
if(timeFrom) {
  document.querySelector(`.steps-list__total input[name="timeFrom"]`).value = timeFrom
}
document.querySelector('.steps-list__total input[name="timeFrom"]').addEventListener('change', e => {
  timeFrom = e.target.value
  localStorage.setItem('timeFrom', timeFrom)
})
let timeTo = localStorage.getItem('timeTo') || null
if(timeTo) {
  document.querySelector(`.steps-list__total input[name="timeTo"]`).value = timeTo
}
document.querySelector('.steps-list__total input[name="timeTo"]').addEventListener('change', e => {
  timeTo = e.target.value
  localStorage.setItem('timeTo', timeTo)
})


let expert = {}
if(localStorage.getItem('expert')) {
  expert = JSON.parse(localStorage.getItem('expert'))
} else {
  document.querySelectorAll('#expert input[type="number"]').forEach(item => {
    expert[item.name] = item.value
  })
  localStorage.setItem('expert', JSON.stringify(expert))
}
for (item in expert) {
  document.querySelector(`#expert input[name="${item}"][type="number"]`).value = expert[item]
}
document.querySelectorAll('#expert input[type="number"]').forEach(item => {
  item.addEventListener('change', e => {
    expert[e.target.name] = e.target.value
    localStorage.setItem('expert', JSON.stringify(expert))
  })
})


const filters = JSON.parse(localStorage.getItem('filters')) || {}
for (item in filters) {
  document.querySelector(`#filter-modal input[type="text"][name="${item}"]`).value = filters[item]
}
document.querySelectorAll('#filter-modal input[type="text"]').forEach(item => {
  filters[item.name] = item.value
  localStorage.setItem('filters', JSON.stringify(filters))
})
document.querySelectorAll('#filter-modal input[type="text"]').forEach(item => {
  item.addEventListener('change', e => {
    filters[e.target.name] = e.target.value
    localStorage.setItem('filters', JSON.stringify(filters))
  })
})


const wft = JSON.parse(localStorage.getItem('wft')) || {}
for (item in wft) {
  document.querySelector(`#wtfModal input[name="${item}"]`).value = wft[item]
}
document.querySelectorAll('#wtfModal input').forEach(item => {
  wft[item.name] = item.value
  localStorage.setItem('wft', JSON.stringify(wft))
})
document.querySelectorAll('#wtfModal input').forEach(item => {
  item.addEventListener('change', e => {
    wft[e.target.name] = e.target.value
    localStorage.setItem('wft', JSON.stringify(wft))
  })
})


const config = JSON.parse(localStorage.getItem('config')) || {}
for (item in config) {
  document.querySelector(`#optimization input[type="text"][name="${item}"]`).value = config[item]
}
document.querySelectorAll('#optimization input[type="text"]').forEach(item => {
  config[item.name] = item.value
  localStorage.setItem('config', JSON.stringify(config))
})
document.querySelectorAll('#optimization input[type="text"]').forEach(item => {
  item.addEventListener('change', e => {
    config[e.target.name] = e.target.value
    localStorage.setItem('config', JSON.stringify(config))
  })
})


const helperItem = (elem) => {
  // if(document.querySelector(`input[name="${elem}Start"]`).closest('.expert__value-row').querySelector('input[type="checkbox"]').checked) {
  //   console.log(1123);
  //   return [
  //     0, 0, 1
  //   ];
  // }
  // console.log(document.querySelector(`input[name="${elem}Start"]`).closest('.expert__value-row').querySelector('input[type="checkbox"]').checked, document.querySelector(`input[name="${elem}Start"]`).closest('.expert__value-row').querySelector('input[type="checkbox"]'));
  return [
    +document.querySelector(`input[name="${elem}Start"]`).value,
    +document.querySelector(`input[name="${elem}Step"]`).value,
    +document.querySelector(`input[name="${elem}Stop"]`).value,
  ];
};

document.querySelector(".progress__button").addEventListener("click", () => {
  let error = false
  if(!currency.length) {
    error = true
    document.querySelector('._hiddenTrigger').style.outline = '1px solid red'
    setTimeout(() => {
      document.querySelector('._hiddenTrigger').style.outline = ''
    }, 2000);
  }
  if(!period.length) {
    error = true
    document.querySelector('.selector-row._gap-row').style.outline = '1px solid red'
    setTimeout(() => {
      document.querySelector('.selector-row._gap-row').style.outline = ''
    }, 2000);
  }
  const formData = {
    // wft: {
    //   timeFrom: moment(timeFrom).valueOf(),
    //   timeTo: moment(timeTo).valueOf(),
    // },
    indicators: {
      name: indicator,
      hmaFilter: {
        period: helperItem('hmaFilter')
      }
    },
    symbol: currency,
    timeFrame: period,
    params: {
      stopLoss: helperItem('stopLoss'),
      stopLtakeProfitoss: helperItem('takeProfit'),
      breakevenLevel: helperItem('breakevenLevel'),
      indentBreakevenLevel: helperItem('indentBreakevenLevel'),
    },
    filters: filters,
    config: config
  };
  if (indicator === "stoch") {
    formData.indicators.stoch = {
      kPeriod: helperItem('kPeriod'),
      kSmoothingPeriod: helperItem('kSmoothingPeriod'),
      dPeriod: helperItem('dPeriod')
    };
    // formData.indicators.hmaFilter = {
    //   period: helperItem('hmaFilter')
    // };
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
    // formData.indicators.hmaFilter = {
    //   period: helperItem('hmaFilter')
    // };
    formData.indicators.hmaShort = {
      period: helperItem('hmaShort')
    };
    formData.indicators.hmaLong = {
      period: helperItem('hmaLong')
    };
  }
  if (panelTab === 'step') {

  }
  if (panelTab === 'wft') {
    formData.wft = {
      ...wft,
      timeFrom: moment(wft.timeFrom).valueOf(),
      timeTo: moment(wft.timeTo).valueOf()
    }
  }
  if(error) {
    console.error(error)
  }
  console.log(JSON.stringify(formData));
  if(panelTab === 'wft') {
    document.querySelector('.progress__btn').textContent = 'Stop'
    fetch(`${pathAPI}/wft`, {
      method: "POST",
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }
});

setInterval(() => {
  fetch(`${pathAPI}/progress`)
    .then(res => res.json())
    .then(data => {
      document.querySelector('.progress__counter').textContent = data + '%'
      document.querySelector('.progress__percent').classList.add('--startBar')
      document.querySelector('.progress__percent').style.width = data + '%'
    })
    .catch(err => console.log(err))
}, 1000);
