import { useState } from 'react';
import ProductFormModal from '../ProductFormModal/ProductFormModal';

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
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Управление товарами</h2>
                <button 
                    onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
                    style={{ padding: '8px 16px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                    + Добавить товар
                </button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f2f2f2', textAlign: 'left' }}>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Название</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Категория</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Цена (₽)</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{product.id}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{product.name}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{product.category}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{product.price}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                <button 
                                    onClick={() => handleEdit(product)}
                                    style={{ marginRight: '8px', padding: '4px 8px', cursor: 'pointer' }}
                                >
                                    ✏️
                                </button>
                                <button 
                                    onClick={() => handleDelete(product.id)} 
                                    style={{ padding: '4px 8px', cursor: 'pointer', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
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