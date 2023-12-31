import { Button, Card } from 'react-bootstrap';

function PastQuizCard({ quizTitle, quizID, date, time }) {
    return (
        <Card className='my-3 card-shadow' style={{ border: 'none' }} >
            <Card.Header>
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column">
                        <h4> Quiz Title :  {quizTitle}</h4>
                        <small style={{ color: 'rgb(102 145 218)'}} > Quiz ID ; {quizID}</small>
                    </div>
                    <div className="d-flex flex-column" >
                        <p>Date And Time : {date}</p>
                        <p>Time: {time}</p>
                    </div>
                </div>
            </Card.Header>
            <Card.Body className='d-flex justify-content-between' >
                <div>
                    Attendence
                </div>
                <div>
                    Performance
                </div>
                <div className="d-flex flex-column">
                    <Button className="btn btn-info m-2">Question List</Button>
                    <Button className="btn btn-secondary m-2">Student List</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default PastQuizCard;