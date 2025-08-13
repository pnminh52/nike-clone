import React from 'react';
import {format} from "date-fns";

const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null;
  const formatDateTime = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy HH:mm");
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px] relative">
        <h2 className="text-xl font-bold mb-4"></h2>
        {user.avatar ? (
  <img
    src={user.avatar}
    alt="Avatar"
    className="w-24 h-24 cursor-pointer rounded-full object-cover mx-auto mb-4"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src =
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><circle cx="48" cy="48" r="48" fill="%23e5e7eb" /></svg>';
    }}
  />
) : (
  <div className="w-24 h-24 cursor-pointer rounded-full bg-gray-300 mx-auto mb-4" />
)}
       <p><strong>Full name:</strong> {user.firstname} {user.lastname}</p>
<p><strong>Email:</strong> {user.email}</p>
<p><strong>Account status:</strong> {user.accountStatus}</p>
<p><strong>Account type:</strong> {user.role}</p>
<p><strong>Phone number:</strong> {user.phone}</p>
<p><strong>Country/Address/District:</strong> {user.country}/{user.address}/{user.district}</p>
<p><strong>Date of Birth:</strong> {user.dateOfBirth}</p>
<p><strong>Created at:</strong> {formatDateTime(user.createdAt)}</p>

        <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M7 17L16.8995 7.10051" stroke="#000" strokeLinecap="round" />
          <path d="M7 7L16.8995 16.8995" stroke="#000" strokeLinecap="round" />
        </svg>
      </button>
      </div>
    </div>
  );
};

export default UserDetailModal;
