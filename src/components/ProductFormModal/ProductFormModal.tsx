import { useState } from 'react';

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: any) => void;
    product?: any;
}

const ProductFormModal = ({ isOpen, onClose, onSave, product }: ProductFormModalProps) => {
    const [name, setName] = useState(product?.name || '');
    const [price, setPrice] = useState(product?.price || '');
    const [category, setCategory] = useState(product?.category || '');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ id: product?.id || Date.now(), name, price: Number(price), category });
        onClose();
        setName('');
        setPrice('');
        setCategory('');
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '8px',
                width: '400px'
            }}>
                <h2>{product ? 'Редактировать товар' : 'Добавить товар'}</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Название</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Категория</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Цена (₽)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button type="button" onClick={onClose} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                            Отмена
                        </button>
                        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFormModal;