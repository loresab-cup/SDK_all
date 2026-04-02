import React, { useEffect, useRef, useState } from 'react';
import styles from './MapSection.module.css';

declare global {
    interface Window {
        ymaps: any;
        ENV?: {
            YANDEX_MAPS_API_KEY?: string;
        };
    }
}

const MapSection: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(false);

    const companyCoordinates = [56.624173, 85.057405];
    const getApiKey = (): string | null => {
        // env
        if (import.meta.env.VITE_YANDEX_MAPS_API_KEY) {
            return import.meta.env.VITE_YANDEX_MAPS_API_KEY;
        }

        // Продакшен
        if (typeof window !== 'undefined' && window.ENV?.YANDEX_MAPS_API_KEY) {
            return window.ENV.YANDEX_MAPS_API_KEY;
        }

        // Чисто напосошок
        if (typeof process !== 'undefined' && process.env?.VITE_YANDEX_MAPS_API_KEY) {
            return process.env.VITE_YANDEX_MAPS_API_KEY;
        }

        return null;
    };

    useEffect(() => {
        const apiKey = getApiKey();

        if (!apiKey) {
            console.error('Yandex Maps API key is missing');
            setLoadError(true);
            return;
        }

        if (window.ymaps) {
            initMap();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
        script.async = true;

        script.onload = () => {
            window.ymaps.ready(() => {
                initMap();
            });
        };

        script.onerror = () => {
            console.error('Failed to load Yandex Maps');
            setLoadError(true);
        };

        document.head.appendChild(script);

        return () => {
            if (map) {
                map.destroy();
            }
        };
    }, []);

    const initMap = () => {
        if (!mapRef.current || !window.ymaps) return;

        try {
            const newMap = new window.ymaps.Map(mapRef.current, {
                center: companyCoordinates,
                zoom: 16,
                controls: ['zoomControl', 'fullscreenControl']
            });

            const placemark = new window.ymaps.Placemark(companyCoordinates, {
                balloonContent: `
          <div class="${styles.balloon}">
            <h3>Наш склад</h3>
            <p>Томск, Кузовлевский тракт, 2Бс31</p>
            <p>📞 +7 (888) 888-88-88</p>
            <p>🕒 Пн-Пт: 9:00-18:00</p>
          </div>
        `
            }, {
                preset: 'islands#darkBrownIcon',
                iconColor: '#7B4538'
            });

            newMap.geoObjects.add(placemark);
            setMap(newMap);
            setIsLoaded(true);
        } catch (error) {
            console.error('Error initializing map:', error);
            setLoadError(true);
        }
    };

    if (loadError) {
        return (
            <section className={styles.mapSection}>
                <div className={styles.container}>
                    <div className={styles.mapHeader}>
                        <h2 className={styles.mapTitle}>Наш склад</h2>
                        <p className={styles.mapSubtitle}>
                            Приезжайте забирать товар сами по адресу: Томск, ул. Кузовлевский тракт, 2Бс31
                        </p>
                    </div>
                    <div className={styles.mapContainer}>
                        <div className={styles.mapPlaceholder}>
                            Карта временно недоступна. Приезжайте по адресу: Томск, ул. Кузовлевский тракт, 2Бс31
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.mapSection}>
            <div className={styles.container}>
                <div className={styles.mapHeader}>
                    <h2 className={styles.mapTitle}>Наш склад</h2>
                    <p className={styles.mapSubtitle}>
                        Приезжайте забирать товар сами по адресу: Томск, ул. Кузовлевский тракт, 2Бс31
                    </p>
                    <div className={styles.contactInfo}>
                        <div className={styles.contactItem}>
                            <span className={styles.contactIcon}>📞</span>
                            <span>+7 (888) 888-88-88</span>
                        </div>
                        <div className={styles.contactItem}>
                            <span className={styles.contactIcon}>🕒</span>
                            <span>Пн-Пт: 9:00-18:00, Сб: 10:00-16:00</span>
                        </div>
                    </div>
                </div>

                <div className={styles.mapContainer}>
                    <div
                        ref={mapRef}
                        className={styles.yaMap}
                        style={{ width: '100%', height: '400px' }}
                    >
                        {!isLoaded && <div className={styles.mapPlaceholder}>Загрузка карты...</div>}
                    </div>
                </div>
                {/* Сюда возможно что то добавить */}
            </div>
        </section>
    );
};

export default MapSection;