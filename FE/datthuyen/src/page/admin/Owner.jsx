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
  Tooltip,
  Popconfirm,
} from "antd"; // Import đầy đủ các thành phần
import axios from "axios";
import {
  GetAllOwner,
  APIaddStaff,
  APIdeleteStaff,
  APIupdateStaff,
} from "../../api/owner";
import { SettingOutlined, CloseCircleOutlined } from "@ant-design/icons"; // Added missing imports

const Owner = function () {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await GetAllOwner();
      console.log(response);
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1, // Hiển thị số thứ tự cho từng hàng
    },
    {
      title: "Tên",
      dataIndex: "Name",
    },
    {
      title: "Email",
      dataIndex: "Email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "Phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "Address",
    },
    {
      title: "Action",
      key: "action",
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

  return (
    <>
      <Button type="primary" style={{ marginBottom: "10px" }}>
        Thêm mới
      </Button>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Owner;
