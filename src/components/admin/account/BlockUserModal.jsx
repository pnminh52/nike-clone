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
        <h2 className="text-lg font-bold mb-4">Khóa tài khoản: {user.email}</h2>
        <textarea
          rows="4"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Nhập lý do khóa tài khoản..."
          className="w-full border rounded p-2 mb-4 resize-none"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
            Hủy
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockReasonModal;
