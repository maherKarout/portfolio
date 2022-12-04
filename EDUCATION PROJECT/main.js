let btn = document.querySelector(".button-header-icon");

btn.tongle;
btn.addEventListener("click", () => {
  btn.classList.toggle("active");
});

let nextSwiper = document.querySelector(".swiper-button-next");
let preSwiper = document.querySelector(".swiper-button-prev");

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30,
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 50,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

let mainHeader = document.querySelector(".main-header");
let meeting = document.querySelector(".meeting");

window.onscroll = () => {
  console.log("scrolllllll");
  if (window.pageYOffset >= meeting.offsetTop) {
    mainHeader.classList.add("sticky");
  } else mainHeader.classList.remove("sticky");
};
