import React from 'react';
import useUserController from "../../api/user_service/UserController.jsx";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel.jsx";
import "../../websiteComponents/Scrollbar.css";

const User = () => {
  const {
    users,
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
    handleToggleStatus,
    handleUpdatePhone,
    handleUpdatePassword,
    handleUpdateStatus,
    isEditModalOpen,
    editingUser,
    newPhone,
    setNewPhone,
    newPassword,
    setNewPassword,
    editStatus,
    setEditStatus,
    setIsEditModalOpen,
    handleSaveStaff,
    isAddStaffModalOpen,
    setIsAddStaffModalOpen,
    newStaff,
    setNewStaff,
  } = useUserController();

  if (loading) return <LoadingWheel />;

  return (
      <div className="p-4 bg-transparent rounded-lg shadow-md">
        <h1 className="text-3xl mb-4">User Details</h1>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
                type="text"
                placeholder="Search by User ID..."
                className="p-2 border border-pink-300 hover:border-pink-500 rounded-md flex-grow focus:outline-none focus:ring-1 focus:ring-pink-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <select
                className="p-2 border border-pink-300 hover:border-pink-500 rounded-md text-pink-600"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statusOptions.map(s => (
                  <option key={s} value={s}>
                    {s.charAt(0) + s.slice(1).toLowerCase()}
                  </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-2 items-center p-2 border border-pink-300 hover:border-pink-500 rounded-md">
            <span className="text-pink-600">Roles:</span>
            {roles.map(role => (
                <label key={role.roleId} className="flex items-center space-x-1 text-pink-600">
                  <input
                      type="checkbox"
                      checked={roleFilter.includes(role.roleId)}
                      onChange={e => {
                        const checked = e.target.checked;
                        setRoleFilter(prev => checked ? [...prev, role.roleId] : prev.filter(r => r !== role.roleId));
                      }}
                      className="form-checkbox h-4 w-4 border-pink-300 hover:border-pink-500"
                  />
                  <span>{role.roleName}</span>
                </label>
            ))}
          </div>
          <div className="flex gap-4 justify-end">
            <button
                onClick={() => { setSearchTerm(''); setRoleFilter([]); setStatusFilter(''); }}
                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md"
            >
              Clear Filters
            </button>
            <button
                onClick={() => setIsAddStaffModalOpen(true)}
                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md"
            >
              Add Staff
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-lg border border-pink-500 max-h-[500px]">
          <table className="min-w-full">
            <thead className="bg-gray-200 sticky top-0">
            <tr>
              {['User ID','Name','Phone','Status','Role','Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{h}</th>
              ))}
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {filteredUsers.length > 0 ? filteredUsers.map(user => (
                <tr key={user.userId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{user.userId}</td>
                  <td className="px-4 py-3 text-sm font-medium">{user.userName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.phoneNumber}</td>
                  <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status.charAt(0) + user.status.slice(1).toLowerCase()}
                  </span>
                  </td>
                  <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {roleMap.get(user.roleId) || 'Unknown'}
                  </span>
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                        onClick={() => handleEditClick(user)}
                        className="text-pink-600 hover:text-pink-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
            )) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && editingUser && (
            <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Edit User {editingUser.userId}
                </h2>
                <div className="space-y-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                        type="text"
                        value={newPhone}
                        onChange={e => setNewPhone(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    />
                    <button
                        onClick={() => handleUpdatePhone(editingUser.userId, newPhone)}
                        className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md "
                    >
                      Update Phone
                    </button>
                  </div>
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    />
                    <button
                        onClick={() => handleUpdatePassword(editingUser.userId, newPassword)}
                        className="mt-2 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
                    >
                      Update Password
                    </button>
                  </div>
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Status
                    </label>
                    <select
                        value={editStatus}
                        onChange={e => setEditStatus(e.target.value)}
                        className={`w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 ${
                            editStatus === 'ACTIVE'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {statusOptions.map(s => (
                          <option key={s} value={s}>
                            {s.charAt(0) + s.slice(1).toLowerCase()}
                          </option>
                      ))}
                    </select>
                    <button
                        onClick={() => handleUpdateStatus(editingUser.userId, editStatus)}
                        className="mt-2 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
                    >
                      Update Status
                    </button>
                  </div>
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

        {/* Add Staff Modal */}
        {isAddStaffModalOpen && (
            <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add New Staff Member</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                        type="text"
                        value={newStaff.userName}
                        onChange={e => setNewStaff({...newStaff, userName: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                        type="password"
                        value={newStaff.password}
                        onChange={e => setNewStaff({...newStaff, password: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                        type="text"
                        value={newStaff.phoneNumber}
                        onChange={e => setNewStaff({...newStaff, phoneNumber: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                        onClick={handleSaveStaff}
                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md "
                    >
                      Save Staff
                    </button>
                    <button
                        onClick={() => setIsAddStaffModalOpen(false)}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default User;