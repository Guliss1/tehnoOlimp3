// ===== js/locales.js =====
const translations = {
    ru: {
        // Заголовки
        headerTitle: "🧱 Бетон-тест",
        headerSpan: "плавная анимация",
        headerSubhead: "60 ступеней разрушения · Реалистичные трещины · Динамические осколки",
        // Сетка и сортировка
        gridHeader: "Классы бетона B10–B90",
        gridHint: "▼ выберите класс",
        sortClassAsc: "Класс (А-Я)",
        sortClassDesc: "Класс (Я-А)",
        sortStrengthAsc: "Прочность (↑)",
        sortStrengthDesc: "Прочность (↓)",
        filterAll: "Все классы",
        filterFoundation: "Фундаменты",
        filterWalls: "Стены/перекрытия",
        filterBridges: "Мосты/тоннели",
        filterHighrise: "Высотные",
        filterSpecial: "Спецсооружения",
        favorites: "⭐ Избранное",
        addToFavorites: "Добавить в избранное",
        removeFromFavorites: "Убрать из избранного",
        // Панель деталей
        strengthLabel: "Прочность на сжатие",
        unit: "МПа",
        usageLabel: "🏗️ Применение",
        stagesTitle: "📉 Этапы разрушения",
        stageMicro: "Микротрещины:",
        stageCracks: "Трещины:",
        stageFractures: "Разломы:",
        stageFailure: "Разрушение:",
        // Состояния кадров
        frameStates: ["Целый", "Микротрещины", "Трещины", "Разломы", "Разрушение", "ПОЛНОЕ РАЗРУШЕНИЕ"],
        // Кнопки
        testBtn: "Анимировать разрушение",
        repeatBtn: "Повторить анимацию",
        applyLoad: "Испытать",
        loadTestPlaceholder: "Нагрузка (МПа)",
        // Результат и сравнения
        resultMsg: "Прочность {class} составляет {strength} МПа",
        compareCars: "🚗 3 авто на ладони",
        compareSea: "🌊 Давление в Балтике",
        compareElephants: "🐘 2 слона",
        compCarsDesc: "Давление {strength} МПа — это как {carsCount} групп по 3 автомобиля (4.5 т) на ладони 100 см².",
        compSeaDesc: "Прочность {strength} МПа соответствует давлению на глубине {depth} м. Макс. глубина Балтики — 459 м.",
        compElephantsDesc: "Два слона (10 т) создают давление {strength} МПа на площади {area} см².",
        // Панель сравнения
        compareToggle: "🔍 Сравнить",
        compareTitle: "Сравнение классов бетона",
        comparePlaceholder1: "Выберите первый класс",
        comparePlaceholder2: "Выберите второй класс",
        compareBtn: "▶ Сравнить анимацию",
        compareReset: "Сбросить",
        addToCompare: "➕ Добавить к сравнению",
        removeFromCompare: "➖ Убрать",
        // Новые ключи для детального сравнения
        diffStrength: "Разница в прочности",
        relativeDiff: "Относительная разница",
        stronger: "Более прочный",
        adviceTitle: "💡 Совет",
        adviceEqual: "Оба класса имеют одинаковую прочность. Рекомендуем выбирать исходя из области применения и стоимости.",
        adviceFirst: "Класс {class1} прочнее на {percent}%. Он лучше подходит для ответственных конструкций, где требуется высокая несущая способность.",
        adviceSecond: "Класс {class2} прочнее на {percent}%. Он лучше подходит для ответственных конструкций, где требуется высокая несущая способность.",
        adviceFirstByUsage: "Класс {class1} рекомендуется для {usage1}, а класс {class2} — для {usage2}. Выбирайте в зависимости от задачи.",
        paramStrength: "Прочность (МПа)",
        paramMicro: "Микротрещины",
        paramCracks: "Трещины",
        paramFractures: "Разломы",
        paramFailure: "Разрушение",
        paramUsage: "Применение",
        // График
        chartTitle: "Прочность классов бетона",
        // Тема
        themeLight: "☀️",
        themeDark: "🌙",
        // Применение для каждого класса
        usage: {
            B10: "Подготовка оснований, стяжки",
            B15: "Фундаменты для легких построек",
            B20: "Стены подвалов, перекрытия",
            B25: "Фундаменты малоэтажных зданий",
            B30: "Мостовые конструкции",
            B35: "Высотные здания",
            B40: "Эстакады, путепроводы",
            B45: "Опоры мостов, тоннели",
            B50: "Несущие колонны небоскребов",
            B55: "Спецсооружения",
            B60: "Фортификационные сооружения",
            B70: "Сверхвысокопрочные конструкции",
            B80: "Сейсмостойкие высотные здания",
            B90: "Экспериментальные проекты"
        }
    },
    en: {
        // Headers
        headerTitle: "🧱 Concrete test",
        headerSpan: "smooth animation",
        headerSubhead: "60 destruction stages · Realistic cracks · Dynamic fragments",
        // Grid and sorting
        gridHeader: "Concrete classes B10–B90",
        gridHint: "▼ select class",
        sortClassAsc: "Class (A-Z)",
        sortClassDesc: "Class (Z-A)",
        sortStrengthAsc: "Strength (↑)",
        sortStrengthDesc: "Strength (↓)",
        filterAll: "All classes",
        filterFoundation: "Foundations",
        filterWalls: "Walls/floors",
        filterBridges: "Bridges/tunnels",
        filterHighrise: "High-rise",
        filterSpecial: "Special structures",
        favorites: "⭐ Favorites",
        addToFavorites: "Add to favorites",
        removeFromFavorites: "Remove from favorites",
        // Detail panel
        strengthLabel: "Compressive strength",
        unit: "MPa",
        usageLabel: "🏗️ Application",
        stagesTitle: "📉 Destruction stages",
        stageMicro: "Microcracks:",
        stageCracks: "Cracks:",
        stageFractures: "Fractures:",
        stageFailure: "Failure:",
        // Frame states
        frameStates: ["Intact", "Microcracks", "Cracks", "Fractures", "Destruction", "COMPLETE DESTRUCTION"],
        // Buttons
        testBtn: "Animate destruction",
        repeatBtn: "Repeat animation",
        applyLoad: "Apply",
        loadTestPlaceholder: "Load (MPa)",
        // Result and comparisons
        resultMsg: "Strength of {class} is {strength} MPa",
        compareCars: "🚗 3 cars on palm",
        compareSea: "🌊 Pressure in the Baltic Sea",
        compareElephants: "🐘 2 elephants",
        compCarsDesc: "Pressure {strength} MPa equals {carsCount} groups of 3 cars (4.5 t) on a palm of 100 cm².",
        compSeaDesc: "Strength {strength} MPa corresponds to pressure at a depth of {depth} m. Max depth of the Baltic Sea is 459 m.",
        compElephantsDesc: "Two elephants (10 t) exert pressure of {strength} MPa on an area of {area} cm².",
        // Compare panel
        compareToggle: "🔍 Compare",
        compareTitle: "Concrete classes comparison",
        comparePlaceholder1: "Select first class",
        comparePlaceholder2: "Select second class",
        compareBtn: "▶ Compare animation",
        compareReset: "Reset",
        addToCompare: "➕ Add to compare",
        removeFromCompare: "➖ Remove",
        // New keys for detailed comparison
        diffStrength: "Strength difference",
        relativeDiff: "Relative difference",
        stronger: "Stronger",
        adviceTitle: "💡 Advice",
        adviceEqual: "Both classes have equal strength. Choose based on application and cost.",
        adviceFirst: "Class {class1} is stronger by {percent}%. It is better for critical structures requiring high load capacity.",
        adviceSecond: "Class {class2} is stronger by {percent}%. It is better for critical structures requiring high load capacity.",
        adviceFirstByUsage: "Class {class1} is recommended for {usage1}, while class {class2} is for {usage2}. Choose according to your task.",
        paramStrength: "Strength (MPa)",
        paramMicro: "Microcracks",
        paramCracks: "Cracks",
        paramFractures: "Fractures",
        paramFailure: "Failure",
        paramUsage: "Application",
        // Chart
        chartTitle: "Concrete class strength",
        // Theme
        themeLight: "☀️",
        themeDark: "🌙",
        // Usage for each class
        usage: {
            B10: "Base preparation, screeds",
            B15: "Foundations for light buildings",
            B20: "Basement walls, floors",
            B25: "Foundations for low-rise buildings",
            B30: "Bridge structures",
            B35: "High-rise buildings",
            B40: "Overpasses, viaducts",
            B45: "Bridge supports, tunnels",
            B50: "Load-bearing columns of skyscrapers",
            B55: "Special structures",
            B60: "Fortifications",
            B70: "Ultra-high strength structures",
            B80: "Seismic-resistant high-rise buildings",
            B90: "Experimental projects"
        }
    }
};

let currentLanguage = 'ru';

function t(key, params = {}) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    for (const k of keys) {
        if (value && value.hasOwnProperty(k)) {
            value = value[k];
        } else {
            console.warn(`Translation key not found: ${key}`);
            return key;
        }
    }
    if (typeof value === 'string') {
        return value.replace(/\{(\w+)\}/g, (match, p) => params[p] !== undefined ? params[p] : match);
    }
    return value;
}

function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        document.documentElement.lang = lang;
        window.dispatchEvent(new CustomEvent('languagechange', { detail: lang }));
        return true;
    }
    return false;
}

function getLanguage() {
    return currentLanguage;
}