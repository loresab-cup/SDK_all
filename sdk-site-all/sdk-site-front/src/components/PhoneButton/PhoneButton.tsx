import React from 'react';
import styles from './PhoneButton.module.css';

import phoneIcon from '@assets/icons/phone-icon.svg';

interface PhoneButtonProps {
    onClick: () => void;
    position?: {
        bottom?: number;
        right?: number;
        top?: number;
        left?: number;
    };
    size?: number;
    color?: string;
    withPulse?: boolean;
    withVibration?: boolean;
}

const PhoneButton: React.FC<PhoneButtonProps> = ({
    onClick,
    position = { bottom: 30, right: 30 },
    size = 60,
    withPulse = true,
    withVibration = true
}) => {
    const positionStyle: React.CSSProperties = {
        bottom: position.bottom ? `${position.bottom}px` : undefined,
        right: position.right ? `${position.right}px` : undefined,
        top: position.top ? `${position.top}px` : undefined,
        left: position.left ? `${position.left}px` : undefined,
        width: `${size}px`,
        height: `${size}px`
    };

    const animationClass = withVibration ? styles.phoneFixedButton : `${styles.phoneFixedButton} ${styles.noVibration}`;

    return (
        <div
            className={animationClass}
            onClick={onClick}
            style={positionStyle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <div className={styles.phoneIconWrapper}>
                <img
                    src={phoneIcon}
                    alt="Заказать обратный звонок"
                    className={styles.phoneIcon}
                />
            </div>
            {withPulse && <div className={styles.pulseRing}></div>}
        </div>
    );
};

export default PhoneButton;