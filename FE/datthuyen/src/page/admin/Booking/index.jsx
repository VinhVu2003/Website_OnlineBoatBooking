import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  notification,
  message,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  Tooltip,
} from "antd";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  API_GetallBooking,
  API_GetAllBookingDetailByBookingID,
  API_UpdateStatusBooking,
} from "../../../api/admin/booking";
import DialogDetail from "./DialogDetail";

const Booking = function () {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [Arr_Room, setArr_Room] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  const loadData = async () => {
    try {
      const response = await API_GetallBooking();
      console.log("databooking", response);
      const uniqueBookings = response.reduce(
        (unique, item) =>
          unique.includes(item.ID) ? unique : [...unique, item],
        []
      );
      setData(uniqueBookings);
      setFilteredData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const setDetailBooking =async (record) => {
    form.setFieldsValue({
      ...record,
      IsFullBoat: record.IsFullBoat === "1" ? "Thuê trọn tàu" : "Đặt phòng theo lịch trình có sẵn"
    });
    try {
      const response = await API_GetAllBookingDetailByBookingID(record?.ID);
      // console.log("response", response);
      setArr_Room(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    loadData();
    // loadDataBoat();
  }, []);

  // const handleDelete = async (record) => {
  //   try {
  //     await deleteBooking(record.BookingID);
  //     Modal.success({
  //       title: "Thành công",
  //       content: "Đặt chỗ đã được xóa thành công!",
  //     });
  //     loadData();
  //   } catch (error) {
  //     console.error("Error deleting booking:", error);
  //   }
  // };
  const confirmBooking = async (record) => {
    // console.log(record)
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xác nhận?",
      onOk: async () => {
        try {
          await API_UpdateStatusBooking({
            id: record.ID,
            status: "Chờ thanh toán",
          });
          notification.success({
            message: "Thành công",
            description: "Thành công!",
          });
          // console.log("Loading data after successful update..."); // Thêm log để kiểm tra
          loadData();
        } catch (error) {
          Modal.error({
            title: "Thất bại",
            content: "Thất bại!",
          });
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const CancelBooking = async (record) => {
    // console.log(record)
    Modal.confirm({
      title: "Hủy",
      content: "Bạn có chắc chắn muốn hủy?",
      onOk: async () => {
        try {
          await API_UpdateStatusBooking({ id: record.ID, status: "Đã hủy" });
          notification.success({
            message: "Hủy thành công",
            description: "Hủy thành công!",
          });
          // console.log("Loading data after successful update..."); // Thêm log để kiểm tra
          loadData();
        } catch (error) {
          Modal.error({
            title: "Thất bại",
            content: "Thất bại!",
          });
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const columns = [
    // {
    //   title: "STT",
    //   key: "stt",
    //   render: (text, record, index) => index + 1,
    // },
    // {
    //   title: "Khách hàng",
    //   dataIndex: "CustomerID",
    //   render: (text) => text, // Giả sử bạn có cách để hiển thị tên khách hàng
    // },
    {
      title: "Mã",
      dataIndex: "ID",
    },
    {
      title: "Khách hàng",
      dataIndex: "CustomerName",
    },
    {
      title: "Thuyền",
      dataIndex: "BoatName",
    },
    {
      title: "Loại hình",
      dataIndex: "IsFullBoat",
      render: (text) => (text === "1" ? "Thuê trọn" : "Đặt phòng"),
      filters: [
        { text: "Thuê trọn", value: "1" },
        { text: "Đặt phòng", value: "0" },
      ],
      onFilter: (value, record) => record.IsFullBoat.indexOf(value) === 0,
    },
    {
      title: "Ngày đặt",
      dataIndex: "BookingDate",
      render: (text) => new Date(text).toLocaleString(),
    },

    {
      title: "Tổng giá",
      dataIndex: "Total_Price",
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      filters: [
        { text: "Đã tạo", value: "Đã tạo" },
        { text: "Chờ thanh toán", value: "Chờ thanh toán" },
        { text: "Đã thanh toán", value: "Đã thanh toán" },
        { text: "Đã hủy", value: "Đã hủy" },
        { text: "Hoàn tất", value: "Hoàn tất" },
      ],
      onFilter: (value, record) => record.Status.indexOf(value) === 0,
    },

    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <span>
          <Tooltip title="Xác nhận đơn hàng">
            <CheckCircleOutlined
              style={{ marginRight: "8px", fontSize: "24px", color: "green" }}
              onClick={() => confirmBooking(record)}
            />
          </Tooltip>
          <Tooltip title="Hủy">
            <CloseCircleOutlined
              style={{ marginRight: "8px", fontSize: "24px", color: "red" }}
              onClick={() => CancelBooking(record)}
            />
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <EyeOutlined
              onClick={() => {
                setVisible(true);
                setDetailBooking(record);
              }}
              style={{ fontSize: "24px", color: "#45B1E8" }}
            />
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            // setVisible(true);
            // setIsAdd(true);
            // form.resetFields();
          }}
        >
          Thêm mới
        </Button>
        {/* <Select
          placeholder="Chọn thuyền"
          showSearch
          filterOption={(inputValue, option) =>
            option.children.toLowerCase().includes(inputValue.toLowerCase())
          }
          style={{ width: 200 }}
        >
          {dataBoat.map((boat) => (
            <Select.Option key={boat.ID} value={boat.ID}>
              {boat.Name}
            </Select.Option>
          ))}
        </Select> */}
      </div>
      <Table columns={columns} dataSource={filteredData} />
      <DialogDetail
        visible={visible}
        setVisible={setVisible}
        form={form}
        loadData={loadData}
        Arr_Room={Arr_Room}
      />
    </>
  );
};

export default Booking;
