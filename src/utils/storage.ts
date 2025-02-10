interface UserData {
    [key: string]: any
}

interface Tokens {
    accessToken?: string
    refreshToken?: string
}

export const setUserData = (data: UserData): void => {
    localStorage.setItem('user', JSON.stringify(data))
}

export const getUserData = (): UserData | null => {
    const data = localStorage.getItem('user')
    return data ? JSON.parse(data) : null
}

export const removeUserData = (): void => {
    localStorage.removeItem('user')
}

export const setTokens = (accessToken: string, refreshToken: string): void => {
    document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict;`
    document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict;`
}

export const getTokens = (): Tokens => {
    const cookies = document.cookie.split(';').reduce<{ [key: string]: string }>((acc, cookie) => {
        const [key, value] = cookie.trim().split('=')
        acc[key] = value
        return acc
    }, {})

    return {
        accessToken: cookies.accessToken,
        refreshToken: cookies.refreshToken
    }
}

export const removeTokens = (): void => {
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
} 