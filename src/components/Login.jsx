import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

import { BsEnvelope } from 'react-icons/bs'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

export default function Register({ setToken }) {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    // const [isSubmit, setIsSubmit] = useState(false);

    const responseGoogle = (response) => {
        console.log(response);
      }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        // setIsSubmit(true);
        try {
            const req = await axios.post('https://notflixtv.herokuapp.com/api/v1/users/login', formValues) 
            localStorage.setItem('user', JSON.stringify(req.data.data))
            setFormValues({ email: "", password: "" })
            const user = JSON.parse(localStorage.getItem('user'))
            if(user.token) {
                setToken(true);
            } else {
                setToken(false);
            }
            handleClose();
        }catch(error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <>
            <Button onClick={handleShow} className='nav__button' variant='outline-danger' style={{ borderRadius: '2rem', padding: '0.5rem 1rem'}} >Login</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='form__register' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 position-relative" controlId="formEmail">
                            <Form.Control
                                name='email' 
                                type="email" 
                                placeholder='Email Address' 
                                value={formValues.email}
                                onChange={handleChange}
                            />
                            <BsEnvelope className='icon' />
                            <p className='text-danger'>{formErrors.email}</p>
                        </Form.Group>
                        
                        <Form.Group className="mb-3 position-relative" controlId="formPassword">
                            <Form.Control
                                name='password'
                                type={(showPassword === false) ? 'password':'text'} 
                                placeholder='Password' 
                                autoComplete="off" 
                                value={formValues.password}
                                onChange={handleChange} 
                            />
                            <div>
                                {
                                    (showPassword === false) ? 
                                        <BsFillEyeSlashFill className='icon' onClick={handleClickShowPassword} />: 
                                        <BsFillEyeFill className='icon' onClick={handleClickShowPassword}/>
                                }
                            </div>
                            <p className='text-danger'>{formErrors.password}</p>
                        </Form.Group>
                        
                        <Button variant="danger" type='submit'>
                            Login
                        </Button>
                        <GoogleLogin
                        clientId="620161875594-ef3ktfnlao1lj5ih5vn8p3mi8u9vhkeg.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        />,
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}