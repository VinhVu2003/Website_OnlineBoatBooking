import "../../../assets/css/search/449d75fe856c6532.css";
import "../../../assets/css/search/3e911ecb270f68f9.css";
import { useEffect, useState } from "react";
import { GetAllAr_Amenities } from "../../../api/user/amenities";
import { Checkbox, Pagination, Select } from "antd";
import { getallBoatUser } from "../../../api/user/boatUser";
import { imageURLBoat } from "../../../url/url_IMG";
import { Link } from "react-router-dom";
const Search = function () {
  const [amenities, setAmenities] = useState([]);
  const [dataBoat, setDataBoat] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [filteredData, setFilteredData] = useState(dataBoat); // Thêm state cho dữ liệu đã lọc

  const LoadDataAmenities = async () => {
    const data = await GetAllAr_Amenities();
    // console.log("ds tiện tích", data);
    setAmenities(data);
  };

  const loadDataBoat = async () => {
    try {
      const response = await getallBoatUser();
      const filteredData = response.filter(
        (boat) => boat.Status === "Chưa khởi hành"
      );
      console.log("dsBoat", filteredData);
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
      // processedData.sort((a, b) => a.Full_Price - b.Full_Price);
      setDataBoat(processedData);
      // console.log(processedData);
      setFilteredData(processedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onCHangeSearch = (value) => {
    console.log("value", value);
    if (value.trim() === "") {
      loadDataBoat();
    } else {
      const filteredData = dataBoat.filter((boat) =>
        boat.Name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filteredData);
    }
  };
  const handleLocationChange = (value) => {
    // console.log("value", value);
    if (value === "all") {
      setFilteredData(dataBoat);
    } else {
      const locationFilteredData = filteredData.filter(
        (boat) => boat.LocationId == value
      );
      setFilteredData(locationFilteredData);
    }
  };
  const handlePriceChange = (value) => {
    // console.log("value", value);
    // if (value == "thapdencao") {
    //   console.log("thapdencao");
    //   let sortedData = filteredData.sort(
    //     (a, b) => a.Full_Price - b.Full_Price
    //   );
    //   setFilteredData(sortedData);
    // } else if (value == "caodenthap") {
    //   console.log("caodenthap");
    //   let sortedData = filteredData.sort(
    //     (a, b) => b.Full_Price - a.Full_Price
    //   );
    //   setFilteredData(sortedData);
    // }
  };

  useEffect(() => {
    LoadDataAmenities();
    loadDataBoat();
  }, []);
  // const handlePageChange = (page) => {
  //   console.log("Page changed to:", page);
  //   const start = (page - 1) * 2;
  //   const end = start + 2;
  //   setDataBoat(dataBoat.slice(start, end));
  // };
  const handleCheckboxChange = (amenityId) => {
    setSelectedAmenities((prevSelected) => {
      if (prevSelected.includes(amenityId)) {
        // Nếu ID đã có trong state, loại bỏ nó
        return prevSelected.filter((id) => id !== amenityId);
      } else {
        // Nếu ID chưa có, thêm nó vào state
        return [...prevSelected, amenityId];
      }
    });
  };

  // useEffect(() => {
  //   // console.log("Selected Amenities:", selectedAmenities);
  //   const fetchAmenities = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5000/boatAmenities/amenity/${selectedAmenities.join(
  //           ","
  //         )}`
  //       );
  //       const data = await response.json();
  //       // console.log("Fetched Amenities:", data);
  //       setDataBoat(data);
  //     } catch (error) {
  //       console.error("Error fetching amenities:", error);
  //     }
  //   };
  //   fetchAmenities();
  // }, [selectedAmenities]);
  return (
    <>
      <div id="__next">
        <div className="Toastify" />
        <div className="Layout_layout__1y4NW">
          <div className="Layout_main__gbdP0">
            <div className="section-bg ">
              <div
                style={{
                  borderTop: "0.5px solid #ccc",

                  fontSize: "smaller",
                }}
                className="SearchPageDetail_search-page__y_l42 flex flex-col gap-80 container"
              >
                {/* input_search */}
                <div className="fresnel-container fresnel-greaterThan-mdless ">
                  <div className="Card_card__rC1zg SearchPageDetail_search-box__4kz8u SearchBox_searchBox__kO_MC flex flex-col justify-center gap-40">
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
                            htmlFor=":R9kpm:"
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
                              id=":R9kpm:"
                              className="p-md"
                              placeholder="Nhập tên du thuyền"
                              defaultValue=""
                              onChange={(e) => {
                                onCHangeSearch(e.target.value);
                              }}
                            />
                            <label htmlFor=":R9kpm:" className="sm " />
                          </label>
                        </div>
                      </div>
                      <div className="SearchBox_selectInput__7ln_I">
                        <div className=" ">
                          <label
                            htmlFor=":Rakpm:"
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
                            <Select
                              id=":Rakpm:"
                              placeholder="Tất cả địa điểm"
                              style={{ width: 200 }}
                              onChange={handleLocationChange}
                            >
                              <Select.Option value="all">
                                Tất cả địa điểm
                              </Select.Option>
                              <Select.Option value="1">
                                Vịnh Hạ Long
                              </Select.Option>
                              <Select.Option value="2">
                                Vịnh Lan Hạ
                              </Select.Option>
                              <Select.Option value="3">
                                Vịnh Bạch Đằng
                              </Select.Option>
                            </Select>
                          </label>
                        </div>
                      </div>
                      <div className="SearchBox_selectInput__7ln_I">
                        <div className=" ">
                          <label
                            htmlFor=":Rbkpm:"
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
                            <Select
                              id=":Rakpm:"
                              placeholder="Mức giá"
                              style={{ width: 200 }}
                              onChange={handlePriceChange}
                            >
                              <Select.Option value="thapdencao">
                                Thấp đến cao
                              </Select.Option>
                              <Select.Option value="caodenthap">
                                Cao đến thấp
                              </Select.Option>
                            </Select>
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
                {/* end_input_search */}

                <div className="fresnel-container fresnel-greaterThan-mdless ">
                  <div className="flex gap-32 ">
                    {/* start_content_left */}
                    <div className="SearchPageDetail_side-bar__2_qyS flex flex-col ">
                      <div className="SearchPageDetail_side-bar__header__Vtd1j">
                        <div className="subheading md flex-grow">
                          Lọc kết quả
                        </div>
                        <div className="flex gap-10 align-center">
                          <button
                            type="button"
                            className="Button_button__QHarr  Button_button-sm__ljQtM Button_button-link-color__rou_U  "
                          >
                            <div className="label sm">Đặt lại</div>
                          </button>
                          <button
                            type="button"
                            className="Button_button__QHarr SearchPageDetail_apply-mb-btn__6dzty Button_button-sm__ljQtM Button_button-link-color__rou_U  "
                          >
                            <div className="label sm">Áp dụng</div>
                          </button>
                        </div>
                      </div>
                      <div>
                        {/* xếp hạng sao */}
                        {/* <div className="SearchPageDetail_filter-item__YIaXX">
                          <label className="md">Xếp hạng sao</label>
                          <label
                            htmlFor=":r3s:"
                            className=" Checkbox_container__ccFUl"
                          >
                            <input id=":r3s:" type="checkbox" />
                            <span className="Checkbox_checkmark__81gnF Checkbox_sm__nLRCs">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M4 12.6111L8.92308 17.5L20 6.5"
                                  stroke="black"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <div className="Checkbox_textGroup__Z0QZ_">
                              <div className="sm Checkbox_title__rGvCj label">
                                3 sao
                              </div>
                              <p className="sm" />
                            </div>
                          </label>
                          <label
                            htmlFor=":r3t:"
                            className=" Checkbox_container__ccFUl"
                          >
                            <input id=":r3t:" type="checkbox" />
                            <span className="Checkbox_checkmark__81gnF Checkbox_sm__nLRCs">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M4 12.6111L8.92308 17.5L20 6.5"
                                  stroke="black"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <div className="Checkbox_textGroup__Z0QZ_">
                              <div className="sm Checkbox_title__rGvCj label">
                                4 sao
                              </div>
                              <p className="sm" />
                            </div>
                          </label>
                          <label
                            htmlFor=":r3u:"
                            className=" Checkbox_container__ccFUl"
                          >
                            <input id=":r3u:" type="checkbox" />
                            <span className="Checkbox_checkmark__81gnF Checkbox_sm__nLRCs">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M4 12.6111L8.92308 17.5L20 6.5"
                                  stroke="black"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <div className="Checkbox_textGroup__Z0QZ_">
                              <div className="sm Checkbox_title__rGvCj label">
                                5 sao
                              </div>
                              <p className="sm" />
                            </div>
                          </label>
                        </div> */}
                        {/* end_xếp hạng sao */}

                        <div className="SearchPageDetail_filter-item__YIaXX">
                          <label className="md">Tiện ích</label>

                          {amenities.map((amenity) => (
                            <Checkbox
                              key={amenity.ID}
                              checked={selectedAmenities.includes(amenity.ID)}
                              onChange={() => handleCheckboxChange(amenity.ID)}
                            >
                              <span>{amenity.Name}</span>
                            </Checkbox>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* end_content_left */}

                    {/* start_content_right */}
                    <div>
                      <div className="SearchPageDetail_ship-list__TqdCw flex flex-col gap-32">
                        {Array.isArray(filteredData) ? (
                          filteredData.map((value) => (
                            <Link to={`/user/infor/${value.ID}`}>
                              <div className="Card_card__rC1zg ProductCard_list__r7WEn">
                                <div className="ProductCard_imageWrapper__wUnNQ">
                                  <div
                                    className="ProductCard_imageWrapper__image__uTO4K"
                                    style={{
                                      width: 352,
                                      height: 264,
                                      position: "relative",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <img
                                      alt="mixivivu"
                                      src={`${imageURLBoat}/${
                                        value.IMG.split(",")[0]
                                      }`}
                                      width="100%"
                                      height="100%"
                                      loading="lazy"
                                      style={{ objectFit: "cover" }}
                                    />
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
                                        {value?.LocationName}
                                      </label>
                                    </div>
                                    <p className="ProductCard_title__Qzx4a subheading md">
                                      {value?.Name}
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
                                        Hạ thuỷ 2019 - Tàu vỏ Kim loại - 20
                                        phòng
                                      </p>
                                    </div>
                                  </div>

                                  <div className="ProductCard_footer__nZNq6">
                                    <div>
                                      <div>
                                        <p
                                          className="ProductCard_price__57kp2 subheading md"
                                          style={{
                                            color:
                                              "var(--primary-dark, #0E4F4F)",
                                          }}
                                        >
                                          {value?.Full_Price.toLocaleString()}đ
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
                            </Link>
                            // ... render you r boat data ...
                          ))
                        ) : (
                          <p>No data available</p> // Hoặc xử lý khác nếu dataBoat không phải là mảng
                        )}
                      </div>
                      {/* <Pagination
                        total={dataBoat.length}
                        defaultPageSize={2}
                        onChange={(page) => {
                          // Assuming you have a function to handle page change
                          // This is a placeholder for your actual function
                          handlePageChange(page);
                        }}
                      /> */}
                    </div>

                    {/* end_content_right */}
                  </div>
                </div>

                {/* lỗi không tìm thấy */}
                {/* <div>
                  <div className="Card_card__rC1zg NotFound_not-found__d9jn8">
                    <div className="NotFound_img-wrapper__hNgsh">
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
                          src="/sad.png"
                          width="100%"
                          height="100%"
                          loading="lazy"
                          style={{ objectFit: "cover" }} // Changed from string to object
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-8">
                      <h5>Rất tiếc, Mixivivu không tìm thấy kết quả cho bạn</h5>
                      <p
                        className="md"
                        style={{ color: "var(--gray-600, #475467)" }}
                      >
                        Nhấn OK để bắt đầu tìm kiếm mới.
                      </p>
                    </div>
                    <a href="/">
                      <button
                        type="button"
                        className="Button_button__QHarr  Button_button-normal__y4h10 Button_button-outline__YRytX  "
                      >
                        <div className="label md">OK</div>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </a>
                  </div>
                </div> */}
                {/* end lỗi không tìm thấy */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;
