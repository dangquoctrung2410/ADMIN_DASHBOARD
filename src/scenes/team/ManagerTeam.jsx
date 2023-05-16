import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserRow from "../../components/UserRow";
import {
    getAllUsers,
    getUserById,
    updateUser,
} from "../../services/getAllUsers";
import "./ManagerTeam.css";
import { useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import _ from "lodash";

const ManagerTeam = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isNextPage, setIsNextPage] = useState(false);
    const userAction = useSelector((state) => state.reload.userAction);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    // console.log(user);

    const userCheck = useSelector((state) => state.auth.user);

    useEffect(() => {
        const getData = async () => {
            if (!userCheck) {
                alert("ban chua dang");
            } else {
                if (userCheck.role === "1") {
                    const response = await getAllUsers(currentPage, 5);
                    if (response && response.errCode === 0);
                    {
                        setUser((prev) => [...prev, ...response.data]);
                        setIsNextPage(response.isValidNextPage);
                    }
                } else {
                    const response = await getUserById(userCheck.id);
                    if (response && response.errCode === 0);
                    {
                        setUserDetails(response.data);
                    }
                }
            }
        };
        getData();
    }, [currentPage, userCheck]);

    useEffect(() => {
        if (user && user.length > 0 && !_.isEmpty(userAction)) {
            if (userAction.type === "updateUser") {
                const dataBuild = user.map((item) => {
                    if (item.id == userAction.data.id) {
                        return userAction.data;
                    }
                    return item;
                });
                setUser(dataBuild);
            }
            console.log(userAction);
            if (userAction.type === "delete") {
                const dataBuildDelete = user.filter(
                    (item) => item.id != userAction.data.id
                );
                console.log(userAction);
                setUser(dataBuildDelete);
            }
        }
    }, [userAction]);

    const handleNextPage = () => {
        if (isNextPage) {
            setCurrentPage(currentPage + 1);
        }
    };
    console.log(user);

    return (
        <div className="text-center">
            <h1 className="text-4xl font-semibold">Manager Team</h1>
            <Link to="/form">
                <button className="m-5 mr-[80%] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    ADD USER
                </button>
            </Link>
            <div className="users-table m-10">
                <table id="customers">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>FullName</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {userCheck?.role === "1" ? (
                        user &&
                        user.map((item, index) => {
                            return (
                                <UserRow
                                    key={index}
                                    item={item}
                                    index={index}
                                ></UserRow>
                            );
                        })
                    ) : (
                        <UserRow key={1} item={userDetails} index={1}></UserRow>
                    )}
                </table>
                {isNextPage && (
                    <button onClick={handleNextPage}>
                        <AddOutlinedIcon />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ManagerTeam;
