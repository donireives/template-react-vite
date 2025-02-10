import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getUserData, getTokens } from '../../utils/storage'

type ComponentType = React.ComponentType<any>

/**
 * @param WrappedComponent
 * @returns
 */
const withAuth = <P extends object>(WrappedComponent: ComponentType): React.FC<P> => {
    const WithAuthComponent: React.FC<P> = (props) => {
        const navigate = useNavigate()
        const userData = getUserData()
        const tokens = getTokens()

        useEffect(() => {
            if (!userData || !tokens?.accessToken) {
                navigate('/login')
            }
        }, [navigate])

        if (!userData || !tokens?.accessToken) {
            return null
        }

        return <WrappedComponent {...props} />
    }

    WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`

    return WithAuthComponent
}

function getDisplayName(WrappedComponent: ComponentType): string {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default withAuth 