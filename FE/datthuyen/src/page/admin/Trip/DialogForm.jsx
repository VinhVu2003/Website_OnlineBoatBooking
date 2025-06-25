import { DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  API_CreateTrip,
  API_GetTripWithBoatID,
  API_UpdateTrip,
} from "../../../api/trip";
import moment from "moment";

const DialogForm_Trip = ({
  visible,
  setVisible,
  dataBoat,
  loadData,
  isAdd,
  form,
}) => {
  const [trip, setTrip] = useState([]);

  const handleOk = async () => {
    if (isAdd) {
      AddTrip();
    } else {
      UpdateTrip();
    }
  };
  const AddTrip = async () => {
    const formData = form.getFieldsValue();
    // console.log(formData);
    // console.log(dataBoat?.IDinBoat);
    // console.log(formData.start_date.format('YYYY-MM-DD'))
    const startDate = formData.start_date.format("YYYY-MM-DD");
    const duration = formData.duration.split(" ")[0]; // Assuming the first part is the number of days
    const endDate = moment(startDate)
      .add(duration, "days")
      .format("YYYY-MM-DD");
    // console.log(endDate)
    try {
      const response = await API_CreateTrip({
        BoatID: dataBoat?.IDinBoat,
        Schedule: formData.schedule,
        Str_Date: startDate,
        Ed_Date: endDate,
        Duration: formData.duration,
        Detail: formData.detail,
        Dock:formData.dock
      });
      if (response) {
        Modal.success({
          title: "Thành công",
          content: "Lịch trình đã được thêm thành công!",
        });
        loadData();
        setVisible(false);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error adding new trip:", error);
      Modal.error({
        title: "Lỗi",
        content: "Không thể thêm mới lịch trình. Vui lòng thử lại.",
      });
    }
  };
  const UpdateTrip = async () => {
    const formData = form.getFieldsValue();
    // console.log(formData);
    // console.log(dataBoat.Id);
    // console.log(formData.start_date.format('YYYY-MM-DD'))
    const startDate = formData.start_date.format("YYYY-MM-DD");
    const duration = formData.duration.split(" ")[0]; // Assuming the first part is the number of days
    const endDate = moment(startDate)
      .add(duration, "days")
      .format("YYYY-MM-DD");
    // console.log(endDate)
    try {
      const response = await API_UpdateTrip(dataBoat?.Id,{
        BoatID: dataBoat?.IDinBoat,
        Schedule: formData.schedule,
        Str_Date: startDate,
        Ed_Date: endDate,
        Duration: formData.duration,
        Detail: formData.detail,
        Dock:formData.dock
      });
      if (response) {
        Modal.success({
          title: "Thành công",
          content: "Sửa lịch trình thành công!",
        });
        loadData();
        setVisible(false);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error adding new trip:", error);
      Modal.error({
        title: "Lỗi",
        content: "Không thể sửa lịch trình. Vui lòng thử lại.",
      });
    }
  };
  const handleCancel = () => {
    setVisible(false);
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
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p
          style={{
            fontWeight: "bold",
            fontSize: "larger",
            textAlign: "center",
          }}
        ></p>
        <Form form={form} layout="vertical">
          <Form.Item label="Mô tả chi tiết" name="schedule">
            <Input.TextArea rows={4} placeholder="Nhập mô tả chi tiết" />
          </Form.Item>
          <Form.Item label="Ngày bắt đầu" name="start_date">
            <DatePicker
              placeholder="Chọn ngày bắt đầu"
              style={{ width: "100%" }}
              disabledDate={(current) => {
                // Vô hiệu hóa các ngày hiện tại trở về trước hoặc các ngày đã đặt
                return (
                  current && current <= moment().startOf("day") // Vô hiệu hóa các ngày trong bookedDates
                );
              }}
            />
          </Form.Item>
          <Form.Item label="Thời gian" name="duration">
            <Select placeholder="Chọn thời gian">
              <Select.Option value="2 ngày 1 đêm">2 ngày 1 đêm</Select.Option>
              <Select.Option value="3 ngày 2 đêm">3 ngày 2 đêm</Select.Option>
              <Select.Option value="4 ngày 3 đêm">4 ngày 3 đêm</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Link lịch chi tiết" name="detail">
            <Input placeholder="Nhập link lịch chi tiết" />
          </Form.Item>
          <Form.Item label="Bến đỗ" name="dock">
            <Input placeholder="Nhập bến đỗ" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default DialogForm_Trip;
