import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiEndpoints from "../../../services/api";

import {
    InputGroup,
    Form,
    Button,
} from "react-bootstrap";
import { FiMail } from 'react-icons/fi';
import { PiPasswordBold } from 'react-icons/pi';
import { BiHide, BiShow } from 'react-icons/bi';
import { RxAvatar } from "react-icons/rx";
import { MdConfirmationNumber } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

import { showSuccessToast, showErrorToast } from '../../tosters/notifications'

const RegistrationForm = () => {
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegistration = async (e) => {
        
        e.preventDefault();

        // Validation checks
        if (!name) {
            showErrorToast("Name are Required")
            return;
        }
        if (!email) {
            showErrorToast("Email are Required")
            return;
        }
        if (!password) {
            showErrorToast("Password are Required")
            return;
        }

        if (!email.endsWith("@soa.ac.in")) {
            showErrorToast("Email must end with '@soa.ac.in'")
            return;
        }

        if (password.length < 6) {
            showErrorToast("Password must be at least 6 characters long")
            return;
        }

        if (password !== confirmPassword) {
            showErrorToast("Password and Confirm Password do not match")
            setPasswordsMatch(false);
            return;
        }

        try {
            setLoading(true)
            await apiEndpoints.teacher.register({ name, email, password });
            setLoading(false);
            setPasswordsMatch(true);
            showSuccessToast("Regiester Successfully !!")
            navigate('/teacher-login');

        } catch (error) {
            console.error("Error while registeration : ", error)
            setLoading(false);
            showErrorToast("Something Went Wrong!! Try again later")
        }

    };

    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;
        setConfirmPassword(value);

        // Update passwordsMatch state dynamically
        setPasswordsMatch(value === password);
    };

    const disableEvent = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleRegistration} className="d-flex flex-column">
            <InputGroup className='my-2' style={{ border: '1px solid black', borderRadius: '0.5rem' }}>
                <InputGroup.Text id="basic-addon1" style={{ background: '#E8E8E8', border: 'none' }}><RxAvatar /></InputGroup.Text>
                <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    aria-label="Name"
                    aria-describedby="name"
                    style={{ background: '#E8E8E8', border: 'none' }}
                />
            </InputGroup>
            <InputGroup className='my-2' style={{ border: '1px solid black', borderRadius: '0.5rem' }}>
                <InputGroup.Text id="basic-addon1" style={{ background: '#E8E8E8', border: 'none' }}><FiMail /></InputGroup.Text>
                <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="email"
                    style={{ background: '#E8E8E8', border: 'none' }}
                />
            </InputGroup>
            <InputGroup className='my-2' style={{ border: '1px solid black', borderRadius: '0.5rem' }}>
                <InputGroup.Text id="basic-addon1" style={{ background: '#E8E8E8', border: 'none' }}><PiPasswordBold /></InputGroup.Text>
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="password"
                    style={{ background: '#E8E8E8', border: 'none' }}
                    onCut={disableEvent}
                    onCopy={disableEvent}
                    onPaste={disableEvent}
                    onSelect={disableEvent}
                />
                <Button variant="light" onClick={togglePasswordVisibility}>
                    {showPassword ? <BiHide /> : <BiShow />}
                </Button>
            </InputGroup>
            <InputGroup className='my-2' style={{ border: '1px solid black', borderRadius: '0.5rem' }}>
                <InputGroup.Text id="basic-addon1" style={{ background: '#E8E8E8', border: 'none' }}>
                    {passwordsMatch ? <GiConfirmed /> : <MdConfirmationNumber />}
                </InputGroup.Text>
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm Password"
                    aria-label="Confirm Password"
                    aria-describedby="confirmPassword"
                    style={{ background: '#E8E8E8', border: 'none' }}
                    onCut={disableEvent}
                    onCopy={disableEvent}
                    onPaste={disableEvent}
                    onSelect={disableEvent}
                />
            </InputGroup>

            {isLoading ? (
                <Button variant="danger" className="my-lg-3"><p className="my-auto">Loading ... </p></Button>
            ) : (
                <Button type="submit" variant="success" className='my-lg-3'><p className="my-auto">Register</p></Button>
            )}
        </form>
    );
};

export default RegistrationForm;
