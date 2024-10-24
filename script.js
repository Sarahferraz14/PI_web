const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function updateCarousel() {
    // Remove a classe "active" de todos os itens
    items.forEach(item => item.classList.remove('active'));
    // Adiciona a classe "active" ao item atual
    items[currentIndex].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length; // Avança para o próximo
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length; // Volta para o anterior
    updateCarousel();
}

// Troca automaticamente a cada 3 segundos
setInterval(nextSlide, 3000);
// Leva o botoes para as outaras paginas
function goToPage(page) {
    window.location.href = page;
}

