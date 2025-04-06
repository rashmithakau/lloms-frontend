import { useState, useMemo, useEffect } from "react";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8089/api/v1",
    headers: { "Content-Type": "application/json" },
});

const useUserController = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [newPhone, setNewPhone] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [editStatus, setEditStatus] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");

    const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
    const [newStaff, setNewStaff] = useState({ userName: '', password: '', phoneNumber: '' });

    // Now we use exact enum values
    const statusOptions = ["ACTIVE", "INACTIVE"];

    // Fetch users & roles whenever statusFilter changes
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [usersRes, rolesRes] = await Promise.all([
                    statusFilter
                        ? api.get(`/user/get-users-by-status?status=${statusFilter}`)
                        : api.get("/user/get-all-users"),
                    api.get("/role/get-all-roles")
                ]);
                setUsers(usersRes.data);
                setRoles(rolesRes.data);
            } catch (err) {
                console.error("Fetch error:", err);
                setUsers([]);
                setRoles([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [statusFilter]);

    // Map roleId → roleName
    const roleMap = useMemo(
        () => new Map(roles.map(role => [role.roleId, role.roleName])),
        [roles]
    );

    // Apply search + role filters
    const filteredUsers = useMemo(
        () => users.filter(user => {
            const matchesSearch = searchTerm
                ? user.userId.toString().includes(searchTerm)
                : true;
            const matchesRole = roleFilter.length > 0
                ? roleFilter.includes(user.roleId)
                : true;
            return matchesSearch && matchesRole;
        }),
        [users, searchTerm, roleFilter]
    );

    const handleEditClick = user => {
        setEditingUser(user);
        setNewPhone(user.phoneNumber);
        setNewPassword("");
        setEditStatus(user.status); // "ACTIVE" or "INACTIVE"
        setIsEditModalOpen(true);
    };

    const refreshUsers = async () => {
        const resp = statusFilter
            ? await api.get(`/user/get-users-by-status?status=${statusFilter}`)
            : await api.get("/user/get-all-users");
        setUsers(resp.data);
    };

    const handleUpdatePhone = async (userId, phone) => {
        try {
            await api.put(`/user/update-phone/${userId}`, phone, {
                headers: { "Content-Type": "text/plain" }
            });
            await refreshUsers();
        } catch (err) {
            console.error("Phone update error:", err);
        }
    };

    const handleUpdatePassword = async (userId, password) => {
        try {
            await api.put(`/user/update-password/${userId}`, password, {
                headers: { "Content-Type": "text/plain" }
            });
            setNewPassword("");
            alert("Password updated successfully");
        } catch (err) {
            console.error("Password update error:", err);
        }
    };

    const handleUpdateStatus = async (userId, status) => {
        try {
            await api.put(`/user/update-status/${userId}`, status, {
                headers: { "Content-Type": "text/plain" }
            });
            await refreshUsers();
        } catch (err) {
            console.error("Status update error:", err);
        }
    };

    // Now awaits the status update before returning
    const handleToggleStatus = async (userId, currentStatus) => {
        const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        await handleUpdateStatus(userId, newStatus);
    };

    const handleSaveStaff = async () => {
        try {
            await api.post("/user/save-staff", newStaff);
            await refreshUsers();
            setIsAddStaffModalOpen(false);
            setNewStaff({ userName: '', password: '', phoneNumber: '' });
        } catch (err) {
            console.error("Error adding staff:", err);
        }
    };

    return {
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
    };
};

export default useUserController;
