import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8089/api/v1",
  headers: { "Content-Type": "application/json" },
});

const User = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  // Static options for filters
  const statusOptions = ["Active", "Inactive"];

  // Fetch users and roles
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        let usersResponse;
        if (statusFilter) {
          usersResponse = await api.get(`/user/get-users-by-status?status=${statusFilter.toUpperCase()}`);
        } else {
          usersResponse = await api.get("/user/get-all-users");
        }
        const rolesResponse = await api.get("/role/get-all-roles");

        setUsers(usersResponse.data);
        setRoles(rolesResponse.data);
      } catch (err) {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [statusFilter]);

  // Create role lookups
  const roleMap = useMemo(() => {
    return new Map(roles.map(role => [role.roleId, role.roleName]));
  }, [roles]);

  // Memoized filtered users calculation
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = searchTerm ? user.userId.toString().includes(searchTerm) : true;
      const matchesRole = roleFilter.length > 0 ? roleFilter.includes(user.roleId) : true;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  // Loading state
  if (loading) {
    return <div className="p-4 text-center">Loading users...</div>;
  }

  return (
      <div className="p-4 bg-transparent rounded-lg shadow-md">
        <h1 className="text-3xl mb-4">User Details</h1>

        {/* Filter Controls Section */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
                type="text"
                placeholder="Search by User ID..."
                className="p-2 border border-pink-300 hover:border-pink-500 rounded-md flex-grow"
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

          {/* Role Filter */}
          <div className="flex flex-wrap gap-2 items-center p-2 border border-pink-300 hover:border-pink-500 rounded-md">
            <span className="text-pink-600">Roles:</span>
            {roles.map((role) => (
                <label key={role.roleId} className="flex items-center space-x-1 text-pink-600">
                  <input
                      type="checkbox"
                      checked={roleFilter.includes(role.roleId)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setRoleFilter((prev) =>
                            checked ? [...prev, role.roleId] : prev.filter((r) => r !== role.roleId)
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
              className="self-end px-4 py-2 bg-pink-500 rounded-md text-white"
          >
            Clear Filters
          </button>
        </div>

        {/* Users Table Section */}
        <div className="overflow-x-auto rounded-lg border border-pink-500">
          <table className="min-w-full">
            <thead className="bg-gray-200">
            <tr>
              {["User ID", "Name", "Phone", "Status", "Role"].map(header => (
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {user.status}
                    </span>
                      </td>
                      <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {roleMap.get(user.roleId) || "Unknown Role"}
                    </span>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">No users found</td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default User;
