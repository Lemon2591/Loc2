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
                  <p>THEO B???N T???NG B?????C CH??N</p>
                </div>
                <div className="slider-content">
                  <div>Ch???n ?????a ??i???m:</div>
                  <Select
                    onChange={(e) => {
                      setSelect(e);
                    }}
                    placeholder="Ch???n ?????a ??i???m..."
                    style={{
                      width: "65%",
                    }}
                    options={[
                      {
                        label: "S??n T??? Nhi??n",
                        value: 2,
                      },
                      {
                        label: "S??n Nh??n T???o",
                        value: 1,
                      },
                      {
                        label: "T???t C???",
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
          <p>?????t thu?? s??n ngay ??? ????y !</p>
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
                        <p>Gi?? thu??: </p>
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
                          ?????t xe
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
                Kh??ng c?? d??? li???u !
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
              <p>B???n mu???n thu?? s??n b??ng ?</p>
              <span>
                H??y thu?? s??n, h??y ????? ch??ng t??i c??ng ?????ng h??nh tr??n nh???ng b?????c ch??n ?????c m?? c???a c??c b???n !
              </span>
              <a href="#">THU?? S??N NGAY !</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
