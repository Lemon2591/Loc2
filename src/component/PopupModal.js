import React, { useEffect, useState } from "react";
import { Modal, Select, Button, Steps, Card, Input, message } from "antd";
import Loading from "./Loading";
import axios from "axios";

const PopupModal = ({
  isModalOpen,
  setIsModalOpen,
  setDataBooking,
  dataBooking,
}) => {
  const cashBooking = 560000;
  const time = [
    {
      key: 0,
      time: "08:00 - 10:00",
    },
    {
      key: 1,
      time: "10:00 - 12:00",
    },
    {
      key: 2,
      time: "14:00 - 16:00",
    },
    {
      key: 3,
      time: "16:00 - 18:00",
    },
    {
      key: 4,
      time: "19:00 - 21:00",
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [isVali, setIsVali] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [activeTime, setActiveTime] = useState();

  const handleCancel = () => {
    setActiveTime();
    setIsModalOpen(false);
    setDataBooking({
      name: null,
      typeBooking: null,
      add: null,
      time: null,
      text: null,
      idAc: null,
      idCarBooking: null,
    });
  };

  const handleOk = async () => {
    if (
      !dataBooking.add ||
      !dataBooking.text ||
      !dataBooking.typeBooking ||
      !dataBooking.time
    ) {
      message.error("Value is not blank !");
    } else {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const res = await axios.post(
            "http://localhost:8000/booking",
            dataBooking
          );
          setIsLoading(false);
          setIsModalOpen(false);
          setActiveTime();
          message.success("Booking success !");
          setDataBooking({
            name: null,
            typeBooking: null,
            add: null,
            time: null,
            text: null,
            idAc: null,
            idCarBooking: null,
          });
        } catch (error) {
          setIsLoading(false);
          console.log(error);
          message.success("Booking failed !");
        }
      }, 500);
    }
  };

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth - 250,
  });
  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth - 250,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  return (
    <>
      {isLoading ? <Loading /> : null}

      <Modal

        open={isModalOpen}
        onCancel={handleCancel}
        width={windowDimenion.winWidth}
        footer={null}
        zIndex={990}
      >
        <div className="popup-booking">
          <div style={{ display: "flex" }}></div>

          <div style={{ marginTop: "50px" }}>
            <div className="popup-booking-container">
              <div className="popup-booking-detail-left">
                <div className="popup-booking-detail-left-name">
                  <p>Loại xe: &nbsp;</p>
                  <p style={{ fontWeight: "700" }}>{dataBooking?.name}</p>
                </div>
                <div className="popup-booking-detail-left-type">
                  <label>Bạn có thuê giày không:</label>
                  <Select
                    value={dataBooking.typeBooking}
                    placeholder="Vui lòng chọn hình thức..."
                    style={{
                      width: "100%",
                    }}
                    options={[
                      {
                        value: 1,
                        label: "Có thuê",
                      },
                      {
                        value: 2,
                        label: "Không thuê",
                      },
                    ]}
                    onChange={(e) => {
                      setDataBooking((pre) => {
                        return { ...pre, typeBooking: e };
                      });
                    }}
                  />
                </div>
                {/* <div className="popup-booking-detail-left-type">
                  <label>Nhập địa chỉ:</label>
                  <Input
                    value={dataBooking.add}
                    placeholder="Vui lòng nhập địa chỉ"
                    style={{
                      width: "100%",
                    }}
                    onChange={(e) => {
                      setDataBooking((pre) => {
                        return { ...pre, add: e.target.value };
                      });
                    }}
                  />
                </div> */}
                <div className="popup-booking-detail-left-type">
                  <label>Bạn có muốn mua nước không:</label>
                  <Select
                    value={dataBooking.add}
                    placeholder="Vui lòng chọn hình thức..."
                    style={{
                      width: "100%",
                    }}
                    options={[
                      {
                        value: 1,
                        label: "Đặt nước",
                      },
                      {
                        value: 2,
                        label: "Không đặt",
                      },
                    ]}
                    onChange={(e) => {
                      setDataBooking((pre) => {
                        return { ...pre, add: e };
                      });
                    }}
                  />
                </div>
              </div>
              <div className="popup-booking-detail-right">
                <div className="popup-booking-detail-time">
                  <label>Chọn thời gian:</label>
                  <div className="popup-booking-detail-time-booking">
                    {time &&
                      time?.map((data) => {
                        return (
                          <span
                            onClick={() =>
                              setDataBooking((pre) => {
                                return { ...pre, time: data.time };
                              }) & setActiveTime(data.key)
                            }
                            key={data.key}
                            className={
                              activeTime === data.key ? "active-time" : ""
                            }
                          >
                            {data.time}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="popup-booking-detail-left-text"
              style={{ margin: "0 20px" }}
            >
              <label>Nhập ghi chú: </label>
              <textarea
                value={dataBooking.text === null ? "" : dataBooking.text}
                onChange={(e) => {
                  setDataBooking((pre) => {
                    return { ...pre, text: e.target.value };
                  });
                }}
                className="form-control"
                placeholder="Nhập nội dung..."
              ></textarea>
            </div>

            <div className="popup-booking-btn">
              <Button
                className="btn-pay-medical"
                htmlType="submit"
                onClick={handleOk}
              >
                Đặt xe
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PopupModal;
