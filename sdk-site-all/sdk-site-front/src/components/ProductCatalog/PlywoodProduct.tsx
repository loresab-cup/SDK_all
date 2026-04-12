import React, { useState } from 'react';
import styles from './ProductCatalog.module.css';
import VariantPanel from '../VariantPanel/VariantPanel';
import { useCart } from '../../contexts/CartContext';

type Tab = 'description' | 'price' | 'properties' | 'documents';

interface Props {
    title: string;
}

const PlywoodProduct: React.FC<Props> = ({ title }) => {
    const [activeTab, setActiveTab] = useState<Tab>('price');

    // Состояния для выделенных ячеек в каждой таблице
    const [selectedPrices1, setSelectedPrices1] = useState<{ row: number; col: number }[]>([]);
    const [selectedPrices2, setSelectedPrices2] = useState<{ row: number; col: number }[]>([]);
    const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null); // для скидок (индекс столбца)
    // Состояния для панели выбора количества (таблица 1)
    const [items1, setItems1] = useState<any[]>([]);
    const { addItem } = useCart();


    // Состояния для панели выбора количества (таблица 2)
    const [items2, setItems2] = useState<any[]>([]);


    // Данные для первой таблицы (тонкие толщины)
    const thicknesses1 = ['2,4', '2,7', '3', '4', '6', '8'];
    const priceRows1 = [
        { sort: 'I/II', surface: 'Ш2', prices: ['74 950', '69 450', '69 300', '62 650', '55 900', '54 950'] },
        { sort: 'II/II', surface: 'Ш2', prices: ['61 400', '60 850', '60 100', '51 850', '50 250', '45 900'] },
        { sort: 'II/III', surface: 'Ш2', prices: ['54 500', '52 550', '51 700', '45 000', '44 250', '39 750'] },
        { sort: 'II/IV', surface: 'Ш2', prices: ['44 250', '42 850', '42 300', '38 300', '37 700', '36 850'] },
        { sort: 'III/III', surface: 'Ш2', prices: ['43 150', '41 950', '41 200', '36 750', '35 850', '34 950'] },
        { sort: 'III/IV', surface: 'Ш2', prices: ['42 150', '41 150', '40 550', '36 150', '35 150', '34 500'] },
        { sort: 'IV/IV', surface: 'НШ', prices: ['-', '37 500', '36 450', '32 550', '31 950', '31 800'] },
    ];
    const packCounts1 = ['180', '160', '144', '108', '72', '54'];

    // Данные для второй таблицы (толстые толщины)
    const thicknesses2 = ['9-10', '12-15', '18-20-21-24-30'];
    const priceRows2 = [
        { sort: 'I/II', surface: 'Ш2', prices: ['52 250', '51 200', '51 000'] },
        { sort: 'II/II', surface: 'Ш2', prices: ['41 450', '40 800', '40 650'] },
        { sort: 'II/III', surface: 'Ш2', prices: ['37 350', '36 650', '36 450'] },
        { sort: 'II/IV', surface: 'Ш2', prices: ['33 750', '31 950', '31 600'] },
        { sort: 'III/III', surface: 'Ш2', prices: ['33 300', '31 300', '31 150'] },
        { sort: 'III/IV', surface: 'Ш2', prices: ['32 700', '30 700', '30 650'] },
        { sort: 'IV/IV', surface: 'НШ', prices: ['30 700', '28 200', '27 900'] },
    ];
    const packCounts2 = ['48-43', '36-29', '24-21-21-18-14'];

    // Данные для таблицы скидок
    const volumes = ['5', '6', '7', '8', '10', '12', '15', '20', '25', '30', '60', '90', '120', '180', '300'];
    const discounts = ['1,37', '1,49', '1,59', '1,67', '1,80', '1,90', '2,01', '2,15', '2,25', '2,33', '2,59', '2,72', '2,80', '2,91', '3,03'];

    // Обработчики кликов
    const handlePrice1Click = (rowIdx: number, colIdx: number, price: string) => {
    // Логика выделения
    const alreadySelected = selectedPrices1.some(
        cell => cell.row === rowIdx && cell.col === colIdx
    );
    
    if (alreadySelected) {
        setSelectedPrices1(selectedPrices1.filter(
            cell => !(cell.row === rowIdx && cell.col === colIdx)
        ));
    } else {
        setSelectedPrices1([...selectedPrices1, { row: rowIdx, col: colIdx }]);
    }
    
    // Логика добавления в панель
    const variantData = {
        id: `plywood1-${thicknesses1[colIdx]}-${priceRows1[rowIdx].sort}`,
        dimensions: `${thicknesses1[colIdx]}×1525×1525 мм`,
        woodType: 'Берёза',
        grade: priceRows1[rowIdx].sort,
        price: Number(price.replace(/\s/g, '')),
        rowIdx: rowIdx,
        colIdx: colIdx,
    };
    
        addOrUpdateItem1(variantData);
     
    };

    const handlePrice2Click = (rowIdx: number, colIdx: number, price: string) => {
    // Логика выделения
    const alreadySelected = selectedPrices2.some(
        cell => cell.row === rowIdx && cell.col === colIdx
    );
    
    if (alreadySelected) {
        setSelectedPrices2(selectedPrices2.filter(
            cell => !(cell.row === rowIdx && cell.col === colIdx)
        ));
    } else {
        setSelectedPrices2([...selectedPrices2, { row: rowIdx, col: colIdx }]);
    }
    
    // Логика добавления в панель
    const variantData = {
        id: `plywood2-${thicknesses2[colIdx]}-${priceRows2[rowIdx].sort}`,
        dimensions: `${thicknesses2[colIdx]}×1525×1525 мм`,
        woodType: 'Берёза',
        grade: priceRows2[rowIdx].sort,
        price: Number(price.replace(/\s/g, '')),
        rowIdx: rowIdx,
        colIdx: colIdx,
    };
    
        addOrUpdateItem2(variantData);

    };

    const handleDiscountClick = (colIdx: number, discount: string) => {
        setSelectedDiscount(colIdx);
        console.log('Скидка:', discount);
    };
    // Функции для таблицы 1
    const addOrUpdateItem1 = (variantData: any) => {
        const existingIndex = items1.findIndex(item => item.id === variantData.id);
    
        if (existingIndex >= 0) {
            const updated = [...items1];
            updated[existingIndex].quantity += 1;
            setItems1(updated);
        } else {
            setItems1([...items1, { ...variantData, quantity: 1 }]);
        }
    };

    const updateQuantity1 = (id: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            const item = items1.find(item => item.id === id);
            if (item) {
                setSelectedPrices1(selectedPrices1.filter(
                    cell => !(cell.row === item.rowIdx && cell.col === item.colIdx)
                ));
            }
            setItems1(items1.filter(item => item.id !== id));
        } else {
            setItems1(items1.map(item => 
                item.id === id ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const removeItem1 = (id: string) => {
        const item = items1.find(item => item.id === id);
        if (item) {
            setSelectedPrices1(selectedPrices1.filter(
                cell => !(cell.row === item.rowIdx && cell.col === item.colIdx)
            ));
        }
        setItems1(items1.filter(item => item.id !== id));
};

// Функции для таблицы 2
    const addOrUpdateItem2 = (variantData: any) => {
        const existingIndex = items2.findIndex(item => item.id === variantData.id);
    
        if (existingIndex >= 0) {
            const updated = [...items2];
            updated[existingIndex].quantity += 1;
            setItems2(updated);
        } else {
            setItems2([...items2, { ...variantData, quantity: 1 }]);
        }
    };

    const updateQuantity2 = (id: string, newQuantity: number) => {
        if (newQuantity <= 0) {
            const item = items2.find(item => item.id === id);
            if (item) {
                setSelectedPrices2(selectedPrices2.filter(
                    cell => !(cell.row === item.rowIdx && cell.col === item.colIdx)
                ));
            }
            setItems2(items2.filter(item => item.id !== id));
        } else {
            setItems2(items2.map(item => 
                item.id === id ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const removeItem2 = (id: string) => {
        const item = items2.find(item => item.id === id);
        if (item) {
            setSelectedPrices2(selectedPrices2.filter(
                cell => !(cell.row === item.rowIdx && cell.col === item.colIdx)
            ));
        }
        setItems2(items2.filter(item => item.id !== id));
    };

    const handleAddToCartFinal = () => {
        const allItems = [...items1, ...items2];
        if (allItems.length === 0) return;
        
        allItems.forEach(item => {
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
        
        setItems1([]);
        setItems2([]);
        setSelectedPrices1([]);
        setSelectedPrices2([]);
    };

    return (
        <main className={styles.container}>
            <div className={styles.productWrap}>
                {/* Левая колонка */}
                <div className={styles.leftColumn}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.imagePlaceholder}>
                        <span>Картинка фанеры</span>
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
                            <p>Фанера берёзовая повышенной водостойкости. Используется в строительстве, производстве мебели, тары.</p>
                        )}

                        {activeTab === 'price' && (
                            <div className={styles.priceContent}>
                                {/* Первая таблица (тонкие толщины) */}
                                <h3>Фанера толщиной 2,4–8 мм</h3>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <td rowSpan={2}>Сорт</td>
                                            <td rowSpan={2}>Поверхность</td>
                                            <td colSpan={6}>Толщина листа, мм</td>
                                        </tr>
                                        <tr>
                                            {thicknesses1.map((th, idx) => (
                                                <td key={idx}>{th}</td>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {priceRows1.map((row, rowIdx) => (
                                            <tr key={rowIdx}>
                                                <td>{row.sort}</td>
                                                <td>{row.surface}</td>
                                                {row.prices.map((price, colIdx) => {
                                                    const isSelected = selectedPrices1.some(cell => cell.row === rowIdx && cell.col === colIdx);
                                                    return (
                                                        <td
                                                            key={colIdx}
                                                            onClick={() => handlePrice1Click(rowIdx, colIdx, price)}
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
                                            <td colSpan={2}>Количество листов в упаковке</td>
                                            {packCounts1.map((count, idx) => (
                                                <td key={idx}>{count}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                                    {/* Панель для первой таблицы */}
                                    <VariantPanel
                                        items={items1}
                                        onQuantityChange={updateQuantity1}
                                        onRemoveItem={removeItem1}
                                        onAddToCart={handleAddToCartFinal}
                                    />

                                {/* Вторая таблица (толстые толщины) */}
                                <h3 style={{ marginTop: '2rem' }}>Фанера толщиной 9–30 мм</h3>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <td rowSpan={2}>Сорт</td>
                                            <td rowSpan={2}>Поверхность</td>
                                            <td colSpan={3}>Толщина листа, мм</td>
                                        </tr>
                                        <tr>
                                            {thicknesses2.map((th, idx) => (
                                                <td key={idx}>{th}</td>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {priceRows2.map((row, rowIdx) => (
                                            <tr key={rowIdx}>
                                                <td>{row.sort}</td>
                                                <td>{row.surface}</td>
                                                {row.prices.map((price, colIdx) => {
                                                    const isSelected = selectedPrices2.some(cell => cell.row === rowIdx && cell.col === colIdx);
                                                    return (
                                                        <td
                                                            key={colIdx}
                                                            onClick={() => handlePrice2Click(rowIdx, colIdx, price)}
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
                                            <td colSpan={2}>Количество листов в упаковке</td>
                                            {packCounts2.map((count, idx) => (
                                                <td key={idx}>{count}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                                    {/* Панель для второй таблицы */}
                                    <VariantPanel
                                        items={items2}
                                        onQuantityChange={updateQuantity2}
                                        onRemoveItem={removeItem2}
                                        onAddToCart={handleAddToCartFinal}
                                    />

                                {/* Таблица скидок */}
                                <h3 style={{ marginTop: '2rem' }}>Скидки для оптовых покупателей</h3>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <td>Объём покупки, м³</td>
                                            {volumes.map((vol, idx) => (
                                                <td key={idx}>{vol}</td>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Скидка в % от цены за 1 м³</td>
                                            {discounts.map((discount, idx) => {
                                                const isSelected = selectedDiscount === idx;
                                                return (
                                                    <td
                                                        key={idx}
                                                        onClick={() => handleDiscountClick(idx, discount)}
                                                        className={isSelected ? styles.selectedCell : ''}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {discount}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'properties' && (
                            <ul>
                                <li>Порода: берёза</li>
                                <li>Класс эмиссии: E1</li>
                                <li>Формат листа: 1525х1525 мм</li>
                                <li>Влажность: 5-10%</li>
                            </ul>
                        )}

                        {activeTab === 'documents' && (
                            <p>Сертификаты соответствия, паспорт качества на фанеру.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PlywoodProduct;