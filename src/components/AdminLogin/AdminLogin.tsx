import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
    
        if (username === 'admin' && password === '123') {
            localStorage.setItem('adminAuth', 'true');
            navigate('/admin');
        } else {
            setError('Неверный логин или пароль');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
            <h2>Вход в админ-панель</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: '8px' }}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '8px' }}
                />
                <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>
                    Войти
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;