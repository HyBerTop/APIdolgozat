import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

const ProductsApp: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        description: '',
        imageUrl: '',
    });

    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const onAddProduct = () => {
        axios.post('http://localhost:3000/products', newProduct)
            .then((response) => {
                setProducts((prevProducts) => [...prevProducts, response.data]);
                setNewProduct({
                    name: '',
                    price: 0,
                    description: '',
                    imageUrl: '',
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const onDeleteProduct = (id: number) => {
        axios.delete(`http://localhost:3000/products/${id}`)
            .then(() => {
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <h1>Termékek</h1>

            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.price} Ft</p>
                        <p>{product.description}</p>
                        <img src={product.imageUrl} alt={product.name} />
                        <button onClick={() => onDeleteProduct(product.id)}>Törlés</button>
                    </li>
                ))}
            </ul>

            <input
                type="text"
                placeholder="Új termék neve"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="Új termék ára"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
            />
            <input
                type="text"
                placeholder="Új termék leírása"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
                type="url"
                placeholder="Új termék kép URL-je"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
            />
            <button onClick={onAddProduct}>Hozzáadás</button>
        </div>
    );
};

export default ProductsApp;