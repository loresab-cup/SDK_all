import React, { useState } from 'react';
import styles from './ProductCatalog.module.css'; // путь к вашему CSS-модулю

type Tab = 'description' | 'price' | 'properties' | 'documents';

interface Props {
    title: string; // например, "Доска обрезная"
}

const BoardProduct: React.FC<Props> = ({ title }) => {
    const [activeTab, setActiveTab] = useState<Tab>('price');

    // Состояние для выделенной ячейки в таблице досок
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

    // Данные для таблицы пиломатериалов
    const priceData = [
        { sort: 'I-III', width: 100, prices: ['150 р.', '225 р.', '300 р.', '450 р.'] },
        { sort: 'I-III', width: 120, prices: ['180 р.', '270 р.', '360 р.', '540 р.'] },
        { sort: 'I-III', width: 150, prices: ['225 р.', '340 р.', '450 р.', '675 р.'] },
        { sort: 'I-III', width: 180, prices: ['270 р.', '405 р.', '540 р.', '810 р.'] },
        { sort: 'I-III', width: 200, prices: ['300 р.', '450 р.', '600 р.', '900 р.'] },
    ];

    const handlePriceClick = (rowIndex: number, colIndex: number, price: string) => {
        setSelectedCell({ row: rowIndex, col: colIndex });
        console.log('Доска:', price);
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
                                                    const isSelected =
                                                        selectedCell?.row === rowIdx && selectedCell?.col === colIdx;
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
                                            <td colSpan={4}>Длина доски, мм.</td>
                                        </tr>
                                    </tbody>
                                </table>
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