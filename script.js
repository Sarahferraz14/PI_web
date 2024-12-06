let currentIndex = 0;
const imagesToShow = 4; // Número de imagens visíveis ao mesmo tempo
const images = document.querySelectorAll(".carousel img");
const carousel = document.querySelector(".carousel");

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (event) => {
  const value = event.target.value

  const itens = document.querySelectorAll('.recipe-field');
  const noResults = document.getElementById('no_results');

  let hasResults = false;
  
  itens.forEach(recipe => {
    if(formaString(recipe.textContent).indexOf(value) !== -1) {
      recipe.style.display = 'block';

      hasResults = true;
    } else {
      recipe.style.display = 'none';
    }
 })

 if (hasResults)  {
  noResults.style.display = 'none';
 } else {
  noResults.style.display = 'block';
 }
});

function formaString(value) {
    return value.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

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
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });

    // Fecha modal com tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.open) modal.close();
    });
  
}

function closeRecipeModal(recipeId) {
  const modal = document.getElementById(recipeId);
  modal.close();
}

// Gerenciamento de estado global
const state = {
  currentSlide: 0,
  isLoading: false,
  recipes: [],
  currentFilter: 'todas'
};


// Carregamento do documento
document.addEventListener('DOMContentLoaded', () => {
  initializeCarousels();
});

// Função de utilidade para debounce
function debounce(func, wait = 20) {
  let timeout;
  return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Gerenciamento de modais
function initializeModals() {
  const modals = document.querySelectorAll('.recipe-modal');
  
  modals.forEach(modal => {
      // Fecha modal ao clicar fora
      modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.close();
      });

      // Fecha modal com tecla ESC
      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modal.open) modal.close();
      });
  });
}

// Lazy loading de imagens
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
          }
      });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Tratamento de erros
function handleError(error) {
  console.error('Erro:', error);
  // Implementar sistema de notificação para o usuário
}

// Sistema de notificações
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = notification (type);
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
      notification.remove();
  }, 3000);
}


// Função para detectar elementos visíveis na tela
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

// Detecta e adiciona animações
function handleScroll() {
  const section = document.querySelector(".scroll-effect-section .content");
  if (isElementInViewport(section)) {
      section.classList.add("visible");
  }
}

// Escuta o evento de rolagem
document.addEventListener("scroll", handleScroll);
window.addEventListener('scroll', function() {
  const body = document.body;
  if (window.scrollY > 50) { // Defina o limite para a rolagem
      body.classList.add('scrolled');
  } else {
      body.classList.remove('scrolled');
  }
});
document.addEventListener("scroll", () => {
  const image = document.getElementById("hero-image");
  const section = document.getElementById("hero-section");

  // Posição da seção em relação ao scroll
  const sectionTop = section.getBoundingClientRect().top;
  const sectionHeight = section.offsetHeight;

  // Calcula a opacidade com base no scroll
  const opacity = Math.max(0, 1 - sectionTop / sectionHeight);

  // Aplica os estilos de opacidade e transformação
  image.style.opacity = opacity;
  image.style.transform = translateY($((-1) * (1 - opacity) * 50 )); // Move a imagem para cima
});

document.addEventListener("DOMContentLoaded", () => {
  const tips = document.querySelectorAll('.tip');
  let currentTipIndex = 0;

  function showNextTip() {
      // Remove classe ativa da dica atual
      tips[currentTipIndex].classList.remove('active');
      currentTipIndex = (currentTipIndex + 1) % tips.length; // Avança para a próxima dica
      // Adiciona classe ativa à nova dica
      tips[currentTipIndex].classList.add('active');
  }

  // Inicializa o efeito mostrando a primeira dica
  tips[currentTipIndex].classList.add('active');
  // Alterna a cada 5 segundos
  setInterval(showNextTip, 5000);
});
