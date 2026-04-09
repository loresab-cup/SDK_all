import React, { useState } from 'react';
import styles from './ProductCatalog.module.css';
import VariantPanel from '../VariantPanel/VariantPanel';
import { useCart } from '../../contexts/CartContext';

type Tab = 'description' | 'price' | 'properties' | 'documents';

interface Props {
    title: string;
}

const VeneerProduct: React.FC<Props> = ({ title }) => {
    const [activeTab, setActiveTab] = useState<Tab>('price');
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [items, setItems] = useState<any[]>([]);
    const { addItem } = useCart();

    const veneerData = [
        { id: 'veneer', name: 'Шпон - рванина', unit: 'м³', price: 250 },
    ];

    const addOrUpdateItem = (variantData: any) => {
        const existingIndex = items.findIndex(item => item.id === variantData.id);
        if (existingIndex >= 0) {
            const updated = [...items];
            updated[existingIndex].quantity += 1;
            setItems(updated);
        } else {
            setItems([...items, { ...variantData, quantity: 1 }]);
        }
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            const item = items.find(item => item.id === id);
            if (item) {
                setSelectedRows(selectedRows.filter(row => row !== item.rowIdx));
            }
            setItems(items.filter(item => item.id !== id));
        } else {
            setItems(items.map(item => 
                item.id === id ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const removeItem = (id: string) => {
        const item = items.find(item => item.id === id);
        if (item) {
            setSelectedRows(selectedRows.filter(row => row !== item.rowIdx));
        }
        setItems(items.filter(item => item.id !== id));
    };

    const handleAddToCartFinal = () => {
        if (items.length === 0) return;
        
        items.forEach(item => {
            const product = {
                id: item.id,
                name: title,
                image: '',
            };
            
            const variant = {
                id: item.id,
                dimensions: item.dimensions,
                woodType: item.woodType,
                grade: item.grade,
                price: item.price,
                stock: 1000,
            };
            
            addItem(product, variant, item.quantity);
        });
        
        setItems([]);
        setSelectedRows([]);
    };

    const handlePriceClick = (rowIdx: number, item: typeof veneerData[0]) => {
        const alreadySelected = selectedRows.includes(rowIdx);
        
        if (alreadySelected) {
            setSelectedRows(selectedRows.filter(row => row !== rowIdx));
        } else {
            setSelectedRows([...selectedRows, rowIdx]);
        }
        
        const variantData = {
            id: `veneer-${rowIdx}`,
            dimensions: item.name,
            woodType: 'Берёза/Хвоя',
            grade: '',
            price: item.price,
            rowIdx: rowIdx,
            colIdx: 0,
        };
        
        addOrUpdateItem(variantData);
    };

    return (
        <main className={styles.container}>
            <div className={styles.productWrap}>
                <div className={styles.leftColumn}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.imagePlaceholder}>
                        <span>Картинка шпона</span>
                    </div>
                </div>

                <div className={styles.rightColumn}>
                    <nav className={styles.nav}>
                        <button className={`${styles.navItem} ${activeTab === 'description' ? styles.active : ''}`} onClick={() => setActiveTab('description')}>Описание</button>
                        <button className={`${styles.navItem} ${activeTab === 'price' ? styles.active : ''}`} onClick={() => setActiveTab('price')}>Прайс</button>
                        <button className={`${styles.navItem} ${activeTab === 'properties' ? styles.active : ''}`} onClick={() => setActiveTab('properties')}>Свойства</button>
                        <button className={`${styles.navItem} ${activeTab === 'documents' ? styles.active : ''}`} onClick={() => setActiveTab('documents')}>Документы</button>
                    </nav>

                    <div className={styles.content}>
                        {activeTab === 'description' && (
                            <p>Шпон - рванина (лущёный шпон) используется для производства фанеры, упаковки, как поделочный материал.</p>
                        )}

                        {activeTab === 'price' && (
                            <div className={styles.priceContent}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr><th>Продукция</th><th>Измерение</th><th>Цена за ед.</th></tr>
                                    </thead>
                                    <tbody>
                                        {veneerData.map((item, rowIdx) => (
                                            <tr key={rowIdx}>
                                                <td>{item.name}</td>
                                                <td>{item.unit}</td>
                                                <td onClick={() => handlePriceClick(rowIdx, item)} className={selectedRows.includes(rowIdx) ? styles.selectedCell : ''} style={{ cursor: 'pointer' }}>
                                                    {item.price} ₽
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <VariantPanel
                                    items={items}
                                    onQuantityChange={updateQuantity}
                                    onRemoveItem={removeItem}
                                    onAddToCart={handleAddToCartFinal}
                                />
                            </div>
                        )}

                        {activeTab === 'properties' && (
                            <ul>
                                <li>Порода: берёза, хвоя</li>
                                <li>Влажность: 8±2%</li>
                                <li>Длина: от 0,5 до 2,5 м</li>
                            </ul>
                        )}

                        {activeTab === 'documents' && (
                            <p>Сертификат качества на шпон.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default VeneerProduct;