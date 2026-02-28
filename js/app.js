document.addEventListener('DOMContentLoaded', function() {
    // ===== ЭЛЕМЕНТЫ DOM =====
    const elements = {
        grid: document.getElementById('gridContainer'),
        panel: document.getElementById('detailPanel'),
        closeBtn: document.getElementById('closePanelBtn'),
        currentClassTitle: document.getElementById('currentClassTitle'),
        currentStrength: document.getElementById('currentStrength'),
        currentUsage: document.getElementById('currentUsage'),
        cubeState: document.getElementById('cubeState'),
        progressFill: document.getElementById('progressFill'),
        testBtn: document.getElementById('testBtn'),
        resultBlock: document.getElementById('resultBlock'),
        resultMsg: document.getElementById('resultMsg'),
        compInfo: document.getElementById('compInfo'),
        compTitle: document.getElementById('compTitle'),
        compDesc: document.getElementById('compDesc'),
        sprite: document.getElementById('destructionSprite'),
        frameIndicator: document.getElementById('frameIndicator'),
        progressSlider: document.getElementById('progressSlider'),
        compareGroup: document.getElementById('compareGroup'),
        langRu: document.getElementById('langRu'),
        langEn: document.getElementById('langEn'),
        headerTitle: document.querySelector('h1'),
        headerSpan: document.querySelector('h1 span'),
        headerSubhead: document.querySelector('.subhead'),
        gridHeaderH2: document.querySelector('.grid-header h2'),
        gridHint: document.getElementById('gridHint'),
        strengthLabel: document.querySelector('.strength-label'),
        strengthUnit: document.querySelector('.strength-value small'),
        usageLabel: document.querySelector('.desc-title'),
        footerText: document.querySelector('footer p'),
        // Элементы для сравнения
        compareToggleBtn: document.getElementById('compareToggleBtn'),
        comparePanel: document.getElementById('comparePanel'),
        closeCompareBtn: document.getElementById('closeCompareBtn'),
        compareContainer: document.getElementById('compareContainer'),
        compareTestBtn: document.getElementById('compareTestBtn'),
        compareResetBtn: document.getElementById('compareResetBtn'),
        compareTitle: document.getElementById('compareTitle'),
        // Элементы для таблицы сравнения
        comparisonDetails: document.getElementById('comparisonDetails'),
        compDiffValue: document.getElementById('compDiffValue'),
        compPercentValue: document.getElementById('compPercentValue'),
        compStrongerClass: document.getElementById('compStrongerClass'),
        compAdvice: document.getElementById('compAdvice'),
        compClass1Title: document.getElementById('compClass1Title'),
        compClass2Title: document.getElementById('compClass2Title'),
        compStrength1: document.getElementById('compStrength1'),
        compStrength2: document.getElementById('compStrength2'),
        compMicro1: document.getElementById('compMicro1'),
        compMicro2: document.getElementById('compMicro2'),
        compCracks1: document.getElementById('compCracks1'),
        compCracks2: document.getElementById('compCracks2'),
        compFractures1: document.getElementById('compFractures1'),
        compFractures2: document.getElementById('compFractures2'),
        compFailure1: document.getElementById('compFailure1'),
        compFailure2: document.getElementById('compFailure2'),
        compUsage1: document.getElementById('compUsage1'),
        compUsage2: document.getElementById('compUsage2'),
        // Остальные элементы
        themeToggle: document.getElementById('themeToggle'),
        favoritesToggle: document.getElementById('favoritesToggle'),
        loadInput: document.getElementById('loadInput'),
        applyLoadBtn: document.getElementById('applyLoadBtn'),
        chartCanvas: document.getElementById('strengthChart'),
        sortSelect: document.getElementById('sortSelect'),
        filterSelect: document.getElementById('filterSelect'),
        stageMicro: document.getElementById('stageMicro'),
        stageCracks: document.getElementById('stageCracks'),
        stageFractures: document.getElementById('stageFractures'),
        stageFailure: document.getElementById('stageFailure')
    };

    // ===== СОСТОЯНИЕ =====
    let state = {
        currentItem: concreteData[3], // B25
        currentProgress: 0,
        animationInterval: null,
        compareItems: [],
        favorites: JSON.parse(localStorage.getItem('concreteFavorites')) || [],
        showFavoritesOnly: false,
        chart: null,
        compareAnimationInterval: null
    };

    // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
    function getStateText(progress) {
        const states = t('frameStates');
        if (progress < 0.2) return states[0];
        if (progress < 0.4) return states[1];
        if (progress < 0.6) return states[2];
        if (progress < 0.8) return states[3];
        if (progress < 0.95) return states[4];
        return states[5];
    }

    function formatPressure(progress, strength) {
        const pressure = (progress * strength).toFixed(1);
        return `${pressure} ${t('unit')}`;
    }

    function updateStages(strength) {
        if (elements.stageMicro) elements.stageMicro.textContent = formatPressure(0.2, strength);
        if (elements.stageCracks) elements.stageCracks.textContent = formatPressure(0.4, strength);
        if (elements.stageFractures) elements.stageFractures.textContent = formatPressure(0.6, strength);
        if (elements.stageFailure) elements.stageFailure.textContent = formatPressure(1.0, strength);
    }

    function loadFrame(progress) {
        progress = Math.min(1, Math.max(0, progress));
        const imageData = generateDestructionFrame(progress, state.currentItem.class);
        elements.sprite.src = imageData;

        const pressureStr = formatPressure(progress, state.currentItem.strength);
        elements.frameIndicator.textContent = pressureStr;
        elements.cubeState.textContent = getStateText(progress);
        elements.progressFill.style.width = (progress * 100) + '%';
        elements.progressFill.textContent = pressureStr;
        elements.progressSlider.value = progress;

        state.currentProgress = progress;
    }

    function stopAnimation() {
        if (state.animationInterval) {
            clearInterval(state.animationInterval);
            state.animationInterval = null;
        }
        elements.testBtn.disabled = false;
        updateTestButtonText();
    }

    function updateTestButtonText() {
        if (state.animationInterval) {
            elements.testBtn.innerHTML = '<span class="btn-icon">⏳</span> ' + t('testBtn');
        } else {
            elements.testBtn.innerHTML = '<span class="btn-icon">🧪</span> ' + t('testBtn');
        }
    }

    // ===== АНИМАЦИЯ РАЗРУШЕНИЯ =====
    function playDestruction() {
        stopAnimation();

        const steps = 60;
        let step = 0;
        const intervalTime = 33;

        elements.testBtn.disabled = true;
        elements.testBtn.innerHTML = '<span class="btn-icon">⏳</span> ' + t('testBtn');
        elements.resultBlock.style.display = 'none';
        elements.compInfo.style.display = 'none';

        state.animationInterval = setInterval(() => {
            step++;
            const progress = step / steps;

            if (step >= steps) {
                loadFrame(1.0);
                stopAnimation();
                elements.testBtn.innerHTML = '<span class="btn-icon">🔄</span> ' + t('repeatBtn');
                updateResultMessage();
                elements.resultBlock.style.display = 'block';
                return;
            }

            loadFrame(progress);
        }, intervalTime);
    }

    function updateResultMessage() {
        elements.resultMsg.textContent = t('resultMsg', {
            class: state.currentItem.class,
            strength: state.currentItem.strength
        });
    }

    // ===== ГРАФИК =====
    function initChart() {
        if (!elements.chartCanvas) return;
        const ctx = elements.chartCanvas.getContext('2d');
        const labels = concreteData.map(d => d.class);
        const strengths = concreteData.map(d => d.strength);

        if (state.chart) state.chart.destroy();

        state.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: t('unit'),
                    data: strengths,
                    backgroundColor: 'rgba(196, 69, 54, 0.7)',
                    borderColor: '#c44536',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        ticks: { color: '#e0eef5' }
                    },
                    x: {
                        ticks: { color: '#e0eef5' }
                    }
                },
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: t('chartTitle'),
                        color: '#e0eef5',
                        font: { size: 16 }
                    }
                }
            }
        });
    }

    function updateChartTheme() {
        if (!state.chart) return;
        const isLight = document.body.classList.contains('light-theme');
        const textColor = isLight ? '#1a2f3a' : '#e0eef5';
        const gridColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';

        state.chart.options.scales.y.grid.color = gridColor;
        state.chart.options.scales.y.ticks.color = textColor;
        state.chart.options.scales.x.ticks.color = textColor;
        state.chart.options.plugins.title.color = textColor;
        state.chart.update();
    }

    // ===== СОРТИРОВКА И ФИЛЬТРАЦИЯ =====
    function filterAndSortData() {
        let data = [...concreteData];

        if (state.showFavoritesOnly) {
            data = data.filter(item => state.favorites.includes(item.class));
        }

        const filterValue = elements.filterSelect.value;
        if (filterValue !== 'all') {
            data = data.filter(item => {
                const usage = t('usage.' + item.class).toLowerCase();
                switch (filterValue) {
                    case 'foundation':
                        return usage.includes('фундамент') || usage.includes('foundation');
                    case 'walls':
                        return usage.includes('стен') || usage.includes('перекрыт') || usage.includes('wall') || usage.includes('floor');
                    case 'bridges':
                        return usage.includes('мост') || usage.includes('тоннел') || usage.includes('bridge') || usage.includes('tunnel');
                    case 'highrise':
                        return usage.includes('высот') || usage.includes('небоскреб') || usage.includes('high-rise') || usage.includes('skyscraper');
                    case 'special':
                        return usage.includes('спец') || usage.includes('фортификац') || usage.includes('эксперимент') || usage.includes('special') || usage.includes('fortification') || usage.includes('experimental');
                    default:
                        return true;
                }
            });
        }

        const sortValue = elements.sortSelect.value;
        data.sort((a, b) => {
            switch (sortValue) {
                case 'class-asc':
                    return a.class.localeCompare(b.class);
                case 'class-desc':
                    return b.class.localeCompare(a.class);
                case 'strength-asc':
                    return a.strength - b.strength;
                case 'strength-desc':
                    return b.strength - a.strength;
                default:
                    return 0;
            }
        });

        return data;
    }

    function renderGrid() {
        elements.grid.innerHTML = '';
        const data = filterAndSortData();

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.class = item.class;
            const isFavorite = state.favorites.includes(item.class);
            card.innerHTML = `
                <div class="class-big">${item.class}</div>
                <div class="strength-big">${item.strength} <small>${t('unit')}</small></div>
                <div class="usage-text">${t('usage.' + item.class)}</div>
                <button class="add-compare-btn" data-class="${item.class}" title="${t('addToCompare')}">➕</button>
                <span class="favorite-star ${isFavorite ? 'active' : ''}" data-class="${item.class}" title="${isFavorite ? t('removeFromFavorites') : t('addToFavorites')}">⭐</span>
            `;

            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('add-compare-btn') && !e.target.classList.contains('favorite-star')) {
                    selectClass(item);
                }
            });

            const addBtn = card.querySelector('.add-compare-btn');
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleCompareItem(item);
            });

            const star = card.querySelector('.favorite-star');
            star.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(item.class);
            });

            elements.grid.appendChild(card);
        });

        updateCompareButtonsState();
    }

    function toggleFavorite(className) {
        const index = state.favorites.indexOf(className);
        if (index === -1) {
            state.favorites.push(className);
        } else {
            state.favorites.splice(index, 1);
        }
        localStorage.setItem('concreteFavorites', JSON.stringify(state.favorites));
        renderGrid();
        elements.favoritesToggle.classList.toggle('active', state.showFavoritesOnly);
    }

    function toggleFavoritesFilter() {
        state.showFavoritesOnly = !state.showFavoritesOnly;
        elements.favoritesToggle.classList.toggle('active', state.showFavoritesOnly);
        renderGrid();
    }

    // ===== СРАВНЕНИЕ =====
    function toggleCompareItem(item) {
        const index = state.compareItems.findIndex(i => i.class === item.class);
        if (index !== -1) {
            state.compareItems.splice(index, 1);
        } else {
            if (state.compareItems.length < 2) {
                state.compareItems.push(item);
            } else {
                alert('Можно выбрать не более 2 классов / Maximum 2 classes');
                return;
            }
        }
        updateCompareUI();
        updateCompareButtonsState();
    }

    function updateCompareUI() {
        elements.compareContainer.innerHTML = '';

        if (state.compareItems.length === 0) {
            addPlaceholder(0);
            addPlaceholder(1);
            elements.comparisonDetails.style.display = 'none';
            elements.compareTestBtn.disabled = true;
        } else if (state.compareItems.length === 1) {
            renderCompareItem(state.compareItems[0], 0);
            addPlaceholder(1);
            elements.comparisonDetails.style.display = 'none';
            elements.compareTestBtn.disabled = true;
        } else if (state.compareItems.length === 2) {
            renderCompareItem(state.compareItems[0], 0);
            renderCompareItem(state.compareItems[1], 1);
            showComparisonDetails();
            elements.compareTestBtn.disabled = false;
        }
    }

    function addPlaceholder(index) {
        const placeholderDiv = document.createElement('div');
        placeholderDiv.className = 'compare-item';
        placeholderDiv.innerHTML = `<div class="compare-placeholder">${t(index === 0 ? 'comparePlaceholder1' : 'comparePlaceholder2')}</div>`;
        elements.compareContainer.appendChild(placeholderDiv);
    }

    function renderCompareItem(item, index) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'compare-item';

        const spriteContainer = document.createElement('div');
        spriteContainer.className = 'sprite-container';
        const img = document.createElement('img');
        img.id = `compareSprite${index}`;
        img.src = generateDestructionFrame(0, item.class);
        img.alt = item.class;
        spriteContainer.appendChild(img);

        const pressureDisplay = document.createElement('div');
        pressureDisplay.className = 'compare-pressure';
        pressureDisplay.id = `comparePressure${index}`;
        pressureDisplay.textContent = formatPressure(0, item.strength);

        const strengthInfo = document.createElement('div');
        strengthInfo.className = 'strength-info';
        strengthInfo.innerHTML = `${item.strength} <small>${t('unit')}</small>`;

        const usageInfo = document.createElement('div');
        usageInfo.className = 'usage-info';
        usageInfo.textContent = t('usage.' + item.class);

        const maxStrength = Math.max(...concreteData.map(d => d.strength));
        const percent = (item.strength / maxStrength) * 100;
        const barContainer = document.createElement('div');
        barContainer.className = 'strength-bar-container';
        const barFill = document.createElement('div');
        barFill.className = 'strength-bar-fill';
        barFill.style.width = percent + '%';
        barContainer.appendChild(barFill);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'add-compare-btn selected';
        removeBtn.textContent = '➖';
        removeBtn.title = t('removeFromCompare');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCompareItem(item);
        });

        itemDiv.appendChild(spriteContainer);
        itemDiv.appendChild(pressureDisplay);
        itemDiv.appendChild(strengthInfo);
        itemDiv.appendChild(barContainer);
        itemDiv.appendChild(usageInfo);
        itemDiv.appendChild(removeBtn);

        elements.compareContainer.appendChild(itemDiv);
    }

    function showComparisonDetails() {
        if (state.compareItems.length !== 2) return;

        const item1 = state.compareItems[0];
        const item2 = state.compareItems[1];
        const s1 = item1.strength;
        const s2 = item2.strength;
        const diff = Math.abs(s1 - s2).toFixed(1);
        const percent = ((diff / Math.min(s1, s2)) * 100).toFixed(1);
        const stronger = s1 > s2 ? item1 : item2;

        // Заполняем заголовки
        elements.compClass1Title.textContent = item1.class;
        elements.compClass2Title.textContent = item2.class;

        // Прочность
        elements.compStrength1.textContent = s1 + ' ' + t('unit');
        elements.compStrength2.textContent = s2 + ' ' + t('unit');

        // Давления для стадий
        elements.compMicro1.textContent = formatPressure(0.2, s1);
        elements.compMicro2.textContent = formatPressure(0.2, s2);
        elements.compCracks1.textContent = formatPressure(0.4, s1);
        elements.compCracks2.textContent = formatPressure(0.4, s2);
        elements.compFractures1.textContent = formatPressure(0.6, s1);
        elements.compFractures2.textContent = formatPressure(0.6, s2);
        elements.compFailure1.textContent = formatPressure(1.0, s1);
        elements.compFailure2.textContent = formatPressure(1.0, s2);

        // Применение
        elements.compUsage1.textContent = t('usage.' + item1.class);
        elements.compUsage2.textContent = t('usage.' + item2.class);

        // Разница
        elements.compDiffValue.textContent = `${diff} ${t('unit')}`;
        elements.compPercentValue.textContent = percent + '%';
        elements.compStrongerClass.textContent = stronger.class;

        // Совет
        let advice = '';
        if (s1 === s2) {
            advice = t('adviceEqual');
        } else {
            const percentText = percent + '%';
            if (stronger.class === item1.class) {
                advice = t('adviceFirst', { class1: stronger.class, percent: percentText });
            } else {
                advice = t('adviceSecond', { class2: stronger.class, percent: percentText });
            }
            advice += ' ' + t('adviceFirstByUsage', {
                class1: item1.class,
                usage1: t('usage.' + item1.class).toLowerCase(),
                class2: item2.class,
                usage2: t('usage.' + item2.class).toLowerCase()
            });
        }
        elements.compAdvice.innerHTML = `<strong>${t('adviceTitle')}:</strong> ${advice}`;

        elements.comparisonDetails.style.display = 'block';
    }

    function updateCompareButtonsState() {
        document.querySelectorAll('.add-compare-btn').forEach(btn => {
            const className = btn.dataset.class;
            const isSelected = state.compareItems.some(i => i.class === className);
            btn.classList.toggle('selected', isSelected);
            btn.textContent = isSelected ? '➖' : '➕';
            btn.title = isSelected ? t('removeFromCompare') : t('addToCompare');
        });
    }

    function resetCompare() {
        state.compareItems = [];
        updateCompareUI();
        updateCompareButtonsState();
        elements.comparisonDetails.style.display = 'none';
    }

    // ===== АНИМАЦИЯ СРАВНЕНИЯ =====
    function playCompareAnimation() {
        if (state.compareItems.length !== 2) return;

        elements.compareTestBtn.disabled = true;

        const steps = 60;
        let step = 0;
        const intervalTime = 33;

        const img1 = document.getElementById('compareSprite0');
        const img2 = document.getElementById('compareSprite1');
        const pressure1 = document.getElementById('comparePressure0');
        const pressure2 = document.getElementById('comparePressure1');

        if (!img1 || !img2) {
            console.error('Images not found');
            elements.compareTestBtn.disabled = false;
            return;
        }

        state.compareAnimationInterval = setInterval(() => {
            step++;
            const progress = step / steps;

            if (step >= steps) {
                clearInterval(state.compareAnimationInterval);
                elements.compareTestBtn.disabled = false;
                const finalProgress = 1.0;
                if (img1) img1.src = generateDestructionFrame(finalProgress, state.compareItems[0].class);
                if (img2) img2.src = generateDestructionFrame(finalProgress, state.compareItems[1].class);
                if (pressure1) pressure1.textContent = formatPressure(finalProgress, state.compareItems[0].strength);
                if (pressure2) pressure2.textContent = formatPressure(finalProgress, state.compareItems[1].strength);
                return;
            }

            if (img1) img1.src = generateDestructionFrame(progress, state.compareItems[0].class);
            if (img2) img2.src = generateDestructionFrame(progress, state.compareItems[1].class);
            if (pressure1) pressure1.textContent = formatPressure(progress, state.compareItems[0].strength);
            if (pressure2) pressure2.textContent = formatPressure(progress, state.compareItems[1].strength);
        }, intervalTime);
    }

    // ===== ИСПЫТАНИЕ НАГРУЗКОЙ =====
    function applyLoad() {
        const load = parseFloat(elements.loadInput.value);
        if (isNaN(load) || load < 0) return;

        const strength = state.currentItem.strength;
        let progress = load / strength;
        progress = Math.min(1, Math.max(0, progress));

        loadFrame(progress);
    }

    // ===== ВЫБОР КЛАССА =====
    function selectClass(item) {
        stopAnimation();

        state.currentItem = item;

        elements.currentClassTitle.textContent = item.class;
        elements.currentStrength.textContent = item.strength;
        elements.currentUsage.textContent = t('usage.' + item.class);

        updateStages(item.strength);

        document.querySelectorAll('.card').forEach(c => {
            c.classList.remove('selected');
            if (c.dataset.class === item.class) c.classList.add('selected');
        });

        loadFrame(0);
        updateTestButtonText();
        elements.panel.style.display = 'block';
        elements.resultBlock.style.display = 'none';
        elements.compInfo.style.display = 'none';

        // Плавная прокрутка к панели
        elements.panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ===== СРАВНЕНИЕ В БЛОКЕ РЕЗУЛЬТАТА =====
    function showComparison(type) {
        if (!state.currentItem) return;
        const s = state.currentItem.strength;
        let title = '', desc = '';

        switch (type) {
            case 'cars':
                title = t('compareCars');
                const carsCount = (s / 4.41).toFixed(1);
                desc = t('compCarsDesc', { strength: s, carsCount });
                break;
            case 'sea':
                title = t('compareSea');
                const depth = Math.round(s * 10.2);
                desc = t('compSeaDesc', { strength: s, depth });
                break;
            case 'elephants':
                title = t('compareElephants');
                const area = ((2 * 5000 * 9.8) / (s * 1e6) * 10000).toFixed(1);
                desc = t('compElephantsDesc', { strength: s, area });
                break;
        }
        elements.compTitle.textContent = title;
        elements.compDesc.textContent = desc;
        elements.compInfo.style.display = 'block';
    }

    // ===== ТЕМА =====
    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        elements.themeToggle.textContent = isLight ? '☀️' : '🌙';
        elements.themeToggle.title = isLight ? t('themeLight') : t('themeDark');
        updateChartTheme();
    }

    // ===== ОБНОВЛЕНИЕ ЯЗЫКА =====
    function updateUILanguage() {
        elements.headerTitle.innerHTML = `${t('headerTitle')} <span>${t('headerSpan')}</span>`;
        elements.headerSubhead.textContent = t('headerSubhead');
        elements.gridHeaderH2.textContent = t('gridHeader');
        elements.gridHint.textContent = t('gridHint');
        elements.strengthLabel.textContent = t('strengthLabel');
        elements.strengthUnit.textContent = t('unit');
        elements.usageLabel.innerHTML = t('usageLabel');
        elements.footerText.textContent = '© ' + t('headerTitle') + ' · ' + t('headerSubhead').split('·')[0].trim();
        elements.compareToggleBtn.textContent = t('compareToggle');
        elements.compareTitle.textContent = t('compareTitle');
        elements.compareTestBtn.innerHTML = t('compareBtn');
        elements.compareResetBtn.textContent = t('compareReset');
        elements.favoritesToggle.textContent = t('favorites');
        elements.applyLoadBtn.textContent = t('applyLoad');
        elements.loadInput.placeholder = t('loadTestPlaceholder');

        const stagesTitle = document.querySelector('.stages-title');
        if (stagesTitle) stagesTitle.innerHTML = t('stagesTitle');

        elements.sortSelect.options[0].text = t('sortClassAsc');
        elements.sortSelect.options[1].text = t('sortClassDesc');
        elements.sortSelect.options[2].text = t('sortStrengthAsc');
        elements.sortSelect.options[3].text = t('sortStrengthDesc');

        elements.filterSelect.options[0].text = t('filterAll');
        elements.filterSelect.options[1].text = t('filterFoundation');
        elements.filterSelect.options[2].text = t('filterWalls');
        elements.filterSelect.options[3].text = t('filterBridges');
        elements.filterSelect.options[4].text = t('filterHighrise');
        elements.filterSelect.options[5].text = t('filterSpecial');

        if (state.chart) {
            state.chart.options.plugins.title.text = t('chartTitle');
            state.chart.update();
        }

        updateTestButtonText();
        renderGrid();

        if (state.compareItems.length > 0) {
            updateCompareUI();
        }

        if (state.currentItem) {
            updateStages(state.currentItem.strength);
        }

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === getLanguage());
        });
    }

    // ===== ПРИВЯЗКА СОБЫТИЙ =====
    function bindEvents() {
        elements.closeBtn.addEventListener('click', () => {
            elements.panel.style.display = 'none';
            stopAnimation();
        });

        elements.testBtn.addEventListener('click', playDestruction);

        elements.progressSlider.addEventListener('input', (e) => {
            if (state.animationInterval) stopAnimation();
            loadFrame(parseFloat(e.target.value));
            elements.resultBlock.style.display = 'none';
            elements.compInfo.style.display = 'none';
        });

        elements.compareGroup.addEventListener('click', (e) => {
            const btn = e.target.closest('.comp-btn');
            if (btn) {
                document.querySelectorAll('.comp-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                showComparison(btn.dataset.type);
            }
        });

        elements.langRu.addEventListener('click', () => {
            setLanguage('ru');
        });

        elements.langEn.addEventListener('click', () => {
            setLanguage('en');
        });

        window.addEventListener('languagechange', updateUILanguage);

        elements.compareToggleBtn.addEventListener('click', () => {
            const isVisible = elements.comparePanel.style.display === 'block';
            elements.comparePanel.style.display = isVisible ? 'none' : 'block';
            elements.compareToggleBtn.classList.toggle('active', !isVisible);
            if (!isVisible) {
                updateCompareUI();
            }
        });

        elements.closeCompareBtn.addEventListener('click', () => {
            elements.comparePanel.style.display = 'none';
            elements.compareToggleBtn.classList.remove('active');
            if (state.compareAnimationInterval) {
                clearInterval(state.compareAnimationInterval);
                state.compareAnimationInterval = null;
            }
        });

        elements.compareTestBtn.addEventListener('click', playCompareAnimation);
        elements.compareResetBtn.addEventListener('click', resetCompare);

        elements.favoritesToggle.addEventListener('click', toggleFavoritesFilter);

        elements.applyLoadBtn.addEventListener('click', applyLoad);
        elements.loadInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') applyLoad();
        });

        elements.themeToggle.addEventListener('click', toggleTheme);

        elements.sortSelect.addEventListener('change', renderGrid);
        elements.filterSelect.addEventListener('change', renderGrid);
    }

    // ===== ИНИЦИАЛИЗАЦИЯ =====
    function init() {
        renderGrid();
        selectClass(concreteData[3]);
        bindEvents();
        updateUILanguage();
        initChart();
        document.body.classList.remove('light-theme');
        elements.themeToggle.textContent = '🌙';
    }

    init();
});