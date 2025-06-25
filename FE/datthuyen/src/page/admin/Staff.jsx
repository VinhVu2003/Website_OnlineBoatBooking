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
  Popconfirm,
  Tooltip,
} from "antd"; // Import đầy đủ các thành phần
import axios from "axios";
import {
  fetchStaffData,
  APIaddStaff,
  APIdeleteStaff,
  APIupdateStaff,
} from "../../api/staffAPI";
import { SettingOutlined, CloseCircleOutlined } from "@ant-design/icons"; // Added missing imports

const Staff = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Khởi tạo false mặc định cho openModal
  const [isAdd, setIsAdd] = useState(true); // Khởi tạo true mặc định cho isAdd
  const [form] = Form.useForm();
  // Tải dữ liệu từ API
  const loadData = async () => {
    try {
      const response = await fetchStaffData();
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  // Hàm xử lý sửa
  const handleEdit = (record) => {
    console.log("Editing record:", record); // In ra thông tin bản ghi khi nhấn sửa
    setOpenModal(true);
    setIsAdd(false);
    form.setFieldsValue(record);
    // Xử lý logic sửa ở đây
  };

  async function onFinish(values) {
    if (isAdd) {
      // console.log(values)
      const newStaff = {
        Name: values.Name,
        Sex: values.Sex,
        Email: values.Email,
        Phone: values.Phone,
        Address: values.Address,
        Position: values.Position,
      };
      try {
        // Gọi hàm addStaff để gửi dữ liệu nhân viên mới
        const response = await APIaddStaff(newStaff);
        notification.success({
          message: "Thành công",
          description: "Thêm nhân viên thành công!",
        });
        loadData();
        form.resetFields();
        setOpenModal(false);
      } catch (error) {
        console.error("Error adding staff:", error);
        // Hiển thị thông báo lỗi nếu cần
        notification.error({
          message: "Lỗi",
          description: "Lỗi khi thêm nhân viên. Vui lòng thử lại!",
        });
      }
    } else {
      // console.log(values)
      try {
        await APIupdateStaff(values.ID, values);
        notification.success({
          message: "Thành công",
          description: "Sửa nhân viên thành công!",
        });
        loadData();
        setOpenModal(false);
      } catch (error) {
        console.error("Lỗi", error);
      }
    }
  }
  function addStaff() {
    setOpenModal(true);
    setIsAdd(true);
  }
  // Hàm xử lý xóa
  const handleDelete = async (key) => {
    const hoixoa = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (hoixoa) {
      // console.log(key.ID)
      try {
        await APIdeleteStaff(key.ID); // Gọi hàm xóa từ API
        notification.success({
          message: "Thành công",
          description: "Xóa nhân viên thành công!",
        });
        loadData();
      } catch (error) {
        notification.success({
          message: "Thành công",
          description: "Xóa nhân viên thành công!",
        });
      }
    }
  };

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
      title: "Giới tính",
      dataIndex: "Sex",
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
              onClick={() => handleEdit(record)}
              style={{ marginRight: "8px", fontSize: "24px", color: "green" }}
            />
          </Tooltip>

          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            okText="Có"
            cancelText="Không"
            onConfirm={() => handleDelete(record)}
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
      <Button
        type="primary"
        style={{ marginBottom: "10px" }}
        onClick={() => addStaff()}
      >
        Thêm mới
      </Button>
      <Table columns={columns} dataSource={data} />

      <Modal
        title={isAdd ? "Thêm nhân viên " : "Sửa nhân viên"}
        open={openModal}
        okText="Lưu"
        onCancel={() => {
          form.resetFields();
          setOpenModal(false);
        }}
        onOk={() => {
          form.submit();
        }}
        cancelText="Hủy"
      >
        <Form
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name={"ID"}
            initialValue={0}
            hidden={true}
            label="Mã nhân viên"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={"Name"}
            label="Tên"
            rules={[{ required: true, message: "Không để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={"Sex"} label="Giới tính">
            <Radio.Group>
              <Radio value="Nam">Nam</Radio>
              <br />
              <Radio value="Nữ">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name={"Email"}
            label="Email"
            rules={[
              {
                required: true,
                message: "Không để trống",
              },
              {
                type: "email",
                message: "Email không hợp lệ",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"Phone"}
            label="Số điện thoại"
            rules={[
              {
                required: true,
                pattern: /^[0-9]+$/,
                message: "Chỉ được nhập số",
              },
              { max: 10, message: "Số nhập vào không được vượt quá 10 chữ số" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"Address"}
            label="Địa chỉ"
            rules={[{ required: true, message: "Không để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"Position"}
            label="Chức vụ"
            rules={[{ required: true, message: "Không để trống" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Staff;
