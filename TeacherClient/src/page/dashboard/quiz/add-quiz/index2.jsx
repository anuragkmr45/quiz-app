import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiEndpoints from '../../../../services/api';
import { topicDtls } from '../../../../.data/topicDtls';
import { Container, Button, Form } from 'react-bootstrap';
import Papa from 'papaparse';
import DashboardFrame from '../../../../components/frames/dashboard';
import QuestionCard from '../../../../components/cards/question-card';
import CenterHeading from '../../../../components/headings/centred';
import { showSuccessToast, showErrorToast } from '../../../../components/tosters/notifications';

const AddQuiz = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [sub, setSub] = useState('');
    const [jsonContent, setJsonContent] = useState(null);
    const [quizData, setQuizData] = useState({
        Title: title,
        Description: desc,
        DateCreated: null,
        SubjectID: sub,
        TopicName: '',
        Questions: [],
    });

    const navigate = useNavigate();
    const currentDate = new Date().toISOString();

    // const handleFileUpload = (event) => {
    //     const file = event.target.files[0];

    //     Papa.parse(file, {
    //         header: true,
    //         dynamicTyping: true,
    //         complete: (result) => {
    //             setJsonContent(result.data);
    //         },
    //         error: (error) => {
    //             console.error('CSV parsing error:', error.message);
    //         },
    //     });
    // };
    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                setJsonContent((prevJsonContent) => result.data);
            },
            error: (error) => {
                console.error('CSV parsing error:', error.message);
            },
        });
    };


    const handleCardEdit = (editedData) => {
        // Update the jsonContent state with the edited data from QuestionCard
        const updatedJsonContent = jsonContent.map((originalData, index) =>
            index === editedData.index ? editedData.data : originalData
        );

        setJsonContent(updatedJsonContent);
    };

    const handleQuizSubmit = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true);

            const questions = [];

            jsonContent.forEach((originalQuestion) => {
                const { question, option1, option2, option3, option4, answer } = originalQuestion;

                const options = [option1, option2, option3, option4];

                questions.push({
                    Question: question,
                    Options: options,
                    Answer: answer,
                });
            });

            const selectedTopic = topicDtls.find((topicDetail) => Object.keys(topicDetail)[0] === sub);
            const topicName = selectedTopic ? Object.values(selectedTopic)[0] : '';

            const newQuizData = {
                Title: title,
                Description: desc,
                DateCreated: currentDate,
                SubjectID: sub,
                TopicName: topicName,
                Questions: questions,
            };

            setQuizData(newQuizData);

            // await apiEndpoints.teacher.createQuiz(quizData);
            console.log(quizData)
            showSuccessToast('Quiz Successfully Stored');
            setIsLoading(false);
            // navigate('/dashboard/previous-quizes');
        } catch (error) {
            showErrorToast('Something went wrong !! Try again later');
            setIsLoading(false);
            console.error('Error while storing quiz : ', error);
        }
    };


    return (
        <DashboardFrame>
            <Container>
                <div className="my-3">
                    <CenterHeading title="Create Quiz" />
                </div>

                <Form.Group controlId="formBasicText" className="d-flex my-3 w-100">
                    <Form.Control type="text" placeholder="Quiz Title" onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicTextarea" className="d-flex my-3">
                    <Form.Control as="textarea" rows={3} placeholder="Quiz Description" onChange={(e) => setDesc(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicSelect" className="d-flex my-3 w-100">
                    <Form.Control as="select" value={sub} onChange={(e) => setSub(e.target.value)}>
                        <option value="">Select a Subject</option>
                        {topicDtls.map((topicDetail, index) => (
                            <option key={index} value={Object.keys(topicDetail)[0]}>
                                {Object.values(topicDetail)[0]}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <div>
                    {!jsonContent ? (
                        <input type="file" onChange={handleFileUpload} />
                    ) : (
                        <div>
                            {jsonContent.map((data, index) => (
                                <QuestionCard key={index} index={index} data={data} onEdit={handleCardEdit} />
                            ))}
                            <div className="text-center">
                                {
                                    isLoading ? (
                                        <Button variant="outline-secondary" className="btn w-50 py-3 my-5">
                                            Loading ...
                                        </Button>
                                    ) : (
                                        <Button onClick={handleQuizSubmit} variant="outline-success" className="btn w-50 py-3 my-5">
                                            Submit
                                        </Button>
                                    )
                                }
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </DashboardFrame>
    );
};

export default AddQuiz;
