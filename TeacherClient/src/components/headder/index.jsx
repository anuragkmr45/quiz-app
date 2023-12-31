import React from 'react'

import LogoutModal from '../modals/logout-modal'
import { Container } from 'react-bootstrap';

const Headder = () => {

    return (
        <Container className="d-flex justify-content-end flex-wrap my-2">
            <LogoutModal />
        </Container>
  )
}

export default Headder
