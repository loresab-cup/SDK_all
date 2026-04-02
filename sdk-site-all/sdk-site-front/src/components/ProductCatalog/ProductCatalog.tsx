import React from 'react';
import BoardProduct from './WoodProduct';
import ChipProduct from './ChipProduct';
import styles from './ProductCatalog.module.css';
import PlywoodProduct from './PlywoodProduct';
import VeneerProduct from './VeneerProduct';

const CatalogPage: React.FC = () => {
    return (
        <div className={styles.catalogContainer}>
            <BoardProduct title="Доска обрезная" />
            <ChipProduct title="Щепа древесная" />
            <PlywoodProduct title="Фанера" />
            <VeneerProduct title="Шпон" />
        </div>
    );
};

export default CatalogPage;