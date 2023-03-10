import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import PopupModal from "./PopupModal";
import Loading from "./Loading";
import Nav from "./Nav";
import "../assets/css/home.css";
import { Select, Pagination, message } from "antd";
import { GoLocation } from "react-icons/go";
function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataBooking, setDataBooking] = useState({
    name: null,
    typeBooking: null,
    add: null,
    time: null,
    text: null,
    idAc: null,
    idCarBooking: null,
  });
  const [dataSelect, setSelect] = useState(3);
  const [res, setRes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCar, setDataCar] = useState(null);
  useEffect(() => {
    (async function () {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          const response = await axios.get("http://localhost:8000/dataCar");
          setDataCar(response.data);
          setRes(response.data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          message.error("Error: Please run server !");
        }
      }, 500);
    })();
  }, []);

  useEffect(() => {
    if (dataCar) {
      if (dataSelect !== 3) {
        setRes(dataCar?.filter((data) => data.location_code === dataSelect));
      } else {
        setRes(dataCar);
      }
    }
  }, [dataSelect]);

  const itemPerPage = 8;
  const lastItem = currentPage * itemPerPage;
  const beforItem = lastItem - itemPerPage;
  const curentItem = res?.slice(beforItem, lastItem);

  return (
    <>
      {isLoading ? <Loading /> : null}
      <PopupModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        dataBooking={dataBooking}
        setDataBooking={setDataBooking}
      />
      <div className="home-container">
        <div className="home-content">
          <div className="home-bg">
            <Nav />
            <div className="home-items">
              <div className="home-slider">
                <div className="slider-header">
                  <p>THEO BẠN TỪNG BƯỚC CHÂN</p>
                </div>
                <div className="slider-content">
                  <div>Chọn địa điểm:</div>
                  <Select
                    onChange={(e) => {
                      setSelect(e);
                    }}
                    placeholder="Chọn địa điểm..."
                    style={{
                      width: "65%",
                    }}
                    options={[
                      {
                        label: "Sân Tự Nhiên",
                        value: 2,
                      },
                      {
                        label: "Sân Nhân Tạo",
                        value: 1,
                      },
                      {
                        label: "Tất Cả",
                        value: 3,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-items-car-content">
          <p>Đặt thuê sân ngay ở đây !</p>
          <div className="home-items-car" id="#123">
            {curentItem?.length > 0 ? (
              curentItem?.map((data) => {
                return (
                  <div className="home-item-car" key={data.id}>
                    <div className="img-car">
                      <img src={data.img} alt="" />
                    </div>
                    <div className="text-card">
                      <div className="name-car">
                        <p>{data.name}</p>
                      </div>
                      <div className="type-car">
                        <p>{data.type}</p>
                      </div>
                      <div className="cost-car">
                        <p>Giá thuê: </p>
                        <p>
                          {data?.cost.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                      <div className="location-car">
                        <i>
                          {" "}
                          <GoLocation />
                        </i>
                        <p>{data.location}</p>
                      </div>
                      <div className="booking-car">
                        <p
                          onClick={(e) => {
                            setIsModalOpen(true);
                            // setDataBooking(data);
                            setDataBooking((pre) => {
                              return {
                                ...pre,
                                name: data.name,
                                idCarBooking: data.id,
                                idAc: user.id,
                              };
                            });
                          }}
                        >
                          Đặt xe
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: "16px",
                  marginBottom: "50px",
                }}
              >
                Không có dữ liệu !
              </div>
            )}
          </div>
        </div>
        <div className="pagination">
          <Pagination
            defaultCurrent={1}
            total={res?.length > 0 ? res?.length : 50}
            onChange={(e) => {
              setCurrentPage(e);
            }}
          />
          ;
        </div>
        <div className="slider-footer">
          <div className="slider-footer-img">
            <div className="slider-footer-text">
              <p>Bạn muốn thuê sân bóng ?</p>
              <span>
                Hãy thuê sân, hãy để chúng tôi cùng đồng hành trên những bước chân ước mơ của các bạn !
              </span>
              <a href="#">THUÊ SÂN NGAY !</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
