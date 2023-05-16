import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import ModalEditUser from "./ModalEditUser";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteUser, getAllUsers } from "../services/getAllUsers";
import { useDispatch, useSelector } from "react-redux";
import { swictchReaload, handleUserAction } from "../redux/usersSlice";
import { getAllcodeByType, createTaskUser } from "../services/getAllTask";

const UserRow = ({ item, index }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenTask, setIsModalOpenTask] = useState(false);
    const [task, setTask] = useState([]);
    const [status, setStatus] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [idTask, setIdTask] = useState("");
    const [idStatus, setIdStatus] = useState("");

    const role = JSON.parse(localStorage.getItem("role"));

    useEffect(() => {
        const Fetch = async () => {
            try {
                const resTask = await getAllcodeByType();
                const resStatus = await getAllcodeByType("status");
                if (resTask.errCode === 0) {
                    setTask(resTask.data);
                }
                if (resStatus.errCode === 0) {
                    setStatus(resStatus.data);
                }
            } catch {}
        };
        Fetch();
    }, []);

    const handleDelete = async (item, e) => {
        e.stopPropagation();
        alert("?");
        try {
            const idUserDelete = await deleteUser(item.id);
            console.log(item.id);
            dispatch(
                handleUserAction({
                    type: "delete",
                    data: { id: idUserDelete.data },
                })
            );

            // const newListUser = await getAllUsers();
            // setUser(newListUser.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const showModal = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (role === 1) {
            setIsModalOpen(true);
        }
    };
    const handleOk = async (id, values) => {
        console.log(id);
        // setIsModalOpen(false);
        try {
            // let res = await updateUser(id);
            // const newListUser = await getAllUsers({
            //   firstName: values.firstName,
            //   email: values.email,
            //   contactsNumber: values.contactNumber,
            //   address1: values.address1,
            // });
            // setUser(newListUser.data.data);
        } catch (err) {
            console.log(err);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (item) => {
        const dataBuild = {
            title,
            desc: description,
            userId: item.id,
            keyMap: idTask,
            status: idStatus,
            timeStart: new Date().getTime(),
        };
        console.log(dataBuild);
        try {
            const Res = await createTaskUser(dataBuild);
            if (Res.errCode == 0) {
                alert("da giao task cho " + item.lastName);
            }
        } catch {}
    };
    return (
        <>
            <Modal
                onOk={() => handleSubmit(item)}
                onCancel={() => {
                    setIsModalOpenTask(false);
                }}
                open={isModalOpenTask}
            >
                <div className="text-center">
                    <h3 className="font-medium">Modal-AddTask</h3>
                </div>
                <div className="flex flex-col justify-center items-center mt-10 border border-black-600 shadow rounded-md p-4 max-w-sm w-full mx-auto bg-red-100">
                    <input
                        className="w-60 mt-5 mb-5 h-10 border-slate-950 bg-slate-100 rounded-md"
                        type="text"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        value={title}
                        placeholder="title"
                    />
                    <input
                        className="w-60 mt-5 mb-5 h-10 border-slate-950 bg-slate-500 rounded-md"
                        type="text"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        value={description}
                        placeholder="description"
                    />
                    <select
                        className="w-60 mt-5 mb-5 h-10 border-slate-950 bg-slate-500 rounded-md"
                        name=""
                        id=""
                        onChange={(e) => {
                            setIdTask(e.target.value);
                        }}
                        value={idTask}
                    >
                        <option value="">Select Task</option>
                        {task.map((item, index) => (
                            <option key={index} value={item.keyMap}>
                                {item.valueVI}
                            </option>
                        ))}
                    </select>
                    <select
                        className="w-60 mt-5 mb-5 h-10 border-slate-950 bg-slate-500 rounded-md"
                        name=""
                        id=""
                        onChange={(e) => {
                            setIdStatus(e.target.value);
                        }}
                        value={idStatus}
                    >
                        <option value="">Option Task</option>
                        {status.map((item, index) => (
                            <option key={index} value={item.keyMap}>
                                {item.valueVI}
                            </option>
                        ))}
                    </select>
                </div>
            </Modal>

            <tbody key={item.id}>
                <tr>
                    <td>{index + 1}</td>
                    <td>{`${item.firstName} ${item.lastName}`}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td
                        onClick={() => {
                            setIsModalOpenTask(true);
                        }}
                    >
                        {item.address}
                    </td>
                    <td>
                        {role === 1 && (
                            <Button type="primary" onClick={showModal}>
                                EDIT
                            </Button>
                        )}
                        <Modal
                            onOk={() => handleOk(item)}
                            onCancel={handleCancel}
                            open={isModalOpen}
                        >
                            <ModalEditUser item={item} />
                        </Modal>

                        <Button
                            className="px-5 m-2"
                            type="primary"
                            onClick={(e) => handleDelete(item, e)}
                        >
                            <DeleteForeverIcon />
                        </Button>
                    </td>
                </tr>
            </tbody>
        </>
    );
};

export default UserRow;
