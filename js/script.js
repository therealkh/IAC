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
  const menuList = document.querySelector('.menu__list');

  const rangeSliderActiveDot = document.querySelector('.range-slider-active-dot');
  const teamSliderActiveDot = document.querySelector('.team-slider-active-dot');
  const header_container = document.querySelector('header>.container');
  const range_container = document.querySelector('.range>.container');
  const range_wrapper = document.querySelector('.range__wrapper');

  const galleryPhotos = document.querySelector('.gallery__photos');
  const selects = document.querySelectorAll('.select');
  let header_container_left, range_container_left, range_left_offset
  let isMobileMenu = false;
  let unlock = true;
  let timeout = 400;

  $(document).ready(function () {

    $('.range-slider').slick({
      infinite: false,
      variableWidth: true,
      dots: true,
      appendDots: '.range-slider__dots',
      prevArrow: '.range-slider__p',
      nextArrow: '.range-slider__n',
    });
    $('.team-slider__slider').slick({
      //infinite: false,
      variableWidth: true,
      dots: true,
      appendDots: '.team-slider__dots',
      prevArrow: '.team-slider__p',
      nextArrow: '.team-slider__n',
    });

    const rangeSliderActiveDot = document.querySelector('.range-slider-active-dot');
    const rangeSliderDots = document.querySelectorAll('.range-slider__dots .slick-dots li');
    const rangeSliderDotsContainer = document.querySelector('.range-slider__dots .slick-dots');
    $('.range-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      let offset = rangeSliderDots[nextSlide].getBoundingClientRect().left - rangeSliderDotsContainer.getBoundingClientRect().left;
      rangeSliderActiveDot.style.left = offset + 'px';
    });

    const teamSliderActiveDot = document.querySelector('.team-slider-active-dot');
    const teamSliderDots = document.querySelectorAll('.team-slider__dots .slick-dots li');
    const teamSliderDotsContainer = document.querySelector('.team-slider__dots .slick-dots');
    const teamSlides = document.querySelectorAll('.team-slider__single-slide');
    const teamInfoName = document.querySelector('.team-info__name');
    const teamInfoPost = document.querySelector('.team-info__post');
    $('.team-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      let offset = teamSliderDots[nextSlide].getBoundingClientRect().left - teamSliderDotsContainer.getBoundingClientRect().left;
      teamSliderActiveDot.style.left = offset + 'px';
      teamInfoName.style.opacity = 0;
      teamInfoPost.style.opacity = 0;
      setTimeout(() => {
        teamInfoName.textContent = teamSlides[nextSlide].getAttribute('data-name');
        teamInfoPost.textContent = teamSlides[nextSlide].getAttribute('data-post');
        teamInfoName.style.opacity = '';
        teamInfoPost.style.opacity = '';
      }, 200)
    });
    rangeSliderActiveDot.style.width = `${rangeSliderDots[0].clientWidth}px`;
    teamSliderActiveDot.style.width = `${teamSliderDots[0].clientWidth}px`;
    Fresh();
  });
  menuList.style.height = document.querySelector('.intro').offsetHeight + 'px';
  //Listeners
  selects.forEach((item, index, arr) => {
    const active = item.querySelector('span');
    const list = item.querySelector('ul.select__list');
    const options = list.querySelectorAll('li');
    const input = item.querySelector('input[type=text]');
    let bottom = active.getBoundingClientRect().bottom;
    active.addEventListener('click', () => {
      item.classList.toggle('opened');
    })
    options.forEach((option) => {
      option.addEventListener('click', () => {
        let value = option.textContent;
        active.textContent = value;
        input.setAttribute('value', value);
        item.classList.remove('opened');
      })
    })
  });



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
    Fresh();
  })


  // Functions
  function openMenu() {
    menu.classList.add('opened');
    document.querySelector('.intro__video').style.opacity = 0;
    if (document.documentElement.clientWidth < 768) {
      document.querySelector('.intro__content').style.opacity = 0;
    }
    //header.style.overflow = 'visible'
  }
  function closeMenu() {
    menu.classList.remove('opened');
    document.querySelector('.intro__video').style.opacity = 1;
    document.querySelector('.intro__content').style.opacity = 1;
    //header.style.overflow = 'hidden'
  }

  function Fresh() {
    header_container_left = (parseFloat(window.getComputedStyle(header_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(header_container).getPropertyValue("padding-left")));
    range_container_left = (parseFloat(window.getComputedStyle(range_container).getPropertyValue("margin-left")) + parseFloat(window.getComputedStyle(range_container).getPropertyValue("padding-left")));
    range_left_offset = range_container_left - header_container_left;
    range_wrapper.style.marginLeft = `-${range_left_offset}px`;
    rangeSliderActiveDot.style.width = `${document.querySelectorAll('.range-slider__dots .slick-dots li')[0].clientWidth}px`;
    teamSliderActiveDot.style.width = `${document.querySelectorAll('.team-slider__dots .slick-dots li')[0].clientWidth}px`;

    const stage1 = document.getElementById('stage1');
    const stage2 = document.getElementById('stage2');
    const stage3 = document.getElementById('stage3');
    let horizontalOffset = stage2.getBoundingClientRect().left - stage1.getBoundingClientRect().right;
    let verticalOffset = stage3.getBoundingClientRect().top - stage1.getBoundingClientRect().bottom;

    const verticalArrows = document.querySelectorAll('.work-stages__stage.vertical .arrow');
    const horizontalArrows = document.querySelectorAll('.work-stages__stage.horizontal .arrow');
    if (document.documentElement.clientWidth < 992) {
      verticalOffset = stage2.getBoundingClientRect().top - stage1.getBoundingClientRect().bottom;
      //console.log(verticalOffset);
    }
    verticalArrows.forEach((item) => {
      item.style.maxHeight = verticalOffset + 'px';
      item.style.height = verticalOffset + 'px';
    })
    horizontalArrows.forEach((item) => {
      if (document.documentElement.clientWidth >= 992) {
        item.style.width = horizontalOffset + 'px';
        item.style.maxWidth = horizontalOffset + 'px';
      }
      else {
        item.style.width = '';
        item.style.maxWidth = '';
        item.style.height = verticalOffset + 'px';
      }
    })

    if (document.documentElement.clientWidth > 767) {
      galleryPhotos.style.height = (galleryPhotos.clientWidth * 630 / 1280) + 'px';
    }
    else {
      galleryPhotos.style.height = (galleryPhotos.clientWidth * 653.68 / 281.25) + 'px';
    }


    document.querySelector('.team__map').style.height = document.querySelector('.team__map').getBoundingClientRect().width + 'px';
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
