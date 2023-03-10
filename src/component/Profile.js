import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import { message, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import Loading from "./Loading";

function Profile() {
  const dataInfo = JSON.parse(localStorage.getItem("info"));
  const dataUser = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState({
    country: "Vietnam",
    createdAt: "2023-02-26T06:37:49.108Z",
    date: "",
    fullName: "",
    healthInsurance: "SV2821001402141",
    idAccount: dataUser.id,
    location: "",
    mail: "",
    nation: "Kinh",
    passport: "1231232131231",
    phoneNumber: "",
    relative: "Chồng",
    relativeMail: "chunha2411@gmail.com",
    relativeName: "Nguyễn Văn A",
    relativeNumber: "13123123123",
    sex: "Nam",
    state: "Hưng Yên",
    town: "Ha Noi",
    village: "VN",
  });
  const [isLoading, setIsLoading] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      try {
        const res = await axios.post(
          "https://alo-server.onrender.com/api/user/data/patient/v2",
          { idAccount: dataUser.id }
        );
        setIsLoading(false);
        localStorage.setItem("info", JSON.stringify(res.data.result));
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddProfole = async () => {
    if (
      data.fullName.trim() === "" ||
      data.date === "" ||
      data.location.trim() === "" ||
      data.mail === "" ||
      data.phoneNumber === ""
    ) {
      message.error("Vui lòng nhập đầy đủ !");
    } else {
      setIsLoading(true);
      try {
        const res = await axios.post(
          "https://alo-server.onrender.com/api/user/data/patient/v1",
          data
        );
        setIsLoading(false);
        message.success("Add information successfully");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        message.error("An error occurred  !");
      }
    }
  };
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://alo-server.onrender.com/api/user/data/patient/delete/v1",
        {
          _id: dataInfo._id,
        }
      );
      setIsLoading(false);
      localStorage.removeItem("info");
      message.success("Delete information successfully");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      message.error("An error occurred  !");
    }
  };

  const showModal = () => {
    setData({
      country: "Vietnam",
      createdAt: "2023-02-26T06:37:49.108Z",
      date: dataInfo.date,
      fullName: dataInfo.fullName,
      healthInsurance: "SV2821001402141",
      idAccount: dataUser.id,
      location: dataInfo.location,
      mail: dataInfo.mail,
      nation: "Kinh",
      passport: "1231232131231",
      phoneNumber: dataInfo.phoneNumber,
      relative: "Chồng",
      relativeMail: "chunha2411@gmail.com",
      relativeName: "Nguyễn Văn A",
      relativeNumber: "13123123123",
      sex: "Nam",
      state: "Hưng Yên",
      town: "Ha Noi",
      village: "VN",
    });
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (
      data.fullName.trim() === "" ||
      data.date === "" ||
      data.location.trim() === "" ||
      data.mail === "" ||
      data.phoneNumber === ""
    ) {
      message.error("Value is not blank !");
    } else {
      try {
        setIsLoading(true);
        const res = await axios.patch(
          "https://alo-server.onrender.com/api/user/data/patient/update/v1",
          {
            value: data,
            _id: dataInfo._id,
          }
        );
        setIsLoading(false);
        message.success("Update successfully");
        setIsModalOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (error) {
        setIsLoading(false);
        setIsModalOpen(false);
        message.error("An error occurred  !");
      }
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { confirm } = Modal;

  const showDeleteConfirm = async (id) => {
    confirm({
      title: "Xoá dữ liệu",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc chắn muốn xoá không ?",
      okText: "Xoá",
      okType: "danger",
      cancelText: "Không",
      async onOk() {
        handleDelete();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <>
      {isLoading ? <Loading /> : null}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Sửa thông tin"
      >
        <div
          className="profile-content"
          style={{ boxShadow: "unset", width: "100%" }}
        >
          <div className="form-add" style={{ display: "block" }}>
            <div>
              <label htmlFor="">Họ và tên:</label>
              <input
                type="text"
                placeholder="Nhập họ và tên..."
                value={data.fullName}
                onChange={(e) => {
                  setData((pre) => {
                    return { ...pre, fullName: e.target.value };
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Ngày sinh:</label>
              <input
                type="text"
                placeholder="Nhập ngày sinh..."
                value={data.date}
                onChange={(e) => {
                  setData((pre) => {
                    return { ...pre, date: e.target.value.trim() };
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Email:</label>
              <input
                type="text"
                placeholder="Nhập email..."
                value={data.mail}
                onChange={(e) => {
                  setData((pre) => {
                    return { ...pre, mail: e.target.value.trim() };
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="">Số điện thoại:</label>
              <input
                type="text"
                placeholder="Nhập số điện thoại..."
                value={data.phoneNumber}
                onChange={(e) => {
                  setData((pre) => {
                    return {
                      ...pre,
                      phoneNumber: e.target.value.trim(),
                    };
                  });
                }}
              />
            </div>

            <div>
              <label htmlFor="">Nhập địa chỉ:</label>
              <input
                type="text"
                placeholder="Nhập địa chỉ..."
                value={data.location}
                onChange={(e) => {
                  setData((pre) => {
                    return {
                      ...pre,
                      location: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className="home-container">
        <div className="home-content">
          <div className="home-bg-profile">
            <Nav />
            <div className="home-items" style={{ height: "auto" }}>
              <div className="home-slider">
                <div className="slider-header" style={{ margin: "50px 0" }}>
                  <p style={{ textAlign: "center" }}>THÔNG TIN CỦA BẠN !</p>
                </div>
                <div className="profile-container">
                  {dataInfo ? (
                    <div className="profile-content">
                      <div>
                        <span>Họ và tên:</span>
                        <p>{dataInfo?.fullName}</p>
                      </div>
                      <div>
                        <span>Ngày sinh:</span>
                        <p>{dataInfo?.date}</p>
                      </div>
                      <div>
                        <span>Email:</span>
                        <p>{dataInfo?.mail}</p>
                      </div>
                      <div>
                        <span>Số điện thoại:</span>
                        <p>{dataInfo?.phoneNumber}</p>
                      </div>
                      {/* <div>
                        <span>Số bảo hiểm:</span>
                        <p>{dataInfo?.healthInsurance}</p>
                      </div> */}
                      <div>
                        <span>Địa chỉ:</span>
                        <p>{dataInfo?.location}</p>
                      </div>

                      <div className="btn-container">
                        <button className="btn" onClick={showModal}>
                          Sửa hồ sơ
                        </button>
                        <button className="btn" onClick={showDeleteConfirm}>
                          Xoá hồ sơ
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="profile-content">
                      <div className="form-add" style={{ display: "block" }}>
                        <div>
                          <label htmlFor="">Họ và tên:</label>
                          <input
                            type="text"
                            placeholder="Nhập họ và tên..."
                            onChange={(e) => {
                              setData((pre) => {
                                return { ...pre, fullName: e.target.value };
                              });
                            }}
                          />
                        </div>
                        <div>
                          <label htmlFor="">Ngày sinh:</label>
                          <input
                            type="text"
                            placeholder="Nhập ngày sinh..."
                            onChange={(e) => {
                              setData((pre) => {
                                return { ...pre, date: e.target.value.trim() };
                              });
                            }}
                          />
                        </div>
                        <div>
                          <label htmlFor="">Email:</label>
                          <input
                            type="text"
                            placeholder="Nhập email..."
                            onChange={(e) => {
                              setData((pre) => {
                                return { ...pre, mail: e.target.value.trim() };
                              });
                            }}
                          />
                        </div>
                        <div>
                          <label htmlFor="">Số điện thoại:</label>
                          <input
                            type="text"
                            placeholder="Nhập số điện thoại..."
                            onChange={(e) => {
                              setData((pre) => {
                                return {
                                  ...pre,
                                  phoneNumber: e.target.value.trim(),
                                };
                              });
                            }}
                          />
                        </div>

                        <div>
                          <label htmlFor="">Nhập địa chỉ:</label>
                          <input
                            type="text"
                            placeholder="Nhập địa chỉ..."
                            onChange={(e) => {
                              setData((pre) => {
                                return {
                                  ...pre,
                                  location: e.target.value,
                                };
                              });
                            }}
                          />
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <button className="btn" onClick={handleAddProfole}>
                            Lưu lại
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
