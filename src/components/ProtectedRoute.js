import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const checkUser = () => {
        const user = localStorage.getItem('user');
        if (!user|| user=== 'undefined') {
            props.setIsLoggedIn(false);
            return navigate('/login');
        }
        props.setIsLoggedIn(true);
    }
    useEffect(() => {
            checkUser();
        }, [props.isLoggedIn]);
    return (
        <React.Fragment>
            {
                props.isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;