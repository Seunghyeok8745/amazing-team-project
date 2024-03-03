const swiper = new Swiper('.card_slider', {
  direction: 'horizontal',
  slidesPerView: 3,
  slidesPerGroup: 3,
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

// 페이지네이션 업데이트 함수
function updatePagination() {
  const totalSlides = swiper.slides.length;
  const totalPages = Math.ceil(totalSlides / 4);
  const pagination = document.querySelector('.swiper-pagination');
  const bullets = pagination.querySelectorAll('.swiper-pagination-bullet');
}

// 슬라이드 변경 시 페이지네이션 업데이트
swiper.on('slideChange', function () {
  updatePagination();
});

// 초기 페이지네이션 설정
updatePagination();
