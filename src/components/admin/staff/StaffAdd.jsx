import React from "react";

const StaffAdd = ({
  handleSubmit,
  handleChange,
  formData,
  availablePermissions,
  handlePermissionChange,
  loading,
}) => {
  const fields = [
    { name: "firstname", label: "Firstname", type: "text", placeholder: "Firstname" },
    { name: "lastname", label: "Lastname", type: "text", placeholder: "Lastname" },
    { name: "phone", label: "Phone", type: "text", placeholder: "Phone" },
    { name: "address", label: "Address", type: "text", placeholder: "Address" },
    { name: "district", label: "District", type: "text", placeholder: "District" },
    { name: "email", label: "Email", type: "email", placeholder: "Email" },
    { name: "country", label: "Country", type: "text", placeholder: "Country" },
    { name: "avatar", label: "Avatar", type: "text", placeholder: "Avatar URL" },
  ];
  
  return (
    <form onSubmit={handleSubmit} className="bg-white  ">
      {/* Grid thông tin cá nhân */}
      <div className="grid grid-cols-2 gap-3">
  {fields.map((field) => (
    <div key={field.name} className="w-full">
      <p className="mb-1 text-sm font-medium">{field.label}</p>
      <input
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        value={formData[field.name]}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
      />
    </div>
  ))}
</div>


      {/* Quyền truy cập */}
      <div className="">
        <h4 className="font-semibold py-4">Permissions</h4>
        <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-cols-2 gap-3">
  {availablePermissions?.map((permission, idx) => {
    const isChecked = formData.permissions?.includes(permission.value);
    const isDisabled =
      !isChecked && formData.permissions?.length >= 3;

    return (
      <label
        key={idx}
        className={`flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer transition
          ${isChecked ? "bg-gray-100 border-gray-300 text-black" : "bg-white border-gray-300"}
          ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <span className="text-sm font-medium">{permission.label}</span>
        <input
          type="checkbox"
          value={permission.value}
          checked={isChecked}
          onChange={handlePermissionChange}
          disabled={isDisabled}
          className="w-4 h-4 accent-black cursor-pointer"
        />
      </label>
    );
  })}
</div>


        </div>

      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-full hover:opacity-80"
        >
          {loading ? "Adding..." : "Add new staff"}
        </button>
      </div>
    </form>
  );
};

export default StaffAdd;
