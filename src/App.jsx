import {useState} from 'react';

function App() {
  const [page, setPage] = useState('shop')

  return (
    <div>
      <header data-testid="header">Header</header>
      {page === 'shop' && <div data-testid="content-block">
        <h1 data-testid="shop-page">Shop</h1>
        <ul data-testid="showcase">
          <li data-testid="product-card">Item 1</li>
          <li data-testid="product-card">Item 2</li>
          <li data-testid="product-card">Item 3</li>
        </ul>
      </div>}

      {page === 'cart' && <h1 data-testid="cart-page">Cart</h1>}

      <button onClick={() => setPage('shop')} data-testid="shop-btn">Shop</button>
      <button onClick={() => setPage('cart')} data-testid="cart-btn">Cart</button>

      <footer data-testid="footer">Footer</footer>
    </div>
  )
}

export default App
