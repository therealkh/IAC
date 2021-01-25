$(document).ready(function () {

  $('.range-slider').slick({
    infinite: false,
    variableWidth: true,
    dots: true,
    appendDots: '.range-slider__dots',
    prevArrow: '.range-slider__p',
    nextArrow: '.range-slider__n',
  });
  const rangeSliderActiveDot = document.querySelector('.range-slider-active-dot');
  const rangeSliderDots = document.querySelectorAll('.range-slider__dots .slick-dots li');
  const rangeSliderDotsContainer = document.querySelector('.range-slider__dots .slick-dots');
  $('.range-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    let offset = rangeSliderDots[nextSlide].getBoundingClientRect().left - rangeSliderDotsContainer.getBoundingClientRect().left;
    rangeSliderActiveDot.style.left = offset + 'px';
  });
  rangeSliderActiveDot.style.width = `${rangeSliderDots[0].clientWidth}px`;
});



document.addEventListener("DOMContentLoaded", () => {
  const ppOpeners = document.querySelectorAll('.popup-open');
  const ppClosers = document.querySelectorAll('.popup-close');
  const popups = document.querySelectorAll('.popup');
  const lockPadding = document.querySelectorAll('.lock-padding');
  const body = document.querySelector('body');

  const headerLangActive = document.querySelector('.active-lang');
  const headerLang = document.querySelector('.header__lang');
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('.menu__btn');
  const menu = document.querySelector('.menu');

  const rangeSliderActiveDot = document.querySelector('.range-slider-active-dot');
  const rangeSliderDots = document.querySelectorAll('.range-slider__dots .slick-dots li');

  let isMobileMenu = false;
  let unlock = true;
  let timeout = 400;


  const header_container = document.querySelector('header>.container');
  const range_container = document.querySelector('.range>.container');
  const range_wrapper = document.querySelector('.range__wrapper');
  let header_container_left = (parseFloat(window.getComputedStyle(header_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(header_container).getPropertyValue("padding-left")));
  let range_container_left = (parseFloat(window.getComputedStyle(range_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(range_container).getPropertyValue("padding-left")));
  let range_left_offset = range_container_left - header_container_left;
  range_wrapper.style.marginLeft = `-${range_left_offset}px`;



  //Listeners
  headerLangActive.addEventListener('click', () => {
    headerLang.classList.toggle('opened');
  })
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    if (menuBtn.classList.contains('active')) {
      openMenu();
    }
    else {
      closeMenu();
    }
  })
  window.addEventListener('resize', () => {
    let header_container_left = (parseFloat(window.getComputedStyle(header_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(header_container).getPropertyValue("padding-left")));
    let range_container_left = (parseFloat(window.getComputedStyle(range_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(range_container).getPropertyValue("padding-left")));
    let range_left_offset = range_container_left - header_container_left;
    range_wrapper.style.marginLeft = `-${range_left_offset}px`;
    rangeSliderActiveDot.style.width = `${document.querySelector('.range-slider__dots .slick-dots li').clientWidth}px`;
  })


  // Functions
  function openMenu() {
    menu.classList.add('opened');
    //header.style.overflow = 'visible'
  }
  function closeMenu() {
    menu.classList.remove('opened');
    //header.style.overflow = 'hidden'
  }













  //PopUp
  if (ppOpeners.length > 0) {
    for (let i = 0; i < ppOpeners.length; i++) {
      const ppOpener = ppOpeners[i];
      ppOpener.addEventListener('click', (event) => {
        const ppCurrent = document.querySelector(ppOpener.getAttribute('href'));
        openPopup(ppCurrent);
        event.preventDefault();
      })
    }
  }
  if (ppClosers.length > 0) {
    ppClosers.forEach((item, index, arr) => {
      item.addEventListener('click', (event) => {
        const activePopup = document.querySelector('.popup.opened');
        if (activePopup) { closePopup(activePopup) }
        event.preventDefault();
      })
    })
  }
  if (popups.length > 0) {
    for (let i = 0; i < popups.length; i++) {
      popups[i].addEventListener('click', (event) => {
        if (!event.target.closest('.popup__content')) {
          closePopup(popups[i]);
        }
      })
    }
  }
  function openPopup(popup) {
    if (popup && unlock) {
      const popupActive = document.querySelector('.popup.opened');
      if (popupActive) {
        closePopup(popupActive, false);
      }
      else {
        bodyLock();
      }
      popup.classList.add('opened');
      popup.addEventListener('click', (event) => {
        if (!event.target.closest('.popup__content')) {
          closePopup(event.target.closest('.popup'));
        }
      })
    }
  }
  function closePopup(popup, doUnlock = true) {
    if (unlock) {
      popup.classList.remove('opened');
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }
  function openResultPopup(msg = 'Спасибо! Ваша заявка была отправлена.') {
    const msgNode = document.querySelector('#result .result-msg');
    msgNode.textContent = msg;
    openPopup(document.querySelector('#result'));
  }
  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.intro').offsetWidth + 'px';
    //console.log(lockPaddingValue);
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }
  function bodyUnlock() {
    setTimeout(() => {
      if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
          const el = lockPadding[i];
          el.style.paddingRight = '';
        }
      }
      body.style.paddingRight = '';
      body.classList.remove('lock');
    }, timeout);
    unlock = false;
    setTimeout(() => {
      unlock = true;
    }, timeout);
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const activePopup = document.querySelector('.popup.opened');
      closePopup(activePopup);
    }
    //console.log(typeof (e.key));
  })
  //Functions
  function send(form, event, php, succesMSG) {
    const btn = form.querySelector('#formSubmit');

    const oldTextContent = btn.textContent;
    btn.textContent = 'Отправка...';
    btn.setAttribute('disabled', 'disabled');
    console.log("Отправка запроса");
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var req = new XMLHttpRequest();
    req.open('POST', php, true);
    req.onload = function () {
      if (req.status >= 200 && req.status < 400) {
        json = JSON.parse(this.response); // Ебанный internet explorer 11
        console.log(json);

        // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
        if (json.result == "success") {
          // Если сообщение отправлено
          btn.textContent = oldTextContent;
          btn.removeAttribute('disabled');
          openResultPopup(succesMSG);
        } else {
          // Если произошла ошибка
          btn.textContent = oldTextContent;
          btn.removeAttribute('disabled');
          openResultPopup(`Ой... Ошибка. Сообщение не отправлено (${json.result})`);
        }
        // Если не удалось связаться с php файлом
      } else {
        btn.textContent = oldTextContent;
        btn.removeAttribute('disabled');
        openResultPopup('Ошибка сервера. Код ошибки: ' + req.status);
        //alert("Ошибка сервера. Номер: " + req.status);
      }
    };

    // Если не удалось отправить запрос. Стоит блок на хостинге
    req.onerror = function () { alert("Ошибка отправки запроса"); };
    req.send(new FormData(event.target));
  }

})
