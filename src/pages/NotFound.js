import React from 'react';
import { Link } from 'react-router-dom';

function NotFound(props) {
    return (
        <div className='container p-5   '>
            <h2>Sorry</h2>
            <p>That page cannot be found</p>
            <Link to='/dashboard'> <span className='text-primary'> Click here Back to HomePage</span></Link>
        </div>
    );
}

export default NotFound;