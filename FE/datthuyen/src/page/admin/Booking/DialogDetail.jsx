import {
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { GetAllLocation } from "../../../api/location";
import { GetAllOwner } from "../../../api/owner";
import { uploadFiles, uploadFiles_Boat } from "../../../api/upload";
import { API_addBoat, API_UpdateBoat } from "../../../api/boat";
import { imageURLRoom } from "../../../url/url_IMG";

const DialogDetail = ({ visible, setVisible, form, Arr_Room }) => {
  const handleOk = () => {};

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const columns = [
    {
      title: "Tên phòng",
      dataIndex: "RoomName",
      key: "RoomName",
    },
    {
      title: "Ảnh",
      dataIndex: "Image",
      key: "Image",
      render: (text, record) => (
        <img
          src={`${imageURLRoom}/${record.Image.split(",")[0]}`} //tách          alt="Ảnh phòng"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "Gia",
      key: "Gia",
      render: (text) => `${text.toLocaleString()} VND`,
    },
  ];
  // ... mã hiện có ...
  return (
    <>
      <Modal
        title={<span style={{ fontSize: '25px', textAlign: 'center', display: 'block' }}>Chi tiết đơn đặt</span>}
        visible={visible}
        width={800}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{
          top: "40px",
          // maxHeight: "700px",
        }}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="ID"
                label="Mã"
                rules={[{ required: true, message: "Vui lòng nhập mã!" }]}
              >
                <Input placeholder="Mã" readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="CustomerName"
                label="Khách hàng"
                rules={[
                  { required: true, message: "Vui lòng nhập tên khách hàng!" },
                ]}
              >
                <Input placeholder="Tên khách hàng" readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="BoatName"
                label="Tên thuyền"
                rules={[
                  { required: true, message: "Vui lòng nhập tên thuyền!" },
                ]}
              >
                <Input placeholder="Tên thuyền" readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Status"
                label="Trạng thái"
                rules={[
                  { required: true, message: "Vui lòng chọn trạng thái!" },
                ]}
              >
                <Input placeholder="Trạng thái" readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="BookingDate"
                label="Ngày đặt"
                rules={[{ required: true, message: "Vui lòng chọn ngày đặt!" }]}
              >
                <Input placeholder="Ngày đặt" readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Total_Price"
                label="Tổng giá"
                rules={[{ required: true, message: "Vui lòng nhập tổng giá!" }]}
              >
                <Input placeholder="Tổng giá" readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="IsFullBoat"
                label="Loại hình"
                rules={[
                  { required: true, message: "Vui lòng chọn loại hình!" },
                ]}
              >
                <Input placeholder="Loại hình" readOnly />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div style={{ marginTop: 20 }}>
          {/* <h6>Danh sách phòng</h6> */}
          <Table columns={columns} dataSource={Arr_Room} />
        </div>
      </Modal>
    </>
  );
};

export default DialogDetail;
