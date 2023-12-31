import React from 'react'
import { Container } from 'react-bootstrap'
import DashboardFrame from '../../../../components/frames/dashboard'
import CenteredHeading from '../../../../components/headings/centred'

const QuestionBank = () => {

    return (
        <DashboardFrame>
            <Container>
                <div className="my-3">
                    <CenteredHeading title='Question Bank' />
                </div>
                <h1 className='text-center' >Comming soon</h1>
            </Container>
        </DashboardFrame>
    )
}

export default QuestionBank
