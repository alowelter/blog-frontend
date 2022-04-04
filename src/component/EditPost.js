import React from "react";
import { posts } from "../interface/posts";
import FormPost from "./FormPost";

export default function EditPost(props) {
    async function save() {
        let payload = {
            id: props.sender.selectedPost.id,
            title: props.sender.selectedPost.title,
            content: props.sender.selectedPost.content
        }
        await posts.editPost(props.sender.selectedPost.id, payload, props.sender).then((response) => {
            close();
            return response;
        });
    }
    function close() {
        props.sender.setState({ showEditForm: false })
    }
    return (
        <>
            <FormPost
                sender={props.sender}
                onSave={() => save()}
                onClose={() => close()}
                post={props.sender.selectedPost}
                show={props.sender.state.showEditForm}
            />
        </>
    );
}

