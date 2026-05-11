const cart = [];

const cartCount = document.querySelector('#cartCount');
const cartTotal = document.querySelector('#cartTotal');
const cartItems = document.querySelector('#cartItems');
const cartModal = document.querySelector('#cartModal');
const cartButton = document.querySelector('#cartButton');
const closeCart = document.querySelector('#closeCart');
const orderBtn = document.querySelector('#orderBtn');

function renderCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Корзина пустая.</p>';
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <span>${item.name}</span>
      <strong>${item.price} ₽</strong>
      <button class="remove-item" data-index="${index}">×</button>
    `;
    cartItems.appendChild(row);
  });

  cartTotal.textContent = total;

  const orderText = cart
    .map((item, index) => `${index + 1}. ${item.name} — ${item.price} ₽`)
    .join('%0A');

  orderBtn.href = `mailto:Durak20009@yandex.ru?subject=Заказ The Groove Room&body=${orderText}%0A%0AИтого: ${total} ₽`;
}

document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', () => {
    cart.push({
      name: button.dataset.name,
      price: Number(button.dataset.price)
    });
    renderCart();
    button.textContent = 'Добавлено';
    setTimeout(() => button.textContent = 'В корзину', 900);
  });
});

cartItems.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-item')) {
    cart.splice(Number(event.target.dataset.index), 1);
    renderCart();
  }
});

cartButton.addEventListener('click', () => {
  cartModal.classList.add('open');
});

closeCart.addEventListener('click', () => {
  cartModal.classList.remove('open');
});

cartModal.addEventListener('click', (event) => {
  if (event.target === cartModal) {
    cartModal.classList.remove('open');
  }
});

document.querySelectorAll('.genre').forEach((genreButton) => {
  genreButton.addEventListener('click', () => {
    document.querySelectorAll('.genre').forEach((button) => button.classList.remove('active'));
    genreButton.classList.add('active');

    const filter = genreButton.dataset.filter;

    document.querySelectorAll('.product-card').forEach((card) => {
      const categories = card.dataset.category.split(' ');
      card.style.display = filter === 'all' || categories.includes(filter) ? 'flex' : 'none';
    });
  });
});

renderCart();
