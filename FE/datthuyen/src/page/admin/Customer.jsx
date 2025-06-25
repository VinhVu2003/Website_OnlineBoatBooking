import React, { useEffect, useState } from 'react';
import { Button, Table, notification , message,Modal, Form, Input,Radio, Tooltip, Popconfirm } from 'antd'; // Import đầy đủ các thành phần
import axios from 'axios';
import { GetAllCustomer,APIaddStaff,APIdeleteStaff ,APIupdateStaff} from '../../api/customerAPI';
import { SettingOutlined, CloseCircleOutlined } from "@ant-design/icons"; // Added missing imports

const Customer = function () {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data); // Thêm state cho dữ liệu đã lọc

  const loadData = async () => {
    try {
      const response = await GetAllCustomer();
      // console.log("dsKH",response)
      setData(response);
      setFilteredData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render: (text, record, index) => index + 1, // Hiển thị số thứ tự cho từng hàng
    },
    {
      title: 'Tên',
      dataIndex: 'Name',
    },
    {
      title: 'Giới tính',
      dataIndex: 'Sex',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'Phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'Address',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
        {/* Nút sửa */}
        <Tooltip title="Sửa">
          <SettingOutlined
            style={{ marginRight: "8px", fontSize: "24px", color: "green" }}
          />
        </Tooltip>
        {/* Nút xóa với Popconfirm để xác nhận */}
        <Popconfirm
          title="Bạn có chắc muốn xóa?"
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
   //tìm kiếm
   const handleSearch = (value) => {
    // Lọc dữ liệu ngay lập tức khi người dùng nhập
    const filtered = data.filter(
      (item) => item.Name.toLowerCase().includes(value.toLowerCase()) // Lọc dữ liệu theo tên
    );
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

      <Button
        type="primary"
        style={{ marginBottom: "10px" }}
      >
        Thêm mới
      </Button>
      <Input.Search
          placeholder="Tìm kiếm theo tên khách hàng"
          onChange={(e) => handleSearch(e.target.value)} // Gọi hàm tìm kiếm khi người dùng nhập
          style={{ width: 200 }}
        />
      </div>
      <Table columns={columns} dataSource={filteredData} />
    </>
  );
};

export default Customer;
