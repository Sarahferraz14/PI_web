let currentIndex = 0; 
const images = document.querySelectorAll('.slider img'); 
const totalImages = images.length;
let interval;

// Exibe as imagens no carrossel com ajuste de posição
function showSlide(index) {
    images.forEach((img, i) => {
        const pos = i - index;

        if (pos === -1 || pos === 1) {
            img.style.transform = `translateX(${pos * 100}%) scale(0.8)`; // Menor escala para imagens laterais
            img.classList.remove('active');
        } else if (pos === 0) {
            img.style.transform = `translateX(${pos * 100}%) scale(1)`; // Escala maior para a imagem ativa
            img.classList.add('active');
        } else {
            img.style.transform = `translateX(${pos * 100}%)`;
        }
    });

    // Atualiza a imagem grande abaixo
    showLargeImage(index);
}

// Atualiza a imagem grande
function showLargeImage(index) {
    const largeImage = document.getElementById('largeImage');
    largeImage.src = images[index].src;
    const description = `Imagem ${index + 1}`; // Exemplo de descrição
    document.getElementById('imageDescription').textContent = description;
}

// Navega para o próximo slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % totalImages;
    showSlide(currentIndex);
    resetInterval();
}

// Navega para o slide anterior
function prevSlide() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showSlide(currentIndex);
    resetInterval();
}

// Reinicia o intervalo automático
function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 6000);
}

// Eventos de clique nos botões de navegação
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

// Inicia o carrossel e define o intervalo automático
showSlide(currentIndex);
interval = setInterval(nextSlide, 6000);

function filtrarReceitas(categoria) {
    // Seleciona todas as receitas
    let receitas = document.querySelectorAll('.recipe-field');
  
    // Itera sobre todas as receitas
    receitas.forEach(function(receita) {
      // Mostra todas as receitas se o filtro for "todas"
      if (categoria === 'todas') {
        receita.style.display = 'block';
      } else {
        // Mostra as receitas da categoria correspondente e esconde as outras
        if (receita.classList.contains(categoria)) {
          receita.style.display = 'block';
        } else {
          receita.style.display = 'none';
        }
      }
    });
  }
  // Funções para abrir e fechar o modal
function openRecipeModal(recipeId) {
  const modal = document.getElementById(recipeId);
  modal.showModal();
}

function closeRecipeModal(recipeId) {
  const modal = document.getElementById(recipeId);
  modal.close();
}

// Fechar modal quando clicar fora dele
document.addEventListener('click', (e) => {
  const modals = document.querySelectorAll('.recipe-modal');
  modals.forEach(modal => {
      if (e.target === modal) {
          modal.close();
      }
  });
});