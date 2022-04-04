import React from "react";
import {
    Button, FloatingLabel, Form,
    Modal
} from "react-bootstrap";

export default function FormPost(props) {
    return (
        <>
            <Modal show={props.show} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Control
                                type="text"
                                placeholder="Título"
                                defaultValue={props.post?.title}
                                onChange={(e) => { props.post.title = e.target.value }}
                            />
                        <Form.Text className="text-muted" ></Form.Text>
                    </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicContent">
                            <FloatingLabel controlId="floatingTextarea2" label="Conteúdo">
                                <Form.Control
                                    as="textarea"
                                    defaultValue={props.post?.content}
                                    onChange={(e) => props.post.content = e.target.value}
                                    placeholder="Conteúdo"
                                    style={{ height: '100px' }}
                                />
                            </FloatingLabel>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>Cancelar</Button>
                    <Button variant="primary" onClick={props.onSave}>Salvar</Button>
                </Modal.Footer>
            </Modal>
            </>
    );
}

