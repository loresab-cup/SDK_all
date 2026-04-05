import { Outlet, Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        navigate('/admin/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Сайдбар */}
            <aside style={{ width: '250px', background: '#2c3e50', color: 'white', padding: '20px' }}>
                <h3>Админ-панель</h3>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                    <Link to="/admin/products" style={{ color: 'white', textDecoration: 'none' }}>Товары</Link>
                    <Link to="/admin/orders" style={{ color: 'white', textDecoration: 'none' }}>Заказы</Link>
                    <Link to="/admin/settings" style={{ color: 'white', textDecoration: 'none' }}>Настройки сайта</Link>
                </nav>
                <button onClick={handleLogout} style={{ marginTop: '40px', padding: '8px', cursor: 'pointer' }}>
                    Выйти
                </button>
            </aside>

            {/* Контент */}
            <main style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;