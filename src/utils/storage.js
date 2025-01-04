export const setUserData = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
};

export const getUserData = () => {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
};

export const removeUserData = () => {
    localStorage.removeItem('user');
};

export const setTokens = (accessToken, refreshToken) => {
    document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict; HttpOnly`;
    document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict; HttpOnly`;
};

export const getTokens = () => {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
    }, {});

    return {
        accessToken: cookies.accessToken,
        refreshToken: cookies.refreshToken
    };
};

export const removeTokens = () => {
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}; 