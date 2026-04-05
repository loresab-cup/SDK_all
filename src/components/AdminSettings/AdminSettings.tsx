import { useState, useEffect } from 'react';

// Ключ для хранения в localStorage
const SETTINGS_KEY = 'site_settings';

// Настройки по умолчанию
const defaultSettings = {
    phone: '+7 (888) 888-88-88',
    email: 'adress_email.ru',
    address: 'г. Томск, ул. Кузовлевский тракт, 2Б ст31',
    workHours: 'Пн-Пт: 9:00-18:00, Сб: 10:00-16:00',
    footerText: '© 2026 ООО «СДК». Все права защищены.',
    contactText: 'Нужна консультация? Оставьте свой номер — мы перезвоним и ответим на все вопросы.'
};

const AdminSettings = () => {
    const [settings, setSettings] = useState(defaultSettings);
    const [saved, setSaved] = useState(false);

    // Загружаем настройки при открытии страницы
    useEffect(() => {
        const savedSettings = localStorage.getItem(SETTINGS_KEY);
        if (savedSettings) {
            setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div>
            <h2>Настройки сайта</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
                Здесь можно изменить контактные данные и текст, которые отображаются на всех страницах.
            </p>

            {saved && (
                <div style={{ background: '#4caf50', color: 'white', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
                    ✅ Настройки сохранены!
                </div>
            )}

            <div style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Телефон</label>
                    <input
                        type="text"
                        name="phone"
                        value={settings.phone}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={settings.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Адрес</label>
                    <input
                        type="text"
                        name="address"
                        value={settings.address}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Режим работы</label>
                    <input
                        type="text"
                        name="workHours"
                        value={settings.workHours}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Текст в футере (копирайт)</label>
                    <input
                        type="text"
                        name="footerText"
                        value={settings.footerText}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Текст в блоке "Нужна консультация?"</label>
                    <textarea
                        name="contactText"
                        value={settings.contactText}
                        onChange={handleChange}
                        rows={3}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div>
                    <button
                        onClick={handleSave}
                        style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Сохранить настройки
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;