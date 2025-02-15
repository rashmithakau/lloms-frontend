import React from "react";
import ModalContent from "./ModalContent.jsx";

const Modal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            {/* Modal Content */}
            <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border-4 border-black relative">
                <ModalContent onClose={onClose} />
            </div>
        </div>
    );
};

export default Modal;
