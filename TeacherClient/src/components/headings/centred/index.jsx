import { Row, Col } from 'react-bootstrap';

const CentredHEading = ({ title, subtitle }) => {
    return (
        <Row className='text-center' >
            <Col sm='3' > <hr className='fadeInLeft' style={{ border: '2px solid #425a82' }} /> </Col>
            <Col className='fadeInUp' sm='6' >
                <h1 style={{ fontWeight: '600', color: '#425a82', overflowY: 'hidden' }} >{title}</h1>
                {/* <small><b>{subtitle}</b></small> */}
            </Col>
            <Col sm='3' > <hr className='fadeInRight' style={{ border: '2px solid #425a82' }} /> </Col>
        </Row>
    )
}

export default CentredHEading