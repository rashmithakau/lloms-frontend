import React, { useState, useMemo } from 'react';

const User = () => {
    // State management for users and filters
    const [users, setUsers] = useState([
        { userId: 1, userName: 'abc', phoneNumber: '555-12365564', status: 'Active', roleId: 'Owner' },
        { userId: 2, userName: 'abc', phoneNumber: '555-56665578', status: 'Inactive', roleId: 'Staff' },
        { userId: 3, userName: 'abc Outlet', phoneNumber: '555-9565556012', status: 'Active', roleId: 'Outlet' },
    ]);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');

    // Static options for filters
    const roles = ['Owner', 'Staff', 'Outlet'];
    const statusOptions = ['Active', 'Inactive'];

    // Memoized filtered users calculation
    const filteredUsers = useMemo(() => {
        let filteredUsers = users;

        // Search filter by User ID
        if (searchTerm) {
            filteredUsers = filteredUsers.filter(user =>
                user.userId.toString().includes(searchTerm))
        }

        // Role filter (multiple selection)
        if (roleFilter.length > 0) {
            filteredUsers = filteredUsers.filter(user =>
                roleFilter.includes(user.roleId))
        }

        // Status filter (single selection)
        if (statusFilter) {
            filteredUsers = filteredUsers.filter(user =>
                user.status === statusFilter)
        }

        return filteredUsers;
    }, [users, searchTerm, roleFilter, statusFilter]);

    // Clear all filters handlers
    const clearFilters = () => {
        setSearchTerm('');
        setRoleFilter([]);
        setStatusFilter('');
    };

    return (
        <div className="p-4 bg-transparent rounded-lg shadow-md">
            {/* Header Section */}
            <h1 className="text-3xl mb-4">User Details</h1>

            {/* Filter Controls Section */}
            <div className="flex flex-col gap-4 mb-4">
                {/* Search and Status Filter Row */}
                <div className="flex flex-col md:flex-row gap-4 ">
                    <input
                        type="text"
                        placeholder="Search by User ID..."
                        className="p-2 border border-pink-300 hover:border-pink-500 rounded-md flex-grow"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />

                    <select
                        className="p-2 border border-pink-300 hover:border-pink-500 rounded-md text-pink-600"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                {/* Role Filter Section */}
                <div className="flex flex-col md:flex-row gap-4 ">
                    <div className="flex flex-wrap gap-2 items-center p-2 border border-pink-300 hover:border-pink-500 rounded-md">
                        <span className="text-pink-600 ">Roles:</span>
                        {roles.map(role => (
                            <label key={role} className="flex items-center space-x-1 text-pink-600">
                                <input
                                    type="checkbox"
                                    checked={roleFilter.includes(role)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setRoleFilter(prev =>
                                            checked ? [...prev, role] : prev.filter(r => r !== role)
                                        );
                                    }}
                                    className="form-checkbox h-4 w-4 border-pink-300 hover:border-pink-500"
                                />
                                <span>{role}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Clear Filters Button */}
                <button
                    onClick={clearFilters}
                    className="self-end px-4 py-2 bg-pink-300 hover:bg-pink-500 rounded-md text-white"
                >
                    Clear Filters
                </button>
            </div>

            {/* Users Table Section */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                    <tr className="border-b">
                        {/* Table Headers */}
                        {['userId', 'userName', 'phoneNumber', 'status', 'roleId'].map((column) => (
                            <th
                                key={column}
                                className={`px-4 py-3 ${
                                    column === 'status' || column === 'roleId'
                                        ? 'text-center'
                                        : 'text-left'
                                }`}
                            >
                                {column === 'roleId' ? 'Role' :
                                    column === 'userId' ? 'User ID' :
                                        column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {/* Table Rows */}
                    {filteredUsers.map(user => (
                        <tr key={user.userId} className="border-b hover:bg-gray-50">
                            {/* User ID */}
                            <td className="px-4 py-3 text-left align-middle">{user.userId}</td>

                            {/* User Name */}
                            <td className="px-4 py-3 font-medium text-left align-middle">{user.userName}</td>

                            {/* Phone Number */}
                            <td className="px-4 py-3 text-gray-600 text-left align-middle">{user.phoneNumber}</td>

                            {/* Status Badge */}
                            <td className="px-4 py-3 text-center align-middle">
                                    <span className={`px-2 py-1 rounded-full text-sm ${
                                        user.status === 'Active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {user.status}
                                    </span>
                            </td>

                            {/* Role Badge */}
                            <td className="px-4 py-3 text-center align-middle">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        {user.roleId}
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Empty State Message */}
                {filteredUsers.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                        No users found matching the criteria
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;