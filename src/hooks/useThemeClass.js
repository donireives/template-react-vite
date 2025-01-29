import { useTheme } from './useTheme';

export const useThemeClass = () => {
    const { theme } = useTheme();
    
    const getTextClass = () => theme === 'dark' ? 'text-white' : 'text-dark';
    const getBgClass = () => theme === 'dark' ? 'bg-dark' : 'bg-white';
    const getTextMutedClass = () => theme === 'dark' ? 'text-light' : 'text-muted';
    
    return {
        getTextClass,
        getBgClass,
        getTextMutedClass
    };
}; 