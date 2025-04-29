import React, { useState } from 'react';
import { Product } from '../types';

interface Props {
  onAdd: (product: Omit<Product, 'id'>) => void;
  onClose: () => void;
}

const AddProductModal: React.FC<Props> = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState<number>(0);
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ title, price, category, stock, image });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label><br/>
            <input value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Price:</label><br/>
            <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required />
          </div>
          <div>
            <label>Category:</label><br/>
            <input value={category} onChange={e => setCategory(e.target.value)} required />
          </div>
          <div>
            <label>Stock:</label><br/>
            <input type="number" value={stock} onChange={e => setStock(Number(e.target.value))} required />
          </div>
          <div>
            <label>Image URL:</label><br/>
            <input value={image} onChange={e => setImage(e.target.value)} required />
          </div>
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
);
};

export default AddProductModal;
