import {
  Form,
  Modal,
  Input,
  InputNumber,
  Upload,
  Select,
  Row,
  Col,
} from "antd";
import { useEffect, useState } from "react";
import { addRoomAndPrice, updateRoomAndPrice } from "../../../api/room";
import { uploadFiles, uploadFiles_Room } from "../../../api/upload";
import { imageURLRoom } from "../../../url/url_IMG";

const DialogForm = ({
  visible,
  setVisible,
  isAdd,
  setIsAdd,
  form,
  loadData,
  dataBoat,
  room,
}) => {
  //nút Lưu
  const handleOk = async (event) => {
    if (event) {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    }
    if (isAdd) {
      createRoom();
    } else {
      updateRoom();
    }
  };
  //hàm upload ảnh
  const uploadImage = async () => {
    let uploadedImageName = "";
    if (fileList.length > 0) {
      try {
        const response = await uploadFiles_Room(fileList); // Assuming uploadFiles is a function to handle file uploads
        uploadedImageName = response.fileNames.join(","); // Assuming response.fileNames is an array of uploaded file names
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    return uploadedImageName;
  };

  const createRoom = async () => {
    form
      .validateFields() //xác thực các trường trong một form.
      .then(async (values) => {
        const IMG = await uploadImage();
        //   console.log("tenanh",IMG);
        const inputAddRoom = { ...values, Image: IMG };
        console.log("inputAddRoom", inputAddRoom);
        try {
          const response = await addRoomAndPrice(inputAddRoom);
          console.log(response);
          // Assuming setVisible is a function to close the modal
          Modal.success({
            title: "Thành công",
            content: "Phòng đã được thêm thành công!",
          });
          form.resetFields();
          setVisible(false);
          // Assuming loadData is a function to refresh the data
          loadData();
        } catch (error) {
          console.error("Error adding room and price:", error);
        }
        // Cập nhật state hoặc thực hiện hành động khác sau khi upload thành công
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const updateRoom = async () => {
    let IMGName = [];
    const oldIMGName = room?.Image; // Lưu tên ảnh cũ
    const oldIMGArray =
      typeof oldIMGName === "string" ? oldIMGName.split(",") : []; // Chuyển đổi tên ảnh cũ thành mảng
    // Lọc ra những ảnh mới
    const newFiles = Array.isArray(fileList)
      ? fileList.filter((file) => !oldIMGArray.includes(file.name))
      : [];
    // console.log("newFiles:", newFiles);
    //gọi hàm uploadFiles_Introduce để upload ảnh mới
    if (newFiles.length > 0) {
      const response = await uploadFiles_Room(newFiles);
      IMGName = response.fileNames;
    }
    // console.log("IMGName:", IMGName);
    // Kiểm tra những ảnh cũ còn lại
    const remainingOldImages = oldIMGArray.filter((img) =>
      fileList.some((file) => file.name === img)
    ); // Những ảnh cũ còn lại
    // console.log("Remaining Old Images:", remainingOldImages);
    // Ghép nối ảnh cũ còn lại với ảnh mới
    const IMGInput = [...remainingOldImages, ...IMGName].join(","); // Chuyển kiểu dữ liệu IMG từ mảng sang danh sách giá trị
    // console.log("IMGInput:", IMGInput);
    const formValues = form.getFieldsValue();
    const roomUpdate = { ...formValues, Image: IMGInput };
    console.log("roomUpdate:", roomUpdate);
    try {
      const response = await updateRoomAndPrice(room?.ID, roomUpdate);
      console.log(response);
      Modal.success({
        title: "Thành công",
        content: "Phòng đã được cập nhật thành công!",
      });
      form.resetFields();
      setVisible(false);
      loadData();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setFileList([])
    // console.log("fileList",fileList)
  };
  useEffect(() => {
    if (room?.Image) {
      // Chia chuỗi IMG thành mảng các tên ảnh
      const imgArray = room.Image.split(",");
      // Tạo mảng fileListArray từ mảng imgArray, mỗi phần tử là một đối tượng có tên và URL của ảnh
      const fileListArray = imgArray.map((img) => ({
        name: img,
        url: imageURLRoom + img,
      }));
      setFileList(fileListArray); // Cập nhật fileList từ IMG
    }
    
  }, [room]);
  // Define fileList, handlePreview, handleChange, beforeUpload, and uploadButton
  const [fileList, setFileList] = useState([]); // Added fileList state

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    // Handle preview if needed
  };

  const beforeUpload = (file) => {
    return false; // Return false to prevent auto upload
  };
  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal
      title={isAdd ? "Thêm mới phòng" : "Cập nhật thông tin phòng"}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      style={{ top: "40px" }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="BoatID"
          label="Thuyền"
          rules={[{ required: true, message: "Vui lòng chọn ID thuyền!" }]}
        >
          <Select
            placeholder="Chọn thuyền"
            showSearch
            filterOption={(inputValue, option) =>
              option.children.toLowerCase().includes(inputValue.toLowerCase())
            }
          >
            {dataBoat.map((boat) => (
              <Select.Option key={boat.ID} value={boat.ID}>
                {boat.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="RoomName"
          label="Tên phòng"
          rules={[{ required: true, message: "Vui lòng nhập tên phòng!" }]}
        >
          <Input placeholder="Tên phòng" />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              name="PeopleCount"
              label="Số người tối đa"
              rules={[
                { required: true, message: "Vui lòng nhập số người tối đa!" },
              ]}
            >
              <InputNumber
                placeholder="Số người tối đa"
                style={{ width: "90%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Size"
              label="Kích thước"
              rules={[{ required: true, message: "Vui lòng nhập kích thước!" }]}
            >
              <Input placeholder="Kích thước" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="OriginalPrice"
              label="Giá gốc"
              rules={[{ required: true, message: "Vui lòng nhập giá gốc!" }]}
            >
              <InputNumber placeholder="Giá gốc" style={{ width: "90%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Status"
              label="Trạng thái"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
            >
              <Select placeholder="Chọn trạng thái">
                <Select.Option value="Trống">Đang trống</Select.Option>
                <Select.Option value="Đã đặt">Đã đặt</Select.Option>
                <Select.Option value="Đặt cọc">Đặt cọc</Select.Option>
                <Select.Option value="Hủy đặt">Hủy đặt</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="Quantity"
              label="Số lượng"
              rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
              initialValue={1}
              hidden
            >
              <InputNumber
                placeholder="Số lượng"
                style={{ width: "90%" }}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Image"
              label="Ảnh"
              rules={[{ required: true, message: "Vui lòng chọn ảnh!" }]}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default DialogForm;
