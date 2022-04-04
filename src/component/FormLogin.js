import React, { useState } from "react";
import {
    Button,
    Form,
    Modal
} from "react-bootstrap";
import { auth } from '../interface/auth';

export default function FormLogin(props) {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    async function fncLogin() {
        await auth.login(email, password).then((response) => {
            if (response.status === 200) {
                props.sender.setState({ 'user': response.data.content.user });
            } else {
                props.sender.setState({ 'user': null , 'msg': 'Usuário ou senha inválidos' });
            }
        });
    }
    return (
        <>
            <div style={{cursor:'pointer'}} onClick={handleShow}>Login</div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }}/>
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {setPassword(e.target.value) }}
                        />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button variant="primary" onClick={() => fncLogin()}>Login</Button>
                </Modal.Footer>
            </Modal>
            </>
    );
}

