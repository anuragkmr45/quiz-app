import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiEndpoints from '../../../services/api';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { showSuccessToast, showErrorToast } from '../../tosters/notifications'

function LogoutModal() {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await apiEndpoints.teacher.logout()
            setIsLoading(true);
            handleClose()
            showSuccessToast("Logout Successful")
            navigate('/')
        } catch (error) {
            showErrorToast("Something went wrong!! try again later")
            console.error("Error while loggin out : ", error)
        }
    }

    return (
        <>
            <Button variant="danger" style={{ width: '100%' }} onClick={handleShow}>
                Logout
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sure Want To Logout</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    {/* <Button className='w-100' variant="secondary" onClick={handleClose}>
                        No 
                    </Button> */}
                    {
                        isLoading ? (
                            <Button className='w-100' variant="secondary">
                                Please wait .....
                            </Button>
                        ) : (
                            <Button className='w-100' variant="danger" onClick={handleLogout}>
                                Yes
                            </Button>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LogoutModal;