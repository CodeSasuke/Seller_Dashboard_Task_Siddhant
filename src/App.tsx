import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTable from './components/ProductTable';
import AddProductModal from './components/AddProductModal';
import { Product } from './types';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortKey, setSortKey] = useState<keyof Product>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => {
        const mapped = res.data.products.map((p: any) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          price: p.price,
          stock: p.stock,
          image: p.thumbnail
        }));
        setProducts(mapped);
      })
      .catch(err => console.error(err));
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { ...newProduct, id }]);
    setIsModalOpen(false);
  };

  const sortedProducts = [...products].sort((a, b) => {
    const aKey = a[sortKey];
    const bKey = b[sortKey];
    if (typeof aKey === 'string' && typeof bKey === 'string') {
      return sortOrder === 'asc'
        ? aKey.localeCompare(bKey)
        : bKey.localeCompare(aKey);
    }
    if (typeof aKey === 'number' && typeof bKey === 'number') {
      return sortOrder === 'asc' ? aKey - bKey : bKey - aKey;
    }
    return 0;
  });

  let displayedProducts = sortedProducts.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter ? p.category === categoryFilter : true)
  );

  return (
    <div className="container">
      <h1>Seller Dashboard</h1>
      <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={sortKey}
          onChange={e => setSortKey(e.target.value as keyof Product)}
        >
          <option value="title">Title</option>
          <option value="category">Category</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
        </select>
        <button onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}>
          Order: {sortOrder.toUpperCase()}
        </button>
        <button onClick={() => setIsModalOpen(true)}>Add New Product</button>
      </div>
      <ProductTable products={displayedProducts} />
      {isModalOpen && <AddProductModal onAdd={handleAddProduct} onClose={() => setIsModalOpen(false)} />}
    </div>
);
};

export default App;
