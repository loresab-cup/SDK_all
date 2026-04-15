import { useState } from 'react';
import ProductFormModal from '../ProductFormModal/ProductFormModal';
import styles from './AdminProducts.module.css';

const mockProducts = [
    { id: 1, name: 'Доска обрезная 100х25', price: 150, category: 'Пиломатериалы' },
    { id: 2, name: 'Доска обрезная 150х25', price: 225, category: 'Пиломатериалы' },
    { id: 3, name: 'Фанера 1525х1525 10мм', price: 1250, category: 'Фанера' },
    { id: 4, name: 'Щепа древесная', price: 80, category: 'Щепа' },
];

const AdminProducts = () => {
    const [products, setProducts] = useState(mockProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleDelete = (id: number) => {
        if (confirm('Удалить товар?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleSave = (product: any) => {
        if (editingProduct) {
            setProducts(products.map(p => p.id === product.id ? product : p));
        } else {
            setProducts([...products, { ...product, id: Date.now() }]);
        }
        setEditingProduct(null);
    };

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Управление товарами</h1>
                <button 
                    onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
                    className={styles.addBtn}
                >
                    + Добавить товар
                </button>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Категория</th>
                        <th>Цена (₽)</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>
                                <button 
                                    onClick={() => handleEdit(product)}
                                    className={styles.editBtn}
                                >
                                    ✏️
                                </button>
                                <button 
                                    onClick={() => handleDelete(product.id)} 
                                    className={styles.deleteBtn}
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>

            <ProductFormModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingProduct(null); }}
                onSave={handleSave}
                product={editingProduct}
            />
        </div>
    );
};

export default AdminProducts;