import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import apiEndpoints from '../../../services/api'

import {
    InputGroup,
    Form,
    Button,
} from "react-bootstrap";

import { FiMail } from 'react-icons/fi';
import { BiShow, BiHide } from 'react-icons/bi';
import { PiPasswordBold } from 'react-icons/pi';

import { showSuccessToast, showErrorToast } from '../../tosters/notifications'
const LoginForm = () => {
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailLogin = async (values) => {
        values.preventDefault();
        const email = await values.target.email.value;
        const password = await values.target.password.value;

        if (email.endsWith('@soa.ac.in')) {
            try {
                setLoading(true)
                const res = await apiEndpoints.teacher.login({ email, password });

                const newToken = res.data.token;
                localStorage.setItem('authToken', newToken);
                setToken(newToken);

                setLoading(false)
                showSuccessToast(`Login Succesfully`)
                navigate('/dashboard');

            } catch (error) {
                console.error("Email sign-in error:", error);
                setLoading(false)
                showErrorToast("Email and password not matching")
            }
        } else {
            console.error('Email must end with "@soa.ac.in"');
            showErrorToast("Only College Emial is applicable")
        }
    };

    return (
        <form onSubmit={handleEmailLogin} className="d-flex flex-column">
            <InputGroup className='my-3' style={{ border: '1px solid black', borderRadius: '0.5rem' }}>
                <InputGroup.Text id="basic-addon1" style={{ background: '#E8E8E8', border: 'none' }}><FiMail /></InputGroup.Text>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="email"
                    style={{ background: '#E8E8E8', border: 'none' }}
                />
            </InputGroup>
            <InputGroup className='my-3' style={{ border: '1px solid black', borderRadius: '0.5rem' }}>
                <InputGroup.Text id="basic-addon1" style={{ background: '#E8E8E8', border: 'none' }}><PiPasswordBold /></InputGroup.Text>
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="password"
                    style={{ background: '#E8E8E8', border: 'none' }}
                />
                <Button variant="light" onClick={togglePasswordVisibility}>
                    {showPassword ? <BiHide /> : <BiShow />}
                </Button>
            </InputGroup>
            {
                loading ? (
                    <Button variant="danger" className='my-sm-2'>
                        <p className="my-auto" >Please wait .....</p>
                    </Button>
                ) : (
                    <Button type="submit" variant="success" className='my-sm-2'>
                        <p className='my-auto' >Login</p>
                    </Button>
                )
            }
        </form>
    );
};

export default LoginForm;
