import React, { useState } from "react";
import {
    Button
} from "react-bootstrap";
import { posts } from "../interface/posts";
import FormPost from "./FormPost";

export default function NewPost(props) {
    const [show, setShow] = useState(false);
    const newPost = {
        id: 0,
        title: '',
        content: ''
    }
    async function post() {
        await posts.newPost(props.sender, newPost).then((response) => {
            close();
            return response;
        });
    }
    function close() {
        setShow(false);
    }

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)} size={'sm'}>
                Novo Post
            </Button>
            <FormPost
                sender={props.sender}
                onSave={() => post()}
                onClose={() => close()}
                post={newPost}
                show={show}
            />
        </>
    );
}

