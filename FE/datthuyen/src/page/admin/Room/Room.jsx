import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  notification,
  message,
  Modal,
  Form,
  Input,
  Radio,
  Row,
  Col,
  Select,
  Popconfirm,
  Tooltip,
} from "antd"; 
import { CloseCircleOutlined,SettingOutlined } from "@ant-design/icons"; // Import CloseCircleOutlined icon

import {
  getallRoom,
  APIaddStaff,
  APIdeleteStaff,
  APIupdateStaff,
  deleteRoom,
} from "../../../api/room";
import { getallBoatUser } from "../../../api/boat";
import DialogForm from "./DialogForm";
import { imageURLRoom } from "../../../url/url_IMG";
const Room = function () {
  
  const [data, setData] = useState([]);
  const [dataBoat, setDataBoat] = useState([]);
  const [form] = Form.useForm(); // Khởi tạo form
  const [visible, setVisible] = useState(false); // Khởi tạo visible
  const [isAdd, setIsAdd] = useState(true); // Khởi tạo isAdd
  const [filteredData, setFilteredData] = useState([]); // Thêm state cho dữ liệu đã lọc
  const [room, setRoom] = useState(null); // Thêm state cho 1 phòng đểntruyền sang dialogform

  const loadData = async () => {
    try {
      const response = await getallRoom();
      console.log("dsphong", response);
      setData(response);
      setFilteredData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const loadDataBoat = async () => {
    try {
      const response = await getallBoatUser();
      setDataBoat(response);
      // console.log("dsboat", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    loadData();
    loadDataBoat();
  }, []);

  //hàm xóa
  const handleDelete = async (record) => {
    console.log("record", record);
    try {
      await deleteRoom(record.ID);

      Modal.success({
        title: "Thành công",
        content: "Phòng đã được xóa thành công!",
      });
      loadData(); // Tải lại dữ liệu sau khi xóa
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  //cấu hình cột
  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1, // Hiển thị số thứ tự cho từng hàng
    },
    {
      title: "Tên Thuyền",
      dataIndex: "BoatID",
      render: (text) =>
        dataBoat.find((boat) => boat.ID === text)?.Name || "Không có",
      filters: dataBoat.map((boat) => ({ text: boat.Name, value: boat.ID })), // Sử dụng dữ liệu thuyền từ API
      onFilter: (value, record) => record.BoatID === value, // Hàm lọc
    },
    {
      title: "Tên Phòng",
      dataIndex: "RoomName",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Tìm kiếm tên phòng"
            value={selectedKeys[0]}
            onChange={(e) => handleSearch(e.target.value)}
            onPressEnter={confirm}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
        </div>
      ),
      onFilter: (value, record) =>
        record.RoomName.toLowerCase().includes(value.toLowerCase()), // Hàm lọc
    },
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      render: (text, record) => (
        <img
          src={`${imageURLRoom}/${record.Image.split(",")[0]}`} // Lấy hình ảnh đầu tiên
          alt="Boat"
          style={{
            width: "100px",
            height: "auto",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Số người tối đa",
      dataIndex: "PeopleCount",
    },
    {
      title: "Kích thước",
      dataIndex: "Size",
    },
    // {
    //   title: "Số lượng",
    //   dataIndex: "Quantity",
    // },
    {
      title: "Giá",
      dataIndex: "OriginalPrice",
      render: (text) => text,
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      filters: [
        { text: "Trống", value: "Trống" },
        { text: "Đã đặt", value: "Đã đặt" },
        { text: "Đặt cọc", value: "Đặt cọc" },
        { text: "Hủy đặt", value: "Hủy đặt" },
      ],
      onFilter: (value, record) => record.Status.indexOf(value) === 0,
    },
    {
      title: "Action",
      key: "action",
      width: 100, // Thiết lập chiều rộng cố định cho cột
      render: (text, record) => (
        <span >
          {/* Nút sửa */}
          
          <Tooltip title="Sửa">
            <SettingOutlined
              style={{ marginRight: "8px", fontSize: "24px", color: "green" }}
              onClick={() => {
                setVisible(true);
                setIsAdd(false);
                form.setFieldsValue(record);
                setRoom(record); 
              }}
            />
          </Tooltip>
          {/* Nút xóa với Popconfirm để xác nhận */}

          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record)}
            okText="Có"
            cancelText="Không"
          >
            <Tooltip title="Xóa">
              <CloseCircleOutlined
                style={{ marginRight: "8px", fontSize: "24px", color: "red" }}
              />
            </Tooltip>
          </Popconfirm>
        </span>
      ),
    },
  ];

  //tìm kiếm tên phòng
  const handleSearch = (value) => {
    console.log("value", value);
    // Lọc dữ liệu ngay lập tức khi người dùng nhập
    const filtered = data.filter(
      (item) =>
        item.RoomName &&
        item.RoomName.toLowerCase().includes(value.toLowerCase()) // Kiểm tra RoomName không phải là undefined
    );
    console.log("filtered", filtered);
    setFilteredData(filtered); // Cập nhật trạng thái dữ liệu đã lọc
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Button type="primary" onClick={() => {
          setVisible(true);
          setIsAdd(true);
          form.resetFields();
        }}>
          Thêm mới
        </Button>

        <Select
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
        </Select>
      </div>
      <Table columns={columns} dataSource={filteredData} />

      <DialogForm
        visible={visible}
        setVisible={setVisible}
        isAdd={isAdd}
        setIsAdd={setIsAdd}
        form={form}
        loadData={loadData}
        dataBoat={dataBoat}
        room={room}
      />
    </>
  );
};

export default Room;
