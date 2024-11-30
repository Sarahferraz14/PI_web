document.addEventListener("DOMContentLoaded", () => {
    const tipsWrapper = document.querySelector('.tips-wrapper');
    const tips = document.querySelectorAll('.tip');
    let currentTipIndex = 0;

    function showNextTip() {
        currentTipIndex = (currentTipIndex + 1) % tips.length; // Avança para a próxima dica
        const offset = currentTipIndex * -100; // Calcula a posição horizontal
        tipsWrapper.style.transform = `translateX(${offset}%)`;
    }

    // Alterna as dicas a cada 6 segundos
    setInterval(showNextTip, 6000);
});
document.addEventListener('DOMContentLoaded', () => {
    const carrossel = document.querySelector('.carrossel');
    const videos = document.querySelectorAll('.video');
    const btnNext = document.querySelector('.next');
    const btnPrev = document.querySelector('.prev');
    const indicators = document.querySelectorAll('.indicator');

    const totalVideos = videos.length;
    const itemsPerView = 3; // Quantidade de vídeos visíveis por vez
    let currentIndex = 0; // Índice do grupo atual

    // Atualiza a posição do carrossel e os indicadores
    const updateCarousel = () => {
        const translateX = -(currentIndex * 100); // Move o carrossel por blocos de 100%
        carrossel.style.transform = `translateX(${translateX}%)`;

        // Atualiza os indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    };

    // Navega para o próximo conjunto de vídeos
    btnNext.addEventListener('click', () => {
        const maxIndex = Math.ceil(totalVideos / itemsPerView) - 1; // Último índice possível
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Volta ao início
        }
        updateCarousel();
    });

    // Navega para o conjunto anterior
    btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = Math.ceil(totalVideos / itemsPerView) - 1; // Vai para o último conjunto
        }
        updateCarousel();
    });

    // Atualiza os indicadores ao clicar neles
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Inicializa o carrossel
    updateCarousel();
});
