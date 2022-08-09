import { Navigate } from 'react-router-dom'

interface props {
	children: React.ReactNode
	isAllow: boolean
	redirect: string
}
const ProtectedRoute = ({ children, isAllow, redirect }: props) => {
	if (!isAllow) return <Navigate to={redirect} />
	return <>{children}</>
}

export default ProtectedRoute
