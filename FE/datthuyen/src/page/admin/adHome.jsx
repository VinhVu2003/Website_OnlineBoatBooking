import { Bar, Line, Pie } from "@ant-design/charts";
import { DatePicker, Modal } from "antd";
import { useState } from "react";
import { API_ThongKe } from "../../api/admin/booking";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons"; // Import CloseCircleOutlined icon
const axios = require("axios");
const AdHome = function () {
  // Dữ liệu tĩnh cho biểu đồ cột
  const columnData = [
    { type: "Tháng 1", value: 30 },
    { type: "Tháng 2", value: 20 },
    { type: "Tháng 3", value: 50 },
  ];

  // Dữ liệu tĩnh cho biểu đồ đường
  const lineData = [
    { month: "Tháng 1", value: 10 },
    { month: "Tháng 2", value: 30 },
    { month: "Tháng 3", value: 20 },
    { month: "Tháng 4", value: 15 },
    { month: "Tháng 5", value: 25 },
    { month: "Tháng 6", value: 18 },
    { month: "Tháng 7", value: 22 },
    { month: "Tháng 8", value: 28 },
    { month: "Tháng 9", value: 19 },
    { month: "Tháng 10", value: 21 },
    { month: "Tháng 11", value: 24 },
    { month: "Tháng 12", value: 26 },
  ];

  // Dữ liệu tĩnh cho biểu đồ tròn
  const pieData = [
    { type: "Vịnh Hạ Long", value: 30 },
    { type: "Vịnh Lan Hạ", value: 20 },
    { type: "Vịnh Bạch Đằng", value: 50 },
  ];

  const columnConfig = {
    data: columnData,
    xField: "type",
    yField: "value",
    title: "Biểu đồ cột",
  };

  const lineConfig = {
    data: lineData,
    xField: "month",
    yField: "value",
    title: "Doanh thu",
  };

  const pieConfig = {
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    // label: {
    //   type: 'inner',
    //   offset: '-50%',
    //   content: '{value}',
    //   style: {
    //     textAlign: 'center',
    //   },
    // },
    interactions: [{ type: "element-selected" }],
    title: "Tỷ lệ thuyền",
  };

  const [dateRange, setDateRange] = useState([]);
  const [TotalBooking, setTotalBooking] = useState();
  const [TotalPrice, setTotalPrice] = useState();
  const [TotalCustomer, setTotalCustomer] = useState();

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const handleSearch = async () => {
    const startDate = dateRange[0]?.format("YYYY-MM-DD");
    const endDate = dateRange[1]?.format("YYYY-MM-DD");
    console.log({ startDate, endDate });
    try {
      const response = await API_ThongKe({
        startDate: startDate, // Sử dụng startDate từ dateRange
        endDate: endDate, // Sử dụng endDate từ dateRange
      });
      console.log(response);
      Modal.success({
        title: "Thành công",
        content: (
          <div>
            Tổng đơn đặt hàng: {response[0].TotalBookings}<br />
            Tổng giá trị thu về: {new Intl.NumberFormat().format(response[0].TotalPrice)} đ<br />
            Tổng khách hàng: {response[0].TotalCustomers} <br   />
            Số đơn thuê trọn tàu: {response[0].TotalFullBoatBookings}
          </div>
        ),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      {/* Bạn có thể thêm bảng, form hoặc các component khác ở đây */}
      <div>
        <DatePicker.RangePicker
          format="DD/MM/YYYY"
          value={dateRange}
          onChange={handleDateChange}
        />
        <SearchOutlined
          style={{ marginLeft: "10px", fontSize: "20px" }}
          onClick={handleSearch}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Line {...lineConfig} style={{ flex: 1 }} />
        <Pie {...pieConfig} style={{ flex: 1 }} />
      </div>
    </div>
  );
};

export default AdHome;
