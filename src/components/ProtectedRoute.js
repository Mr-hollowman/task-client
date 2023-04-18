import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUser = () => {
        const user = localStorage.getItem('user');
        if (!user|| user=== 'undefined') {
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
            checkUser();
        }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;