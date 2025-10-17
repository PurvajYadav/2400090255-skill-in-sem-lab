import React, { useState } from 'react';
import './customer.css';
import { StrictMode } from 'react';

function Customer() {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [adminProducts, setAdminProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Load admin products from localStorage
    React.useEffect(() => {
        const products = JSON.parse(localStorage.getItem('adminProducts') || '[]');
        setAdminProducts(products);
    }, []);

    const handleAddToCart = (productName, price, imageUrl) => {
        const existingItem = cart.find(item => item.name === productName);
        
        if (existingItem) {
            setCart(cart.map(item => 
                item.name === productName 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { name: productName, price: price, quantity: 1, image: imageUrl }]);
        }
        
        alert(`${productName} added to cart!`);
    };

    const removeFromCart = (productName) => {
        setCart(cart.filter(item => item.name !== productName));
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const handleShowDetails = (productName, imageUrl, price, description, productId) => {
        setSelectedProduct({ name: productName, image: imageUrl, price: price, description: description, id: productId });
        setShowDetails(true);
    };

    // All products combined (only admin products now)
    const allProducts = [...adminProducts];

    const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toString().includes(searchTerm)
    );

    return (
        <div>
            <header>
                <h1>THE CRAFTORA</h1>
                <nav>
                    <a href="#home">Home</a>
                    <a href="#products">Products</a>
                    <a href="#about">About Us</a>
                    <a href="#contact">Contact</a>
                    <button 
                        onClick={() => setShowCart(!showCart)}
                        style={{float: 'right', marginLeft: '20px', padding: '8px 16px', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer'}}
                    >
                        Cart ({cart.length})
                    </button>
                </nav>
            </header>

            {showCart && (
                <div className="cart-overlay">
                    <div className="cart-modal">
                        <h2>Shopping Cart</h2>
                        {cart.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            <>
                                {cart.map((item, index) => (
                                    <div key={index} className="cart-item">
                                        <img src={item.image} alt={item.name} className="cart-item-image" />
                                        <div className="cart-item-details">
                                            <span className="cart-item-name">{item.name}</span>
                                            <span>Qty: {item.quantity}</span>
                                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <button onClick={() => removeFromCart(item.name)}>Remove</button>
                                    </div>
                                ))}
                                <div className="cart-total">
                                    <strong>Total: ₹{getTotalPrice()}</strong>
                                </div>
                            </>
                        )}
                        <button onClick={() => setShowCart(false)}>Close</button>
                    </div>
                </div>
            )}

            {showDetails && (
                <div className="cart-overlay">
                    <div className="cart-modal">
                        <h2 style={{ color: 'white' }}>Product Details</h2>
                        {selectedProduct && (
                            <div className="product-details">
                                <img src={selectedProduct.image} alt={selectedProduct.name} style={{width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px'}} />
                                <h3 style={{ color: 'white' }}>{selectedProduct.name}</h3>
                                <p style={{ color: 'white' }}>Product ID: {selectedProduct.id}</p>
                                <p style={{ color: 'white' }}>Price: ₹{selectedProduct.price.toFixed(2)}</p>
                                <p style={{ color: 'white' }}>{selectedProduct.description}</p>
                            </div>
                        )}
                        <button onClick={() => setShowDetails(false)}>Close</button>
                    </div>
                </div>
            )}

            <div className="marquee">
                <marquee behavior="scroll" direction="left">Welcome to our site. India's premier platform for artisan products. Check out our amazing products!</marquee>
            </div>
            <div>
            <section id="home">
                <h2 style={{ color: 'black' }}>Craftora India's Premier Artisan Marketplace</h2>
                <p>Discover a variety of products at great prices. Shop now and enjoy amazing deals!</p>
            </section>
            </div>
            <section id="products">
                <h2 style={{ color: 'black' }}>Featured Products</h2>
                
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search products by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                {searchTerm ? (
                    <div className="container">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="product">
                                <img src={product.imageUrl} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>Price: ₹{product.price.toFixed(2)}</p>
                                <button className="button" onClick={() => handleShowDetails(product.name, product.imageUrl, product.price, product.description, product.id)}>Details</button>
                                <button className="button" onClick={() => handleAddToCart(product.name, product.price, product.imageUrl)}>Add to Cart</button>
                            </div>
                        ))}
                        {filteredProducts.length === 0 && <p style={{textAlign: 'center', color: '#666'}}>No products found matching "{searchTerm}".</p>}
                    </div>
                ) : (
                    <>
                        {/* Admin Added Products */}
                        {adminProducts.length > 0 ? (
                            <div className="container">
                                {adminProducts.map(product => (
                                    <div key={product.id} className="product">
                                        <img src={product.imageUrl} alt={product.name} />
                                        <h3>{product.name}</h3>
                                        <p>Price: ₹{product.price.toFixed(2)}</p>
                                        <button className="button" onClick={() => handleShowDetails(product.name, product.imageUrl, product.price, product.description, product.id)}>Details</button>
                                        <button className="button" onClick={() => handleAddToCart(product.name, product.price, product.imageUrl)}>Add to Cart</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p style={{textAlign: 'center', color: '#666', fontSize: '18px', marginTop: '40px'}}>No products available. Admin can add products to display here.</p>
                        )}
                    </>
                )}

            </section>

            <section id="about">
                <h2 style={{ color: 'black' }}>About Us</h2>
                <p>We are a leading online shopping platform dedicated to providing our customers with the best products at unbeatable prices. Our mission is to support artisans, promote their crafts and preserve traditional art forms.</p>
            </section>

            <section id="contact">
                <h2 style={{ color: 'black' }}>Contact Us</h2>
                <p>If you have any questions or need assistance, feel free to reach out to us:</p>
                <p>Email: chennapurvajyadav@gmail.com</p>
                <p>Phone: 8328559744</p>
            </section>

            <footer>
                <p>&copy; @2025 The Craftora. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Customer;