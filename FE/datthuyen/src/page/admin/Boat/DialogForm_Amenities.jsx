import { Checkbox, Modal, Table } from "antd";
import { GetAllAr_Amenities } from "../../../api/Amenities";
import { useEffect, useState } from "react";
import {
  GetAllBoat_AmenitiesByBoatID,
  AddBoat_Amenities,
  UpdateBoat_Amenities,
  Add_Arr_Boat_Amenities,
} from "../../../api/Boat_Amenities";
const DialogForm_Amenities = ({
  visible_Amenities,
  setVisible_Amenities,
  boatID,
}) => {
  const [Ar_Amenities, setAr_Amenities] = useState([]);
  const [isAdding, setIsAdding] = useState(false);


  const [boat_Amenities, setBoat_Amenities] = useState([]);

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const loadBoat_Amenities = async () => {
    try {
      const response = await GetAllBoat_AmenitiesByBoatID(boatID?.ID); // Gọi API để lấy dữ liệu chủ sở hữu
      // console.log("ds tiện ich theo id thuyền", response);
      setBoat_Amenities(response); // Cập nhật state với dữ liệu chủ sở hữu
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };
  const loadAr_Amenities = async () => {
    try {
      const response = await GetAllAr_Amenities(); // Gọi API để lấy dữ liệu chủ sở hữu
      // console.log("ds_tienich", response);
      setAr_Amenities(response); // Cập nhật state với dữ liệu chủ sở hữu
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };

  useEffect(() => {
    loadBoat_Amenities();
    loadAr_Amenities();
  }, [boatID]);

  useEffect(() => {
    if (boat_Amenities.length === 0) {
      // console.log("This is a new boat, adding amenities.");
      setIsAdding(true);
    } else {
      // console.log("This boat already has amenities, updating.");
      setIsAdding(false);
    }
    
  }, [boat_Amenities]);

  const handleOk = async () => {
    // console.log("Selected Amenities:", selectedAmenities.filter(amenity => amenity.checked));
    if(isAdding){
      const amenityIds = selectedAmenities.filter(amenity => amenity.checked).map(amenity => amenity.ID);
      // console.log("amenityIds", amenityIds);
      await Add_Arr_Boat_Amenities(boatID?.ID, amenityIds);
      Modal.success({
        title: 'Thêm mới tiện ích thành công',
        content: 'Tiện ích đã được thêm vào thuyền',
        onOk: () => window.location.reload(),
      });
    }
  };

  useEffect(() => {
    //so sánh theo Name
    if (Ar_Amenities.length > 0 && boat_Amenities.length > 0) {
      const newSelectedAmenities = Ar_Amenities.map((amenity) => ({
        ...amenity,
        checked: boat_Amenities.some(
          (boatAmenity) => boatAmenity.Name === amenity.Name
        ),
      }));
      setSelectedAmenities(newSelectedAmenities); // Cập nhật selectedAmenities với trạng thái checked
    }
  }, [Ar_Amenities, boat_Amenities]);

  const handleAmenityChange = (record) => {
    setSelectedAmenities((prevState) => {
      const index = prevState.findIndex((amenity) => amenity.ID === record.ID);
      if (index !== -1) {
        // Nếu đã có trong danh sách, cập nhật trạng thái checked
        return prevState.map((amenity, i) =>
          i === index ? { ...amenity, checked: !amenity.checked } : amenity
        );
      } else {
        // Nếu chưa có, thêm mới với checked là true
        return [...prevState, { ...record, checked: true }];
      }
    });
  };
  
  const handleCancel = () => {
    setVisible_Amenities(false);
    setSelectedAmenities([]);
    // console.log("selectedAmenities", selectedAmenities);
  };
  return (
    <>
      <Modal
        title={isAdding ? "Thêm mới tiện ích" : "Thông tin tiện ích"}
        visible={visible_Amenities}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto", marginTop: "5vh" }} // Adjusted marginTop to reduce space between title and table
        style={{ top: "40px" }} 
      >
        <Table
          columns={[
            { title: "Tên tiện ích", dataIndex: "Name", key: "Name" },
            {
              title: "Tình trạng",
              dataIndex: "checked",
              key: "checked",
              render: (checked, record) => (
                <Checkbox
                  id={`amenity-${record.ID}`}
                  onChange={() => handleAmenityChange(record)}
                  checked={selectedAmenities.some(
                    (amenity) => amenity.ID === record.ID && amenity.checked
                  )} // Kiểm tra trạng thái checked từ selectedAmenities
                  getCheckboxProps={{ record }}
                />
              ),
            },
          ]}
          dataSource={Ar_Amenities.map((amenity) => ({
            ...amenity,
            checked: boat_Amenities.some((ba) => ba.ID === amenity.ID), // Quyết định giá trị checkbox dựa trên sự trùng khớp ID
          }))}
          pagination={false}
        />
      </Modal>
    </>
  );
};
export default DialogForm_Amenities;
