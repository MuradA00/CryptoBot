document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.popup__close').forEach(i => {
    i.addEventListener('click', e => {
      e.target.closest('.popup').classList.remove('active')
      setTimeout(() => {
        e.target.closest('.popup').style = ''
      }, 300);
    })
  })
})

const pathAPI = "http://52.29.157.23:3000/api";

// Indicator
let indicator = 'stoch';
document.querySelectorAll('.popup[data-name=expertSettings] .popup__item').forEach(item => {
  if(!item.classList.contains('stoch')) {
    item.style.display = 'none'
  }
})
document.querySelector(".indicator button").addEventListener("click", (e) => {
  document.querySelector(".indicator").classList.toggle("active");
});
document.querySelectorAll('.indicator__item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelector('.indicator .header__btn span').textContent = item.querySelector('.indicator__name').textContent
    indicator = item.querySelector('.indicator__name').getAttribute('data-value')
    document.querySelector(".indicator").classList.toggle("active");
    document.querySelectorAll('.popup[data-name=expertSettings] .popup__item').forEach(i => {
      console.log(item.querySelector('.indicator__name').getAttribute('data-value'));
      if(i.classList.contains(item.querySelector('.indicator__name').getAttribute('data-value'))) {
        i.style.display = 'flex'
      } else {
        i.style.display = 'none'
      }
    })
  })
})
window.addEventListener("click", (e) => {
  if (!e.target.closest(".indicator")) {
    document.querySelector(".indicator").classList.remove("active");
  }
});

document.querySelectorAll('.selector-row__item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.selector-row__item').forEach(i => i.classList.remove('_selector-active'))
    item.classList.toggle('_selector-active')
  })
})

document.querySelector("._hiddenTrigger button").addEventListener("click", () => {
  document.querySelector(".hidden-cells").classList.toggle("_active-cells");
  document.querySelector("._hiddenTrigger button").classList.toggle("_noTouch");
});

window.addEventListener("click", (e) => {
  if (!e.target.closest("._hiddenTrigger")) {
    document.querySelector(".hidden-cells").classList.remove("_active-cells");
    document.querySelector("._hiddenTrigger button").classList.remove("_noTouch");
  }
});

document.querySelectorAll('.header__row--right .header__button-row > button').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault()
    if(!document.querySelector(`.popup[data-name=${item.id}]`).classList.contains('active')) {
      document.querySelector(`.popup[data-name=${item.id}]`).style = 'display: flex !important'
      setTimeout(() => {
        document.querySelector(`.popup[data-name=${item.id}]`).classList.add('active')
      }, 10)
    }
  })
})

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

document.querySelector('.start-stream').addEventListener('click', () => {
  const formData = {
    config: {
      params: {
        hma: {
          hmaFilter: +document.querySelector('input[name=hmaFilter]').value,
          hmaShort: +document.querySelector('input[name=hmaShort]').value,
          hmaLong: +document.querySelector('input[name=hmaLong]').value
        },
        params: {
          stopLoss: +document.querySelector('input[name=stopLoss]').value,
          takeProfit: +document.querySelector('input[name=takeProfit]').value,
          breakevenLevel: +document.querySelector('input[name=breakevenLevel]').value,
          indentBreakevenLevel: +document.querySelector('input[name=indentBreakevenLevel]').value
        },
        config: {
          deposit: 1000000,
          lotPersent: +document.querySelector('input[name=lotPersent]').value,
          leverage: +document.querySelector('input[name=leverage]').value,
          commission: 0
        },
        timeFrame: document.querySelector('.selector-row__item._selector-active').getAttribute('data-value'),
        symbol: document.querySelector('input[name=symbol]:checked').id
      }
    }
  }
  if(indicator === 'stoch') {
    formData.config.params.stoch = {
      fastPeriod: +document.querySelector('input[name=fastPeriod]').value,
      slowPeriod: +document.querySelector('input[name=slowPeriod]').value,
      signalPeriod: +document.querySelector('input[name=signalPeriod]').value,
    }
  }
  if(indicator === 'macd') {
    formData.config.params.stoch = {
      fastPeriod: +document.querySelector('input[name=fastPeriod]').value,
      slowPeriod: +document.querySelector('input[name=slowPeriod]').value,
      signalPeriod: +document.querySelector('input[name=signalPeriod]').value,
    }
  }
  console.log(formData);
  fetch(`${pathAPI}/bot/trader`, {
    method: 'POST',
    headers: {
      api_key: '782b8e0676d762070ba6414cf1c37d3c15824ea08e56eb15862d64c50ff82530',
      api_secret: '50fe98167536f1a5aa4147d2d4f33246630e1fdbcd394c6847f31196413dee05'
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})

document.querySelector('#trade.header__btn').addEventListener('click', e => {
  console.log('get');
  e.preventDefault()
  fetch(`${pathAPI}/bot/traders`, {
    headers: {
      api_key: '782b8e0676d762070ba6414cf1c37d3c15824ea08e56eb15862d64c50ff82530',
      api_secret: '50fe98167536f1a5aa4147d2d4f33246630e1fdbcd394c6847f31196413dee05'
    },
  }).then(async (response) => {
    const res = await response.json();
    console.log(res);
  }).catch(err => console.log(err))
})

var chartElement = document.createElement('div');
chartElement.classList.add('graph-custom')

document.querySelector('.chart-block').appendChild(chartElement);

window.addEventListener('resize', () => {
  chart.resize(document.querySelector('.graph-custom').offsetWidth, 300)
})

var chart = LightweightCharts.createChart(chartElement, {
	width: document.querySelector('.graph-custom').offsetWidth,
  height: 300,
  priceScale: 'left',
	layout: {
    backgroundColor: 'transparent',
    textColor: 'rgba(255, 255, 255, 0.9)',
		fontFamily: 'Comic Sans MS',
    fontFamily: 'Inter',
	},
  grid: {
		vertLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
		horzLines: {
			color: 'rgba(197, 203, 206, 0.5)',
		},
	},
	leftPriceScale: {
    visible: true,
    borderColor: 'rgba(197, 203, 206, 1)',
  },
	rightPriceScale: {
    visible: false,
		borderColor: 'rgba(197, 203, 206, 1)',
	},
	timeScale: {
		borderColor: 'rgba(197, 203, 206, 1)',
	},
});

var areaSeries = chart.addAreaSeries({
  topColor: 'rgba(94, 213, 168, 0.15)',
  bottomColor: 'rgba(94, 213, 168, 0.15)',
  lineColor: 'rgba(94, 213, 168, 1)',
  lineWidth: 2,
});

areaSeries.setData([
{
    "time": "2021-02-07",
    "value": 903252.305660776
  },
  {
    "time": "2021-02-08",
    "value": 824555.4617612461
  },
  {
    "time": "2021-02-09",
    "value": 822088.6458040659
  },
  {
    "time": "2021-02-10",
    "value": 993728.6420772834
  },
  {
    "time": "2021-02-11",
    "value": 1012611.6495196922
  },
  {
    "time": "2021-02-12",
    "value": 1011348.7299382992
  },
  {
    "time": "2021-02-13",
    "value": 676622.0512403984
  },
  {
    "time": "2021-02-14",
    "value": 1215981.6471389318
  },
  {
    "time": "2021-02-15",
    "value": 1190471.6115654416
  },
  {
    "time": "2021-02-16",
    "value": 1205548.9793737128
  },
  {
    "time": "2021-02-17",
    "value": 1187515.8836830312
  },
  {
    "time": "2021-02-18",
    "value": 802206.012761356
  },
  {
    "time": "2021-02-19",
    "value": 1131819.9950706863
  },
  {
    "time": "2021-02-20",
    "value": 1139871.3435704936
  },
  {
    "time": "2021-02-21",
    "value": 947395.1412238004
  },
  {
    "time": "2021-02-22",
    "value": 1447358.0619556052
  },
  {
    "time": "2021-02-23",
    "value": 1509853.410942378
  },
  {
    "time": "2021-02-24",
    "value": 1611618.2179830277
  },
  {
    "time": "2021-02-25",
    "value": 1345575.196351628
  },
  {
    "time": "2021-02-26",
    "value": 1337254.5485194686
  },
  {
    "time": "2021-02-27",
    "value": 727076.1894724783
  },
  {
    "time": "2021-02-28",
    "value": 1205021.402361486
  },
  {
    "time": "2021-03-01",
    "value": 1471661.3231036644
  },
  {
    "time": "2021-03-02",
    "value": 1035013.4829769675
  },
  {
    "time": "2021-03-03",
    "value": 1474423.881218233
  },
  {
    "time": "2021-03-04",
    "value": 1584659.0605415185
  },
  {
    "time": "2021-03-05",
    "value": 1159779.4589191857
  },
  {
    "time": "2021-03-06",
    "value": 1215205.9402876454
  },
  {
    "time": "2021-03-07",
    "value": 1266078.1552065795
  },
  {
    "time": "2021-03-08",
    "value": 1312550.4040613947
  }
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
})