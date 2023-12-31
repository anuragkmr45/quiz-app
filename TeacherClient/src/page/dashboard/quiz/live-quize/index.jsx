import React from 'react'
import { Container } from 'react-bootstrap'

import DashboardFrame from '../../../../components/frames/dashboard'
import CentredHEading from '../../../../components/headings/centred'
import QuizStatusCheck from '../../../../components/table/quiz-status'
import QuizDtlsModal from '../../../../components/modals/quiz-details'

const LiveQuize = () => {

  const quizData = [
    {
      id: 1,
      title: "Test Quiz 1",
      date: '00/00/0000',
      dtls: <QuizDtlsModal quizID={1} />,
      status: true,
    },
    {
      id: 2,
      title: "Test Quiz 1",
      date: '00/00/0000',
      dtls: <QuizDtlsModal quizID={2} />,
      status: true,
    },
    {
      id: 3,
      title: "Test Quiz 1",
      date: '00/00/0000',
      dtls: <QuizDtlsModal quizID={3} />,
      status: false,
    },
  ]

  return (
    <>
      <DashboardFrame>
        <Container>
          <div className="my-3" >
            <CentredHEading title="Live Quizes" />
          </div>
          <QuizStatusCheck quizData={quizData} />
        </Container>
      </DashboardFrame>
    </>
  )
}

export default LiveQuize