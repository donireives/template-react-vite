import axios from 'axios'
import { getTokens } from '../utils/storage'

const BASE_URL = 'https://dummyjson.com'

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Add request interceptor untuk menambahkan token
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

// Add response interceptor untuk handle token expired
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized error
            // Misalnya redirect ke login
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

const MainApi = {
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
                
                // Transform data
                const transformedData = response.data.todos.map(item => ({
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
                    userId: 5, // Bisa disesuaikan dengan user yang sedang login
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

export default MainApi 