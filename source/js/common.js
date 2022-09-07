const selectorBtns = document.querySelectorAll('.selector-row__item'),
      optimModal = document.getElementById('optimization'),
      optimTrigger = document.getElementById('optim-trigger'),
      closeOptimModal = document.getElementById('optim-close'),
      expertModal = document.getElementById('expert'),
      expertTrigger = document.getElementById('expert-trigger'),
      closeExpertModal = document.getElementById('expert-close'),
      filterModal = document.getElementById('filter-modal'),
      filterTrigger = document.getElementById('filterTrigger'),
      filterCloseIcon = document.getElementById('filterClose')


selectorBtns.forEach(selectorBtn => {
  selectorBtn.addEventListener('click', () => {
    selectorBtn.classList.toggle('_selector-active')
  })
})

function openModal(currentModal, closeModal) {
  currentModal.classList.add('--show-modal')
  closeModal.addEventListener('click', () => {
    currentModal.classList.remove('--show-modal');
  })
}

expertTrigger.addEventListener('click', function() {
  openModal(expertModal, closeExpertModal);
})

optimTrigger.addEventListener('click', function() {
  openModal(optimModal, closeOptimModal);
})

filterTrigger.addEventListener('click', function() {
  openModal(filterModal, filterCloseIcon);
})

gsap.fromTo('.main', { opacity: 0, y: 40}, {opacity: 1, y: 0, duration: 1, ease: Power4.ease})
gsap.fromTo('.header', { opacity: 0, y: -75}, {opacity: 1, y: 0, duration: .8, ease: Power4.ease, delay: .3})

const progressButton = document.querySelector('.progress__button'),
      progressCounter = document.querySelector('.progress__counter'),
      initialButton = progressButton,
      progressBar = document.querySelector('.progress__percent'),
      progressNumber = document.querySelector('.progress__counter');




initialButton.addEventListener('click', () => {
  progressActive();
  // if (progressBar.classList.contains('--startBar')) {
  //   progressButton.addEventListener('click', () => {
  //     progressBar.classList.remove('--startBar');
  //     progressNumber.innerHTML = '0%';
  //     initialButton.innerHTML = 'Start';
  //   })
  // } else {
  //   progressActive();
  // }
});

function progressActive() {
  progressBar.classList.toggle('--startBar');
  progressNumber.innerHTML = '23%';
  initialButton.innerHTML = 'Stop';
}

const panel = document.querySelector('.panel-selector')

panel.addEventListener('click', function(e) {
	const selectorItems = document.querySelectorAll('.panel-selector__item')
	const target = e.target
  Array.from(selectorItems).forEach(item => {
  	item.classList.remove('_active-selector')
  })
  target.classList.add('_active-selector');
  if (wtfTrigger.classList.contains('_active-selector')) {
    openWtfModal();
  } else {
    if (stepsTrigger.classList.contains('_active-selector')) {
      testingTrigger.removeEventListener;
      testingTrigger.addEventListener('click', () => {
        stepsModal.classList.add('--show-modal');
        closeStepsIcon.addEventListener('click', () => {
          stepsModal.classList.remove('--show-modal')
        })
      })
    }
  }

})



function openWtfModal() {
  testingTrigger.addEventListener('click', () => {
    wtfModal.classList.add('--show-modal');
    closeWtfIcon.addEventListener('click', () => {
      wtfModal.classList.remove('--show-modal')
    })
  })
}

const stepsTrigger = document.querySelector('._stepsTrigger'),
      wtfTrigger = document.querySelector('._wtfTrigger'),
      testingTrigger = document.getElementById('testingTrigger'),
      wtfModal = document.getElementById('wtfModal'),
      stepsModal = document.getElementById('stepsModal'),
      closeStepsIcon = document.getElementById('stepsClose'),
      closeWtfIcon = document.getElementById('wtfClose')

// function openHiddenModal(currentTrigger, currentModal, testingTrigger, currentCloseIcon) {
//   if (currentTrigger == true) {
//     testingTrigger.addEventListener('click', () => {
//       currentModal.classList.add('--show-modal');
//     }, {once: true});
//     currentCloseIcon.addEventListener('click', () => {
//       currentModal.classList.remove('--show-modal')
//     });
//   }
// }


// openHiddenModal();
