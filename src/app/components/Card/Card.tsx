import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    image: string;
    title: string;
    description: string;
    price: number;
}

const Card: React.FC<CardProps> = ({ image, title, description, price }) => {
    return (
        <section className={styles.container}>
            <div className={styles.cardImage}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.cardContent}>
                <b><h2 className={styles.cardTitle}>{title}</h2></b>
                <p className={styles.cardDescription}>{description}</p>
                <p className={styles.cardPrice}>${price.toFixed(2)}</p>
            </div>
        </section>
    );
};

export default Card;