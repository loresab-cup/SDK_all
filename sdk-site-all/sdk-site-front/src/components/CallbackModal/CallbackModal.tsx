import React, { useState, useEffect, useRef } from 'react';
import styles from './CallbackModal.module.css';

interface CallbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (phoneNumber: string) => void;
}

const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 300);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Обработчик клика вне модалки
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formattedPhone = formatPhoneForSubmit(phoneNumber);
        if (!formattedPhone || !isAgreed) {
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit(formattedPhone);
            // После успешной отправки сбрасываем форму
            setPhoneNumber('');
            setIsAgreed(false);
            onClose();
        } catch (error) {
            console.error('Ошибка при отправке:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace(/\D/g, ''); // Оставляем только цифры

        // Если первая цифра не 7, добавляем 7 в начало
        if (value.length > 0 && value[0] !== '7') {
            value = '7' + value;
        }

        // Ограничиваем длину (11 цифр включая 7 в начале)
        value = value.substring(0, 11);

        setPhoneNumber(value);
    };

    // Форматирование для отображения
    const formatPhoneForDisplay = (phone: string): string => {
        if (!phone) return '';

        let digits = phone.replace(/\D/g, '');

        // Если номер пустой или начинается не с 7, показываем как есть
        if (!digits || digits[0] !== '7') {
            return digits;
        }

        // Убираем ведущую 7 для форматирования
        digits = digits.substring(1);

        // Форматируем по шаблону +7 (XXX) XXX-XX-XX
        const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
        if (!match) return `+7 ${digits}`;

        const part1 = match[1];
        const part2 = match[2];
        const part3 = match[3];
        const part4 = match[4];

        let formatted = '+7';
        if (part1) formatted += ` (${part1}`;
        if (part2) formatted += `) ${part2}`;
        if (part3) formatted += `-${part3}`;
        if (part4) formatted += `-${part4}`;

        return formatted;
    };

    // Форматирование для отправки (только цифры с 7 в начале)
    const formatPhoneForSubmit = (phone: string): string => {
        const digits = phone.replace(/\D/g, '');
        if (digits.length === 11 && digits[0] === '7') {
            return digits;
        }
        return '';
    };

    const getDisplayValue = (): string => {
        return formatPhoneForDisplay(phoneNumber);
    };

    const isPhoneValid = (): boolean => {
        return formatPhoneForSubmit(phoneNumber).length === 11;
    };

    if (!isOpen) return null;

    return (
        <div
            className={`${styles.modalOverlay} ${isOpen ? styles.overlayEnter : ''}`}
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className={`${styles.modal} ${isOpen ? styles.modalEnter : ''}`}
            >
                {/* Заголовок и кнопка закрытия */}
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Заказать обратный звонок</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Закрыть"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18 6L6 18M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Форма */}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>
                            Номер телефона *
                        </label>
                        <input
                            ref={inputRef}
                            id="phone"
                            type="tel"
                            value={getDisplayValue()}
                            onChange={handlePhoneChange}
                            placeholder="+7 (___) ___-__-__"
                            className={styles.phoneInput}
                            required
                        />
                        <span className={styles.phoneHint}>
                            {!phoneNumber ? 'Введите номер телефона' :
                                !isPhoneValid() ? 'Введите полный номер телефона' :
                                    'На этот номер мы перезвоним в течение 15 минут'}
                        </span>
                    </div>

                    {/* Чекбокс согласия */}
                    <div className={styles.checkboxGroup}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={isAgreed}
                                onChange={(e) => setIsAgreed(e.target.checked)}
                                className={styles.checkbox}
                                required
                            />
                            <span className={styles.checkmark}></span>
                            <span className={styles.checkboxText}>
                                Я согласен на обработку{' '}
                                <a href="/privacy" className={styles.privacyLink}>
                                    персональных данных
                                </a>
                            </span>
                        </label>
                    </div>

                    {/* Кнопка отправки */}
                    <button
                        type="submit"
                        disabled={!isPhoneValid() || !isAgreed || isSubmitting}
                        className={`${styles.submitButton} ${(!isPhoneValid() || !isAgreed) ? styles.submitButtonDisabled : ''
                            }`}
                    >
                        {isSubmitting ? (
                            <span className={styles.loadingText}>
                                <span className={styles.spinner}></span>
                                Отправка...
                            </span>
                        ) : (
                            'Заказать звонок'
                        )}
                    </button>
                </form>

                {/* Дополнительная информация */}
                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        Работаем с 9:00 до 21:00 без выходных
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CallbackModal;