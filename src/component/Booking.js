import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import Loading from "./Loading";
import { message, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

function Booking() {
  const [booking, setBooking] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dataUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const res = await axios.get("http://localhost:8000/booking");
          const listBooking = res.data.filter(
            (data) => data.idAc === dataUser.id
          );
          setBooking(listBooking);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          message.error("Error: Please run server");
        }
      }, 500);
    })();
  }, []);
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
        setIsLoading(true);
        setTimeout(async () => {
          try {
            await axios.delete(`http://localhost:8000/booking/${id}`);
            message.success("Delete success !");
            setIsLoading(false);
            setTimeout(() => {
              window.location.reload();
            }, 500);
          } catch (error) {
            message.error("Delete error !");
            setIsLoading(false);
          }
        }, 500);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="home-bg-profile">
        <Nav />
        <div className="home-items" style={{ height: "auto" }}>
          <div className="home-slider" style={{ width: "80%" }}>
            <div className="slider-header" style={{ margin: "50px 0" }}>
              <p style={{ textAlign: "center" }}>LỊCH ĐẶT CỦA BẠN !</p>
            </div>
            <div className="profile-container">
              <div
                className="profile-content"
              // style={{ width: "80%", height: "700px" }}
              >
                <div
                  className="bacdef"
                  style={{ display: "block", padding: "0" }}
                >
                  {booking?.length > 0 ? (
                    booking?.map((data) => {
                      return (
                        <div
                          key={data.id}
                          className="bk"
                          style={{
                            display: "flex",
                            width: "100%",
                            borderBottom: "rgba(49, 63, 95, .5) .5px solid",
                          }}
                        >
                          <div
                            className="abcs"
                            style={{ padding: "15px 0" }}
                            key={data.id}
                          >
                            <div>
                              <span>Loại xe:</span>
                              <p>{data.name}</p>
                            </div>
                            <div>
                              <span>Thuê giày:</span>
                              <p>
                                {data.typeBooking === 1
                                  ? "Có thuê giày"
                                  : data.typeBooking === 2
                                    ? "Không thê giày"


                                    : null}
                              </p>
                            </div>
                            <div>
                              <span>Đặt nước:</span>
                              <p>{data.add === 1 ? "Đặt nước" : "Không đặt"}</p>
                            </div>
                            <div>
                              <span>Thời gian:</span>
                              <p>{data.time}</p>
                            </div>
                            <div>
                              <span>Ghi chú:</span>
                              <p>{data.text}</p>
                            </div>
                          </div>
                          <div
                            className="clear-history"
                            onClick={() => {
                              showDeleteConfirm(data.id);
                            }}
                          >
                            Xoá
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ textAlign: "center", marginTop: "50px" }}>
                      Không có lịch đặt nào
                    </div>
                  )}
                </div>

                {/* <div className="btn-container">
            <button className="btn">Sửa hồ sơ</button>
            <button className="btn">Xoá hồ sơ</button>
          </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;
