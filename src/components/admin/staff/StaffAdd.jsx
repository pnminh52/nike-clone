import React from "react";

const StaffAdd = ({
  handleSubmit,
  handleChange,
  formData,
  availablePermissions,
  handlePermissionChange,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mt-4">
      {/* Grid thông tin cá nhân */}
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="district"
          placeholder="District"
          value={formData.district}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          value={formData.avatar}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Quyền truy cập */}
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Permissions</h4>
        <div className="grid grid-cols-2 gap-2">
          {availablePermissions?.map((permission, idx) => {
            const isChecked = formData.permissions?.includes(permission.value);

            return (
              <label key={idx} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={permission.value}
                  checked={isChecked}
                  onChange={handlePermissionChange}
                />
                <span>{permission.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-full hover:opacity-80"
        >
          {loading ? "Adding..." : "Add Staff"}
        </button>
      </div>
    </form>
  );
};

export default StaffAdd;
