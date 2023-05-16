import axios from "../config/axios";

export const getAllUsers = (page = 1, limit = 5) => {
    return axios.get(
        `/api/user/v1/get-all-user-limit?page=${page}&limit=${limit}`
    );
};

export const deleteUser = (userId) => {
    return axios.delete(`/api/user/v1/delete-user-by-id/${userId}`);
};

export const updateUser = (data) => {
    return axios.put(`/api/user/v1/update-user-by-id`, data);
};

export const uploadImage = (data) => {
    return axios.post(`/api/user/v1/upload-avatar`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const searchUser = (q) => {
    return axios.get(`/api/user/v1/search-user-by-last-name?q=${q}`);
};

export const getUserById = (userId) => {
    return axios.get(`/api/user/v1/get-user-detail-by-id?id=${userId}`);
};
