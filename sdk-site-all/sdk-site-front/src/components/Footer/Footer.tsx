import React from 'react';
import styles from './Footer.module.css';

import logo from '@assets/logoLight.png';

const Footer: React.FC = () => {

    return (
        <header className={styles.footer}>
            <div className={styles.footerMain}>
                <div className={styles.footerSection}>
                    <div className={styles.logoSection}>
                        <img src={logo} alt="Логотип компании" className={styles.footerLogo} />
                        <h4>
                            Надёжный поставщик пиломатериалов по всей России.
                        </h4>
                        <p className={styles.companyDescription}>
                            Мы предлагаем древесину только высокого качества: от доски и шпона до фанеры и щепы.
                            Работаем с 2005 года — знаем всё о дереве и честной цене.
                        </p>
                    </div>
                </div>

                <div className={styles.footerSection}>
                    <h3 className={styles.sectionTitle}>Навигация</h3>
                    <nav className={styles.footerNav}>
                        <a href="/" className={styles.footerLink}>Главная</a>
                        <a href="/services" className={styles.footerLink}>Каталог</a>
                        <a href="/documents" className={styles.footerLink}>Документация</a>
                    </nav>
                </div>

                <div className={styles.footerSection}>
                    <h3 className={styles.sectionTitle}>Контакты</h3>
                    <div className={styles.contactInfo}>
                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>Адрес:</span>
                            <span className={styles.contactText}>г. Томск, ул. Кузовлевский тракт, 2Б ст31 </span>
                        </div>
                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>Телефон:</span>
                            <span className={styles.contactText}>+7 (888) 888 88-88</span>
                        </div>
                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>Email:</span>
                            <span className={styles.contactText}>adress_email.ru</span>
                        </div>
                        <div className={styles.contactItem}>
                            <span className={styles.contactLabel}>Режим работы:</span>
                            <span className={styles.contactText}>Пн-Пт: 9:00-18:00</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <div className={styles.copyright}>
                    © {new Date().getFullYear()} ООО «СДК». Все права защищены.
                </div>
            </div>
        </header>
    );
};

export default Footer;