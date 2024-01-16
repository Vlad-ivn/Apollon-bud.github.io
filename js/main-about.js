const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    
  });
  document.addEventListener('DOMContentLoaded', function () {
    // Получаем ссылку на изображение
    var goToTopImg = document.getElementById('goToTopBtn');

    goToTopImg.addEventListener('click', function () {
        // Прокручиваем страницу к верху
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

/*burger-menu*/
const menuBtn = document.getElementById("burger");
const headerMenu = document.querySelector(".header");

menuBtn.addEventListener("click", function() {
    headerMenu.classList.toggle("open");
    
    // Отримуємо <body>
    const body = document.body;

    // Додаємо або видаляємо клас залежно від наявності класу "open"
    if (headerMenu.classList.contains("open")) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "visible";
    }
});

// Додаємо обробник події для елементів меню для приховування меню при кліці
const menuItems = document.querySelectorAll(".header__menu-list-item-left a");
menuItems.forEach(item => {
    item.addEventListener("click", function() {
        headerMenu.classList.remove("open");
        document.body.style.overflow = "visible";
    });
});
