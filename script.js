// Simulated price data
let currentPrice = 100.00;
const priceDisplay = document.getElementById('current-price');
const buyOrders = [];
const sellOrders = [];

// Function to update the simulated price
function updatePrice() {
  const change = (Math.random() - 0.5) * 2;
  currentPrice = parseFloat((currentPrice + change).toFixed(2));
  priceDisplay.textContent = currentPrice.toFixed(2);
  matchOrders();
}

// Place order function
function placeOrder() {
  const orderType = document.getElementById('order-type').value;
  const price = parseFloat(document.getElementById('order-price').value);
  const quantity = parseFloat(document.getElementById('order-quantity').value);

  if (!quantity || quantity <= 0) {
    alert('Invalid quantity');
    return;
  }

  if (orderType === 'market') {
    executeMarketOrder(quantity);
  } else if (orderType === 'limit' && price) {
    addLimitOrder(price, quantity);
  } else {
    alert('Invalid order details');
  }
}

// Execute market order
function executeMarketOrder(quantity) {
  alert(`Market Order Filled: ${quantity} at $${currentPrice}`);
}

// Add limit order
function addLimitOrder(price, quantity) {
  if (price > currentPrice) {
    sellOrders.push({ price, quantity });
    sellOrders.sort((a, b) => a.price - b.price); // Sort ascending for sells
  } else {
    buyOrders.push({ price, quantity });
    buyOrders.sort((a, b) => b.price - a.price); // Sort descending for buys
  }
  updateOrderBook();
}

// Match orders when price updates
function matchOrders() {
  // Match buy orders
  for (let i = buyOrders.length - 1; i >= 0; i--) {
    if (buyOrders[i].price >= currentPrice) {
      alert(`Buy Order Filled: ${buyOrders[i].quantity} at $${buyOrders[i].price}`);
      buyOrders.splice(i, 1);
    }
  }

  // Match sell orders
  for (let i = sellOrders.length - 1; i >= 0; i--) {
    if (sellOrders[i].price <= currentPrice) {
      alert(`Sell Order Filled: ${sellOrders[i].quantity} at $${sellOrders[i].price}`);
      sellOrders.splice(i, 1);
    }
  }

  updateOrderBook();
}

// Update the order book display
function updateOrderBook() {
  const buyOrderList = document.getElementById('buy-orders');
  const sellOrderList = document.getElementById('sell-orders');

  buyOrderList.innerHTML = '';
  sellOrderList.innerHTML = '';

  buyOrders.forEach(order => {
    const li = document.createElement('li');
    li.textContent = `${order.quantity} @ $${order.price}`;
    buyOrderList.appendChild(li);
  });

  sellOrders.forEach(order => {
    const li = document.createElement('li');
    li.textContent = `${order.quantity} @ $${order.price}`;
    sellOrderList.appendChild(li);
  });
}

// Simulate price update every second
setInterval(updatePrice, 1000);
