import "../../assets/css/information_boat/449d75fe856c6532.css";
import "../../assets/css/information_boat/8657135a01ac8aa8.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBoatByIdUser } from "../../api/boat";
import { findAllRoomByBoatId } from "../../api/room";
import IntroduceBoat from "./infor_boat_c/introduce_boat";
import BookingDialog from "./infor_boat_c/Dialog";
import InforBoatRight from "./infor_boat_c/infor_Boat_right";
import { Form } from "antd";
import Features from "./infor_boat_c/features";
import imageURLBoat from "../../url/url_IMG";
import BannerIMG from "./infor_boat_c/BannerIMG";
import Arr_Room from "./infor_boat_c/Arr_Room";
import{connectSocket} from "../../utils/socketService"
const Infor_Boat = function () {
  const { id } = useParams();
  const [dataBoat, setDataBoat] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); //tổng tiền
  const [form] = Form.useForm(); // Khởi tạo form
  const [dataInputRoom, setDataInputRoom] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]); // State để lưu các phòng được chọn
  const loadDataBoat = async () => {
    try {
      const response = await getBoatByIdUser(id);
      console.log("dataBoat", response)
      setDataBoat(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadDataRoom = async () => {
    try {
      const response = await findAllRoomByBoatId(id);
      // console.log("dsRoom All",response);
      const availableRooms = response.filter(room => room.Status === "Trống");
      setDataRoom(availableRooms);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    loadDataRoom();
    loadDataBoat();
  }, []);
  //giá trị modal
  const [visible, setVisible] = useState(false);
  // Kiểm tra xem là thuê full hay đặt phòng riêng
  const [isFullBoat, setIsFullBoat] = useState(false);


  useEffect(() => {
    const socket = connectSocket(); // Gọi hàm mà không cần truyền URL
    socket.on("boatBooked", (message) => {
      console.log("messagenRoom", message)
      loadDataRoom();
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Chỉ chạy một lần khi component mount
  
  //hiện modal
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // const handleOk = async (formValues) => {
  //   try {
  //     console.log("Form values:", formValues);
  //     // Xử lý logic đặt phòng với formValues
  //     // TODO: Thêm logic xử lý đặt phòng ở đây

  //     setVisible(false); // Đóng modal sau khi xử lý thành công
  //   } catch (error) {
  //     console.error("Error handling form submission:", error);
  //   }
  // };

  return (
    <>
      <BookingDialog
        dataBoat={dataBoat}
        isFullBoat={isFullBoat}
        visible={visible}
        setVisible={setVisible}
        showModal={showModal}
        handleCancel={handleCancel}
        dataInputRoom={dataInputRoom}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        formArrRoom={form}
        setSelectedRooms={setSelectedRooms}
      />

      <div id="__next">
        <div className="Toastify" />
        <div className="Layout_layout__1y4NW">
          <div className="Header_wrapper__IXtx_ "></div>
          <div className="Layout_main__gbdP0">
            <div className="ShipDetail_breadcrumbsWrapper__FLcwF">
              <div className="container ShipDetail_breadcrumbs__aqQ55">
                <div className="BreadCrumbs_breadCrumbsContainer__lE9uS">
                  <div className="BreadCrumbs_breadcrumb__xfi79  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M8 17H16M11.0177 2.76401L4.23539 8.03914C3.78202 8.39176 3.55534 8.56807 3.39203 8.78887C3.24737 8.98446 3.1396 9.2048 3.07403 9.43907C3 9.70353 3 9.99071 3 10.5651V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V10.5651C21 9.99071 21 9.70353 20.926 9.43907C20.8604 9.2048 20.7526 8.98446 20.608 8.78887C20.4447 8.56807 20.218 8.39176 19.7646 8.03914L12.9823 2.76401C12.631 2.49076 12.4553 2.35413 12.2613 2.30162C12.0902 2.25528 11.9098 2.25528 11.7387 2.30162C11.5447 2.35413 11.369 2.49076 11.0177 2.76401Z"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <a href="/tim-du-thuyen">
                    <div className="BreadCrumbs_breadCrumbs___9u73">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 6L15 12L9 18"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="BreadCrumbs_breadcrumb__xfi79  ">
                        Tìm du thuyền
                      </div>
                    </div>
                  </a>
                  <a href="/du-thuyen/[slug]">
                    <div className="BreadCrumbs_breadCrumbs___9u73">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 6L15 12L9 18"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {dataBoat && (
                        <div className="BreadCrumbs_breadcrumb__xfi79  BreadCrumbs_selected__G_UIy">
                          {dataBoat.Name}
                        </div>
                      )}
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="container ">
              <div className="ShipDetail_navigation__XqULZ">
                <div className="SectionHeader_sectionHeader__60CR7  ">
                  <div className="SectionHeader_title__eE2Rf">
                    <h4>
                      <div className="flex gap-32 ">
                        <div className="flex flex-col gap-16 flex-grow">
                          {dataBoat && <h4>{dataBoat.Name}</h4>}
                          <div className="flex gap-8 ShipDetail_badge-list__XVcRs">
                            <div className="Badge_warning__ZYfZr  Badge_lg__EBrf7 Badge_container__ehKAY ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M11.2443 4.17391C11.4758 3.50799 11.5916 3.17503 11.7627 3.08276C11.9108 3.00289 12.0892 3.00289 12.2373 3.08276C12.4084 3.17503 12.5242 3.50799 12.7556 4.17391L14.2859 8.5763C14.3518 8.76583 14.3847 8.86059 14.4441 8.93116C14.4965 8.9935 14.5634 9.04209 14.6389 9.07269C14.7244 9.10734 14.8247 9.10938 15.0253 9.11347L19.6851 9.20843C20.3899 9.22279 20.7423 9.22998 20.883 9.36423C21.0047 9.48042 21.0598 9.65005 21.0297 9.81559C20.9948 10.0069 20.7139 10.2198 20.1521 10.6458L16.438 13.4615C16.2782 13.5828 16.1982 13.6434 16.1494 13.7216C16.1063 13.7908 16.0808 13.8694 16.075 13.9506C16.0685 14.0426 16.0975 14.1387 16.1556 14.3307L17.5053 18.7918C17.7094 19.4666 17.8115 19.804 17.7273 19.9792C17.6544 20.1309 17.5101 20.2357 17.3433 20.2582C17.1506 20.2841 16.8613 20.0828 16.2826 19.6801L12.4569 17.018C12.2922 16.9034 12.2099 16.8461 12.1204 16.8239C12.0413 16.8042 11.9587 16.8042 11.8796 16.8239C11.7901 16.8461 11.7078 16.9034 11.5431 17.018L7.71738 19.6801C7.1387 20.0828 6.84936 20.2841 6.65666 20.2582C6.48988 20.2357 6.34559 20.1309 6.2727 19.9792C6.18848 19.804 6.29056 19.4666 6.49471 18.7918L7.84436 14.3307C7.90246 14.1387 7.93151 14.0426 7.92497 13.9506C7.91919 13.8694 7.89365 13.7908 7.85056 13.7216C7.80179 13.6434 7.72184 13.5828 7.56195 13.4615L3.84791 10.6458C3.28611 10.2198 3.00521 10.0069 2.97034 9.81559C2.94015 9.65005 2.99527 9.48042 3.11699 9.36423C3.25764 9.22998 3.61007 9.22279 4.31492 9.20843L8.97472 9.11347C9.17533 9.10938 9.27564 9.10734 9.3611 9.07269C9.43659 9.04209 9.50346 8.9935 9.5559 8.93116C9.61526 8.86059 9.6482 8.76583 9.71408 8.5763L11.2443 4.17391Z"
                                  stroke="var(--warning-base)"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <label className="sm">5.0 (7 đánh giá)</label>
                            </div>
                            <a href="#map" />
                            <div className="Badge_default__edPsE  Badge_lg__EBrf7 Badge_container__ehKAY ">
                              <a href="#map">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={12}
                                  height={12}
                                  viewBox="0 0 12 12"
                                  fill="none"
                                >
                                  <path
                                    d="M6 4.2C6.74558 4.2 7.35 3.59558 7.35 2.85C7.35 2.10442 6.74558 1.5 6 1.5C5.25442 1.5 4.65 2.10442 4.65 2.85C4.65 3.59558 5.25442 4.2 6 4.2ZM6 4.2V10.5M6 10.5C4.80653 10.5 3.66193 10.0259 2.81802 9.18198C1.97411 8.33807 1.5 7.19347 1.5 6H2.85M6 10.5C7.19347 10.5 8.33807 10.0259 9.18198 9.18198C10.0259 8.33807 10.5 7.19347 10.5 6H9.15"
                                    stroke="var(--gray-500)"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                {/* start_bến đỗ */}
                                <label className="sm">
                                  {dataBoat?.Dock}
                                </label>
                                  {/* end_Bến đỗ */}
                              </a>
                              <a className="ShipDetail_mapLink__PJYog" href={dataBoat?.Detail} target="_blank">
                                Xem chi tiết lịch trình tại đây
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </h4>
                  </div>
                </div>
                {dataBoat && dataBoat.Full_Price && (
                  <h4 style={{ color: "var(--primary-dark, #0E4F4F)" }}>
                    {dataBoat?.Full_Price?.toLocaleString()}đ
                  </h4>
                )}
              </div>
            </div>

            {/* startIMG */}
            <BannerIMG dataBoat={dataBoat} />
            {/* endIMG */}

            {/* start_content */}
            <div className="ShipDetail_ship-detail__tg7lk container flex flex-col gap-40">
              {/* start_tabs */}
              <div className="ShipDetail_tabs__GBWfH">
                <div>
                  <div className="Tabs_tabs__header__nmC5p">
                    <div>
                      <button
                        type="button"
                        className="Tabs_tabItem__LMiWK Tabs_sm__2fksL"
                        onClick={() => {
                          document
                            .getElementById("features")
                            .scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <label>Đặc điểm</label>
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="Tabs_tabItem__LMiWK Tabs_sm__2fksL  "
                        onClick={() => {
                          document
                            .getElementById("rooms")
                            .scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <label>Phòng &amp; giá</label>
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="Tabs_tabItem__LMiWK Tabs_sm__2fksL  "
                        onClick={() => {
                          document
                            .getElementById("intro")
                            .scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <label>Giới thiệu</label>
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="Tabs_tabItem__LMiWK Tabs_sm__2fksL  "
                        onClick={() => {
                          document
                            .getElementById("rules")
                            .scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <label>Quy định</label>
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="Tabs_tabItem__LMiWK Tabs_sm__2fksL  "
                      >
                        <label>Đánh giá</label>0
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* end_tabs */}

              <div className="flex gap-32 w-full">
                {/* start_content_left */}
                <div className="flex flex-col gap-80 flex-grow">
                  {/* start_features */}
                  <Features />
                  {/* end_features */}

                  {/* start_rooms */}
                  <Arr_Room
                    dataRoom={dataRoom}
                    setIsFullBoat={setIsFullBoat}
                    showModal={showModal}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                    setDataInputRoom={setDataInputRoom}
                    dataInputRoom={dataInputRoom}
                    form={form}
                    selectedRooms={selectedRooms}
                    setSelectedRooms={setSelectedRooms}
                  />
                  {/* end_rooms */}

                  {/* start_intro */}
                  <div id="intro">
                    <IntroduceBoat dataBoat={dataBoat} />
                  </div>
                  {/* end_intro */}
                  <div id="rules">
                    <div className="SectionHeader_sectionHeader__60CR7  ">
                      <div className="SectionHeader_title__eE2Rf">
                        <h4>Quy định chung và lưu ý</h4>
                        <div>
                          <span
                            style={{
                              boxSizing: "border-box",
                              display: "inline-block",
                              overflow: "hidden",
                              width: "initial",
                              height: "initial",
                              background: "none",
                              opacity: 1,
                              border: 0,
                              margin: 0,
                              padding: 0,
                              position: "relative",
                              maxWidth: "100%",
                            }}
                          >
                            <span
                              style={{
                                boxSizing: "border-box",
                                display: "block",
                                width: "initial",
                                height: "initial",
                                background: "none",
                                opacity: 1,
                                border: 0,
                                margin: 0,
                                padding: 0,
                                maxWidth: "100%",
                              }}
                            >
                              <img
                                style={{
                                  display: "block",
                                  maxWidth: "100%",
                                  width: "initial",
                                  height: "initial",
                                  background: "none",
                                  opacity: 1,
                                  border: 0,
                                  margin: 0,
                                  padding: 0,
                                }}
                                alt=""
                                aria-hidden="true"
                                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2780%27%20height=%278%27/%3e"
                              />
                            </span>
                            <img
                              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                              decoding="async"
                              data-nimg="intrinsic"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                boxSizing: "border-box",
                                padding: 0,
                                border: "none",
                                margin: "auto",
                                display: "block",
                                width: 0,
                                height: 0,
                                minWidth: "100%",
                                maxWidth: "100%",
                                minHeight: "100%",
                                maxHeight: "100%",
                              }}
                            />
                            <noscript>
                              &lt;img
                              srcSet="/_next/image?url=%2Fheading-border.png&amp;amp;w=96&amp;amp;q=75
                              1x,
                              /_next/image?url=%2Fheading-border.png&amp;amp;w=256&amp;amp;q=75
                              2x"
                              src="/_next/image?url=%2Fheading-border.png&amp;amp;w=256&amp;amp;q=75"
                              decoding="async" data-nimg="intrinsic"
                              style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
                              loading="lazy"/&gt;
                            </noscript>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 align-center">
                      <label className="md">
                        Bạn có thể xem Quy định chung và lưu ý:
                      </label>
                      <a target="_blank" href="/quy-dinh-chung-va-luu-y">
                        <button
                          type="button"
                          className="Button_button__QHarr  Button_button-normal__y4h10 Button_button-link-color__rou_U  "
                        >
                          <div className="label md">Tại đây</div>
                          <svg
                            width={12}
                            height={12}
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="SectionHeader_sectionHeader__60CR7  ">
                      <div className="SectionHeader_title__eE2Rf">
                        <h4>Câu hỏi thường gặp</h4>
                        <div>
                          <span
                            style={{
                              boxSizing: "border-box",
                              display: "inline-block",
                              overflow: "hidden",
                              width: "initial",
                              height: "initial",
                              background: "none",
                              opacity: 1,
                              border: 0,
                              margin: 0,
                              padding: 0,
                              position: "relative",
                              maxWidth: "100%",
                            }}
                          >
                            <span
                              style={{
                                boxSizing: "border-box",
                                display: "block",
                                width: "initial",
                                height: "initial",
                                background: "none",
                                opacity: 1,
                                border: 0,
                                margin: 0,
                                padding: 0,
                                maxWidth: "100%",
                              }}
                            >
                              <img
                                style={{
                                  display: "block",
                                  maxWidth: "100%",
                                  width: "initial",
                                  height: "initial",
                                  background: "none",
                                  opacity: 1,
                                  border: 0,
                                  margin: 0,
                                  padding: 0,
                                }}
                                alt=""
                                aria-hidden="true"
                                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2780%27%20height=%278%27/%3e"
                              />
                            </span>
                            <img
                              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                              decoding="async"
                              data-nimg="intrinsic"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                boxSizing: "border-box",
                                padding: 0,
                                border: "none",
                                margin: "auto",
                                display: "block",
                                width: 0,
                                height: 0,
                                minWidth: "100%",
                                maxWidth: "100%",
                                minHeight: "100%",
                                maxHeight: "100%",
                              }}
                            />
                            <noscript>
                              &lt;img
                              srcSet="/_next/image?url=%2Fheading-border.png&amp;amp;w=96&amp;amp;q=75
                              1x,
                              /_next/image?url=%2Fheading-border.png&amp;amp;w=256&amp;amp;q=75
                              2x"
                              src="/_next/image?url=%2Fheading-border.png&amp;amp;w=256&amp;amp;q=75"
                              decoding="async" data-nimg="intrinsic"
                              style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
                              loading="lazy"/&gt;
                            </noscript>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 align-center">
                      <label className="md">
                        Bạn có thể xem Câu hỏi thường gặp:
                      </label>
                      <a target="_blank" href="/cau-hoi-thuong-gap">
                        <button
                          type="button"
                          className="Button_button__QHarr  Button_button-normal__y4h10 Button_button-link-color__rou_U  "
                        >
                          <div className="label md">Tại đây</div>
                          <svg
                            width={12}
                            height={12}
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col gap-40" id="map">
                    <div className="SectionHeader_sectionHeader__60CR7  ">
                      <div className="SectionHeader_title__eE2Rf">
                        <h4>Bản đồ và lịch trình</h4>
                        <div>
                          <span
                            style={{
                              boxSizing: "border-box",
                              display: "inline-block",
                              overflow: "hidden",
                              width: "initial",
                              height: "initial",
                              background: "none",
                              opacity: 1,
                              border: 0,
                              margin: 0,
                              padding: 0,
                              position: "relative",
                              maxWidth: "100%",
                            }}
                          >
                            <span
                              style={{
                                boxSizing: "border-box",
                                display: "block",
                                width: "initial",
                                height: "initial",
                                background: "none",
                                opacity: 1,
                                border: 0,
                                margin: 0,
                                padding: 0,
                                maxWidth: "100%",
                              }}
                            >
                              <img
                                style={{
                                  display: "block",
                                  maxWidth: "100%",
                                  width: "initial",
                                  height: "initial",
                                  background: "none",
                                  opacity: 1,
                                  border: 0,
                                  margin: 0,
                                  padding: 0,
                                }}
                                alt=""
                                aria-hidden="true"
                                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2780%27%20height=%278%27/%3e"
                              />
                            </span>
                            <img
                              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                              decoding="async"
                              data-nimg="intrinsic"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                boxSizing: "border-box",
                                padding: 0,
                                border: "none",
                                margin: "auto",
                                display: "block",
                                width: 0,
                                height: 0,
                                minWidth: "100%",
                                maxWidth: "100%",
                                minHeight: "100%",
                                maxHeight: "100%",
                              }}
                            />
                            <noscript>
                              &lt;img
                              srcSet="/_next/image?url=%2Fheading-border.png&amp;amp;w=96&amp;amp;q=75
                              1x,
                              /_next/image?url=%2Fheading-border.png&amp;amp;w=256&amp;amp;q=75
                              2x"
                              src="/_next/image?url=%2Fheading-border.png&amp;amp;w=256&amp;amp;q=75"
                              decoding="async" data-nimg="intrinsic"
                              style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
                              loading="lazy"/&gt;
                            </noscript>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-20">
                      <div className="Alert_alert__FSpgk Alert_alert-gray__vIqmz ">
                        <div className="Alert_alert__clostBtn__55Qz2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M6 6L18 18M18 6L6 18"
                              stroke="black"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M13 16H12V12H11M12 8H12.01M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <label className="sm">Thông tin cần biết:</label>
                          <div className="Alert_content__q0dXv">
                            <ul>
                              <li>
                                Du thuyền
                                {/* */}xuất phát từ{" "}
                              </li>
                              <li>
                                Bạn có thể xem chi tiết lịch trình
                                {/* */}2 ngày 1 đêm
                                {/* */}
                                {/* */}.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <iframe
                        title="google-map"
                        width="100%"
                        height={332}
                        style={{ border: 0, borderRadius: 24 }}
                        loading="lazy"
                        allowFullScreen=""
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </div>
                {/* end_content_left */}

                {/* start_content_right */}
                <InforBoatRight dataBoat={dataBoat} />
                {/* end_content_right */}
              </div>
            </div>
            <div className="section-bg ShipDetail_popular-ships__ppm44" />
          </div>
        </div>
        <div className="Loading_loading__EUYtZ ">
          <span
            style={{
              boxSizing: "border-box",
              display: "inline-block",
              overflow: "hidden",
              width: "initial",
              height: "initial",
              background: "none",
              opacity: 1,
              border: 0,
              margin: 0,
              padding: 0,
              position: "relative",
              maxWidth: "100%",
            }}
          >
            <span
              style={{
                boxSizing: "border-box",
                display: "block",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: 1,
                border: 0,
                margin: 0,
                padding: 0,
                maxWidth: "100%",
              }}
            >
              <img
                style={{
                  display: "block",
                  maxWidth: "100%",
                  width: "initial",
                  height: "initial",
                  background: "none",
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                }}
                alt=""
                aria-hidden="true"
                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27200%27%20height=%27200%27/%3e"
              />
            </span>
            <img
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              decoding="async"
              data-nimg="intrinsic"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                boxSizing: "border-box",
                padding: 0,
                border: "none",
                margin: "auto",
                display: "block",
                width: 0,
                height: 0,
                minWidth: "100%",
                maxWidth: "100%",
                minHeight: "100%",
                maxHeight: "100%",
              }}
            />
            <noscript>
              &lt;img
              srcSet="/_next/image?url=%2Femote%2Fmixi_transparent.png&amp;amp;w=256&amp;amp;q=75
              1x,
              /_next/image?url=%2Femote%2Fmixi_transparent.png&amp;amp;w=640&amp;amp;q=75
              2x"
              src="/_next/image?url=%2Femote%2Fmixi_transparent.png&amp;amp;w=640&amp;amp;q=75"
              decoding="async" data-nimg="intrinsic"
              style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
              loading="lazy"/&gt;
            </noscript>
          </span>
          <div style={{ fill: "var(--primary-base)", height: 64, width: 64 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path transform="translate(2)" d="M0 12 V20 H4 V12z">
                <animate
                  attributeName="d"
                  values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z"
                  dur="1.2s"
                  repeatCount="indefinite"
                  begin={0}
                  keyTimes="0;.2;.5;1"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8"
                  calcMode="spline"
                />
              </path>
              <path transform="translate(8)" d="M0 12 V20 H4 V12z">
                <animate
                  attributeName="d"
                  values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z"
                  dur="1.2s"
                  repeatCount="indefinite"
                  begin="0.2"
                  keyTimes="0;.2;.5;1"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8"
                  calcMode="spline"
                />
              </path>
              <path transform="translate(14)" d="M0 12 V20 H4 V12z">
                <animate
                  attributeName="d"
                  values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z"
                  dur="1.2s"
                  repeatCount="indefinite"
                  begin="0.4"
                  keyTimes="0;.2;.5;1"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8"
                  calcMode="spline"
                />
              </path>
              <path transform="translate(20)" d="M0 12 V20 H4 V12z">
                <animate
                  attributeName="d"
                  values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z"
                  dur="1.2s"
                  repeatCount="indefinite"
                  begin="0.6"
                  keyTimes="0;.2;.5;1"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8"
                  calcMode="spline"
                />
              </path>
              <path transform="translate(26)" d="M0 12 V20 H4 V12z">
                <animate
                  attributeName="d"
                  values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z"
                  dur="1.2s"
                  repeatCount="indefinite"
                  begin="0.8"
                  keyTimes="0;.2;.5;1"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8"
                  calcMode="spline"
                />
              </path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
export default Infor_Boat;
