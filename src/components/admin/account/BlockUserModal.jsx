import React, { useState } from 'react';

const BlockReasonModal = ({ user, onConfirm, onCancel }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!reason.trim()) return alert('Vui lòng nhập lý do khóa!');
    onConfirm(reason);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] relative">
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M7 17L16.8995 7.10051" stroke="#000" strokeLinecap="round" />
          <path d="M7 7L16.8995 16.8995" stroke="#000" strokeLinecap="round" />
        </svg>
      </button>
        <h2 className=" mb-2 mt-8">Block account: {user.email}</h2>
        <textarea
          rows="4"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter the reason for account suspension..."
          className="w-full border rounded-lg p-2 mb-2 resize-none"
        />
       
          
          <button onClick={handleSubmit} className="w-full py-2 rounded-full bg-black text-white cursor-pointer hover:bg-gray-800">
          Confirm locking this account
          </button>
      
      </div>
    </div>
  );
};

export default BlockReasonModal;
