import { useState } from 'react';
import styles from './AdminOrders.module.css';

const mockOrders = [
    { id: 1, customer: 'Иван Петров', phone: '+7 (999) 123-45-67', total: 4500, status: 'новый', date: '2026-04-03' },
    { id: 2, customer: 'ООО "СтройМаркет"', phone: '+7 (888) 555-33-22', total: 12800, status: 'в обработке', date: '2026-04-02' },
    { id: 3, customer: 'Сидоров А.А.', phone: '+7 (777) 888-99-00', total: 2300, status: 'доставлен', date: '2026-04-01' },
];

const statusColors: Record<string, string> = {
    'новый': '#ff9800',
    'в обработке': '#2196f3',
    'доставлен': '#4caf50',
    'отменён': '#f44336',
};

const AdminOrders = () => {
    const [orders, setOrders] = useState(mockOrders);

    const handleStatusChange = (id: number, newStatus: string) => {
        setOrders(orders.map(order => 
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Управление заказами</h1>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Клиент</th>
                        <th>Телефон</th>
                        <th>Сумма (₽)</th>
                        <th>Дата</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.phone}</td>
                            <td>{order.total}</td>
                            <td>{order.date}</td>
                            <td>
                                <span 
                                    className={styles.statusBadge}
                                    style={{ background: statusColors[order.status] }}
                                >
                                    {order.status}
                                </span>
                            </td>
                            <td>
                                <select 
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    className={styles.statusSelect}
                                >
                                    <option value="новый">Новый</option>
                                    <option value="в обработке">В обработке</option>
                                    <option value="доставлен">Доставлен</option>
                                    <option value="отменён">Отменён</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrders;