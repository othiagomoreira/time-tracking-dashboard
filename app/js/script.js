const container = document.querySelector('#cards');
const buttons = document.querySelectorAll('.report__btn');

const activeButton = (btn) => {
    buttons.forEach((button) => button.classList.remove('report__btn--active'));

    btn.classList.add('report__btn--active');
};

const clearScreenCards = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => card.remove());
};

const calcTimefame = (option) => {
    if (option === 'daily') {
        return 'Yasterday';
    } else if (option === 'weekly') {
        return 'Last Week';
    } else {
        return 'Last Month';
    }
};

async function createCards(clickedButton) {
    clearScreenCards();

    const res = await fetch('./assets/data.json');
    const data = await res.json();

    data.forEach((activity) => {
        const name = activity.title;
        const timefameData = activity.timeframes[clickedButton];
        const previousTimefame = calcTimefame(clickedButton);

        const cardEl = document.createElement('article');
        cardEl.classList.add('card');

        cardEl.innerHTML = `
                <div class="card__content">
					<div class="card__assignment">
						<h2 class="card__title">${name}</h2>
						<img class="card__icon" src="images/icon-ellipsis.svg" alt="settings icon">
					</div>

					<div class="card__date">
						<div class="card__hours">${timefameData.current}hrs</div>
						<div class="card__description">${previousTimefame} - ${timefameData.previous}hrs</div>
					</div>
				</div>`;

        container.append(cardEl);
    });
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const clickedButton = button.dataset.option;

        activeButton(button);
        createCards(clickedButton);
    });
});

buttons[1].click();
