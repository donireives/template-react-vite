import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    // Fungsi untuk mengaplikasikan theme
    const applyTheme = (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme);
        document.body.className = newTheme === 'dark' ? 'dark-theme' : 'light-theme';
        
        // Update warna background body
        document.body.style.backgroundColor = newTheme === 'dark' ? '#212529' : '#f8f9fa';
        
        // Update class untuk Bootstrap
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(newTheme);
    };

    // Aplikasikan theme saat pertama kali mount
    useEffect(() => {
        applyTheme(theme);
    }, []);

    // Aplikasikan theme setiap kali berubah
    useEffect(() => {
        applyTheme(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme };
}; 