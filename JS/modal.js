(() => {
    const modalLink = document.querySelector('.modal_window');
    const body = document.querySelector('body');
    let currentSlideIdx = 0;
    let pictureID = 0;
    const timeout = 500;

    const slides = [
        '<div><img src="img/port-in-norway.jpg" id="img_0" alt="Port in Norway"></div>',
        '<div><img src="img/iceberg-in-the-sea.jpg" id="img_1" alt="Iceberg in the sea"></div>',
        '<div><img src="img/man-on-the-rock.jpg" id="img_2" alt="Man on the rock"></div>'
    ];

    function renderSlide() {
        const slideContainer = document.querySelector('.galery');
        slideContainer.innerHTML = slides[currentSlideIdx];
        if (window.innerWidth > 600) {
            const secondSlideIdx = currentSlideIdx + 1 >= slides.length ? 0 : currentSlideIdx + 1;
            slideContainer.innerHTML += slides[secondSlideIdx];
            if (window.innerWidth > 900) {
                const thirdSlideIdx = secondSlideIdx + 1 >= slides.length ? 0 : secondSlideIdx + 1;
                slideContainer.innerHTML += slides[thirdSlideIdx];
            }
        }
    }

    renderSlide()

    // Функція отримання номеру зображення після натискання та відкриття модального вікна
    function openModalWindow(pict) {
        const pushPictureID = pict.target.id;
        if (pushPictureID === "") return;
        pictureID = parseInt(pushPictureID.slice(4));
        // Додавання на сторінку вибраного по тапу зображення
        const zoomContainer = document.querySelector('.modal_window_content');
        zoomContainer.innerHTML = slides[pictureID];
        // Прибирання скролу та фіксація контенту на основній сторінці
        const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
        body.style.paddingRight = lockPaddingValue;
        modalLink.classList.add('open');
        body.classList.add('fixed');
    }

    // Функция закриття модального вікна
    function closeModalWindow() {
        modalLink.classList.remove('open');
    // Затримка появи полоски скролла
        setTimeout(function () {
            body.style.paddingRight = '0';
            body.classList.remove('fixed');
        }, timeout);
    }

    // Обробник натискання на зображення та виклик функції 
    const selectPicture = document.querySelector('.galery');
    selectPicture.addEventListener('click', openModalWindow);

    const closeWindow = document.querySelector('.modal_window_close');
    closeWindow.addEventListener('click', closeModalWindow);

    window.addEventListener('resize', renderSlide);

})();