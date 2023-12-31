import React from 'react'
import { Container } from 'react-bootstrap'
// import Loader from '../../assests/gif/loader.gif'

const Loading = ({ msg }) => {
    return (
        <Container className="text-center">
            {/* <img src={Loader} alt="" style={{ width: '40%' }} /> */}
            <h1>Loading .... </h1>
            <h1>{msg}</h1>
        </Container>
    )
}

export default Loading
