import React from 'react';

import Card from 'react-bootstrap/Card';

import './style.css'

function FeatureCard({ cardIcon, cardTitle, cardSubText }) {

    const iconStyle = {
        fontSize: '5rem',
        boxShadow: '3px 3px 3px -3px rgba(0, 0, 0, 0.8)',
        borderRadius: '4rem',
        padding: '0.5rem',
        color: 'rgb(66, 90, 130)',
        margin: 'auto',
    };

    return (
        <Card className='text-center admin-feature-card' style={{ border: 'none' }}>
            <Card.Body className='scale-card'>
                {React.cloneElement(cardIcon, { style: iconStyle })}
                <Card.Title>{cardTitle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {cardSubText}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

export default FeatureCard;