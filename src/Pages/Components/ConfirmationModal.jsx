import React from 'react';

const ConfirmationModal = ({ show, onClose, onConfirm }) => {
    return (
        show && (
            <div id="popup-modal" className="overflow-y-auto overflow-x-hidden flex fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] backdrop-blur-[3px] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Confirmation</h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto" onClick={onClose}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 text-center">
                            <p>Are you sure you want to clear all completed tasks?</p>
                        </div>
                        <div className="flex items-center justify-end p-4 md:p-6 space-x-2 border-t rounded-b dark:border-gray-600">
                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={onConfirm}>
                                Yes, Clear
                            </button>
                            <button className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ConfirmationModal;
