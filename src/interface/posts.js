import { api } from '../services/api';

export class posts {
    static async getAll(sender) {
        return await api.get('/api/posts').then((response) => {
            if (response.status === 200) {
                sender.setState({ 'posts': response.data });
                console.log('posts', response.data);
            }            
            return response;
        });
    }
    static async newPost(sender, payload) {
        return await api.post('/api/posts', payload).then((response) => {
            if (response.status === 201) {
                sender.setState({ 'posts': [...sender.state.posts, response.data] });
            }            
            return response;
        });
    }
        static async destroy(postID, sender) {
        return await api.delete('/api/posts/'+postID ).then((response) => {
            if (response.status === 200) {
                this.getAll(sender);
            }            
            return response;
        });
    }
    static async editPost(postID, payload, sender) {
        return await api.put('/api/posts/'+postID, payload).then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            return response;
        });
    }

}

