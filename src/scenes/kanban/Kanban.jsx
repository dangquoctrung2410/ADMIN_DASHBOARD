import React, { useEffect, useState } from "react";
import { getAllcodeByType, getTaskByType } from "../../services/getAllTask";
import { useSelector } from "react-redux";
import CardKanban from "../../components/CardKanban/CardKanban";

const Kanban = () => {
    const [listTask, setListTask] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [dataRender, setDataRender] = useState([]);
    const userCheck = useSelector((state) => state.auth.user);
    // console.log(listTask);
    console.log(statusData);

    useEffect(() => {
        let dataBuild = [];
        statusData.map((item) => {
            const GTFilter = listTask.filter((task) => {
                return task.statusData?.id === item?.id;
            });

            dataBuild.push(GTFilter);
        });

        console.log("check dataBuild :", dataBuild);

        dataBuild = dataBuild.map((item, index) => {
            if (item.length === 0) {
                item.push({
                    isEmpty: true,
                    statusData: {
                        valueVI: statusData[index].valueVI,
                    },
                });

                return item;
            }
            return item;
        });
        setDataRender(dataBuild);
    }, [listTask, statusData]);

    console.log(dataRender);

    useEffect(() => {
        const Fetch = async () => {
            const res = await getAllcodeByType("status");
            if (res.errCode === 0) {
                setStatusData(res.data);
            }
        };
        Fetch();
    }, []);

    const FetchDataTask = async () => {
        if (userCheck.role === "1") {
            const res = await getTaskByType();
            if (res.errCode === 0) {
                setListTask(res.data);
            }
        } else {
            const res = await getTaskByType(userCheck.id, 1, 5, "userId");
            if (res.errCode === 0) {
                setListTask(res.data);
            }
        }
    };
    useEffect(() => {
        FetchDataTask();
    }, [userCheck]);

    return (
        <div className="grid grid-flow-col">
            {dataRender.map((item, index) => {
                return (
                    <CardKanban
                        key={index}
                        listTask={item}
                        listStatus={statusData}
                        FetchDataTask={FetchDataTask}
                    ></CardKanban>
                );
            })}
        </div>
    );
};

export default Kanban;
