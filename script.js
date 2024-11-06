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

// Inicialização do slider
function initializeCarousels() {
  const carousels = document.querySelectorAll('.carousel-container');
  
  carousels.forEach(carousel => {
      const slides = carousel.querySelector('.carousel-slide');
      const items = carousel.querySelectorAll('.carousel-item');
      const prevBtn = carousel.querySelector('.prev');
      const nextBtn = carousel.querySelector('.next');

      let currentIndex = 0;
      const totalItems = items.length;

      function updateCarousel() {
          const itemWidth = items[0].offsetWidth;
          const offset = -currentIndex * itemWidth;
          slides.style.transform = `translateX(${offset}px)`;

          // Atualiza classes ativas
          items.forEach((item, index) => {
              item.classList.toggle('active', index === currentIndex);
          });
      }

      function nextSlide() {
          currentIndex = (currentIndex + 1) % totalItems;
          updateCarousel();
      }

      function prevSlide() {
          currentIndex = (currentIndex - 1 + totalItems) % totalItems;
          updateCarousel();
      }

      // Event listeners para botões
      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);

      // Autoplay
      let interval = setInterval(nextSlide, 5000);

      // Pausa o autoplay quando o mouse está sobre o carrossel
      carousel.addEventListener('mouseenter', () => clearInterval(interval));
      carousel.addEventListener('mouseleave', () => {
          interval = setInterval(nextSlide, 5000);
      });

      // Inicializa o carrossel
      updateCarousel();

      // Ajusta o carrossel quando a janela é redimensionada
      window.addEventListener('resize', updateCarousel);
  });
}

// Função de utilidade para debounce
function debounce(func, wait = 20) {
  let timeout;
  return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Sistema de busca
function initializeSearch() {
  const searchInput = document.querySelector('.search-bar input');
  if (!searchInput) return;

  searchInput.addEventListener('input', debounce((e) => {
      const searchTerm = e.target.value.toLowerCase();
      const recipes = document.querySelectorAll('.recipe-field');

      recipes.forEach(recipe => {
          const title = recipe.querySelector('h2')?.textContent.toLowerCase();
          const description = recipe.querySelector('p')?.textContent.toLowerCase();
          const shouldShow = !searchTerm || 
                           title?.includes(searchTerm) || 
                           description?.includes(searchTerm);
          
          recipe.style.display = shouldShow ? 'block' : 'none';
      });
  }, 300));
}

function filterRecipes() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const recipes = document.querySelectorAll('.recipe-field');

  recipes.forEach(recipe => {
    // Obtém a categoria e o nome da receita
    const recipeCategory = recipe.classList.contains('doce') ? 'doce' : 'salgado';
    const recipeName = recipe.querySelector('h2').textContent.toLowerCase();

    // Exibe todas as receitas se o campo de busca estiver vazio
    if (!query) {
      recipe.style.display = 'block';
    } 
    // Exibe a receita se a categoria ou o nome corresponder ao termo de busca
    else if (recipeCategory.includes(query) || recipeName.includes(query)) {
      recipe.style.display = 'block';
    } 
    // Oculta a receita caso não haja correspondência
    else {
      recipe.style.display = 'none';
    }
  });
}

// Adiciona o evento de entrada para atualizar a cada tecla digitada
document.getElementById('searchInput').addEventListener('input', filterRecipes);

// Sistema de filtros
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter button');
  const recipes = document.querySelectorAll('.recipe-field');

  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          const filter = button.getAttribute('data-filter');
          state.currentFilter = filter;

          // Atualiza classes ativas dos botões
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          // Filtra receitas
          recipes.forEach(recipe => {
              const shouldShow = filter === 'todas' || recipe.classList.contains(filter);
              recipe.style.display = shouldShow ? 'block' : 'none';
          });
      });
  });
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

// Menu responsivo
function handleResponsiveMenu() {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (!menuButton || !nav) return;

  menuButton.addEventListener('click', () => {
      nav.classList.toggle('active');
  });
}

// Utilidades
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
      const later = () => {
          clearTimeout(timeout);
          func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  };
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

// Validação de formulários
function validateForm(form) {
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;

  inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
          isValid = false;
          input.classList.add('error');
      } else {
          input.classList.remove('error');
      }
  });

  return isValid;
}

// Sistema de notificações
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
      notification.remove();
  }, 3000);
}