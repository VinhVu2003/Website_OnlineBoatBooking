import { Form, Input, Modal, Upload } from "antd";
import { useState } from "react";
import { uploadFiles_Introduce } from "../../../api/upload";
import { introduceBoat } from "../../../api/introduceBoat";

const Introduce_Boat = ({ visible_Introduce, boatID, setVisible_Introduce }) => {
 
  const [form] = Form.useForm(); // Khởi tạo form

  const handleOk = async () => {
    let IMGName = [];
    try {
      const response = await uploadFiles_Introduce(fileList);
      IMGName = response.fileNames;
      console.log("IMGName: ", IMGName);
      await introduceBoat({
        BoatID: boatID?.ID,
        Content: form.getFieldValue("description"),
        IMG: IMGName,
      });
      Modal.success({
        title: "Thêm mới giới thiệu thuyền thành công",
        content: "Giới thiệu thuyền đã được thêm vào",
        onOk: () => {
          setVisible_Introduce(false);
          form.resetFields();
        },
      });
    } catch (error) {
      console.error("Lỗi khi tải lên:", error);
      return;
    }
  };

  const handleCancel = () => {
    setVisible_Introduce(false);
  };
  
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
      title="Giới thiệu thuyền"
      visible={visible_Introduce}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800} // Set the width to make the modal larger
    >
      <Form form={form} layout="vertical">
        <Form.Item name="description" label="Giới thiệu thuyền">
          <Input.TextArea placeholder="Giới thiệu thuyền" rows={4} />
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
  );
};

export default Introduce_Boat;
