const servicesWrap = document.querySelector('.services-wrap');
const loadMoreSection = document.querySelector('.load-more');
const allBlocks = SelectVisibleWorkBlock('services-card');
let NameServicesIsNow = 'services-card'; /*ім'я класу з яким працюємо поточно*/
let ArrayServicesIsNow = []; /*масив класів з яким працюємо поточно*/
let lastBlocksInMyArray = []; /*вибірка елементів з масиву ArrayServicesIsNow де перший елемент > 18 і до кінця масиву*/
let BlocksInUse = []; /*для перевірки */

/* Вибираємо всі 33 блоки  в масив ArrayServicesIsNow */
ArrayServicesIsNow = SelectVisibleWorkBlock(NameServicesIsNow);

/* Передаємо параметр(блоки) ArrayServicesIsNow на перевірку довжини масива */
toggleLast15BlocksVisibility(ArrayServicesIsNow);

function toggleLast15BlocksVisibility(myArray) {
    if (myArray.length > 18) {
        loadMoreSection.style.display = 'block';
        if (myArray[18].style.display === 'none') {
            // Show the last 15 blocks
            lastBlocksInMyArray = Array.from(myArray).slice(18);
            lastBlocksInMyArray.forEach(block => block.style.display = 'block');
        } else {
            // Hide the last 15 blocks
            lastBlocksInMyArray = Array.from(myArray).slice(18);
            lastBlocksInMyArray.forEach(block => block.style.display = 'none');
            console.log("Hiding the last 15 blocks");
        }
    } else {
        loadMoreSection.style.display = 'none';
    }
};

/* Ставить статус стиля всіх блоків services-card в залежності від параметра True False */
function AllBlocksVisibility(booleanParameter) {
    allBlocks.forEach(block => block.style.display = booleanParameter ? 'block' : 'none');
};

/* Вертає масив за вибраним ім'ям класу */
function SelectVisibleWorkBlock(textParameter) {
    return servicesWrap.querySelectorAll('.' + textParameter);
};

loadMoreSection.addEventListener('click', function () {
    toggleLast15BlocksVisibility(ArrayServicesIsNow);
});

function ScrollToMyPossition(myClassName) {
    const element = document.getElementById(myClassName); 
    if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        console.log(`Scrolled to ${myClassName}`);
    } else {
        console.log(`Element with id '${myClassName}' not found`);
    }
}

function smoothScrollTo(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // Время анимации в миллисекундах
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

window.addEventListener("click", function (event) {
    if (event.target.hasAttribute('data-btn')) {
        console.log(`Button clicked with data-btn: ${event.target.getAttribute('data-btn')}`);
        
        AllBlocksVisibility(false);
        NameServicesIsNow = event.target.getAttribute('data-btn');
        ArrayServicesIsNow = SelectVisibleWorkBlock(NameServicesIsNow);
        
        console.log(`New blocks selected: ${ArrayServicesIsNow.length} blocks`);
        
        ArrayServicesIsNow.forEach(block => block.style.display = 'block');
        toggleLast15BlocksVisibility(ArrayServicesIsNow);

        // Прокрутка к блоку services-wrap после клика на кнопку
        const offsetTop = servicesWrap.getBoundingClientRect().top + window.pageYOffset;

        console.log(`servicesWrap found. Offset top: ${offsetTop}`);

        // Используем плавную прокрутку с анимацией
        smoothScrollTo(offsetTop);

        console.log('Scrolling to servicesWrap with animation');
    }
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

/* Contact-Form */
document.addEventListener("DOMContentLoaded", function () {
    // Обработчик события отправки формы
    document.getElementById("telegramForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Предотвращаем стандартное действие отправки формы

        var name = document.getElementsByName("name")[0].value;
        var phone = document.getElementsByName("phone")[0].value;
        var email = document.getElementsByName("email")[0].value;
        var messageBox = document.getElementsByName("comment")[0].value;

        const checkedBox = document.querySelector('.custom-checkbox-label');
        const realCheckbox = document.querySelector('.real-checkbox')
        //const realCheckbox = document.querySelector('.custom-checkbox')

        
        // Проверка, поставлена ли галочка в чекбоксе
        /*if (!realCheckbox.checked) {
            // Если галочка не поставлена, выделить чекбокс красным цветом
            
            checkedBox.style.color = "#FC3300";
            
            return; // Прерываем выполнение функции, чтобы форма не отправлялась
        } else {
            // Если галочка поставлена, сбрасываем цвет чекбокса
            checkedBox.style.color = "";
        }*/
            
        
            
        // Замените на свой токен и ID чата в Telegram
        var telegramBotToken = '6429763059:AAG7FVwzJ19rqWKiUxQU1Bq7uDW417yQvBU';
        var telegramChatID = '602384524';

        // Формируем сообщение для отправки в телеграм
        let mytime = new Date().toLocaleString();
            
        var message = "*Привіт!😎   В мене є нові дані з форми:* " + "\n";
        message += "\n";
        message += "⚜ Ім'я: " + `*${name}*` + "\n";
        message += "⚜ Телефон: " + `*${phone}*` + "\n";
        message += "⚜ Пошта: " + `*${email}*` + "\n";
        message += "⚜ Повідомлення: " + `*${messageBox}*` + "\n";
        message += "\n";
        message += "⌚ Дата та час: " + mytime;

       
        
            

        // Отправляем сообщение в телеграм с использованием Ajax
        const telegramURL = "https://api.telegram.org/bot" + telegramBotToken + "/sendMessage";

        var data = {
            chat_id: telegramChatID,
            text: message,
            parse_mode: "Markdown"
                    
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", telegramURL, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));       
        

        // Очистка полей формы после успешной отправки
        document.getElementById("telegramForm").reset();
        /*document.getElementsByName("name")[0].value = "";
        document.getElementsByName("phone")[0].value = "";
        document.getElementsByName("email")[0].value = "";
        document.getElementsByName("comment")[0].value = "";*/
    });
});




/*button-top*/
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






/*MORE SERVICES
document.addEventListener('DOMContentLoaded', function () {
    const loadMoreButton = document.querySelector('.load-more__container-inner');
    const servicesContainer = document.querySelector('.services');

    if (loadMoreButton) {
        loadMoreButton.addEventListener("click", function (event) {
            const allCards = document.querySelectorAll('.services-card');

            allCards.forEach((card, index) => {
                if (index + 1 >= 19) { // Starting from the 18th block
                    card.classList.toggle('services-card__hiddenNOT');
                }
            });
        });
    }
});*/



/*scroll*/
/*gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    if(ScrollTrigger.isTouch !==1) {
        ScrollSmoother.create({
            wrapper: '.wrapper',
            content: '.content',
            smooth: 1.5
    })

};*/
