import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

const MainApi = {
    auth: {
        login: async (username, password) => {
            try {
                const response = await axios.post(`${BASE_URL}/auth/login`, {
                    username,
                    password,
                    expiresInMins: 60,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    },
};

export default MainApi;