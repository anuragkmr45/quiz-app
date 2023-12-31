import { useState } from 'react';

import CsvToJsonConverter from '../../../components/csvtojson'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { IoCreateOutline } from 'react-icons/io5'

import FeatureCard from '../../cards/features-card'

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Upload CSV
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center" >
                {/* <input type="file" accept=".csv" />
                <Button onClick={handleUploadCSV} >submit </Button> */}
                <CsvToJsonConverter />
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function CreateQuizModal() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div className="w-100 mx-2" style={{ textDecoration: 'none' }} onClick={() => setModalShow(true)}>
                <FeatureCard cardIcon={<IoCreateOutline />} cardTitle='Create New Quiz' cardSubText='Create New Quiz' />
            </div>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default CreateQuizModal;