import React from 'react';
import useUserController from "../../api/user_service/userController.jsx";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel.jsx";

const User = () => {
  const {
    roles,
    loading,
    statusOptions,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    filteredUsers,
    roleMap,
    handleEditClick,
    handleUpdatePhone,
    handleUpdatePassword,
    handleDeactivateUser,
    isEditModalOpen,
    editingUser,
    newPhone,
    setNewPhone,
    newPassword,
    setNewPassword,
    setIsEditModalOpen,
  } = useUserController();


  // Show loading message while user data is being fetched
  if (loading) {
    return <LoadingWheel />
  }

  return (
      <div className="p-4 bg-transparent rounded-lg shadow-md">
        <h1 className="text-3xl mb-4">User Details</h1>

        {/* Filters Section */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input for filtering users by ID */}
            <input
                type="text"
                placeholder="Search by User ID..."
                className="p-2 border border-pink-300 hover:border-pink-500 rounded-md flex-grow focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition"
                value={searchTerm} // Bind to searchTerm state
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
            />
            {/* Dropdown for filtering by user status */}
            <select
                className="p-2 border border-pink-300 hover:border-pink-500 rounded-md text-pink-600"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)} // Update status filter on change
            >
              <option value="">All Statuses</option>
              {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option> // Render status options
              ))}
            </select>
          </div>

          {/* Role filter section with checkboxes for each role */}
          <div className="flex flex-wrap gap-2 items-center p-2 border border-pink-300 hover:border-pink-500 rounded-md">
            <span className="text-pink-600">Roles:</span>
            {roles.map((role) => (
                <label key={role.roleId} className="flex items-center space-x-1 text-pink-600">
                  <input
                      type="checkbox"
                      checked={roleFilter.includes(role.roleId)} // Check if role is included in the filter
                      onChange={(e) => {
                        const checked = e.target.checked;
                        // Update the role filter based on checkbox state
                        setRoleFilter(prev =>
                            checked ? [...prev, role.roleId] : prev.filter(r => r !== role.roleId)
                        );
                      }}
                      className="form-checkbox h-4 w-4 border-pink-300 hover:border-pink-500"
                  />
                  <span>{role.roleName}</span>
                </label>
            ))}
          </div>

          {/* Button to clear all filters */}
          <button
              onClick={() => {
                setSearchTerm("");
                setRoleFilter([]);
                setStatusFilter("");
              }}
              className="self-end px-4 py-2 bg-pink-500 hover:bg-pink-400 rounded-md text-white"
          >
            Clear Filters
          </button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-lg border border-pink-500">
          <table className="min-w-full">
            <thead className="bg-gray-200">
            <tr>
              {/* Render table headers */}
              {["User ID", "Name", "Phone", "Status", "Role", " "].map(header => (
                  <th key={header} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    {header}
                  </th>
              ))}
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                    <tr key={user.userId} className="hover:bg-gray-50">
                      {/* Render user details in table rows */}
                      <td className="px-4 py-3 text-sm">{user.userId}</td>
                      <td className="px-4 py-3 text-sm font-medium">{user.userName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.phoneNumber}</td>
                      <td className="px-4 py-3">
                        {/* Display user status with colored badge */}
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                        >
                            {user.status}
                          </span>
                      </td>
                      <td className="px-4 py-3">
                        {/* Display user role with colored badge */}
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {roleMap.get(user.roleId) || "Unknown Role"}
                          </span>
                      </td>
                      <td className="px-4 py-3">
                        {/* Button to edit user details */}
                        <button
                            onClick={() => handleEditClick(user)} // Open edit modal with selected user data
                            className="text-pink-600 hover:text-pink-900"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  {/* Message for no users found */}
                  <td colSpan="6" className="p-4 text-center text-gray-500">No users found</td>
                </tr>
            )}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && editingUser && (
            <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit User {editingUser.userId}</h2>
                <div className="space-y-4">
                  {/* Phone number update section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        value={newPhone} // Bind to new phone state
                        onChange={(e) => setNewPhone(e.target.value)} // Update new phone state on change
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                    {/* Button to update phone number */}
                    <button
                        onClick={() => handleUpdatePhone(editingUser.userId, newPhone)}
                        className="mt-2 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
                    >
                      Update Phone
                    </button>
                  </div>

                  {/* Password update section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        value={newPassword} // Bind to new password state
                        onChange={(e) => setNewPassword(e.target.value)} // Update new password state on change
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                    {/* Button to update password */}
                    <button
                        onClick={() => handleUpdatePassword(editingUser.userId, newPassword)}
                        className="mt-2 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
                    >
                      Update Password
                    </button>
                  </div>

                  {/* Deactivate user button if status is Active */}
                  {editingUser.status === 'Active' && (
                      <button
                          onClick={() => handleDeactivateUser(editingUser.userId)}
                          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                      >
                        Deactivate User
                      </button>
                  )}

                  {/* Button to close the modal */}
                  <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default User;