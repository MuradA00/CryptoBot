const selectorBtns = document.querySelectorAll('.selector-row__item')
const optimModal = document.getElementById('optimization')
const optimTrigger = document.getElementById('optim-trigger')
const closeOptimModal = document.getElementById('optim-close')
const expertModal = document.getElementById('expert')
const expertTrigger = document.getElementById('expert-trigger')
const closeExpertModal = document.getElementById('expert-close')

optimTrigger.addEventListener('click', function() {
  optimModal.classList.add('--show-modal')
  closeOptimModal.addEventListener('click', () => {
    optimModal.classList.remove('--show-modal')
  })
})

expertTrigger.addEventListener('click', function() {
  expertModal.classList.add('--show-modal')
  closeExpertModal.addEventListener('click', () => {
    expertModal.classList.remove('--show-modal')
  })
})

selectorBtns.forEach(selectorBtn => {
  selectorBtn.addEventListener('click', () => {
    selectorBtn.classList.toggle('_selector-active')
  })
})

gsap.fromTo('.main', { opacity: 0, y: 65}, {opacity: 1, y: 0, duration: 1, ease: Power4.ease})
gsap.fromTo('.header', { opacity: 0, y: -75}, {opacity: 1, y: 0, duration: .8, ease: Power4.ease, delay: .3})

