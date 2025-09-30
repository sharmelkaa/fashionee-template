import {useState} from 'react';

const isFavorite = (id, favorites) => {
  return favorites.includes(id)
}

const ITEMS = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
]

function App() {
  const [page, setPage] = useState('shop');
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem('cart')) || []
  );

  const saveCart = (updated) => {
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const addToCart = (item) => {
    const existing = cart.find((p) => p.id === item.id);
    if (existing) {
      const updated = cart.map((p) =>
        p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      saveCart(updated);
    } else {
      const updated = [...cart, { ...item, quantity: 1 }];
      saveCart(updated);
    }
  };

  const increaseQty = (itemId) => {
    const updated = cart.map((p) =>
      p.id === itemId ? { ...p, quantity: p.quantity + 1 } : p
    );
    saveCart(updated);
  };

  const decreaseQty = (itemId) => {
    const existing = cart.find((p) => p.id === itemId);
    if (!existing) return;

    if (existing.quantity === 1) {
      const updated = cart.filter((p) => p.id !== itemId);
      saveCart(updated);
    } else {
      const updated = cart.map((p) =>
        p.id === itemId ? { ...p, quantity: p.quantity - 1 } : p
      );
      saveCart(updated);
    }
  };

  return (
    <div>
      <header data-testid="header">Header</header>

      {page === 'shop' && (
        <div data-testid="content-block">
          <h1 data-testid="shop-page">Shop</h1>
          <ul data-testid="showcase">
            {ITEMS.map((item) => {
              const inCart = cart.find((p) => p.id === item.id);

              return (
                <li
                  data-testid="product-card"
                  data-product-id={item.id}
                  key={item.id}
                >
                  <p>{item.name}</p>

                  {/* Favorites */}
                  <button
                    data-testid="favorite-btn"
                    data-active={isFavorite(item.id, favorites)}
                    onClick={() => {
                      if (isFavorite(item.id, favorites)) {
                        const updated = favorites.filter((id) => id !== item.id);
                        setFavorites(updated);
                        localStorage.setItem(
                          'favorites',
                          JSON.stringify(updated)
                        );
                      } else {
                        const updated = [...favorites, item.id];
                        setFavorites(updated);
                        localStorage.setItem(
                          'favorites',
                          JSON.stringify(updated)
                        );
                      }
                    }}
                  >
                    Add to favorites
                  </button>

                  {/* Cart */}
                  {!inCart && (
                    <button
                      data-testid="add-to-cart-btn"
                      onClick={() => addToCart(item)}
                    >
                      Add to cart
                    </button>
                  )}

                  {inCart && (
                    <div>
                      <button
                        data-testid="decrease-qty-btn"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </button>
                      <span data-testid="product-quantity">
                        {inCart.quantity}
                      </span>
                      <button
                        data-testid="increase-qty-btn"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {page === 'cart' && <h1 data-testid="cart-page">Cart</h1>}

      <button onClick={() => setPage('shop')} data-testid="shop-btn">
        Shop
      </button>
      <button onClick={() => setPage('cart')} data-testid="cart-btn">
        Cart
      </button>

      <footer data-testid="footer">Footer</footer>
    </div>
  )
}

export default App
