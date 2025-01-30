import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getUserData, getTokens } from '@/utils/storage';

const withAuth = (WrappedComponent) => {
    return function WithAuthComponent(props) {
        const navigate = useNavigate();
        const userData = getUserData();
        const tokens = getTokens();

        useEffect(() => {
            if (!userData || !tokens?.accessToken) {
                navigate('/login');
            }
        }, [navigate]);

        if (!userData || !tokens?.accessToken) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth; 