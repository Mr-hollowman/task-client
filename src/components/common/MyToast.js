import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function MyToast({ showToast, setShowToast, toastContent, toastHeading }) {
  return (
    <div style={{ position: "fixed", top: 10, right: 10 }}>
      <ToastContainer className="p-3" position='top-end'>
        <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{toastHeading}</strong>
          </Toast.Header>
          <Toast.Body>{toastContent}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default MyToast;