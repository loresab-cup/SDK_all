import React, { useState } from 'react';
import styles from './Documents.module.css';

import LicensePreview from '@assets/documents/license-preview.jpg';
import LicenseFull from '@assets/documents/license-full.jpg';
import CertificatePreview from '@assets/documents/certificate-preview.jpg';
import CertificateFull from '@assets/documents/certificate-full.jpg';


interface Document {
    id: number;
    title: string;
    description: string;
    previewImage: string;
    fullImage: string;
    downloadUrl: string;
    type: 'license' | 'certificate' | 'specification' | 'passport';
}

const Documents: React.FC = () => {
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Данные документов с изображениями
    const documents: Document[] = [
        {
            id: 1,
            title: 'Сертификаты качества',
            description: 'Сертификаты соответствия на всю продукцию',
            previewImage: CertificatePreview,
            fullImage: CertificateFull,
            downloadUrl: '/documents/certificates.pdf',
            type: 'certificate'
        },
        {
            id: 2,
            title: 'Лицензии',
            description: 'Лицензии на осуществление деятельности',
            previewImage: LicensePreview,
            fullImage: LicenseFull,
            downloadUrl: '/documents/licenses.pdf',
            type: 'license'
        }
    ];

    const openDocument = (doc: Document) => {
        setSelectedDocument(doc);
        setIsLoading(true);
    };

    const closeDocument = () => {
        setSelectedDocument(null);
        setIsLoading(true);
    };

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleDownload = (doc: Document, event: React.MouseEvent) => {
        event.stopPropagation();

        // Создаем временную ссылку для скачивания
        const link = document.createElement('a');
        link.href = doc.downloadUrl;
        link.download = `${doc.title.replace(' ', '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <main className={styles.documentsContent}>
            <h1 className={styles.documentsTitle}>Документация</h1>
            <div className={styles.container}>
                <div className={styles.documentsGrid}>
                    {documents.map(doc => (
                        <div key={doc.id} className={styles.documentCard}>
                            <h3 className={styles.documentTitle}>{doc.title}</h3>

                            {/* Превью изображения документа в формате А4 */}
                            <div
                                className={styles.documentPreview}
                                onClick={() => openDocument(doc)}
                            >
                                <div className={styles.previewContainer}>
                                    <img
                                        src={doc.previewImage}
                                        alt={`Превью ${doc.title}`}
                                        className={styles.previewImage}
                                    />
                                    <div className={styles.previewOverlay}>
                                        <span className={styles.previewHint}>нажмите чтобы открыть</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Модальное окно для полноэкранного просмотра */}
            {selectedDocument && (
                <div className={styles.modalOverlay} onClick={closeDocument}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{selectedDocument.title}</h2>
                            <div className={styles.modalControls}>
                                <button
                                    className={styles.downloadBtn}
                                    onClick={(e) => handleDownload(selectedDocument, e)}
                                >
                                    Скачать PDF
                                </button>
                                <button className={styles.closeButton} onClick={closeDocument}>
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className={styles.documentFullView}>
                            {isLoading && (
                                <div className={styles.loadingContainer}>
                                    <div className={styles.spinner}></div>
                                    <p>Загрузка документа...</p>
                                </div>
                            )}
                            <div className={styles.a4Container}>
                                <img
                                    src={selectedDocument.fullImage}
                                    alt={`Полная версия ${selectedDocument.title}`}
                                    className={styles.fullImage}
                                    onLoad={handleImageLoad}
                                    style={{ opacity: isLoading ? 0 : 1 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Documents;