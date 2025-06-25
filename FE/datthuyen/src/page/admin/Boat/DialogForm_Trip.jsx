import { Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { API_CreateTrip, API_GetTripWithBoatID, API_UpdateTrip } from "../../../api/trip";

const DialogForm_Trip = ({ visible_Trip, setVisible_Trip, boatID }) => {
  const [form] = Form.useForm(); // Khởi tạo form
  const [isAdd, setIsAdd] = useState(true);
  const [trip, setTrip] = useState([]);
  const loadTrip = async () => {
    if (boatID) {
      const trip = await API_GetTripWithBoatID(boatID?.ID);
      setTrip(trip);
      if (trip.length > 0) {
        setIsAdd(false);
        form.setFieldsValue({
          description: trip[0].Schedule,
        });
      } else {
        setIsAdd(true);
        form.resetFields();
      }
    }
  };

  useEffect(() => {
    if (boatID) {
      loadTrip();
    }
  }, [boatID]);

  const handleOk = async () => {
    // console.log("thuyền", boatID);
    form.validateFields().then(async (values) => {
      // console.log(values);
      // console.log("BoatID: ", boatID?.ID);
      // console.log("Schedule: ", values.description);
      if (isAdd) {
        await API_CreateTrip({
          BoatID: boatID?.ID,
          Schedule: values.description,
        });
        Modal.success({
          title: "Thêm mới lịch trình thành công",
          content: "Lịch trình đã được thêm vào thuyền",
          onOk: () => {
            setVisible_Trip(false);
            form.resetFields();
            loadTrip();
          },
        });
      } else {
        await API_UpdateTrip(trip[0].Id, values.description);
        Modal.success({
          title: "Cập nhật lịch trình thành công",
          content: "Lịch trình đã được cập nhật",
          onOk: () => {
            setVisible_Trip(false);
            form.resetFields();
            loadTrip();
          },
        });
      
      }
    });
  };

  const handleCancel = () => {
    setVisible_Trip(false);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title={
          <div style={{ textAlign: "center" }}>
            {isAdd ? "Thêm mới lịch trình" : "Cập nhật lịch trình"}
          </div>
        }
        visible={visible_Trip}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p
          style={{
            fontWeight: "bold",
            fontSize: "larger",
            textAlign: "center",
          }}
        >
          {boatID?.Name || "Thuyền"}
        </p>
        <Form form={form} layout="vertical">
          <Form.Item label="Mô tả chi tiết" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả chi tiết" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default DialogForm_Trip;
