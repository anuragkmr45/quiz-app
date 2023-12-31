import React from 'react'
import { Link } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'
import { IoIosLogIn } from "react-icons/io";
import { FaFileSignature } from "react-icons/fa";

import FeatureCard from '../components/cards/features-card'

const Home = () => {
    return (
        <Container>
            <Row className="d-flex align-items-center justify-content-center vh-100">
                <Col>
                    <Link to="/teacher-login" style={{ textDecoration: 'none' }}>
                        <FeatureCard cardIcon={<IoIosLogIn />} cardTitle="Login" />
                    </Link>
                </Col>
                <Col>
                    <Link to="/teacher-register" style={{ textDecoration: 'none' }}>
                        <FeatureCard cardIcon={<FaFileSignature />} cardTitle="register" />
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default Home
