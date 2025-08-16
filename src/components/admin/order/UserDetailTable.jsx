import React from "react";

const UserDetailTable = ({ user }) => {
    return (
        <div className="overflow-x-auto p-4 border-gray-300 border bg-white rounded-2xl">
            <table className="w-full border border-gray-300-collapse">
                <thead>
                    <tr className="text-center">
                        <th className="border border-gray-300 p-2">#</th>
                        <th className="border border-gray-300 p-2">Username</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Phone</th>
                        <th className="border border-gray-300 p-2">Address</th>
                        <th className="border border-gray-300 p-2">District</th>
                    </tr>
                </thead>
                <tbody>
                    <td className="border border-gray-300 p-2">{user.id}</td>
                    <td className="border border-gray-300 p-2">{user.firstname} {user.lastname}</td>
                    <td className="border border-gray-300 p-2">{user.email}</td>
                    <td className="border border-gray-300 p-2">{user.phone}</td>
                    <td className="border border-gray-300 p-2">{user.address}</td>
                    <td className="border border-gray-300 p-2">{user.district}</td>

                </tbody>
            </table>
        </div>

    );
};

export default UserDetailTable;
