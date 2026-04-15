import { Outlet, Link, useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        navigate('/admin/login');
    };

    return (
        <div className={styles.adminContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <h3>СДК Админ</h3>
                </div>
                <nav className={styles.nav}>
                    <Link to="/admin/products" className={styles.navLink}>📦 Товары</Link>
                    <Link to="/admin/orders" className={styles.navLink}>📋 Заказы</Link>
                    <Link to="/admin/settings" className={styles.navLink}>⚙️ Настройки</Link>
                </nav>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                    🚪 Выйти
                </button>
            </aside>

            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;