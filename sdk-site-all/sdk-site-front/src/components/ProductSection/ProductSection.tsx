import React, { useState, useEffect } from 'react';
import { useCart } from '@contexts/CartContext';
import { Flip, toast } from 'react-toastify';
import type { Product, ProductVariant } from '@types';
import ProductCard from './ProductCard';
import { apiService } from '@services/api';
import styles from './ProductSection.module.css';

const ProductSection: React.FC = () => {
    const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
    const [selectedVariants, setSelectedVariants] = useState<{ [key: number]: string }>({});
    const [quantities, setQuantities] = useState<{ [variantId: string]: number }>({});
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { addItem } = useCart();

    const succesNotify = () => toast.success('Товар добавлен в корзину!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
    });

    const fetchProducts = async () => {
        try {
            const data = await apiService.getProducts();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error('Ошибка загрузки товаров:', err);

        }
    };

    useEffect(() => {
        fetchProducts();

        const intervalId = setInterval(() => {
            fetchProducts();
        }, 30000);

        return () => clearInterval(intervalId);
    }, []);

    const handleToggleDetails = (productId: number) => {
        if (loading) return;
        setExpandedProductId(expandedProductId === productId ? null : productId);
    };

    const handleVariantSelect = (productId: number, variantId: string) => {
        if (loading) return;
        setSelectedVariants(prev => ({
            ...prev,
            [productId]: variantId
        }));

        if (!quantities[variantId]) {
            setQuantities(prev => ({
                ...prev,
                [variantId]: 1
            }));
        }
    };

    const handleQuantityChange = (variantId: string, newQuantity: number) => {
        if (loading) return;
        const variant = getAllVariants().find(v => v.id === variantId);
        if (variant && newQuantity >= 1 && newQuantity <= variant.stock) {
            setQuantities(prev => ({
                ...prev,
                [variantId]: newQuantity
            }));
        }
    };

    const getAllVariants = (): ProductVariant[] => {
        return products.flatMap(product => product.variants);
    };

    const handleAddToCart = (product: Product) => {
        if (loading) return;
        const variantId = selectedVariants[product.id];
        if (!variantId) return;

        const variant = product.variants.find(v => v.id === variantId);
        const quantity = quantities[variantId] || 1;

        if (!variant) return;

        addItem(product, variant, quantity);
        succesNotify();
    };

    const getSelectedVariant = (productId: number) => {
        const variantId = selectedVariants[productId];
        if (!variantId) return null;
        const product = products.find(p => p.id === productId);
        return product?.variants.find(v => v.id === variantId) || null;
    };

    const getCurrentQuantity = (productId: number): number => {
        const variantId = selectedVariants[productId];
        if (!variantId) return 1;
        return quantities[variantId] || 1;
    };

    if (loading) {
        return (
            <section className={styles.productSection}>
                <h1 className={styles.productSectionName}>Продукция</h1>
                <div className={styles.container}>
                    <div className={styles.skeletonGrid}>
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className={styles.skeletonCard}>
                                <div className={styles.skeletonImage}></div>
                                <div className={styles.skeletonContent}>
                                    <div className={styles.skeletonText}></div>
                                    <div className={styles.skeletonButton}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.productSection}>
            <h1 className={styles.productSectionName}>Продукция</h1>
            <div className={styles.container}>
                <div className={styles.productGrid}>
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            isExpanded={expandedProductId === product.id}
                            selectedVariantId={selectedVariants[product.id]}
                            currentQuantity={getCurrentQuantity(product.id)}
                            onToggleDetails={handleToggleDetails}
                            onVariantSelect={handleVariantSelect}
                            onQuantityChange={handleQuantityChange}
                            onAddToCart={handleAddToCart}
                            getSelectedVariant={getSelectedVariant}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductSection;