import React, { useState } from 'react';
import styles from './ProductCatalog.module.css';

type Tab = 'description' | 'price' | 'properties' | 'documents';

interface Props {
    title: string;
}

const VeneerProduct: React.FC<Props> = ({ title }) => {
    const [activeTab, setActiveTab] = useState<Tab>('price');
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

    const handlePriceClick = (price: number) => {
        setSelectedPrice(price);
        console.log('Шпон:', price);
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
                            <p>Шпон - рванина (лущёный шпон) используется для производства фанеры, упаковки, как поделочный материал.</p>
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
                                            <td>Шпон - рванина</td>
                                            <td>м³</td>
                                            <td
                                                onClick={() => handlePriceClick(250)}
                                                className={selectedPrice === 250 ? styles.selectedCell : ''}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                250
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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