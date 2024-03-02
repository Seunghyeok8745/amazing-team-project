const userInputFieldList = document.querySelectorAll('.user-search-input');

console.log('hello');

const swiper = new Swiper('.card_slider', {
  direction: 'horizontal',
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 50,
  loop: false,
  speed: 1000,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});

document.addEventListener('DOMContentLoaded', function () {
  const imgBoxes = document.querySelectorAll('.img_box');
  imgBoxes.forEach(function (box) {
    box.addEventListener('mouseenter', function () {
      this.querySelector('.slide-title').style.opacity = '0';
      this.querySelector('.slide-subtitle').style.opacity = '0';
      const overlayTexts = this.querySelectorAll('.overlay .slide-content *');
      overlayTexts.forEach(function (text) {
        text.style.color = 'white';
      });
    });
    box.addEventListener('mouseleave', function () {
      this.querySelector('.slide-title').style.opacity = '1';
      this.querySelector('.slide-subtitle').style.opacity = '1';
    });
  });
});

userInputFieldList.forEach(userInputField => {
  console.log(userInputField.value);
  userInputField.addEventListener('keypress', event => {
    // console.log('enter pressed');
    if (event.key === 'Enter') {
      const keyword = userInputField.value;
      console.log(keyword);
      window.open(`../page2/index.html?city=${keyword}`, '_self');
    }
  });
});
