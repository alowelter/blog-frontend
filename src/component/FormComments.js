import { format } from 'fecha';
import React from "react";
import {
    Button, FloatingLabel, Form, Modal
} from "react-bootstrap";
import { comments } from '../interface/comments';


export default function FormComments(props) {
    var name = '';
    var comentario = '';
    async function save() {
        var payload = {
            visitor_name: name ? name : 'anonimo',
            comment: comentario ? comentario : '...',
            post_id: props.sender.selectedPost.id
        }
        let ret = await comments.newComment(payload);
        props.sender.selectedPost.comments.push(ret.data);
        props.onClose()
    }
    return (
        <>
            <Modal show={props.show} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Comentários</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicContent">
                        <FloatingLabel controlId="floatingTextarea2" label="Comentário">
                            <Form.Control
                                as="textarea"
                                onChange={(e) => comentario = e.target.value}
                                placeholder="Comentário"
                                style={{ height: '70px' }}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Control
                                type="text"
                                placeholder="Seu Nome"
                                onChange={(e) => { name = e.target.value }}
                            />
                            <Form.Text className="text-muted" ></Form.Text>
                            <Button variant="primary" onClick={() => save()}>Salvar</Button>
                    </Form.Group>
                </Form>
                    <div style={{overflow:'auto', maxHeight:'40vh'}}>
                        {                        
                        props.sender.selectedPost?.comments.map((comment, index) => {
                            return (
                                <div key={index} >
                                    <span style={{ paddingBottom: '20px', fontSize: '0.8em', fontStyle: 'italic'}}>Em {format(new Date(comment.created_at), 'DD/MM/YYYY HH:mm')} <b>{comment.visitor_name}</b> disse:</span>
                                    <p>{comment.comment}</p>
                                </div>
                            )
                        })                        
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>Cancelar</Button>                
                </Modal.Footer>
            </Modal>
            </>
    );
}

