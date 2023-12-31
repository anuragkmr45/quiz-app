import React, { useState } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';

const QuestionCard = ({ index, onEdit, data }) => {

    const [questionText, setQuestionText] = useState(data.question);
    const [option1Text, setOption1Text] = useState(data.option1);
    const [option2Text, setOption2Text] = useState(data.option2);
    const [option3Text, setOption3Text] = useState(data.option3);
    const [option4Text, setOption4Text] = useState(data.option4);
    const [answerText, setAnswerText] = useState(data.answer);


    const handleQuestionChange = (e) => {
        setQuestionText(e.target.value);
        onEdit({
            index,
            data: {
                ...data,
                question: e.target.value,
            },
        });
    };

    const handleOption1Change = (e) => {
        setOption1Text(e.target.value);
        onEdit({
            index,
            data: {
                ...data,
                option1: e.target.value,
            },
        });
    };

    const handleOption2Change = (e) => {
        setOption2Text(e.target.value);
        onEdit({
            index,
            data: {
                ...data,
                option2: e.target.value,
            },
        });
    };

    const handleOption3Change = (e) => {
        setOption3Text(e.target.value);
        onEdit({
            index,
            data: {
                ...data,
                option3: e.target.value,
            },
        });
    };

    const handleOption4Change = (e) => {
        setOption4Text(e.target.value);
        onEdit({
            index,
            data: {
                ...data,
                option4: e.target.value,
            },
        });
    };

    const handleAnswerChange = (e) => {
        setAnswerText(e.target.value);
        onEdit({
            index,
            data: {
                ...data,
                answer: e.target.value,
            },
        });
    };

    return (
        <Card className="my-2" >
            <Card.Body>
                <Row>
                    <Col>
                        {index + 1}
                        <Form.Group controlId={`question-${index}`}>
                            <Form.Control as="textarea" className="input-fields" value={questionText} onChange={handleQuestionChange} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Row>
                            <Col lg='6' sm='12'>
                                <Form.Control as="textarea"  className="input-fields"value={option1Text} onChange={handleOption1Change} />
                            </Col>
                            <Col lg='6' sm='12'>
                                <Form.Control as="textarea"  className="input-fields"value={option2Text} onChange={handleOption2Change} />
                            </Col>
                            <Col lg='6' sm='12'>
                                <Form.Control as="textarea"  className="input-fields"value={option3Text} onChange={handleOption3Change} />
                            </Col>
                            <Col lg='6' sm='12'>
                                <Form.Control as="textarea"  className="input-fields"value={option4Text} onChange={handleOption4Change} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                Answer : <Form.Control as="textarea"  className="input-fields"value={answerText} onChange={handleAnswerChange} />
            </Card.Body>
        </Card>
    );
};

export default QuestionCard;
