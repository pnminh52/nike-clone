import React, { useEffect, useState } from "react";
import axios from "axios";
import UserDetailModal from "../../../components/admin/account/UserDetailModal";
import BlockReasonModal from "../../../components/admin/account/BlockUserModal";
import AccountTable from "../../../components/admin/account/AccountTable";
import AccountFilter from "../../../components/admin/account/AccountFilter";
const AccountList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToBlock, setUserToBlock] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleAccountStatus = async (user, reason = "") => {
    const updatedStatus =
      user.accountStatus === "Blocked" ? "Active" : "Blocked";

    if (updatedStatus === "Blocked" && !reason) {
      setUserToBlock(user);
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/users/${user.id}`, {
        accountStatus: updatedStatus,
        blockReason: updatedStatus === "Blocked" ? reason : "",
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, accountStatus: updatedStatus, blockReason: reason }
            : u
        )
      );
    } catch (err) {
      console.error("Error updating account status:", err);
    } finally {
      setUserToBlock(null);
    }
  };

  if (loading) return <p>Loading user list...</p>;

  const filteredUsers = users
    .filter((user) => user.role !== "Admin" && user.role !== "Staff")
    .filter((user) => {
      if (filterStatus === "All") return true;
      return (user.accountStatus || "Active") === filterStatus;
    });

  return (
    <div className="p-4">
      <div>
        <h2 className="text-2xl nike-title-for-mobile">
          User account management
        </h2>
        <p>You can see the detailed list and account status of users here</p>
      </div>

      <AccountFilter
        filterStatus={filterStatus}
        onChange={setFilterStatus}
      />

      <AccountTable
        users={filteredUsers}
        onViewDetails={setSelectedUser}
        onToggleStatus={toggleAccountStatus}
      />

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {userToBlock && (
        <BlockReasonModal
          user={userToBlock}
          onConfirm={(reason) => toggleAccountStatus(userToBlock, reason)}
          onCancel={() => setUserToBlock(null)}
        />
      )}
    </div>
  );
};

export default AccountList;
