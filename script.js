let currentIndex = 0; 
const images = document.querySelectorAll('.slider img'); 
const totalImages = images.length;
let interval;

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
  image.style.transform = `translateY(${-(1 - opacity) * 50}px)`; // Move a imagem para cima
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

