import {useState} from 'react';

function App() {
  const [page, setPage] = useState('shop')

  return (
    <div>
      {page === 'shop' && <h1 data-testid="shop-page">Shop</h1>}
      {page === 'cart' && <h1 data-testid="cart-page">Cart</h1>}
      <button onClick={() => setPage('shop')} data-testid="shop-btn">Shop</button>
      <button onClick={() => setPage('cart')} data-testid="cart-btn">Cart</button>
    </div>
  )
}

export default App
