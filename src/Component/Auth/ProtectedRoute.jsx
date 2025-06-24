// ProtectedRoute.jsx
import { useAuth } from '../../AuthContext/AuthProvider';
import { useEffect, useState } from 'react';
import LoginModal from './LoginModel';
import { useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const token = user?.token;
    const [showModal, setShowModal] = useState(!token);
    const location = useLocation()

    const navigate = useNavigate()
    const handleClose = () => {
        setShowModal(false);
        // navigate("/")
    };

    useEffect(() => {
        if (token && showModal) {
            setShowModal(false);
            navigate(location.pathname);
        }
    }, [token])
    

    if (!token && showModal) {
        return <LoginModal handleClose={handleClose} />;
    }

    if (!token && !showModal) {
        return navigate("/")
    }

    if (token) {
        return children;
    }
    return children;
};

export default ProtectedRoute;
