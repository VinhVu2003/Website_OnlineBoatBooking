import "../../assets/css/home/449d75fe856c6532.css";
import "../../assets/css/home/821eb5f7bd1985b1.css";
import Header from "../../shared/user/header";
import logo from "../../assets/img/black_logo.webp";
import video from "../../assets/img/Mixivivuduthuyen.mp4";
import { GetAllLocation } from "../../api/user/locationUser";
import { getallBoatUser } from "../../api/user/boatUser";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { imageURLBoat } from "../../url/url_IMG";
const Home = function () {
  const [dataLocation, setDataLocation] = useState([]);
  const [dataBoat, setDataBoat] = useState([]);
  const loadDataLocation = async () => {
    try {
      const response = await GetAllLocation();
      
      setDataLocation(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const loadDataBoat = async () => {
    try {
      const response = await getallBoatUser();
      const filteredData = response.filter(boat => boat.Status === 'Chưa khởi hành');
      // console.log("dsBoat", filteredData)
      // Xử lý dữ liệu ở đây
      const processedData = filteredData.map((boat) => {
        // Tách chuỗi OtherInfo
        const infoParts = boat.OtherInfo.split(".").map((part) => part.trim());

        // Cập nhật lại OtherInfo hoặc thêm các thông tin cần thiết
        boat.processedOtherInfo = {
          year: infoParts[0], // Hạ Thủy 2019
          shipType: infoParts[1], // Tàu vỏ Kim Loại
        };

        return boat;
      });
      setDataBoat(processedData);
      // console.log(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    loadDataLocation();
    loadDataBoat();
  }, []);

  return (
    <>
      
      <div id="__next">
        <div className="Toastify" />
        <div className="Layout_layout__1y4NW">
          {/* ---startHeader */}

          {/* ---end_Header */}

          <div className="Layout_main__gbdP0">
            <div>
              {/* start_Search */}
              <div className="Home_banner___Q8R8">
                <video
                  className="Home_bg-video__PU78L"
                  src={video}
                  autoPlay
                  muted
                  playsInline
                  loop
                />
                <div className="Card_card__rC1zg Home_searchBox__LtTYk SearchBox_searchBox__kO_MC flex flex-col justify-center gap-40">
                  <div className="flex flex-col gap-16 gray-900">
                    <h4 className="text-center SearchBox_title__ng3KB">
                      Bạn lựa chọn du thuyền Hạ Long nào?
                    </h4>
                    <p className="lg text-center SearchBox_description__XPES7">
                      Hơn 100 tour du thuyền hạng sang giá tốt đang chờ bạn
                    </p>
                  </div>
                  <div className="flex gap-20 SearchBox_input-group__fNreQ">
                    <div className="SearchBox_searchInput__1PTiU">
                      <div className=" ">
                        <label
                          htmlFor=":Rj8pm:"
                          className="Input_input-group__6PMfq"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                              stroke="black"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <input
                            id=":Rj8pm:"
                            className="p-md"
                            placeholder="Nhập tên du thuyền"
                            defaultValue=""
                          />
                          <label htmlFor=":Rj8pm:" className="sm " />
                        </label>
                      </div>
                    </div>
                    <div className="SearchBox_selectInput__7ln_I">
                      <div className=" ">
                        <label
                          htmlFor=":Rl8pm:"
                          className="Input_input-group__6PMfq"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
                              stroke="black"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <input
                            id=":Rl8pm:"
                            className="p-md"
                            type="button"
                            defaultValue="Tất cả địa điểm"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <label htmlFor=":Rl8pm:" className="sm " />
                        </label>
                      </div>
                    </div>
                    <div className="SearchBox_selectInput__7ln_I">
                      <div className=" ">
                        <label
                          htmlFor=":Rn8pm:"
                          className="Input_input-group__6PMfq"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M15 10V9.91667C15 8.85812 14.1419 8 13.0833 8H11C9.89543 8 9 8.89543 9 10C9 11.1046 9.89543 12 11 12H13C14.1046 12 15 12.8954 15 14C15 15.1046 14.1046 16 13 16H10.9583C9.87678 16 9 15.1232 9 14.0417V14M12 17.5V6.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                              stroke="#101828"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <input
                            id=":Rn8pm:"
                            className="p-md"
                            type="button"
                            defaultValue="Tất cả mức giá"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <label htmlFor=":Rn8pm:" className="sm " />
                        </label>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="Button_button__QHarr SearchBox_submit-btn__eNdeg Button_button-normal__y4h10 Button_button-color__7QnYK  "
                      color="color"
                    >
                      <div className="label md">Tìm kiếm</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* end_Search */}
            <div id="Home_popularSections__gUv8O">
              <div className="container PolularShips_section__8AeVl">
                <div className="SectionHeader_sectionHeader__60CR7  ">
                  <div className="SectionHeader_title__eE2Rf">
                    <h4>
                      Du thuyền mới <br /> và phổ biến nhất
                    </h4>
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
                  <label className="lg SectionHeader_description__2ZD1p">
                    Tận hưởng sự xa hoa và đẳng cấp tối đa trên du thuyền mới
                    nhất và phổ biến nhất. Khám phá một hành trình tuyệt vời đưa
                    bạn vào thế giới của sự sang trọng, tiện nghi và trải nghiệm
                    không thể quên.
                  </label>
                </div>
                <div className="PolularShips_cardList__m70g5">
                  {/* start_boat */}

                  {dataBoat.map((value) => (
                    <Link to={`/user/infor/${value.ID}`}>
                      <a key={value.ID}>
                        <div className="Card_card__rC1zg ProductCard_grid__nIKGW">
                          <div className="ProductCard_imageWrapper__wUnNQ">
                            <div
                              style={{
                                width: 352,
                                height: 216,
                                position: "relative",
                                overflow: "hidden",
                              }}
                              className="ProductCard_imageWrapper__image__uTO4K"
                            >
                              <img
                                alt="mixivivu"
                                src={`${imageURLBoat}/${value.IMG.split(',')[0]}`}
                                width="100%"
                                height="100%"
                                loading="lazy"
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                            <div className="Badge_warning__ZYfZr  Badge_sm__JAs9n Badge_container__ehKAY ProductCard_imageWrapper__badge__rTZ4B">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={12}
                                height={12}
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
                              <label className="xs">4.9 (11) đánh giá</label>
                            </div>
                          </div>
                          <div className="ProductCard_cardContent__dhwKR">
                            <div className="ProductCard_body__kzAwg">
                              <div className="Badge_default__edPsE  Badge_sm__JAs9n Badge_container__ehKAY ProductCard_location__T5BYG">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={12}
                                  height={12}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
                                    stroke="var(--gray-500)"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <label className="xs">
                                  {value.LocationName}
                                </label>
                              </div>
                              <p className="ProductCard_title__Qzx4a subheading md">
                                {value.Name}
                              </p>
                              <div className="ProductCard_description__bKmA4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={20}
                                  height={20}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M3.62 17.28C3.71813 17.5267 3.91022 17.7242 4.15402 17.8292C4.39782 17.9343 4.67335 17.9381 4.92 17.84C5.16665 17.7419 5.36422 17.5498 5.46924 17.306C5.57426 17.0622 5.57813 16.7867 5.48 16.54L4.36 13.72L11 12.25V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V12.25L19.64 13.72L18.52 16.54C18.4713 16.6621 18.4471 16.7926 18.4489 16.9241C18.4507 17.0556 18.4784 17.1854 18.5304 17.3061C18.5824 17.4269 18.6577 17.5362 18.7521 17.6278C18.8464 17.7194 18.9578 17.7915 19.08 17.84C19.1978 17.8866 19.3233 17.9103 19.45 17.91C19.6503 17.9102 19.846 17.8502 20.0118 17.7379C20.1776 17.6256 20.3059 17.4661 20.38 17.28L21.93 13.37C21.9832 13.2348 22.0063 13.0896 21.9977 12.9445C21.989 12.7994 21.9489 12.658 21.88 12.53C21.8132 12.4025 21.7196 12.2909 21.6057 12.2029C21.4918 12.1149 21.3602 12.0525 21.22 12.02L18 11.31V7C18 6.73478 17.8946 6.48043 17.7071 6.29289C17.5196 6.10536 17.2652 6 17 6H15V3C15 2.73478 14.8946 2.48043 14.7071 2.29289C14.5196 2.10536 14.2652 2 14 2H10C9.73478 2 9.48043 2.10536 9.29289 2.29289C9.10536 2.48043 9 2.73478 9 3V6H7C6.73478 6 6.48043 6.10536 6.29289 6.29289C6.10536 6.48043 6 6.73478 6 7V11.31L2.78 12C2.63976 12.0325 2.5082 12.0949 2.39429 12.1829C2.28038 12.2709 2.18682 12.3825 2.12 12.51C2.05113 12.638 2.01098 12.7794 2.00234 12.9245C1.99371 13.0696 2.0168 13.2148 2.07 13.35L3.62 17.28ZM11 4H13V6H11V4ZM8 8H16V10.86L12.22 10H12.12H12H11.88H11.78L8 10.86V8ZM20.71 19.28C20.3591 19.3875 20.0232 19.5387 19.71 19.73C19.3914 19.9163 19.029 20.0145 18.66 20.0145C18.291 20.0145 17.9286 19.9163 17.61 19.73C16.9173 19.3392 16.1354 19.1339 15.34 19.1339C14.5446 19.1339 13.7627 19.3392 13.07 19.73C12.7471 19.9141 12.3817 20.011 12.01 20.011C11.6383 20.011 11.2729 19.9141 10.95 19.73C10.2566 19.3411 9.47499 19.1368 8.68 19.1368C7.88501 19.1368 7.10336 19.3411 6.41 19.73C6.09143 19.9163 5.72904 20.0145 5.36 20.0145C4.99096 20.0145 4.62857 19.9163 4.31 19.73C3.99683 19.5387 3.66087 19.3875 3.31 19.28C3.17694 19.2327 3.03537 19.2141 2.89461 19.2255C2.75385 19.2368 2.61709 19.2778 2.49334 19.3459C2.36958 19.4139 2.26163 19.5073 2.1766 19.6201C2.09157 19.7328 2.03138 19.8623 2 20C1.92535 20.2533 1.95389 20.5258 2.07941 20.7581C2.20493 20.9904 2.41724 21.1636 2.67 21.24C2.87136 21.2946 3.06347 21.3788 3.24 21.49C3.84671 21.846 4.53657 22.0357 5.24 22.04C5.9706 22.0401 6.68823 21.8469 7.32 21.48C7.71198 21.2638 8.15234 21.1504 8.6 21.1504C9.04766 21.1504 9.48803 21.2638 9.88 21.48C10.5073 21.8387 11.2174 22.0274 11.94 22.0274C12.6626 22.0274 13.3727 21.8387 14 21.48C14.392 21.2638 14.8323 21.1504 15.28 21.1504C15.7277 21.1504 16.168 21.2638 16.56 21.48C17.1798 21.8499 17.8882 22.0453 18.61 22.0453C19.3318 22.0453 20.0402 21.8499 20.66 21.48C20.8365 21.3688 21.0286 21.2846 21.23 21.23C21.3631 21.2031 21.4893 21.1493 21.6009 21.0721C21.7126 20.9948 21.8073 20.8956 21.8793 20.7805C21.9514 20.6654 21.9992 20.5368 22.02 20.4027C22.0407 20.2685 22.0339 20.1315 22 20C21.9682 19.8647 21.9086 19.7374 21.8249 19.6265C21.7412 19.5155 21.6352 19.4232 21.5138 19.3554C21.3925 19.2877 21.2583 19.246 21.1199 19.233C20.9815 19.22 20.8419 19.236 20.71 19.28Z"
                                    fill="var(--gray-600)"
                                  />
                                </svg>
                                <p className="sm">
                                  {value.processedOtherInfo.year} -{" "}
                                  {value.processedOtherInfo.shipType} -{" "}
                                  {value.Cabin_Count} phòng
                                </p>
                              </div>
                            </div>
                            <div className="ProductCard_footer__nZNq6">
                              <div>
                                <div>
                                  <p
                                    className="ProductCard_price__57kp2 subheading md"
                                    style={{
                                      color: "var(--primary-dark, #0E4F4F)",
                                    }}
                                  >
                                    {value.Full_Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                className="Button_button__QHarr  Button_button-sm__ljQtM Button_button-color__7QnYK  "
                              >
                                <div className="label sm">Đặt ngay</div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                  
                  {/* end_boat */}
                </div>
                <div className="PolularShips_action__IRu59">
                  <button
                    type="button"
                    className="Button_button__QHarr  Button_button-normal__y4h10 Button_button-outline__YRytX  "
                  >
                    <div className="label md">Xem tất cả Du thuyền</div>
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
                </div>
              </div>
            </div>
            <div id="Home_reviewSection__iR0Gg" className="section-bg">
              <div className="container ReviewsSection_section___wAag">
                <div className="SectionHeader_sectionHeader__60CR7  ">
                  <div className="SectionHeader_title__eE2Rf">
                    <h4>
                      Đánh giá từ những <br /> người đã trải nghiệm
                    </h4>
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
                  <label className="lg SectionHeader_description__2ZD1p">
                    Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du
                    lịch với chúng tôi.
                  </label>
                </div>
                <div className="ReviewQuote_reviewQuote__oLHNg">
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
                          src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2730%27%20height=%2722%27/%3e"
                        />
                      </span>
                      <img
                        alt="quote"
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
                        &lt;img alt="quote" srcSet="/quote.svg 1x, /quote.svg
                        2x" src="/quote.svg" decoding="async"
                        data-nimg="intrinsic"
                        style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
                        loading="lazy"/&gt;
                      </noscript>
                    </span>
                  </div>
                  <div className="ReviewQuote_quoteBody___2EoI">
                    <div className="ReviewQuote_quoteContent__LOp__">
                      <p className="subheading lg">
                        Du thuyền Heritage Bình Chuẩn
                      </p>
                      <p className="lg">
                        Chị rất cảm ơn team đã tư vấn cho chị chọn du thuyền
                        Heritage Bình Chuẩn. Bố mẹ chị rất ưng í em ạ!
                        <br />
                        Tàu đẹp, mang đậm phong cách Á Đông. Đồ ăn hợp khẩu vị.
                        Các bạn nhân viên trên tàu nhiệt tình và chu đáo.
                      </p>
                    </div>
                    <p className="detail-md upper-case ">
                      Chị Thu Hà
                      {/* */}-{" "}
                    </p>
                  </div>
                </div>
                <div className="ReviewsSection_reviewList__ae1me">
                  <button
                    type="button"
                    className="Button_button__QHarr ReviewsSection_reviewBtn__mCn5f  Button_button-normal__y4h10 Button_button-outline__YRytX  "
                  >
                    <div className="label md">Chị Thu Hà</div>
                  </button>
                  <button
                    type="button"
                    className="Button_button__QHarr ReviewsSection_reviewBtn__mCn5f ReviewsSection_defaultBtn__i6FnJ Button_button-normal__y4h10 Button_button-outline__YRytX  "
                  >
                    <div className="label md">Anh Khánh</div>
                  </button>
                  <button
                    type="button"
                    className="Button_button__QHarr ReviewsSection_reviewBtn__mCn5f ReviewsSection_defaultBtn__i6FnJ Button_button-normal__y4h10 Button_button-outline__YRytX  "
                  >
                    <div className="label md">Chị Linh - Anh Dũng</div>
                  </button>
                  <button
                    type="button"
                    className="Button_button__QHarr ReviewsSection_reviewBtn__mCn5f ReviewsSection_defaultBtn__i6FnJ Button_button-normal__y4h10 Button_button-outline__YRytX  "
                  >
                    <div className="label md">Bạn Minh Hoàng</div>
                  </button>
                  <button
                    type="button"
                    className="Button_button__QHarr ReviewsSection_reviewBtn__mCn5f ReviewsSection_defaultBtn__i6FnJ Button_button-normal__y4h10 Button_button-outline__YRytX  "
                  >
                    <div className="label md">Cô Thanh Hằng và bạn</div>
                  </button>
                </div>
              </div>
            </div>
            <div className="container Home_section__E0q_L">
              <div className="SectionHeader_sectionHeader__60CR7 SectionHeader_center__SgbXz ">
                <div className="SectionHeader_title__eE2Rf">
                  <h4>Các điểm đến của Mixivivu</h4>
                </div>
                <label className="lg SectionHeader_description__2ZD1p">
                  Khám phá vẻ đẹp tuyệt vời của Du thuyền Hạ Long: Hành trình
                  đến thiên đường thiên nhiên
                </label>
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
              {/* start_location */}
              <div className="Home_cardList__4oqth">
                {dataLocation.map((location) => (
                  <a href="" key={location.ID}>
                    <div className="Card_card__rC1zg CategoryCard_categoryCard__X6aCz">
                      <div className="CategoryCard_imageWrapper__ZoxLj">
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            alt="mixivivu"
                            src={`../../assets/img/${location.IMG}`}
                            width="100%"
                            height="100%"
                            loading="lazy"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                      <div className="CategoryCard_body__UUyeo">
                        <h6>{location.Name}</h6>
                      </div>
                      <div className="CategoryCard_footer__O2fDe">
                        <button
                          type="button"
                          className="Button_button__QHarr  Button_button-sm__ljQtM Button_button-outline__YRytX  "
                        >
                          <div className="label sm">Xem ngay</div>
                        </button>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              {/* end_location */}
            </div>
            <div id="Home_partnersSection__zbzHu" className="section-bg">
              {/* start_doitacthuyen */}
              <div className="container PartnerSection_section__7gxSR">
                <div className="SectionHeader_sectionHeader__60CR7  ">
                  <div className="SectionHeader_title__eE2Rf">
                    <h4>
                      Đối tác Cùng các <br />
                      Hãng Du thuyền Lớn
                    </h4>
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
                            src="../../assets/img/ke_ngang.webp"
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
                  <label className="lg SectionHeader_description__2ZD1p">
                    Đối tác hàng đầu với các hãng du thuyền danh tiếng: Ưu đãi
                    độc quyền dành riêng cho bạn
                  </label>
                </div>
                <div className="PartnerSection_partnerList__djvRY">
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/1.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/2.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/3.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/4.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/5.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/6.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/7.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/8.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/9.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/10.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/11.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/12.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/13.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="PartnerSection_img-wrapper__guUz_">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        alt="mixivivu"
                        src="../../assets/img/doitac/14.png"
                        width="100%"
                        height="100%"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* end_doitacthuyen */}
            </div>
            <div className="container BlogSection_section__D6dfs">
              <div className="SectionHeader_sectionHeader__60CR7  ">
                <div className="SectionHeader_title__eE2Rf">
                  <h4>
                    Hạ Long: Khám phá Sự đặc sắc <br /> và Cập nhật tin tức mới
                    nhất
                  </h4>
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
                <label className="lg SectionHeader_description__2ZD1p">
                  Hạ Long: Bí mật và Cuộc sống trong Vịnh - Khám phá và Cập nhật
                  những tin tức hấp dẫn từ điểm đến tuyệt vời này.
                </label>
              </div>
              <div className="BlogSection_cardList__W14ir">
                <a href="/blog-detail/kham-pha-3-dia-diem-tam-linh-noi-tieng-tai-quang-ninh">
                  <div className="Card_card__rC1zg BlogCard_blogCard__vJqzJ">
                    <div className="BlogCard_imageWrapper__dPJCo">
                      <div
                        style={{
                          width: 352,
                          height: 216,
                          position: "relative",
                          overflow: "hidden",
                        }}
                        className="BlogCard_imageWrapper__image__GHfnP"
                      >
                        <img
                          alt="mixivivu"
                          src="https://minio.fares.vn/mixivivu-dev/tour/blog/images/iurr1rdtxybc9arl.webp"
                          width="100%"
                          height="100%"
                          loading="lazy"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                    <div className="BlogCard_body__glkpY">
                      <p className="subheading md BlogCard_title__tSQzu">
                        Khám phá 3 địa điểm tâm linh nổi tiếng tại Quảng Ninh
                      </p>
                      <p className="BlogCard_description___VAs2 sm">
                        Quảng Ninh được biết tới là một điểm đến du lịch với
                        vịnh Hạ long thơ mộng cùng những bãi tắm dài đẹp và
                        những hang động tuyệt đẹp được thiên nhiên ban tặng.
                        Quảng Ninh không chỉ nổi tiếng là thành phố du lịch mà
                        còn thu hút du khách bởi những ngôi chùa linh thiêng.
                        Hãy MIXI VIVU điểm qua 3 ngôi chùa nổi tiếng nhất tại
                        Quảng Ninh để tìm hiểu những nét đặc sắc về văn hóa địa
                        phương, vãn cảnh chùa thanh tịnh để cầu may mắn bình an
                        cho mình và gia đình.
                      </p>
                    </div>
                    <p className="BlogCard_footer__bYl6N detail sm">
                      05/10/2024
                    </p>
                  </div>
                </a>
                <a href="/blog-detail/dinhluhuong-tuyettaccuathiennhientrenvinhhalong">
                  <div className="Card_card__rC1zg BlogCard_blogCard__vJqzJ">
                    <div className="BlogCard_imageWrapper__dPJCo">
                      <div
                        style={{
                          width: 352,
                          height: 216,
                          position: "relative",
                          overflow: "hidden",
                        }}
                        className="BlogCard_imageWrapper__image__GHfnP"
                      >
                        <img
                          alt="mixivivu"
                          src="https://minio.fares.vn/mixivivu-dev/tour/blog/images/4meiqi8b6mkyqdvo.webp"
                          width="100%"
                          height="100%"
                          loading="lazy"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                    <div className="BlogCard_body__glkpY">
                      <p className="subheading md BlogCard_title__tSQzu">
                        Đỉnh Lư Hương- tuyệt tác của thiên nhiên trên vịnh Hạ
                        Long
                      </p>
                      <p className="BlogCard_description___VAs2 sm">
                        Là một trong những biểu tượng của du lịch Hạ Long cùng
                        với hòn Trống Mái, hang Đầu Gỗ...đỉnh Lư Hương xuất hiện
                        rất nhiều trong các khung hình check in của đông đảo du
                        khách đặc biệt là các bạn trẻ. Hãy cùng khám phá vẻ đẹp
                        hùng vĩ mà thiên nhiên đã ban tặng cho nơi đây- nơi mà
                        bạn nên đặt chân đến ít nhất một lần trong đời.
                      </p>
                    </div>
                    <p className="BlogCard_footer__bYl6N detail sm">
                      05/10/2024
                    </p>
                  </div>
                </a>
                <a href="/blog-detail/3baibiendepnhathalongmabankhongtheboqua">
                  <div className="Card_card__rC1zg BlogCard_blogCard__vJqzJ">
                    <div className="BlogCard_imageWrapper__dPJCo">
                      <div
                        style={{
                          width: 352,
                          height: 216,
                          position: "relative",
                          overflow: "hidden",
                        }}
                        className="BlogCard_imageWrapper__image__GHfnP"
                      >
                        <img
                          alt="mixivivu"
                          src="https://minio.fares.vn/mixivivu-dev/tour/blog/images/gocimutv33u0rfd5.webp"
                          width="100%"
                          height="100%"
                          loading="lazy"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                    <div className="BlogCard_body__glkpY">
                      <p className="subheading md BlogCard_title__tSQzu">
                        3 bãi biển đẹp nhất Hạ Long mà bạn không thể bỏ qua
                      </p>
                      <p className="BlogCard_description___VAs2 sm">
                        Hạ Long - nơi được ví như thiên đường nghỉ dưỡng với
                        những hòn đảo kỳ vĩ, hoang sơ, cùng những bải biển dài
                        đẹp. Hy vọng với những chia sẻ của MIXI VIVU sẽ giúp bạn
                        biết được 3 bãi biển đẹp nhất tại đây và được rất nhiều
                        du khách yêu thích.
                      </p>
                    </div>
                    <p className="BlogCard_footer__bYl6N detail sm">
                      05/10/2024
                    </p>
                  </div>
                </a>
              </div>
              <div className="BlogSection_action__wVG32">
                <button
                  type="button"
                  className="Button_button__QHarr  Button_button-normal__y4h10 Button_button-outline__YRytX  "
                >
                  <div className="label md">Xem tất cả</div>
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
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
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
    </>
  );
};
export default Home;
