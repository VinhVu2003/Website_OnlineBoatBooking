import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  notification,
  Col,
  Row,
} from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { connectSocket } from "../../../utils/socketService";

import moment from "moment"; // Thêm dòng này để import moment
import {
  API_CreateBooking,
  API_getAllBookingbyBoatID,
} from "../../../api/user/booking";
import { sendEmail_Booking } from "../../../utils/sendGmail/sendGmail_Booking";
const { TextArea } = Input;
const { Option } = Select;

const BookingDialog = ({
  visible,
  setVisible,
  showModal,
  dataBoat,
  isFullBoat,
  totalPrice,
  dataInputRoom,
  setTotalPrice,
  formArrRoom,
  setSelectedRooms,
}) => {
  const navigate = useNavigate(); // Khởi tạo navigate

  const [form] = Form.useForm(); // Tạo form instance trong component con
  const [bookedDates, setBookedDates] = useState([]); // Thêm state để lưu trữ các ngày đã đặt
  const [inputDate, setInputDate] = useState(null); // Thêm state để lưu trữ ngày đầu vào
  
  const handleSubmit = async () => {
    try {
      // console.log("values", values);
      // console.log("dataInputRoom", dataInputRoom);
      if (isFullBoat) {
        createBookingIsFullBoat();
      } else {
        if (dataInputRoom.length === 0) {
          alert("Vui lòng chọn phòng");
          return;
        }
        createBookingRoom();
      }
    } catch (error) {
      alert("Vui lòng điền đầy đủ thông tin"); // Thông báo cho người dùng về lỗi
    }
  };

  //Hàm load những ngày của thuyền bị đặt trc rồi
  const LoadDateisBook = async () => {
    const bookedDates = [];
    //getall booking để lấy những ngày đã bị đặt trước
    // console.log(dataBoat?.ID)
    const response = await API_getAllBookingbyBoatID(dataBoat?.ID);
    // console.log(response.data)
    response.data.forEach((booking) => {
      const checkInDate = moment(booking.CheckInDate).startOf("day");
      const checkOutDate = moment(booking.CheckOutDate).startOf("day");

      // Tạo mảng các ngày trong khoảng từ checkIn đến checkOut (bao gồm cả checkOut)
      for (
        let date = checkInDate;
        date.isBefore(checkOutDate) || date.isSame(checkOutDate);
        date.add(1, "days")
      ) {
        bookedDates.push(date.clone()); // Thêm ngày vào mảng
      }
    });
    // Thêm các ngày từ Str_Date đến Ed_Date vào bookedDates
    const strDate = moment(dataBoat?.Str_Date).startOf("day");
    const edDate = moment(dataBoat?.Ed_Date).startOf("day");
    for (
      let date = strDate.clone();
      date.isSameOrBefore(edDate);
      date.add(1, "days")
    ) {
      bookedDates.push(date.clone());
    }
    setBookedDates(bookedDates);
  };
  useEffect(() => {
    if (isFullBoat) {
      // console.log(dataBoat?.Full_Price);
      setTotalPrice(dataBoat?.Full_Price);
      formArrRoom.resetFields();
      LoadDateisBook(dataBoat);
    }
  }, [visible]);

  useEffect(() => {
    const socket = connectSocket(); // Kết nối socket

    socket.on("boatBooked", (message) => {
      // console.log(message);
      LoadDateisBook(); // Gọi lại hàm LoadDateisBook khi nhận được sự kiện boatBooked
    });

    return () => {
      socket.disconnect(); // Dọn dẹp kết nối socket khi component unmount
    };
  }, [dataBoat]); // Thêm dataBoat vào dependency array

  const handleCancel = () => {
    if (isFullBoat) {
      // Xử lý logic khi isFullBoat là true
      // console.log("Modal hủy khi là Full Boat");
      // Có thể thêm các hành động khác nếu cần
      setSelectedRooms([]);
    } else {
      // console.log("Modal hủy khi là không Full Boat");
    }
    setVisible(false);
  };

  const createBookingRoom = async () => {
    let values;
    try {
      values = await form.validateFields();
    } catch (error) {
      Modal.error({
        title: "Lỗi",
        content: "Vui lòng điền đầy đủ thông tin",
      });
      return;
    }
    // console.log("values", values);
    // console.log("DataBoat", dataBoat);
    // console.log("dataInputRoom", dataInputRoom);
    // Chuyển đổi dataInputRoom sang định dạng yêu cầu cho bookingDetails
    const bookingDetails = dataInputRoom.map((room) => ({
      roomId: room.ID, // Giả sử ID tương ứng với roomId
      gia: room.OriginalPrice, // Giả sử Price là trường cho giá
    }));
    const dataInput = {
      customer: {
        name: values.name,
        sex: values.gender,
        address: values.address,
        phone: values.phone,
        email: values.email,
        accountId: null,
      },
      booking: {
        boatId: dataBoat?.ID,
        checkInDate: dataBoat?.Str_Date, // Chỉ lấy ngày
        checkOutDate: dataBoat?.Ed_Date, // Chỉ lấy ngày
        bookingMethod: "Online",
        totalPrice: totalPrice,
        status: "Đã tạo",
        isFullBoat: false,
      },
      bookingDetails: bookingDetails,
    };
    const inputSendEmail =
      "Tên thuyền: " +
      dataBoat.Name +
      "\n" +
      "Ngày nhận thuyền: " +
      dataBoat?.Str_Date +
      "\n" +
      "Ngày trả: " +
      dataBoat?.Ed_Date +
      "\n" +
      "Loại hình: Thuê trọn tàu" +
      "\n" +
      "Thời gian đặt: " +
      moment().format("YYYY-MM-DD HH:mm:ss") +
      "\n" +
      "Tổng tiền: " +
      totalPrice?.toLocaleString() +
      "\n" +
      "Danh sách phòng: " +
      "\n" +
      dataInputRoom
        .map(
          (room) =>
            `\t${room.RoomName} - Giá: ${room.OriginalPrice?.toLocaleString()} đ`
        )
        .join("\n")+"\n"+
      "Link lịch trình chi tiết: "+"\n"+"\t"+
      dataBoat?.Detail

    // console.log(inputSendEmail);
    // console.log("dataInputRoom", dataInputRoom);
    // console.log(dataInput)

    try {
      await API_CreateBooking(dataInput);
      Modal.success({
        title: "Đặt phòng thành công",
        content: "Đặt phòng thành công",
        onOk() {
          window.location.href = "/user/home";
        },
      });
    } catch (error) {
      // console.log("error", error);
      Modal.error({
        title: "Lỗi",
        content: "Khoảng thời gian này đã có người đặt",
      });
    }
    try {
      await sendEmail_Booking(values.email, values.name, inputSendEmail);
      navigate("/user/home"); // Sử dụng navigate để chuyển hướng
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Email không đúng. Gửi thất. Hãy kiểm tra lại",
      });
    }
  };

  const createBookingIsFullBoat = async () => {
    let values;
    try {
      values = await form.validateFields();
      // console.log("values", values);
      setInputDate(values?.date);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng kiểm tra lại",
      });
      return;
    }
    if (values) {
      console.log("values", values.date);
      if (isDateRangeBooked(values.date)) return;
    }
    const dataInput = {
      customer: {
        name: values.name,
        sex: values.gender,
        address: values.address,
        phone: values.phone,
        email: values.email,
        accountId: null,
      },
      booking: {
        boatId: dataBoat?.ID,
        checkInDate: values.date.format("YYYY-MM-DD"), // Chỉ lấy ngày
        checkOutDate: values.date.add(2, "days").format("YYYY-MM-DD"), // Chỉ lấy ngày
        bookingMethod: "Online",
        totalPrice: totalPrice,
        status: "Đã tạo",
        isFullBoat: true,
      },
      bookingDetails: [],
    };
    const inputSendEmail =
      "Tên thuyền: " +
      dataBoat.Name +
      "\n" +
      "Ngày nhận thuyền: " +
      values.date.format("YYYY-MM-DD") +
      "\n" +
      "Ngày trả: " +
      values.date.add(3, "days").format("YYYY-MM-DD") +
      "\n" +
      "Loại hình: Thuê trọn tàu" +
      "\n" +
      "Thời gian đặt: " +
      moment().format("YYYY-MM-DD HH:mm:ss") +
      "\n" +
      "Tổng tiền: " +
      totalPrice;
    // console.log(inputSendEmail)
    try {
      await API_CreateBooking(dataInput);
      Modal.success({
        title: "Đặt thuyền thành công",
        content: "Đặt thuyền thành công",
      });
    } catch (error) {
      Modal.error({
        title: "Lỗi",
        content:
          "Khoảng thời gian này đã có người vui lòng chọn ngày phù hợp với lịch trình của thuyền " +
          dataBoat?.Duration,
      });
    }
    try {
      await sendEmail_Booking(values.email, values.name, inputSendEmail);
      // Chuyển hướng sau khi gửi email thành công
      navigate("/user/home"); // Sử dụng navigate để chuyển hướng
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Email không đúng. Gửi thất bại",
      });
    }
    
  };

  const isDateRangeBooked = (a) => {
    //ngày tạo mới
    const checkInDate = a; // Chuyển giá trị đầu vào thành đối tượng moment
    console.log("checkInDate:", checkInDate.format("YYYY-MM-DD")); // Kiểm tra giá trị của checkInDate

    const startDate = checkInDate.clone(); // Tạo startDate bằng cách sao chép checkInDate
    const endDate = startDate.clone().add(2, "days"); // Tính toán checkOutDate bằng cách cộng thêm 2 ngày

    console.log("startDate:", startDate.format("YYYY-MM-DD")); // Kiểm tra giá trị của startDate
    console.log("endDate:", endDate.format("YYYY-MM-DD")); // Kiểm tra giá trị của endDate

    //ngày cũ có trong lịch trình
    const oldDate = moment(dataBoat?.Str_Date);
    const oldEndDate = moment(dataBoat?.Ed_Date);
    console.log("oldDate", oldDate.format("YYYY-MM-DD"));
    console.log("oldEndDate", oldEndDate.format("YYYY-MM-DD"));

    // Kiểm tra xem 2 khoảng ngày có trùng nhau không
    const isOverlap =
      startDate.isBefore(oldEndDate) && endDate.isAfter(oldDate);
    console.log("Các khoảng ngày có trùng nhau?", isOverlap);

    if (isOverlap) {
      notification.error({
        message: "Lỗi",
        description:
          "Khoảng thời gian này trùng với lịch trình cố định của thuyền",
      });
    }
    return isOverlap;
  };
  return (
    <>
      <Modal
        title={isFullBoat ? "Thuê trọn tàu" : "Đặt phòng"}
        visible={visible}
        style={{ top: 50 }} // Thêm thuộc tính style để điều chỉnh vị trí
        // onOk={handleSubmit}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Đăng ký tư vấn
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Đặt ngay
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          {!isFullBoat && (
            <div>
              <h6>Lịch trình: {dataBoat?.Schedule}</h6>
              <h6>
                Thời gian: Từ{" "}
                {new Date(dataBoat?.Str_Date).toLocaleDateString()}-{" "}
                {new Date(dataBoat?.Ed_Date).toLocaleDateString()}
              </h6>
            </div>
          )}
          {isFullBoat && (
            <Form.Item
              label="Ngày nhận phòng"
              name="date"
              rules={[{ required: true }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) => {
                  // Vô hiệu hóa các ngày hiện tại trở về trước hoặc các ngày đã đặt
                  return (
                    current &&
                    (current <= moment().startOf("day") || // Vô hiệu hóa các ngày từ hôm nay trở về trước
                      bookedDates.some(
                        (date) =>
                          current.isSame(moment(date, "YYYY-MM-DD"), "day") // Vô hiệu hóa các ngày trong bookedDates
                      ))
                  );
                }}
              />
            </Form.Item>
          )}
          {/* <Form.Item
            label={`Số lượng người (Tối đa ${dataBoat?.Cabin_Count * 2})`}
            name="quantity"
            rules={[{ required: true }]}
          >
            <InputNumber
              min={1}
              max={dataBoat?.Cabin_Count * 2}
              placeholder="Nhập số lượng"
              style={{ width: "100%" }}
            />
          </Form.Item> */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[{ required: true, message: "Nhập họ và tên" }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: "Chọn giới tính" }]}
              >
                <Select placeholder="Chọn giới tính">
                  <Option value="Nam">Nam</Option>
                  <Option value="Nữ">Nữ</Option>
                  <Option value="Khác">Khác</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Nhập địa chỉ" }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Nhập số điện thoại" }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            label="Địa chỉ email"
            name="email"
            rules={[{ required: true, message: "Nhập email" }]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          {/* <Form.Item label="Yêu cầu của bạn" name="requests">
            <TextArea placeholder="Nhập yêu cầu của bạn" />
          </Form.Item> */}
          <div style={{ marginTop: 20 }}>
            <span>Tổng tiền: </span>
            <span>{totalPrice?.toLocaleString()} đ</span>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default BookingDialog;
