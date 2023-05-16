import React, { useState } from "react";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import moment from "moment";
import { Modal } from "antd";
import { deleteTask, updateStatusTask } from "../../services/getAllTask";

const CardKanban = ({ listTask, listStatus, FetchDataTask }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [idTaskActive, setIdTaskActive] = useState(null);

    const convertDate = (dataDate) => {
        const datetime = moment(dataDate);
        const formattedDatetime = datetime.format("DD/MM/YYYY HH:mm:ss");
        return formattedDatetime;
    };
    console.log(listTask);
    const calculateDays = (endDate) => {
        const now = moment();
        const end = moment(endDate);
        const diffDuration = moment.duration(end.diff(now));
        const days = Math.ceil(diffDuration.asDays());
        return days;
    };
    console.log(calculateDays("2023-04-25T03:54:48.000Z"));
    const handleChangeStatus = (id) => {
        setIsOpenModal(true);
        setIdTaskActive(id);
    };
    const handleSubmit = async () => {
        const dataBuild = {
            id: idTaskActive,
            status: selectedId,
            timeDone: new Date().getTime(),
        };
        const res = await updateStatusTask(dataBuild);
        if (res.errCode === 0) {
            FetchDataTask();
            setIsOpenModal(false);
            setIdTaskActive(null);
        } else {
            alert(res.msg);
        }
    };
    const handleDelete = async (item) => {
        const res = await deleteTask(item.id);
        if (res.errCode === 0) {
            FetchDataTask();
        } else {
            alert(res.msg);
        }
    };

    return (
        <div>
            <Modal
                open={isOpenModal}
                onCancel={() => {
                    setIsOpenModal(false);
                    setIdTaskActive(null);
                }}
                onOk={handleSubmit}
            >
                <select
                    onChange={(e) => {
                        setSelectedId(e.target.value);
                    }}
                    value={selectedId}
                >
                    <option value="">chon status</option>
                    {listStatus.length > 0 &&
                        listStatus.map((item) => {
                            return (
                                <option key={item.id} value={item.keyMap}>
                                    {item.valueVI}
                                </option>
                            );
                        })}
                </select>
            </Modal>

            <h3 className="text-center py-4">
                {listTask[0].statusData.valueVI}
            </h3>
            <ul
                className={`tasksList mt-4 ml-4  mr-4 inline-block gap-2 sm:gap-4 xl:gap-6 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 items-end`}
            >
                {!listTask[0].isEmpty
                    ? listTask.map((item, index) => {
                          return (
                              <li key={index}>
                                  <a
                                      title="abc"
                                      className="ml-auto mr-4 w-min whitespace-nowrap overflow-hidden max-w-[10rem] text-center text-ellipsis bg-rose-200 text-rose-600 px-4 py-1 rounded-t-md transition dark:bg-slate-700 dark:text-slate-200 block hover:bg-rose-300 dark:hover:bg-rose-500"
                                  >
                                      {item?.userData?.lastName}
                                  </a>
                                  <article
                                      className={`${
                                          calculateDays(item.updatedAt) < 2 &&
                                          calculateDays(item.updatedAt) > 1
                                              ? "bg-amber-400"
                                              : calculateDays(item.updatedAt) <
                                                0
                                              ? "bg-red-500"
                                              : "bg-lime-600"
                                      } rounded-lg p-3 sm:p-4 flex text-left transition hover:shadow-lg hover:shadow-slate-300 dark:hover:shadow-transparent flex-col h-52 sm:h-64`}
                                  >
                                      <div className="flex flex-col flex-1 ">
                                          <div className="flex items-center justify-between mb-2">
                                              <span className="block font-medium dark:text-slate-200">
                                                  {item?.taskData?.valueVI}
                                              </span>
                                          </div>
                                          <p
                                              title="tieu de"
                                              className="description mb-2  dark:text-slate-200 line-clamp-3"
                                          >
                                              {item?.desc}
                                          </p>
                                          <time className="mt-auto flex w-full">
                                              <span className="text">
                                                  {convertDate(item.updatedAt)}
                                              </span>
                                          </time>
                                      </div>
                                      <div className="flex  border-dashed border-slate-200 dark:border-slate-700/[.3] border-t-2 w-full pt-4 mt-4">
                                          <button
                                              title="mark as completed"
                                              className="bg-amber-200 text-amber-800  mr-4 order-0 rounded-full font-medium"
                                          >
                                              <span
                                                  onClick={() =>
                                                      handleChangeStatus(
                                                          item.id
                                                      )
                                                  }
                                                  className="block py-1 px-3 absolute invisible sm:static sm:visible"
                                              >
                                                  button
                                              </span>
                                          </button>
                                          <button
                                              title="delete task"
                                              className="ml-2 transition hover:text-slate-700 dark:hover:text-slate-200"
                                          >
                                              <div className="w-5 h-5 sm:w-6 sm:h-6">
                                                  <DeleteOutlined
                                                      onClick={() =>
                                                          handleDelete(item)
                                                      }
                                                  />
                                              </div>
                                          </button>
                                          <button
                                              title="edit task"
                                              className="transition w-7 sm:w-8 h-6 sm:h-8 grid place-items-center dark:hover:text-slate-200 hover:text-slate-700"
                                          >
                                              <MoreOutlined />
                                          </button>
                                      </div>
                                  </article>
                              </li>
                          );
                      })
                    : "ko co cong viec gi"}
            </ul>
        </div>
    );
};

export default CardKanban;
