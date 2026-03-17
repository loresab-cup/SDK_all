import React, { useState } from 'react';
import styles from './ProductCatalog.module.css';

type Tab = 'description' | 'price' | 'properties' | 'documents';

interface Props {
    title: string; // например, "Щепа"
}

const ChipProduct: React.FC<Props> = ({ title }) => {
    const [activeTab, setActiveTab] = useState<Tab>('price');

    // Состояние для выделенной цены в таблице щепы
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

    const handlePriceClick = (price: number) => {
        setSelectedPrice(price);
        console.log('Щепа:', price);
    };

    return (
        <main className={styles.container}>
            <div className={styles.productWrap}>
                {/* Левая колонка */}
                <div className={styles.leftColumn}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.imagePlaceholder}>
                        <span>Картинка щепы</span>
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
                            <p>Щепа древесная для мульчирования и топлива. Экологически чистый материал.</p>
                        )}

                        {activeTab === 'price' && (
                            <div className={styles.priceContent}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <td></td>
                                            <td>Измерение</td>
                                            <td>Цена за ед.</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Щепа + мешок</td>
                                            <td>Мешок</td>
                                            <td
                                                onClick={() => handlePriceClick(80)}
                                                className={selectedPrice === 80 ? styles.selectedCell : ''}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                80
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Щепа (дробленная)</td>
                                            <td>м3</td>
                                            <td
                                                onClick={() => handlePriceClick(300)}
                                                className={selectedPrice === 300 ? styles.selectedCell : ''}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                300
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'properties' && (
                            <ul>
                                <li>Фракция: 10-30 мм</li>
                                <li>Влажность: до 15%</li>
                                <li>Порода: хвойные/лиственные</li>
                            </ul>
                        )}

                        {activeTab === 'documents' && (
                            <p>Сертификат на топливную щепу, результаты испытаний.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ChipProduct; 