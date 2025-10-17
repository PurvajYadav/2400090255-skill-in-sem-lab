import React, { useState } from 'react';
import './artisan.css';

function Artisan() {
    const [productForm, setProductForm] = useState({
        name: '',
        price: '',
        imageUrl: '',
        description: ''
    });
    const [products, setProducts] = useState([]);
    const [showProductList, setShowProductList] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddProduct = () => {
        if (productForm.name && productForm.price && productForm.imageUrl && productForm.description) {
            const newProduct = {
                id: Date.now(),
                name: productForm.name,
                price: parseFloat(productForm.price),
                imageUrl: productForm.imageUrl,
                description: productForm.description
            };
            
            setProducts([...products, newProduct]);
            
            // Store in localStorage so customer.jsx can access
            const existingProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
            localStorage.setItem('adminProducts', JSON.stringify([...existingProducts, newProduct]));
            
            // Reset form
            setProductForm({
                name: '',
                price: '',
                imageUrl: '',
                description: ''
            });
            
            alert('Product added successfully!');
        } else {
            alert('Please fill all fields');
        }
    };

    const handleEditProduct = (product) => {
        setProductForm({
            name: product.name,
            price: product.price.toString(),
            imageUrl: product.imageUrl,
            description: product.description
        });
        setEditingProduct(product.id);
        setShowProductList(false);
    };

    const handleUpdateProduct = () => {
        if (productForm.name && productForm.price && productForm.imageUrl && productForm.description) {
            const updatedProducts = products.map(product => 
                product.id === editingProduct 
                    ? {
                        ...product,
                        name: productForm.name,
                        price: parseFloat(productForm.price),
                        imageUrl: productForm.imageUrl,
                        description: productForm.description
                    }
                    : product
            );
            
            setProducts(updatedProducts);
            localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
            
            // Reset form and editing state
            setProductForm({
                name: '',
                price: '',
                imageUrl: '',
                description: ''
            });
            setEditingProduct(null);
            
            alert('Product updated successfully!');
        } else {
            alert('Please fill all fields');
        }
    };

    const handleCancelEdit = () => {
        setProductForm({
            name: '',
            price: '',
            imageUrl: '',
            description: ''
        });
        setEditingProduct(null);
    };

    const removeProduct = (id) => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
        alert('Product removed successfully!');
    };

    const confirmDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            removeProduct(id);
        }
    };

    const loadExistingProducts = () => {
        const existingProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
        setProducts(existingProducts);
        setShowProductList(true);
    };

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toString().includes(searchTerm)
    );

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>Artisan Panel - Product Management</h1>
                <nav>
                    <button onClick={() => setShowProductList(false)}>Add Product</button>
                    <button onClick={loadExistingProducts}>View Products</button>
                </nav>
            </header>

            {!showProductList ? (
                <div className="add-product-section">
                    <h2 style={{ color: 'var(--primary-color)' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                    <div className="product-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={productForm.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price (₹)"
                            value={productForm.price}
                            onChange={handleInputChange}
                            step="0.01"
                        />
                        <input
                            type="url"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={productForm.imageUrl}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Product Description"
                            value={productForm.description}
                            onChange={handleInputChange}
                            rows="4"
                        />
                        {editingProduct ? (
                            <div className="edit-buttons">
                                <button onClick={handleUpdateProduct} className="update-btn">Update Product</button>
                                <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                            </div>
                        ) : (
                            <button onClick={handleAddProduct} className="add-btn">Add Product</button>
                        )}
                    </div>

                    {productForm.imageUrl && (
                        <div className="preview">
                            <h3>Preview:</h3>
                            <img src={productForm.imageUrl} alt="Preview" className="preview-image" />
                        </div>
                    )}
                </div>
            ) : (
                <div className="product-list-section">
                    <h2 style={{ color:'black' }}>Existing Products ({products.length})</h2>
                    
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search by product name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="products-grid">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="admin-product-card">
                                <div className="product-id">ID: {product.id}</div>
                                <img src={product.imageUrl} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>Price: ₹{product.price.toFixed(2)}</p>
                                <p className="description">{product.description}</p>
                                <div className="product-actions">
                                    <button onClick={() => handleEditProduct(product)} className="edit-btn">Edit</button>
                                    <button onClick={() => confirmDelete(product.id, product.name)} className="remove-btn">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filteredProducts.length === 0 && searchTerm && <p>No products found matching "{searchTerm}".</p>}
                    {products.length === 0 && <p>No products added yet.</p>}
                </div>
            )}
        </div>
    );
}
export default Artisan;