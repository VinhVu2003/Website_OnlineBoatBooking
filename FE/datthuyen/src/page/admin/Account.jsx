import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  notification,
  Modal,
  Form,
  Input,
  Popconfirm,
  Tooltip,
} from "antd"; // Import đầy đủ các thành phần
import { SettingOutlined, CloseCircleOutlined } from "@ant-design/icons"; // Added missing imports
import { GetAllAccount } from "../../api/account";

const Account = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Khởi tạo false mặc định cho openModal
  const [isAdd, setIsAdd] = useState(true); // Khởi tạo true mặc định cho isAdd
  const [form] = Form.useForm();

  // Tải dữ liệu từ API
  const loadData = async () => {
    try {
      const response = await GetAllAccount();
      // console.log(response);
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
    // console.log("Editing record:", record); // In ra thông tin bản ghi khi nhấn sửa
    // setOpenModal(true);
    // setIsAdd(false);
    // form.setFieldsValue(record);
  };

  async function onFinish(values) {
    // if (isAdd) {
    //   const newAccount = {
    //     Username: values.Username,
    //     Password: values.Password,
    //     Role: values.Role,
    //     Status: values.Status,
    //   };
    //   try {
    //     await APIaddAccount(newAccount);
    //     notification.success({
    //       message: "Thành công",
    //       description: "Thêm tài khoản thành công!",
    //     });
    //     loadData();
    //     form.resetFields();
    //     setOpenModal(false);
    //   } catch (error) {
    //     console.error("Error adding account:", error);
    //     notification.error({
    //       message: "Lỗi",
    //       description: "Lỗi khi thêm tài khoản. Vui lòng thử lại!",
    //     });
    //   }
    // } else {
    //   try {
    //     await APIupdateAccount(values.ID, values);
    //     notification.success({
    //       message: "Thành công",
    //       description: "Sửa tài khoản thành công!",
    //     });
    //     loadData();
    //     setOpenModal(false);
    //   } catch (error) {
    //     console.error("Lỗi", error);
    //   }
    // }
  }

  function addAccount() {
    setOpenModal(true);
    setIsAdd(true);
  }

  // Hàm xử lý xóa
  const handleDelete = async (key) => {
    // const hoixoa = window.confirm("Bạn có chắc chắn muốn xóa không?");
    // if (hoixoa) {
    //   try {
    //     await APIdeleteAccount(key.ID); // Gọi hàm xóa từ API
    //     notification.success({
    //       message: "Thành công",
    //       description: "Xóa tài khoản thành công!",
    //     });
    //     loadData();
    //   } catch (error) {
    //     notification.error({
    //       message: "Lỗi",
    //       description: "Lỗi khi xóa tài khoản. Vui lòng thử lại!",
    //     });
    //   }
    // }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ID", // Cột ID
    },
    {
      title: "Username",
      dataIndex: "Username", // Cột Username
    },
    {
      title: "Password",
      dataIndex: "Password", // Cột Password
    },
    {
      title: "Role",
      dataIndex: "Role", // Cột Role
    },
    {
      title: "Status",
      dataIndex: "Status", // Cột Status
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
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
        onClick={() => addAccount()}
      >
        Thêm mới
      </Button>
      <Table columns={columns} dataSource={data} />

      <Modal
        title={isAdd ? "Thêm tài khoản" : "Sửa tài khoản"}
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
            label="Mã tài khoản"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={"Username"}
            label="Username"
            rules={[{ required: true, message: "Không để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"Password"}
            label="Password"
            rules={[{ required: true, message: "Không để trống!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name={"Role"}
            label="Role"
            rules={[{ required: true, message: "Không để trống!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"Status"}
            label="Status"
            rules={[{ required: true, message: "Không để trống!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Account;