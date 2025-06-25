import { Modal } from "antd";
import { useEffect, useState } from "react";
import {
  API_getByBoatID,
  API_updateIntroduceBoat,
  createIntroduceBoat,
} from "../../../api/introduceBoat";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const Introduce_Boat = ({
  visible_Introduce,
  boatID,
  setVisible_Introduce,
  loadData,
}) => {
  const [editorData, setEditorData] = useState("");
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    console.log("boatID", boatID);
    if (boatID?.Content) {
      setIsAdd(false);
      setEditorData(boatID.Content); // Set giá trị từ boatID.Content
    } else {
      setIsAdd(true);
      setEditorData("viết ở đây..."); // Giá trị mặc định nếu không có Content
    }
  }, [boatID]);

  const handleCancel = () => {
    setVisible_Introduce(false);
  };

  const handleOk = async () => {
    if (isAdd) {
      try {
        await createIntroduceBoat({
          BoatID: boatID?.BoatIDinBoat,
          Content: editorData,
          IMG: "",
        });
        Modal.success({
          title: "Thêm giới thiệu thuyền thành công",
        });
        setVisible_Introduce(false);
        loadData();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
          await API_updateIntroduceBoat({
            ID: boatID?.ID,
            Content: editorData,
            IMG: "",
          });
          Modal.success({
            title: "Sửa giới thiệu thuyền thành công",
          });
          setVisible_Introduce(false);
          loadData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Modal
      title={isAdd ? "Thêm giới thiệu thuyền" : "Sửa giới thiệu thuyền"}
      open={visible_Introduce}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
    >
      <div>
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditorData(data); // Cập nhật nội dung khi người dùng gõ
          }}
        />
      </div>
    </Modal>
  );
};

export default Introduce_Boat;
