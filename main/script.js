const userInputFieldList = document.querySelectorAll('.user-search-input');
const recommendationList = document.querySelector('.recommendation-swiper');

async function callWithRetry(fn, retries = 3) {
  while (retries-- > 0) {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) {
        throw error;
      }
    }
  }
  return new Error(`Out of retries`); // Probably using an `Error` subclass
}

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

const rednerRecommendation = (spotName, spotDescription, imageURL) => {
  const template = `
  <div class="card swiper-slide">
    <div class="image-box">
      <img src="${imageURL}" alt="" />
      <h3 class="name">${spotName}</h3>
      <p class="content-demo">
        ${spotDescription}
      </p>
    </div>
  </div>`;

  recommendationList.innerHTML += template;
};

const cityRecommendation = async () => {
  const recommandationList = await getTravelRecommendation();

  recommandationList.forEach(recommendation => {
    console.log(recommendation);
    const placeName = recommendation.placeName;
    const placeDescription =
      recommendation.placeDescription.length > 100
        ? recommendation.placeDescription.slice(0, 100) + '...'
        : recommendation.placeDescription;
    getCityImage(recommendation.placeName).then(photoURL =>
      rednerRecommendation(placeName, placeDescription, photoURL)
    );
  });
};

callWithRetry(() => cityRecommendation());
