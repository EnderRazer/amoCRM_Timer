const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const createTimerAnimator = () => {
    return (seconds) => {
		//Инициализация начального времени
        const start = new Date();
		//Ожидаемое время
        const expect = new Date(seconds * 1000);
		//Вызываем setInterval для обновления таймера
        const timer = setInterval((start, expect) => {
			//Текущее время
            const now = new Date();
			//Прошедшее время
            const elapsed = new Date(now - start);
			//Форматируем и выводим таймер в нужном формате
            timerEl.innerHTML = elapsed.toLocaleTimeString("ru", {timeZone: 'UTC'}).split(" ")[0];
			//Условие остановки таймера
            if (expect - elapsed <= 0)
                clearInterval(timer)
        }, 100, start, expect);
    };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
	//Форматирование входного значения 
	//Нужны только цифры
    e.target.value = e.target.value.replace(/\D/, '')
});

buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);

    animateTimer(seconds);

    inputEl.value = '';
});