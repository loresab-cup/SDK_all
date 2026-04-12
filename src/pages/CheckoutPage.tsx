import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutPage.module.css';

const CheckoutPage: React.FC = () => {
    const { state, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        comment: '',
    });

    const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Разбиваем имя на части (если введено полное имя)
    const nameParts = formData.name.trim().split(' ');
    const client_name = nameParts[0] || '';
    const client_surname = nameParts[1] || '';
    const client_patronymic = nameParts[2] || '';
    
    const orderData = {
            client_name: client_name,
            client_surname: client_surname,
            client_patronymic: client_patronymic,
            phone: formData.phone,
            email: formData.email,
            comment: formData.comment,
        };
        
        console.log('Отправка заказа на бэкенд:', orderData);
        console.log('Товары:', state.items);
        
        // Позже здесь будет fetch запрос на /api/orders/
        
        clearCart();
        navigate('/');
        alert('Заказ оформлен!');
    };

    return (
        <div className={styles.container}>
            <h1>Оформление заказа</h1>
            <div className={styles.content}>
                <div className={styles.formSection}>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Имя *" value={formData.name} onChange={handleChange} required />
                        <input type="tel" name="phone" placeholder="Телефон *" value={formData.phone} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email (опционально)" value={formData.email} onChange={handleChange} />
                        <input type="text" name="address" placeholder="Адрес (опционально)" value={formData.address} onChange={handleChange} />
                        <textarea name="comment" placeholder="Комментарий к заказу" value={formData.comment} onChange={handleChange} rows={3} />
                        <button type="submit">Отправить заказ</button>
                    </form>
                </div>

                <div className={styles.cartSection}>
                    <h2>Ваш заказ</h2>
                    {state.items.length === 0 ? (
                        <p>Корзина пуста</p>
                    ) : (
                        <>
                            {state.items.map(item => (
                                <div key={item.id} className={styles.cartItem}>
                                    <div>{item.name}</div>
                                    <div>{item.dimensions} | {item.woodType} | Сорт: {item.grade}</div>
                                    <div>{item.price} ₽ × {item.quantity} = {item.price * item.quantity} ₽</div>
                                </div>
                            ))}
                            <div className={styles.total}>Итого: {totalPrice} ₽</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;