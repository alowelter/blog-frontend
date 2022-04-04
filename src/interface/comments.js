import { api } from '../services/api';


export class comments {
    static async getAll(sender) {
        return await api.get('/api/comments').then((response) => {
            if (response.status === 200) {
                sender.setState({ 'posts': response.data });
                console.log('posts', response.data);
            }            
            return response;
        });
    }
    static async newComment(payload) {
        console.log('payloadNewcomment',payload);
        return await api.post('/api/comments', payload).then((response) => {
            return response;
        });
    }
        static async destroy(commentID, sender) {
        return await api.delete('/api/comments/'+commentID ).then((response) => {
            if (response.status === 200) {
                this.getAll(sender);
            }            
            return response;
        });
    }

}

