import React from 'react';
import useUserController from "../../api/user_service/userController.jsx";

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

  if (loading) {
    return <div className="p-4 text-center">Loading users...</div>;
  }

  return (
      <div className="p-4 bg-transparent rounded-lg shadow-md">
        <h1 className="text-3xl mb-4">User Details</h1>

        {/* Filters Section */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
                type="text"
                placeholder="Search by User ID..."
                className="p-2 border border-pink-300 hover:border-pink-500 rounded-md flex-grow focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
                className="p-2 border border-pink-300 hover:border-pink-500 rounded-md text-pink-600"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2 items-center p-2 border border-pink-300 hover:border-pink-500 rounded-md">
            <span className="text-pink-600">Roles:</span>
            {roles.map((role) => (
                <label key={role.roleId} className="flex items-center space-x-1 text-pink-600">
                  <input
                      type="checkbox"
                      checked={roleFilter.includes(role.roleId)}
                      onChange={(e) => {
                        const checked = e.target.checked;
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
              {["User ID", "Name", "Phone", "Status", "Role", "Actions"].map(header => (
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
                      <td className="px-4 py-3 text-sm">{user.userId}</td>
                      <td className="px-4 py-3 text-sm font-medium">{user.userName}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.phoneNumber}</td>
                      <td className="px-4 py-3">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                    >
                      {user.status}
                    </span>
                      </td>
                      <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {roleMap.get(user.roleId) || "Unknown Role"}
                    </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                            onClick={() => handleEditClick(user)}
                            className="text-pink-600 hover:text-pink-900"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                    <button
                        onClick={() => handleUpdatePhone(editingUser.userId, newPhone)}
                        className="mt-2 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
                    >
                      Update Phone
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                    <button
                        onClick={() => handleUpdatePassword(editingUser.userId, newPassword)}
                        className="mt-2 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
                    >
                      Update Password
                    </button>
                  </div>

                  {editingUser.status === 'Active' && (
                      <button
                          onClick={() => handleDeactivateUser(editingUser.userId)}
                          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                      >
                        Deactivate User
                      </button>
                  )}

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