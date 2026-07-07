// Инициализация корзины из LocalStorage или создание пустой
let cart = JSON.parse(localStorage.getItem('techCart')) || [];

// Функция сохранения корзины в память
const saveCart = () => {
  localStorage.setItem('techCart', JSON.stringify(cart));
  updateCartUI();
};

// Добавление товара
export const addToCart = (product) => {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  alert(`${product.name} добавлен в корзину!`);
};

// Обновление счетчиков в интерфейсе
export const updateCartUI = () => {
  const countEl = document.getElementById('cart-count');
  const totalEl = document.getElementById('cart-total');
  
  if (!countEl || !totalEl) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  countEl.textContent = totalItems;
  totalEl.textContent = totalPrice.toLocaleString('ru-RU');
};