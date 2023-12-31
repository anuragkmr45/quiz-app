import React from 'react'

import { Row, Col } from 'react-bootstrap';

const CenteredElement = ({ children, height }) => {
    return (
        <Row>
            <Col lg={3} md={3} sm={1}></Col>
            <Col lg={6} sm={10} md={6} style={{height: `${height}`}}>
                    {children}
            </Col>
            <Col lg={3} md={3} sm={1}></Col>
        </Row>
    )
}

export default CenteredElement
