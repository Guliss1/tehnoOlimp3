// Кэш для хранения сгенерированных ImageData
const frameCache = new Map();

/**
 * Генерирует кадр разрушения для заданного класса и прогресса.
 * Результат кэшируется для быстрого повторного использования.
 * @param {number} progress - от 0 до 1
 * @param {string} className - например "B25"
 * @returns {string} dataURL изображения
 */
function generateDestructionFrame(progress, className) {
    const totalFrames = 60;
    const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
    const cacheKey = `${className}_${frameIndex}`;

    // Если кадр уже есть в кэше, быстро рисуем его из ImageData
    if (frameCache.has(cacheKey)) {
        const { imageData, width, height } = frameCache.get(cacheKey);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').putImageData(imageData, 0, 0);
        return canvas.toDataURL('image/png');
    }

    // Иначе генерируем новый кадр
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // --- Рисование фона и базовой текстуры ---
    ctx.fillStyle = '#8faaBA';
    ctx.fillRect(0, 0, 400, 400);

    ctx.fillStyle = '#7a95a5';
    for (let i = 0; i < 100; i++) {
        let x = Math.random() * 400;
        let y = Math.random() * 400;
        ctx.fillRect(x, y, 2 + Math.random() * 3, 2 + Math.random() * 3);
    }

    // --- Основной куб ---
    ctx.fillStyle = '#8faaba';
    ctx.fillRect(100, 100, 200, 200);

    ctx.fillStyle = '#9bbacb';
    for (let i = 0; i < 40; i++) {
        let x = 100 + Math.random() * 200;
        let y = 100 + Math.random() * 200;
        ctx.fillRect(x, y, 2, 4);
    }

    // --- Тень и надпись ---
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.font = 'bold 48px "Inter", "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = '#2a4050';
    ctx.fillText(className, 150, 240);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // --- Рисование разрушений в зависимости от прогресса ---
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Трещины (появляются с progress 0.2)
    if (progress >= 0.2) {
        const crackIntensity = Math.min(1, (progress - 0.2) / 0.8);
        const crackCount = Math.floor(15 * crackIntensity);
        ctx.lineWidth = 2 + 8 * crackIntensity;

        for (let i = 0; i < crackCount; i++) {
            let x1 = 120 + Math.random() * 160;
            let y1 = 120 + Math.random() * 160;
            let x2 = x1 + (Math.random() - 0.5) * 100;
            let y2 = y1 + (Math.random() - 0.5) * 100;

            const darkness = Math.floor(40 + 40 * crackIntensity);
            ctx.strokeStyle = `rgb(${darkness}, ${darkness-10}, ${darkness-15})`;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            if (crackIntensity > 0.6 && Math.random() > 0.5) {
                ctx.beginPath();
                ctx.moveTo((x1 + x2) / 2, (y1 + y2) / 2);
                ctx.lineTo((x1 + x2) / 2 + (Math.random() - 0.5) * 60, (y1 + y2) / 2 + (Math.random() - 0.5) * 60);
                ctx.stroke();
            }
        }
    }

    // Осколки (с progress 0.5)
    if (progress >= 0.5) {
        const fragmentIntensity = Math.min(1, (progress - 0.5) / 0.5);
        const fragmentCount = Math.floor(30 * fragmentIntensity);
        ctx.fillStyle = '#6a7f8a';
        for (let i = 0; i < fragmentCount; i++) {
            let x = 120 + Math.random() * 180;
            let y = 120 + Math.random() * 180;
            let size = 5 + Math.random() * 20 * fragmentIntensity;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.fillStyle = '#4a5a63';
        for (let i = 0; i < fragmentCount / 2; i++) {
            let x = 130 + Math.random() * 160;
            let y = 130 + Math.random() * 160;
            let size = 8 + Math.random() * 25 * fragmentIntensity;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Пыль (с progress 0.7)
    if (progress >= 0.7) {
        const dustIntensity = Math.min(1, (progress - 0.7) / 0.3);
        const dustCount = Math.floor(20 * dustIntensity);
        ctx.fillStyle = 'rgba(220,220,230,0.3)';
        for (let i = 0; i < dustCount; i++) {
            let x = 100 + Math.random() * 200;
            let y = 100 + Math.random() * 200;
            let r = 20 + Math.random() * 50 * dustIntensity;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Крупные разломы (progress > 0.8)
    if (progress > 0.8) {
        const fractureIntensity = (progress - 0.8) * 5;
        ctx.lineWidth = 6 * fractureIntensity;
        ctx.strokeStyle = '#1e2226';
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(300, 300);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(300, 100);
        ctx.lineTo(100, 300);
        ctx.stroke();
    }

    // Финальный взрыв (progress > 0.95)
    if (progress > 0.95) {
        ctx.font = 'bold 80px Arial, sans-serif';
        ctx.fillStyle = '#c44536';
        ctx.fillText('💥', 140, 200);
    }

    // Обводка куба
    ctx.strokeStyle = '#2d5a6a';
    ctx.lineWidth = 4;
    ctx.strokeRect(100, 100, 200, 200);

    // Сохраняем ImageData в кэш
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    frameCache.set(cacheKey, {
        imageData: imageData,
        width: canvas.width,
        height: canvas.height
    });

    return canvas.toDataURL('image/png');
}