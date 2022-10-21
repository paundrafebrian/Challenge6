import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { BsPerson, BsEnvelope } from 'react-icons/bs'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

export default function Register({ setToken }) {
    const initialValues = { first_name: "", last_name: "",  email: "", password: "", password_confirmation: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    // const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        // setIsSubmit(true);
        try {
            const req = await axios.post('https://notflixtv.herokuapp.com/api/v1/users', formValues) // API
            localStorage.setItem('user', JSON.stringify(req.data.data))
            setFormValues({first_name: "", last_name: "",  email: "", password: "", password_confirmation: ""})
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
        if (!values.first_name) {
            errors.first_name = "First Name is required"
        }
        if (!values.last_name) {
            errors.last_name = "Last Name is required"
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password !== values.password_confirmation) {
            errors.password = "Password and Password Confirmation must same";
            errors.password_confirmation = "Password and Password Confirmation must same"
        }
        if (!values.password_confirmation) {
            errors.password_confirmation = "Password Confirmatioin is required"
        }
        return errors;
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showPassword, setShowPassword] = useState(false);
    const [showPwdCon, setShowPwdCon] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleClickConPass = () => {
        setShowPwdCon(!showPwdCon)
    }

    return (
        <>
            <Button onClick={handleShow} className='nav__button' variant='danger' style={{ borderRadius: '2rem' }} >Register</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='form__register' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 position-relative" controlId="firstName" >
                            <Form.Control
                                name='first_name'
                                type="text"
                                placeholder="First Name"
                                onChange={handleChange}
                                value={formValues.first_name} 
                            />
                            <BsPerson className='icon' />
                            <p className='text-danger'>{formErrors.first_name}</p>
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="lastName">
                            <Form.Control
                                name='last_name'
                                type="text"
                                placeholder="Last Name"
                                onChange={handleChange}
                                value={formValues.last_name} 
                            />
                            <BsPerson className='icon' />
                            <p className='text-danger'>{formErrors.last_name}</p>
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="email">
                            <Form.Control
                                type="email"
                                name='email'
                                placeholder='Email Address'
                                onChange={handleChange}
                                value={formValues.email}
                            />
                            <BsEnvelope className='icon' />
                            <p className='text-danger'>{formErrors.email}</p>
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="password">
                            <Form.Control
                                name='password'
                                type={(showPassword === false) ? 'password' : 'text'}
                                placeholder='Password'
                                autoComplete="off"
                                onChange={handleChange}
                                value={formValues.password}
                            />
                            <div>
                                {
                                    (showPassword === false) ?
                                        <BsFillEyeSlashFill className='icon' onClick={handleClickShowPassword} /> :
                                        <BsFillEyeFill className='icon' onClick={handleClickShowPassword} />
                                }
                            </div>
                            <p className='text-danger'>{formErrors.password}</p>
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative" controlId="passwordConfirmation">
                            <Form.Control
                                name='password_confirmation'
                                type={(showPwdCon === false) ? 'password' : 'text'}
                                placeholder='Password Confirmation'
                                autoComplete="off"
                                onChange={handleChange}
                                value={formValues.password_confirmation}
                            />
                            <div>
                                {
                                    (showPwdCon === false) ?
                                        <BsFillEyeSlashFill className='icon' onClick={handleClickConPass} /> :
                                        <BsFillEyeFill className='icon' onClick={handleClickConPass} />
                                }
                            </div>
                            <p className='text-danger'>{formErrors.password_confirmation}</p>
                        </Form.Group>

                        <Button variant="danger" type="submit">
                            Register
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}