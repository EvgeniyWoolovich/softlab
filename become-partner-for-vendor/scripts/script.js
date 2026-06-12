window.addEventListener('DOMContentLoaded', () => {
    const TABLE_SIZE = 768;
    const SOFTWARE_TYPE = 'software';
    const EQUIPMENT_TYPE = 'equipment';

    const elements = {
        softwareButton: document.getElementById('software'),
        equipmentButton: document.getElementById('equipment'),
        openButton: document.getElementById('open'),
        softwareList: document.getElementById('software-list'),
        equipmentList: document.getElementById('equipment-list'),
        softwareCards: document.querySelectorAll('#software-list .our-partners__card'),
        equipmentCards: document.querySelectorAll('#equipment-list .our-partners__card')
    };

    const state = {
        isMobile: window.innerWidth <= TABLE_SIZE,
        currentType: SOFTWARE_TYPE,
        visibleCounts: {
            [SOFTWARE_TYPE]: window.innerWidth <= TABLE_SIZE ? 5 : 16,
            [EQUIPMENT_TYPE]: window.innerWidth <= TABLE_SIZE ? 5 : 16
        },
        loadStep: window.innerWidth <= TABLE_SIZE ? 5 : 16
    };

    const hideExtraCards = (type) => {
        const cards = type === SOFTWARE_TYPE ? elements.softwareCards : elements.equipmentCards;
        const visibleCount = state.visibleCounts[type];

        cards.forEach((card, index) => {
            card.classList.toggle('hidden', index >= visibleCount);
        });

        updateButtonText();
    };

    const loadMoreCards = () => {
        const type = state.currentType;
        const cards = type === SOFTWARE_TYPE ? elements.softwareCards : elements.equipmentCards;
        const currentVisible = state.visibleCounts[type];

        if (currentVisible >= cards.length) {
            return;
        }

        const newVisibleCount = Math.min(currentVisible + state.loadStep, cards.length);
        state.visibleCounts[type] = newVisibleCount;

        for (let i = currentVisible; i < newVisibleCount; i++) {
            cards[i].classList.remove('hidden');
        }

        updateButtonText();
    };

    const updateButtonText = () => {
        const type = state.currentType;
        const cards = type === SOFTWARE_TYPE
            ? elements.softwareCards
            : elements.equipmentCards;
        const visibleCount = state.visibleCounts[type];

        elements.openButton.textContent =
            visibleCount >= cards.length
                ? 'Загружено всё'
                : 'Посмотреть всех партнеров';
    };

    const switchTab = (type) => {
        elements.softwareList.classList.toggle('hidden', type !== SOFTWARE_TYPE);
        elements.equipmentList.classList.toggle('hidden', type !== EQUIPMENT_TYPE);

        elements.softwareButton.classList.toggle('select', type === SOFTWARE_TYPE);
        elements.equipmentButton.classList.toggle('select', type === EQUIPMENT_TYPE);

        state.currentType = type;
        updateButtonText();
    };

    hideExtraCards(SOFTWARE_TYPE);
    hideExtraCards(EQUIPMENT_TYPE);

    elements.softwareButton.addEventListener('click', () => switchTab(SOFTWARE_TYPE));
    elements.equipmentButton.addEventListener('click', () => switchTab(EQUIPMENT_TYPE));
    elements.openButton.addEventListener('click', loadMoreCards);

    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth <= TABLE_SIZE;
        if (newIsMobile !== state.isMobile) {
            state.isMobile = newIsMobile;
            state.visibleCounts[SOFTWARE_TYPE] = newIsMobile ? 5 : 16;
            state.visibleCounts[EQUIPMENT_TYPE] = newIsMobile ? 5 : 16;
            state.loadStep = newIsMobile ? 5 : 16;

            hideExtraCards(SOFTWARE_TYPE);
            hideExtraCards(EQUIPMENT_TYPE);
        }
    });
});