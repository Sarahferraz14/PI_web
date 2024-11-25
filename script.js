let currentIndex = 0;
const imagesToShow = 4; // Número de imagens visíveis ao mesmo tempo
const images = document.querySelectorAll(".carousel img");
const carousel = document.querySelector(".carousel");

const searchInput = document.getElementById('search');

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
function moveCarousel(direction) {
  const totalImages = images.length;
  currentIndex += direction;

  // Controla para evitar passar dos limites
  if (currentIndex < 0) {
    currentIndex = totalImages - imagesToShow;
  } else if (currentIndex > totalImages - imagesToShow) {
    currentIndex = 0;
  }

  const offset = -(currentIndex * 100) / imagesToShow;
  carousel.style.transform = `translateX(${offset}%)`;
}

function openRecipeModal(recipeId, isCarousel = false) {
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

function botaoFiltro(categoria) {
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