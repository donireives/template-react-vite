import axios from 'axios'
import { getTokens } from '../utils/storage'

const BASE_URL = 'https://dummyjson.com'

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

api.interceptors.request.use(
    (config) => {
        const tokens = getTokens()
        if (tokens?.accessToken) {
            config.headers.Authorization = `Bearer ${tokens.accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

const DummyApiService = {
    auth: {
        login: async (username: string, password: string) => {
            try {
                const response = await api.post('/auth/login', {
                    username,
                    password,
                    expiresInMins: 60,
                })
                return response.data
            } catch (error) {
                throw error
            }
        },
    },
    label: {
        getList: async (page = 1, pageSize = 10) => {
            try {
                const skip = (page - 1) * pageSize
                const response = await api.get(`/todos`, {
                    params: {
                        limit: pageSize,
                        skip: skip
                    }
                })
                
                const transformedData = response.data.todos.map((item: Todo) => ({
                    key: item.id,
                    name: item.todo,
                    status: item.completed ? 'Completed' : 'Pending',
                    userId: item.userId,
                    createdAt: new Date().toISOString().split('T')[0] // Dummy date
                }))

                return {
                    data: transformedData,
                    pagination: {
                        total: response.data.total,
                        current: page,
                        pageSize: pageSize
                    }
                }
            } catch (error) {
                throw error
            }
        },
        add: async (data: { name: string; status: string }) => {
            try {
                const response = await api.post('/todos/add', {
                    todo: data.name,
                    completed: data.status === 'Completed',
                    userId: 5,
                })
                
                return {
                    key: response.data.id,
                    name: response.data.todo,
                    status: response.data.completed ? 'Completed' : 'Pending',
                    userId: response.data.userId,
                    createdAt: new Date().toISOString().split('T')[0]
                }
            } catch (error) {
                throw error
            }
        },
        update: async (id: number, data: { name: string; status: string }) => {
            try {
                const response = await api.put(`/todos/${id}`, {
                    todo: data.name,
                    completed: data.status === 'Completed',
                })
                
                return {
                    key: response.data.id,
                    name: response.data.todo,
                    status: response.data.completed ? 'Completed' : 'Pending',
                    userId: response.data.userId,
                    createdAt: new Date().toISOString().split('T')[0]
                }
            } catch (error) {
                throw error
            }
        },
        delete: async (id: number) => {
            try {
                await api.delete(`/todos/${id}`)
                return true
            } catch (error) {
                throw error
            }
        }
    }
}

export default DummyApiService 