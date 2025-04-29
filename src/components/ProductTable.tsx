import React from 'react';
import { Product } from '../types';

interface Props {
  products: Product[];
}

const ProductTable: React.FC<Props> = ({ products }) => {
  return (
    <div className="grid">
      {products.map(p => (
        <div key={p.id} className="card">
          <img src={p.image} alt={p.title} />
          <div className="card-content">
            <h3>{p.title}</h3>
            <p><strong>Category:</strong> {p.category}</p>
            <p><strong>Price:</strong> ${p.price}</p>
            <p><strong>Stock:</strong> {p.stock}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductTable;
