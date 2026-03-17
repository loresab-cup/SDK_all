import React, { useState, useEffect } from 'react';
import styles from './FeedbackCarousel.module.css';
import sawIcon from '@assets/saw-dot.svg';

const FeedbackCarousel: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const totalSlides = 3;

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, totalSlides]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    const goToSlide = (index: number) => setCurrentSlide(index);

    const dots = Array.from({ length: totalSlides }, (_, i) => i);

    // Обработчики формы
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0 && value[0] !== '7') value = '7' + value;
        setPhone(value.substring(0, 11));
    };

    const formatPhoneForDisplay = (phone: string): string => {
        if (!phone) return '';
        let digits = phone.replace(/\D/g, '');
        if (!digits || digits[0] !== '7') return digits;
        digits = digits.substring(1);
        const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
        if (!match) return `+7 ${digits}`;
        const [, p1, p2, p3, p4] = match;
        let formatted = '+7';
        if (p1) formatted += ` (${p1}`;
        if (p2) formatted += `) ${p2}`;
        if (p3) formatted += `-${p3}`;
        if (p4) formatted += `-${p4}`;
        return formatted;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || phone.length !== 11) {
            alert('Пожалуйста, заполните все поля корректно');
            return;
        }
        console.log('Обратный звонок:', { name, phone });
        setName('');
        setPhone('');
    };

    const renderSlide = (index: number) => {
        if (index === 0) {
            return (
                <div className={styles.callbackSlide}>
                    <div className={styles.callbackLeft}>
                        <h2 className={styles.callbackTitle}>Нужна консультация?</h2>
                        <p className={styles.callbackSubtitle}>
                            Оставьте свой номер — мы перезвоним и ответим на все вопросы
                        </p>
                    </div>
                    <form className={styles.callbackForm} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Имя"
                            value={name}
                            onChange={handleNameChange}
                            className={styles.callbackInput}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            value={formatPhoneForDisplay(phone)}
                            onChange={handlePhoneChange}
                            className={styles.callbackInput}
                            required
                        />
                        <button type="submit" className={styles.callbackButton}>
                            Обратный звонок
                        </button>
                    </form>
                </div>
            );
        } else {
            return (
                <div className={styles.placeholderSlide}>
                    <p>Слайд {index + 1}</p>
                </div>
            );
        }
    };

    return (
        <section
            className={styles.carouselSection}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <div className={styles.container}>
                <div className={styles.carousel}>
                    <div className={styles.slidesContainer}>
                        {dots.map((index) => (
                            <div
                                key={index}
                                className={`${styles.slide} ${currentSlide === index ? styles.active : ''}`}
                            >
                                {renderSlide(index)}
                            </div>
                        ))}
                    </div>

                    <div className={styles.carouselControls}>
                        <button className={styles.controlButton} onClick={prevSlide} aria-label="Предыдущий слайд">‹</button>
                        <div className={styles.dots}>
                            {dots.map((index) => (
                                <button
                                    key={index}
                                    className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Перейти к слайду ${index + 1}`}
                                >
                                    {currentSlide === index && (
                                        <img src={sawIcon} alt="Активный слайд" className={styles.sawIcon} />
                                    )}
                                </button>
                            ))}
                        </div>
                        <button className={styles.controlButton} onClick={nextSlide} aria-label="Следующий слайд">›</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeedbackCarousel;