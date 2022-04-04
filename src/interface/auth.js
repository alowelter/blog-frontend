import { api } from '../services/api';

export class auth {    
    static async login(email, password) {
        return api.post('/api/login', { email, password }).then((response) => {
            console.log('login response', response);
            if (response.status === 200) {
                localStorage.setItem('access_token', response.data.content.access_token);
            }
            return response;
        });
    }
    static async logout(sender) {
        await api.get('/api/logout').then((response) => {
            localStorage.removeItem('access_token');
            sender.setState({ 'user': null });
            return response;
        });
    }

    static async user(sender) {
        await api.get('/api/user').then((response) => {
            if (response.status === 200) {
                if (response.status === 200) {
                    sender.setState({ 'user': response.data });
                }
                return response.data;
            } else {
                sender.setState({ 'user': null });
                return null;
            }
        });
    }

}