import React, { useState } from "react";
import {
    Button,
    Form,
    Modal
} from "react-bootstrap";
import { api } from '../services/api';

export default function FormRegister() {
    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function register() {
        let payload = {
            name: nome,
            email: email,
            password: password      
        }
        await api.post('/api/register', payload).then((response) => {
            return response;
        });
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow} size={'sm'}>
                Adicionar Editor
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de Novo Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Nome" onChange={(e) => { setNome(e.target.value) }}/>
                        <Form.Text className="text-muted" ></Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value) }}/>
                        <Form.Text className="text-muted" ></Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
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
                    <Button variant="primary" onClick={() => {
                        register();
                        setShow(false);
                    }}>Salvar</Button>
                </Modal.Footer>
            </Modal>
            </>
    );
}

