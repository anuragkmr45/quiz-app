import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap';
import { FaRegPaste } from 'react-icons/fa6'
import { GrStatusGood } from 'react-icons/gr'

import FeatureCard from '../../components/cards/features-card'
// import CreateQuizModal from '../../components/modals/create-quiz'
import DashboardFrame from '../../components/frames/dashboard';

const Dashboard = () => {

  useEffect(() => {
    document.title = `Quiz App | Dashboard`;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardFrame>
      <Container>
        <Row className="d-flex align-items-center justify-content-center flex-wrap vh-100">
          <Col>
            <Link to='/dashboard/add-quiz' className="w-100 mx-2" style={{ textDecoration: 'none' }}>
              <FeatureCard cardIcon={<FaRegPaste />} cardTitle='Create Quiz' cardSubText='Create Quizzes' />
            </Link>

          </Col>
          <Col>
            <Link to='/dashboard/previous-quizes' className="w-100 mx-2" style={{ textDecoration: 'none' }}>
              <FeatureCard cardIcon={<FaRegPaste />} cardTitle='My Quizes' cardSubText='Previous Quizzes' />
            </Link>
          </Col>
          <Col>
            <Link to='/dashboard/status-check' className="w-100 mx-2" style={{ textDecoration: 'none' }} >
              <FeatureCard cardIcon={<GrStatusGood />} cardTitle='Check Quiz Status' cardSubText='Check Quiz Status' />
            </Link>
          </Col>
        </Row>


      </Container>
    </DashboardFrame>
  )
}

export default Dashboard
