import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function QuizDtlsModal({quizID}) {
    const [lgShow, setLgShow] = useState(false);

    return (
        <>
            <Button onClick={() => setLgShow(true)}>Check Details</Button>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {quizID}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
            </Modal>
        </>
    );
}

export default QuizDtlsModal;