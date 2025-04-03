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
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
    const [newStaff, setNewStaff] = useState({
        userName: '',
        password: '',
        phoneNumber: ''
    });

    const statusOptions = ["Active", "Inactive"];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const usersResponse = statusFilter
                    ? await api.get(`/user/get-users-by-status?status=${statusFilter.toUpperCase()}`)
                    : await api.get("/user/get-all-users");
                const rolesResponse = await api.get("/role/get-all-roles");
                setUsers(usersResponse.data);
                setRoles(rolesResponse.data);
            } catch (err) {
                console.error("Fetch error:", err);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [statusFilter]);

    const roleMap = useMemo(() => new Map(roles.map(role => [role.roleId, role.roleName])), [roles]);

    const filteredUsers = useMemo(
        () =>
            users.filter(user => {
                const matchesSearch = searchTerm
                    ? user.userId.toString().includes(searchTerm)
                    : true;
                const matchesRole = roleFilter.length > 0 ? roleFilter.includes(user.roleId) : true;
                return matchesSearch && matchesRole;
            }),
        [users, searchTerm, roleFilter]
    );

    const handleEditClick = (user) => {
        setEditingUser(user);
        setNewPhone(user.phoneNumber);
        setNewPassword("");
        setIsEditModalOpen(true);
    };

    const handleUpdatePhone = async (userId, phone) => {
        try {
            await api.put(`/user/update-phone/${userId}`, phone, {
                headers: { "Content-Type": "text/plain" }
            });
            const updatedUsers = statusFilter
                ? await api.get(`/user/get-users-by-status?status=${statusFilter.toUpperCase()}`)
                : await api.get("/user/get-all-users");
            setUsers(updatedUsers.data);
        } catch (error) {
            console.error("Phone update error:", error);
        }
    };

    const handleUpdatePassword = async (userId, password) => {
        try {
            await api.put(`/user/update-password/${userId}`, password, {
                headers: { "Content-Type": "text/plain" }
            });
            setNewPassword("");
            alert("Password updated successfully");
        } catch (error) {
            console.error("Password update error:", error);
        }
    };

    const handleDeactivateUser = async (userId) => {
        try {
            await api.post(`/user/deactivate-user/${userId}`);
            const updatedUsers = statusFilter
                ? await api.get(`/user/get-users-by-status?status=${statusFilter.toUpperCase()}`)
                : await api.get("/user/get-all-users");
            setUsers(updatedUsers.data);
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Deactivation error:", error);
        }
    };

    const handleSaveStaff = async () => {
        try {
            await api.post("/user/save-staff", newStaff);
            const updatedUsers = statusFilter
                ? await api.get(`/user/get-users-by-status?status=${statusFilter.toUpperCase()}`)
                : await api.get("/user/get-all-users");
            setUsers(updatedUsers.data);
            setIsAddStaffModalOpen(false);
            setNewStaff({ userName: '', password: '', phoneNumber: '' });
           // alert("Staff member added successfully");
        } catch (error) {
            console.error("Error adding staff:", error);
           // alert("Error adding staff member");
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
        handleSaveStaff,
        isAddStaffModalOpen,
        setIsAddStaffModalOpen,
        newStaff,
        setNewStaff,
    };
};

export default useUserController;