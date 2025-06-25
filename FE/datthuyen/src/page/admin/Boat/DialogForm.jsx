import { Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { GetAllLocation } from "../../../api/location";
import { GetAllOwner } from "../../../api/owner";
import { uploadFiles, uploadFiles_Boat } from "../../../api/upload";
import { API_addBoat, API_UpdateBoat } from "../../../api/boat";
import { imageURLBoat } from "../../../url/url_IMG";

const DialogForm = ({
  visible,
  setVisible,
  isAdd,
  setIsAdd,
  form,
  loadData,
  boatID,
}) => {
  const [ArrLocation, setArrLocation] = useState([]);
  const [ArrOwner, setArrOwner] = useState([]);

  const [fileList, setFileList] = useState([]); // Added fileList state

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    // Handle preview if needed
  };

  const beforeUpload = (file) => {
    // Kiểm tra xem file đã tồn tại trong fileList chưa
    const isDuplicate = fileList.some(
      (existingFile) => existingFile.name === file.name
    );
    if (isDuplicate) {
      // Nếu file đã tồn tại, không cho phép upload
      Modal.error({
        title: "Lỗi",
        content: "Ảnh đã tồn tại trong danh sách!",
      });
      setFileList([])
      return false; // Ngăn chặn upload
    }
    return false; // Cho phép upload
  };
  useEffect(() => {
    if (!isAdd && boatID) {
      // Check if it's not adding a new boat and record is available
      console.log(boatID);
      form.setFieldsValue(boatID);
      const otherInfo = boatID.OtherInfo;
      const year = otherInfo.match(/\d+/);
      form.setFieldsValue({ HaThuy: year ? year[0] : "" }); //tìm tất cả các nhóm ký tự số liên tiếp trong chuỗi.
      form.setFieldsValue({ TauVo: otherInfo.split("vỏ").pop().trim() });

      if (boatID?.IMG) {
        // Chia chuỗi IMG thành mảng các tên ảnh
        const imgArray = boatID.IMG.split(",");
        // Tạo mảng fileListArray từ mảng imgArray, mỗi phần tử là một đối tượng có tên và URL của ảnh
        const fileListArray = imgArray.map((img) => ({
          name: img,
          url: imageURLBoat + img,
        }));
        // Cập nhật fileList với fileListArray mới tạo
        setFileList(fileListArray); // Cập nhật fileList từ IMG
      }
    }
    if (isAdd) {
      setFileList([]);
      form.resetFields();
    }
  }, [boatID, visible]);
  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const loadDataLocation = async () => {
    try {
      const response = await GetAllLocation();
      console.log(response);
      setArrLocation(response);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };
  const loadDataOwner = async () => {
    try {
      const response = await GetAllOwner();
      console.log(response);
      setArrOwner(response);
    } catch (error) {
      console.error("Error fetching owner data:", error);
    }
  };
  useEffect(() => {
    loadDataLocation();
    loadDataOwner();
  }, []);

  const handleOk = () => {
    handleUpload();
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const createBoat = async () => {
    let IMGName = [];
    try {
      const response = await uploadFiles(fileList); // Gọi hàm uploadFiles với fileList
      console.log("Tải lên thành công:", response.fileNames);
      IMGName = response.fileNames;
    } catch (error) {
      console.error("Lỗi khi tải lên:", error);
      return; // Dừng lại nếu có lỗi tải lên
    }
    const formValues = form.getFieldsValue();
    const input = {
      LocationId: formValues.LocationId,
      Owner_ID: formValues.Owner_ID,
      Name: formValues.Name,
      IMG: IMGName.join(","), // Chuyển kiểu dữ liệu IMG từ mảng sang danh sách giá trị
      Full_Price: formValues.Full_Price,
      Cabin_Count: formValues.Cabin_Count,
      OtherInfo: "Hạ thủy " + formValues.HaThuy + ".Tàu vỏ " + formValues.TauVo,
      Status: "Chưa khởi hành",
    };
    try {
      const response = await API_addBoat(input); // Gọi hàm addBoat với input
      Modal.success({
        title: "Thêm thuyền thành công",
        content: "Thuyền đã được thêm vào hệ thống thành công.",
      });
      loadData();
      form.resetFields();
      setVisible(false);
    } catch (error) {
      Modal.error({
        title: "Lỗi khi thêm thuyền",
        content: error.message,
      });
    }
  };

  const updateBoat = async () => {
    let IMGName = [];
    const oldIMGName = boatID?.IMG; // Lưu tên ảnh cũ
    const oldIMGArray =
      typeof oldIMGName === "string" ? oldIMGName.split(",") : []; // Chuyển đổi tên ảnh cũ thành mảng
    // Lọc ra những ảnh mới
    const newFiles = Array.isArray(fileList)
      ? fileList.filter((file) => !oldIMGArray.includes(file.name))
      : [];
    // console.log("newFiles:", newFiles);
    //gọi hàm uploadFiles_Introduce để upload ảnh mới
    if (newFiles.length > 0) {
      const response = await uploadFiles_Boat(newFiles);
      IMGName = response.fileNames;
    }
    // console.log("IMGName:", IMGName);
    // Kiểm tra những ảnh cũ còn lại
    const remainingOldImages = oldIMGArray.filter((img) =>
      fileList.some((file) => file.name === img)
    ); // Những ảnh cũ còn lại
    // console.log("Remaining Old Images:", remainingOldImages);
    // Ghép nối ảnh cũ còn lại với ảnh mới
    const IMGInput = [...remainingOldImages, ...IMGName].join(",");// Chuyển kiểu dữ liệu IMG từ mảng sang danh sách giá trị
    // console.log("IMGInput:", IMGInput);

    try {
      const formValues = form.getFieldsValue();
      const input = {
        ID: boatID?.ID,
        LocationId: formValues.LocationId,
        Owner_ID: formValues.Owner_ID,
        Name: formValues.Name,
        IMG: IMGInput, 
        Full_Price: formValues.Full_Price,
        Cabin_Count: formValues.Cabin_Count,
        OtherInfo: "Hạ thủy " + formValues.HaThuy + ".Tàu vỏ " + formValues.TauVo,
        Status: "Chưa khởi hành",
      };
      const response = await API_UpdateBoat(input);
      Modal.success({
        title: "Cập nhật thuyền thành công",
        content: "Thuyền đã được cập nhật thành công.",
      });
      loadData();
      form.resetFields();
      setVisible(false);
      console.log("input", input);
    } catch (error) {
      Modal.error({
        title: "Lỗi khi cập nhật thuyền",
        content: error.message,
      });
    }
  };


  const handleUpload = async (e) => {
    if (e) {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    }
    if (isAdd) {
      createBoat(); // Call createBoat without passing e
    } else {
      updateBoat();
    }
  };
  // ... mã hiện có ...
  return (
    <>
      <Modal
        title={isAdd ? "Thêm mới thuyền" : "Cập nhật thông tin thuyền"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: "40px" }}
      >
        <Form form={form} layout="vertical">
          {/* Using Form */}
          <Form.Item
            name="LocationId"
            label="Địa điểm"
            rules={[{ required: true, message: "Vui lòng nhập địa điểm!" }]}
          >
            <Select placeholder="Địa điểm">
              {ArrLocation.map((location) => (
                <Select.Option key={location.ID} value={location.ID}>
                  {location.Name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="Owner_ID"
            label="Chủ sở hữu"
            rules={[{ required: true, message: "Vui lòng chọn chủ sở hữu!" }]}
          >
            <Select placeholder="Chủ sở hữu">
              {ArrOwner.map((owner) => (
                <Select.Option key={owner.ID} value={owner.ID}>
                  {owner.Name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="Name"
            label="Tên thuyền"
            rules={[{ required: true, message: "Vui lòng nhập tên thuyền!" }]}
          >
            <Input placeholder="Tên thuyền" />
          </Form.Item>
          <Form.Item
            name="Cabin_Count"
            label="Số phòng"
            rules={[{ required: true, message: "Vui lòng nhập số phòng!" }]}
          >
            <Input type="number" placeholder="Số phòng" />
          </Form.Item>
          <Form.Item
            name="Full_Price"
            label="Giá thuê trọn"
            rules={[{ required: true, message: "Vui lòng nhập!" }]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            name="HaThuy"
            label="Năm hạ thủy"
            rules={[{ required: true, message: "Vui lòng nhập!" }]}
          >
            <Select placeholder="Chọn năm hạ thủy">
              {Array.from({ length: 101 }, (_, i) => i + 1920).map((year) => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="TauVo"
            label="Chất liệu vỏ"
            rules={[{ required: true, message: "Vui lòng chọn!" }]}
          >
            <Select placeholder="Chọn chất liệu vỏ">
              <Select.Option value="Sợi">Sợi</Select.Option>
              <Select.Option value="Gỗ">Gỗ</Select.Option>
              <Select.Option value="Kim loại">Kim loại</Select.Option>
              <Select.Option value="Khác">Khác</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="IMG"
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
        </Form>
      </Modal>
    </>
  );
};

export default DialogForm;
