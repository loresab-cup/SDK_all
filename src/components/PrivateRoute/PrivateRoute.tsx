import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuth = localStorage.getItem('adminAuth') === 'true';
    
    if (!isAuth) {
        return <Navigate to="/admin/login" replace />;
    }
    
    return children;
};

export default PrivateRoute;