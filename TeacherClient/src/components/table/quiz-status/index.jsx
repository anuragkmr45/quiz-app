import { Table, Button } from 'react-bootstrap';

function BasicExample({ quizData }) {

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Quiz No.</th>
                    <th>Quiz Title</th>
                    <th>Date</th>
                    <th>Details</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    quizData.map((data) => {
                        return (
                            <tr key={data.id} >
                                <td>{data.id}</td>
                                <td>{data.title}</td>
                                <td>{data.date}</td>
                                <td>{data.dtls}</td>
                                <td>
                                    {data.status ? (
                                        <Button className="btn btn-success">Live</Button>
                                    ) : (
                                        <Button className="btn btn-dark">Done</Button>
                                    )}
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    );
}

export default BasicExample;