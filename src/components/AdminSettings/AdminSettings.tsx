import { useState, useEffect } from 'react';
import styles from './AdminSettings.module.css';

const SETTINGS_KEY = 'site_settings';

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
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Настройки сайта</h1>
                <p className={styles.description}>
                    Здесь можно изменить контактные данные и текст, которые отображаются на всех страницах.
                </p>
            </div>

            {saved && <div className={styles.success}>✅ Настройки сохранены!</div>}

            <div className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Телефон</label>
                    <input type="text" name="phone" value={settings.phone} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input type="email" name="email" value={settings.email} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label>Адрес</label>
                    <input type="text" name="address" value={settings.address} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label>Режим работы</label>
                    <input type="text" name="workHours" value={settings.workHours} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label>Текст в футере (копирайт)</label>
                    <input type="text" name="footerText" value={settings.footerText} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label>Текст в блоке "Нужна консультация?"</label>
                    <textarea name="contactText" value={settings.contactText} onChange={handleChange} rows={3} />
                </div>

                <button onClick={handleSave} className={styles.saveBtn}>
                    Сохранить настройки
                </button>
            </div>
        </div>
    );
};

export default AdminSettings;