import './style.css';
import { addToCart, updateCartUI } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  loadProducts();
});

async function loadProducts() {
  try {
    const response = await fetch('/products.json');
    if (!response.ok) throw new Error('Ошибка загрузки данных');
    
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error('Ошибка:', error);
    document.getElementById('products-container').innerHTML = '<p>Не удалось загрузить товары.</p>';
  }
}

// Отрисовка товаров в DOM
function renderProducts(products) {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  products.forEach(product => {
    // Создаем карточку товара
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p style="color: gray; font-size: 0.9em;">${product.category}</p>
      <p class="price">${product.price.toLocaleString('ru-RU')} ₽</p>
      <button id="btn-${product.id}">В корзину</button>
    `;

    container.appendChild(card);

    // Добавляем обработчик на кнопку
    document.getElementById(`btn-${product.id}`).addEventListener('click', () => {
      addToCart(product);
    });
  });
}