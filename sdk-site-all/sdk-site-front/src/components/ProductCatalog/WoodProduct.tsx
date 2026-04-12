import React, { useState } from 'react';
import styles from './ProductCatalog.module.css';
import VariantPanel from '../VariantPanel/VariantPanel';
import { useCart } from '../../contexts/CartContext';

type Tab = 'description' | 'price' | 'properties' | 'documents';

interface Props {
    title: string;
}

const BoardProduct: React.FC<Props> = ({ title }) => {
    const [activeTab, setActiveTab] = useState<Tab>('price');

    // Состояния для выделенных ячеек
    const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
    
    // Состояния для панели выбора количества
    const [items, setItems] = useState<any[]>([]);
    const { addItem } = useCart();

    // Данные для таблицы досок (исходный формат)
    const priceData = [
        { sort: 'I-III', width: 100, prices: ['150 р.', '225 р.', '300 р.', '450 р.'] },
        { sort: 'I-III', width: 120, prices: ['180 р.', '270 р.', '360 р.', '540 р.'] },
        { sort: 'I-III', width: 150, prices: ['225 р.', '340 р.', '450 р.', '675 р.'] },
        { sort: 'I-III', width: 180, prices: ['270 р.', '405 р.', '540 р.', '810 р.'] },
        { sort: 'I-III', width: 200, prices: ['300 р.', '450 р.', '600 р.', '900 р.'] },
    ];

    // Функции для панели
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
                setSelectedCells(selectedCells.filter(
                    cell => !(cell.row === item.rowIdx && cell.col === item.colIdx)
                ));
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
            setSelectedCells(selectedCells.filter(
                cell => !(cell.row === item.rowIdx && cell.col === item.colIdx)
            ));
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
        setSelectedCells([]);
    };

    // Извлечение числового значения из цены (например "150 р." → 150)
    const parsePrice = (priceStr: string): number => {
        return parseInt(priceStr.replace(' р.', ''), 10);
    };

    // Обработчик клика по цене
    const handlePriceClick = (rowIdx: number, colIdx: number, priceStr: string) => {
        const price = parsePrice(priceStr);
        
        // Логика выделения
        const alreadySelected = selectedCells.some(
            cell => cell.row === rowIdx && cell.col === colIdx
        );
        
        if (alreadySelected) {
            setSelectedCells(selectedCells.filter(
                cell => !(cell.row === rowIdx && cell.col === colIdx)
            ));
        } else {
            setSelectedCells([...selectedCells, { row: rowIdx, col: colIdx }]);
        }
        
        // Логика добавления в панель
        const variantData = {
            id: `board-${rowIdx}-${colIdx}`,
            dimensions: `${priceData[rowIdx].width}×25×${colIdx === 0 || colIdx === 2 ? '4' : '6'} м`,
            woodType: 'Сосна/Ель',
            grade: priceData[rowIdx].sort,
            price: price,
            rowIdx: rowIdx,
            colIdx: colIdx,
        };
        
        addOrUpdateItem(variantData);
    };

    return (
        <main className={styles.container}>
            <div className={styles.productWrap}>
                {/* Левая колонка */}
                <div className={styles.leftColumn}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.imagePlaceholder}>
                        <span>Картинка доски</span>
                    </div>
                </div>

                {/* Правая колонка */}
                <div className={styles.rightColumn}>
                    <nav className={styles.nav}>
                        <button
                            className={`${styles.navItem} ${activeTab === 'description' ? styles.active : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Описание
                        </button>
                        <button
                            className={`${styles.navItem} ${activeTab === 'price' ? styles.active : ''}`}
                            onClick={() => setActiveTab('price')}
                        >
                            Прайс
                        </button>
                        <button
                            className={`${styles.navItem} ${activeTab === 'properties' ? styles.active : ''}`}
                            onClick={() => setActiveTab('properties')}
                        >
                            Свойства
                        </button>
                        <button
                            className={`${styles.navItem} ${activeTab === 'documents' ? styles.active : ''}`}
                            onClick={() => setActiveTab('documents')}
                        >
                            Документы
                        </button>
                    </nav>

                    <div className={styles.content}>
                        {activeTab === 'description' && (
                            <p>Доска обрезная из хвойных пород. Идеально подходит для строительства и отделки.</p>
                        )}

                        {activeTab === 'price' && (
                            <div className={styles.priceContent}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <td rowSpan={2}>Сорт</td>
                                            <td rowSpan={2}>Ширина доски, мм.</td>
                                            <td colSpan={4}>Толщина доски, мм.</td>
                                        </tr>
                                        <tr>
                                            <td>25</td>
                                            <td>25</td>
                                            <td>50</td>
                                            <td>50</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {priceData.map((row, rowIdx) => (
                                            <tr key={rowIdx}>
                                                <td>{row.sort}</td>
                                                <td>{row.width}</td>
                                                {row.prices.map((price, colIdx) => {
                                                    const isSelected = selectedCells.some(
                                                        cell => cell.row === rowIdx && cell.col === colIdx
                                                    );
                                                    return (
                                                        <td
                                                            key={colIdx}
                                                            onClick={() => handlePriceClick(rowIdx, colIdx, price)}
                                                            className={isSelected ? styles.selectedCell : ''}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            {price}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                        <tr>
                                            <td rowSpan={2}></td>
                                            <td rowSpan={2}></td>
                                            <td>4</td>
                                            <td>6</td>
                                            <td>4</td>
                                            <td>6</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={4}>Длина доски, м.</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Панель выбора количества */}
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
                                <li>Порода: сосна, ель</li>
                                <li>Влажность: камерная сушка 8-12%</li>
                                <li>Сорт: 1-3 (отбор)</li>
                            </ul>
                        )}

                        {activeTab === 'documents' && (
                            <p>Сертификаты соответствия, паспорт качества.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BoardProduct;