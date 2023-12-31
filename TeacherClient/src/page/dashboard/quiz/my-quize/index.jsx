import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

import apiEndpoints from '../../../../services/api'

import DashboardFrame from '../../../../components/frames/dashboard'
import PastQuizCard from '../../../../components/cards/past-quiz-card'
import CentredHEading from '../../../../components/headings/centred'
import Loader from '../../../../components/loader'

const PastQuize = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true)
        const userToken = localStorage.getItem('authToken');

        const response = await apiEndpoints.teacher.getMyQuizzes(userToken);

        // Assuming the response.data contains the array of quizzes
        setQuizzes(response.data.quizzes);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setLoading(false)
      }
    };


    fetchQuizzes();
  }, []);

  console.log(quizzes.length)

  return (
    <DashboardFrame>
      <Container>
        <div className="my-4">
          <CentredHEading title="My Quizes" />
        </div>
        {loading ? (
          <Loader />
        ) : (
          quizzes.length === 0 ? (
            <h1 className="my-auto text-center">
              Data Not Found !!!
            </h1>
          ) : (
            quizzes.map((data, index) => {
              const quizDate = new Date(data.datecreated);
              const formattedDate = quizDate.toLocaleDateString();
              const formattedTime = quizDate.toLocaleTimeString();

              return (
                <PastQuizCard
                  key={index}
                  quizTitle={data.title}
                  quizID={data.quizid}
                  date={formattedDate}
                  time={formattedTime}
                />
              );
            })
          )
        )}

      </Container>
    </DashboardFrame>
  )
}

export default PastQuize