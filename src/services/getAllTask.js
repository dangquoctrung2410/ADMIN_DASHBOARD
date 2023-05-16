import axios from "../config/axios";

export const getAllcodeByType = (type = "task") => {
    return axios.get(`/api/app/v1/get-all-all-code-by-type?type=${type}`);
};

export const createTaskUser = (data) => {
    return axios.post(`/api/app/v1/create-task`, data);
};

export const getTaskByType = (type = "all", page = 1, limit = 100, idQuery) => {
    return axios.get(
        `/api/app/v1/get-task-by-type?type=${type}&page=${page}&limit=${limit}&${
            idQuery ? `idQuery=${idQuery}` : ""
        }`
    );
};

export const updateStatusTask = (data) => {
    return axios.put(`/api/app/v1/update-task`, data);
};
export const deleteTask = (id) => {
    return axios.post(`/api/app/v1/delete-task-by-id`, { id });
};
