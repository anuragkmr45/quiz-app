import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { MdMenu } from 'react-icons/md'

import SideBar from '../../headder/sidebar'

const DashboardFrame = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const handleBodyScroll = () => {
            document.body.style.overflowY = sidebarOpen ? 'hidden' : 'auto';
        };

        handleBodyScroll();

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, [sidebarOpen]);

    return (
        <Row>
            <Col
                lg={sidebarOpen ? 3 : 0}
                md={sidebarOpen ? 3 : 0}
                sm={sidebarOpen ? 10 : 0}
                style={{ borderRadius: '0 2rem 2rem 0', boxShadow: '6px 6px 6px -6px rgba(0, 0, 0, 0.8)' }} >
                <Container>
                    <div className="d-flex my-2" onClick={toggleSidebar}>
                        <MdMenu fontSize="2rem" /> <h3 className='mx-2' style={{ color: 'rgba(66,)' }} >Quiz App</h3>
                    </div>
                    {sidebarOpen && <SideBar />}
                </Container>
            </Col>
            <Col lg={sidebarOpen ? 9 : 12} md={sidebarOpen ? 9 : 12} sm={sidebarOpen ? 12 : 12}>
                <div style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                    {children}
                </div>
            </Col>
        </Row>
    )
}

export default DashboardFrame
