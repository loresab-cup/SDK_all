import React, { useEffect, useRef } from 'react';
import styles from './MapSection.module.css';

declare global {
    interface Window {
        ymaps: any;
    }
}

const MapSection: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const companyCoordinates = [56.624173, 85.057405];

    useEffect(() => {
        // Если карта уже создана — не создаём заново
        if (mapInstanceRef.current) return;

        const initMap = () => {
            if (!window.ymaps || !mapRef.current) {
                setTimeout(initMap, 200);
                return;
            }

            // Проверяем, не создана ли уже карта в этом контейнере
            if (mapRef.current.hasChildNodes()) return;

            try {
                const map = new window.ymaps.Map(mapRef.current, {
                    center: companyCoordinates,
                    zoom: 16,
                    controls: ['zoomControl', 'fullscreenControl']
                });

                const placemark = new window.ymaps.Placemark(companyCoordinates, {
                    balloonContent: 'Томск, Кузовлевский тракт, 2Бс31'
                });

                map.geoObjects.add(placemark);
                mapInstanceRef.current = map;
            } catch (err) {
                console.error('Ошибка карты:', err);
            }
        };

        initMap();

        return () => {
            // Очистка при размонтировании
            if (mapInstanceRef.current) {
                mapInstanceRef.current.destroy();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <section className={styles.mapSection}>
            <div className={styles.container}>
                <h2>Наш склад</h2>
                <p>Томск, ул. Кузовлевский тракт, 2Бс31</p>
                <div 
                    ref={mapRef} 
                    style={{ width: '100%', height: '400px', borderRadius: '12px' }}
                ></div>
            </div>
        </section>
    );
};

export default MapSection;