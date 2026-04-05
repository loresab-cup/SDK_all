import { useState } from 'react';

// Моковые данные заказов (потом заменим на API)
const mockOrders = [
    { id: 1, customer: 'Иван Петров', phone: '+7 (999) 123-45-67', total: 4500, status: 'новый', date: '2026-04-03' },
    { id: 2, customer: 'ООО "СтройМаркет"', phone: '+7 (888) 555-33-22', total: 12800, status: 'в обработке', date: '2026-04-02' },
    { id: 3, customer: 'Сидоров А.А.', phone: '+7 (777) 888-99-00', total: 2300, status: 'доставлен', date: '2026-04-01' },
];

const AdminOrders = () => {
    const [orders, setOrders] = useState(mockOrders);

    const statusColors: Record<string, string> = {
        'новый': '#ff9800',
        'в обработке': '#2196f3',
        'доставлен': '#4caf50',
        'отменён': '#f44336',
    };

    const handleStatusChange = (id: number, newStatus: string) => {
        setOrders(orders.map(order => 
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    return (
        <div>
            <h2 style={{ marginBottom: '20px' }}>Управление заказами</h2>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f2f2f2', textAlign: 'left' }}>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Клиент</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Телефон</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Сумма (₽)</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Дата</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Статус</th>
                        <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{order.id}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{order.customer}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{order.phone}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{order.total}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>{order.date}</td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                <span style={{
                                    background: statusColors[order.status],
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '12px'
                                }}>
                                    {order.status}
                                </span>
                            </td>
                            <td style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>
                                <select 
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    style={{ padding: '4px 8px', cursor: 'pointer' }}
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