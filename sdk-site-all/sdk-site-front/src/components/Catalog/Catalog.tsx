import React from 'react';
import styles from './Catalog.module.css';
import { ProductCatalog } from '@components';

const Catalog: React.FC = () => {


    return (
        <main className={styles.catalogContent}>
            <ProductCatalog />
        </main>
    );
};

export default Catalog;