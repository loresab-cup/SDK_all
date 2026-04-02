import React from 'react';
import type { Product, ProductCardProps } from '@types';
import config from '@config/api';
import styles from './ProductSection.module.css';

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    isExpanded,
    selectedVariantId,
    currentQuantity,
    onToggleDetails,
    onVariantSelect,
    onQuantityChange,
    onAddToCart,
    getSelectedVariant
}) => {
    const selectedVariant = getSelectedVariant(product.id);

    return (
        <React.Fragment key={product.id}>
            {/* Карточка товара */}
            <div className={`${styles.productCard} ${isExpanded ? styles.expanded : ''}`}>
                <div className={styles.cardImageContainer}>
                    <img
                        src={`${config.api.baseURL}${product.image}`}
                        alt={product.name}
                        className={styles.productIcon}
                    />
                </div>
                <div className={styles.productDesc}>
                    <h2 className={styles.productTitle}>{product.name}</h2>
                    <button
                        className={`${styles.sizeBtn} ${isExpanded ? styles.active : ''}`}
                        onClick={() => onToggleDetails(product.id)}
                    >
                        {isExpanded ? 'Скрыть' : 'Подробнее'}
                    </button>
                </div>
            </div>

            {/* Полноэкранная таблица */}
            {isExpanded && (
                <div className={styles.fullWidthTable}>
                    <div className={styles.tableContainer}>
                        <h3 className={styles.tableTitle}>{product.name}</h3>
                        <div className={styles.tableWrapper}>
                            <table className={styles.parametersTable}>
                                <thead>
                                    <tr>
                                        <th>Размер</th>
                                        <th>Порода дерева</th>
                                        <th>Сорт</th>
                                        <th>Цена за м³</th>
                                        <th>Наличие</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.variants.map(variant => (
                                        <tr
                                            key={variant.id}
                                            className={`${styles.selectableRow} ${selectedVariantId === variant.id ? styles.selectedRow : ''
                                                } ${variant.stock === 0 ? styles.disabledRow : ''}`}
                                            onClick={() => variant.stock > 0 && onVariantSelect(product.id, variant.id)}
                                        >
                                            <td className={styles.dimensionCell}>{variant.dimensions}</td>
                                            <td>{variant.woodType}</td>
                                            <td>
                                                <span className={`${styles.gradeBadge} ${variant.grade === 'I' ? styles.gradeA :
                                                    variant.grade === 'II' ? styles.gradeB : styles.gradeC
                                                    }`}>
                                                    {variant.grade}
                                                </span>
                                            </td>
                                            <td className={styles.priceCell}>
                                                {variant.price.toLocaleString('ru-RU')} ₽
                                            </td>
                                            <td className={
                                                variant.stock > 20 ? styles.inStock :
                                                    variant.stock > 0 ? styles.lowStock : styles.outOfStock
                                            }>
                                                <div className={styles.stockInfo}>
                                                    <span className={styles.stockIndicator}></span>
                                                    {variant.stock > 0 ? `${variant.stock} шт` : 'Нет в наличии'}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Блок выбранного варианта и добавления в корзину */}
                        {selectedVariantId && (
                            <SelectedVariantActions
                                product={product}
                                selectedVariant={selectedVariant}
                                currentQuantity={currentQuantity}
                                onQuantityChange={onQuantityChange}
                                onAddToCart={onAddToCart}
                            />
                        )}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

// Дополнительный компонент для действий с выбранным вариантом
const SelectedVariantActions: React.FC<{
    product: Product;
    selectedVariant: any;
    currentQuantity: number;
    onQuantityChange: (variantId: string, quantity: number) => void;
    onAddToCart: (product: Product) => void;
}> = ({ product, selectedVariant, currentQuantity, onQuantityChange, onAddToCart }) => {
    return (
        <div className={styles.selectedActions}>
            <div className={styles.selectedInfo}>
                <div className={styles.selectedDetails}>
                    <strong>Выбран вариант:</strong>
                    <span>{selectedVariant?.dimensions} - {selectedVariant?.woodType} - Сорт {selectedVariant?.grade}</span>
                    <span className={styles.selectedPrice}>
                        {selectedVariant?.price.toLocaleString('ru-RU')} ₽/м³
                    </span>
                </div>
            </div>

            <div className={styles.quantitySection}>
                <label htmlFor={`quantity-${product.id}`}>Количество:</label>
                <div className={styles.quantityControls}>
                    <button
                        type="button"
                        className={styles.quantityBtn}
                        onClick={() => {
                            if (selectedVariant?.id) {
                                onQuantityChange(selectedVariant.id, currentQuantity - 1);
                            }
                        }}
                        disabled={currentQuantity <= 1}
                    >
                        -
                    </button>
                    <input
                        id={`quantity-${product.id}`}
                        type="number"
                        min="1"
                        max={selectedVariant?.stock || 1}
                        value={currentQuantity}
                        onChange={(e) => {
                            if (selectedVariant?.id) {
                                onQuantityChange(selectedVariant.id, parseInt(e.target.value) || 1);
                            }
                        }}
                        className={styles.quantityInput}
                    />
                    <button
                        type="button"
                        className={styles.quantityBtn}
                        onClick={() => {
                            if (selectedVariant?.id) {
                                onQuantityChange(selectedVariant.id, currentQuantity + 1);
                            }
                        }}
                        disabled={currentQuantity >= (selectedVariant?.stock || 1)}
                    >
                        +
                    </button>
                    <span className={styles.quantityUnit}>шт</span>
                </div>
            </div>

            <div className={styles.addToCartSection}>
                <div className={styles.totalPrice}>
                    Итого: {((selectedVariant?.price || 0) * currentQuantity).toLocaleString('ru-RU')} ₽
                </div>
                <button
                    className={styles.addToCartBtn}
                    onClick={() => onAddToCart(product)}
                >
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
};

export default ProductCard;