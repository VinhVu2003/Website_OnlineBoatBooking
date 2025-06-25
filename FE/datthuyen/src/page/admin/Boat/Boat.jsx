import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Radio,
  Popconfirm,
  Select,
  Dropdown,
  Tooltip,
} from "antd"; // Import đầy đủ các thành phần
import { SettingOutlined } from "@ant-design/icons"; // Import SettingOutlined icon
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FormOutlined ,
} from "@ant-design/icons";
import {
  getallBoatUser,
  APIdeleteStaff,
  APIupdateStaff,
  API_DeleteBoat,
} from "../../../api/boat";
import DialogForm from "./DialogForm";
import { GetAllLocation } from "../../../api/location";
import { GetAllOwner } from "../../../api/owner";
import DialogForm_Amenities from "./DialogForm_Amenities";
import DialogForm_Trip from "./DialogForm_Trip";
import { imageURLBoat } from "../../../url/url_IMG";
const Boat = function () {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false); //đóng mở modal
  const [visible_Amenities, setVisible_Amenities] = useState(false); //đóng mở modal
  const [boatID, setBoatID] = useState(null); // Thêm state cho ID của thuyền(Thong tin của thuyền)

  const [visible_Trip, setVisible_Trip] = useState(false); //đóng mở modal lịch trình

  const [visible_Introduce, setVisible_Introduce] = useState(false); //đóng mở modal giới thiệu
  const [isAdd, setIsAdd] = useState(true);
  const [form] = Form.useForm(); // Khởi tạo form
  const [locations, setLocations] = useState([]); // Thêm state cho địa điểm
  const [owners, setOwners] = useState([]); // Thêm state cho chủ sở hữu
  const [filteredData, setFilteredData] = useState(data); // Thêm state cho dữ liệu đã lọc

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [pageSize, setPageSize] = useState(5); // Set default page size

  const loadData = async () => {
    try {
      const response = await getallBoatUser();
      setData(response);
      setFilteredData(response); // Cập nhật filteredData khi tải dữ liệu
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const loadLocations = async () => {
    try {
      const response = await GetAllLocation(); // Gọi API để lấy dữ liệu địa điểm
      setLocations(response); // Cập nhật state với dữ liệu địa điểm
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  const loadOwners = async () => {
    try {
      const response = await GetAllOwner(); // Gọi API để lấy dữ liệu chủ sở hữu
      setOwners(response); // Cập nhật state với dữ liệu chủ sở hữu
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };
  useEffect(() => {
    loadData();
    loadLocations();
    loadOwners();
  }, []);

  const handleDelete = async (record) => {
    try {
      await API_DeleteBoat(record.ID); // Assuming record.key is the identifier for the boat
      Modal.success({
        title: "Thành công",
        content: "Xóa thành công.",
      });
      loadData(); // Reload data after deletion
    } catch (error) {
      console.error("Error deleting boat:", error);
    }
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => {
        // Tính toán STT mới để phản ánh đúng số thứ tự
        return (currentPage - 1) * pageSize + index + 1; // Tính toán STT dựa trên trang hiện tại và kích thước trang
      },
    },

    {
      title: "Tên thuyền",
      dataIndex: "Name",
    },
    {
      title: "Ảnh",
      dataIndex: "IMG",
      key: "IMG",
      render: (text, record) => (
        <img
          src={`${imageURLBoat}/${record.IMG.split(",")[0]}`} //tách
          alt="Boat"
          style={{
            width: "100px",
            height: "auto",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Số phòng",
      dataIndex: "Cabin_Count",
    },
    {
      title: "Chủ sở hữu",
      dataIndex: "OwnerName",
      filters: owners.map((owner) => ({ text: owner.Name, value: owner.Name })), // Sử dụng dữ liệu chủ sở hữu từ API
      onFilter: (value, record) => record.OwnerName.includes(value), // Hàm lọc
    },
    {
      title: "Địa điểm",
      dataIndex: "LocationName",
      filters: locations.map((location) => ({
        text: location.Name,
        value: location.Name,
      })), // Sử dụng dữ liệu địa điểm từ API
      onFilter: (value, record) => record.LocationName.includes(value), // Hàm lọc
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (text) => (text === "active" ? "Hoạt động" : "Không hoạt động"),
    },
    {
      title: "Action",
      key: "action",
      width:130,
      render: (text, record) => (
        <div>
          {/* Nút sửa */}
         
          <Tooltip title="Sửa">
            <SettingOutlined
              style={{ marginRight: "8px", fontSize: "24px", color: "green" }}
              onClick={() => {
                setVisible(true);
                setIsAdd(false);
                form.setFieldsValue(record);
                setBoatID(record); // Pass the record to boatID if needed
  
                // console.log(record);
              }}
            />
          </Tooltip>
          {/* Nút xóa với Popconfirm để xác nhận */}

          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record)}
            okText="Có"
            cancelText="Không"
          >
            <Tooltip title="Xóa">
              <CloseCircleOutlined
                style={{ marginRight: "8px", fontSize: "24px", color: "red" }}
              />
            </Tooltip>
          </Popconfirm>

         
          <Tooltip title="Tiện ích">
              <FormOutlined 
              onClick={()=>{
                setVisible_Amenities(true);
                  setBoatID(record);
              }}
                style={{ marginRight: "8px", fontSize: "24px", color: "blue" }}
              />
          </Tooltip>
        </div>
      ),
    },
  ];

  //tìm kiếm
  const handleSearch = (value) => {
    // Lọc dữ liệu ngay lập tức khi người dùng nhập
    const filtered = data.filter(
      (item) => item.Name.toLowerCase().includes(value.toLowerCase()) // Lọc dữ liệu theo tên
    );
    setFilteredData(filtered); // Cập nhật trạng thái dữ liệu đã lọc
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
            setIsAdd(true);
          }}
        >
          Thêm mới
        </Button>
        <Input.Search
          placeholder="Tìm kiếm theo tên thuyền"
          onChange={(e) => handleSearch(e.target.value)} // Gọi hàm tìm kiếm khi người dùng nhập
          style={{ width: 200 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          pageSize: pageSize,
          total: filteredData.length,
          current: currentPage, // Set the current page
          onChange: (page, size) => {
            setCurrentPage(page); // Update current page on change
            setPageSize(size); // Update page size when changed
          },
          showSizeChanger: true,
          pageSizeOptions: ["1", "5", "10", "20", "50", "100"],
          showQuickJumper: true,
        }}
      />

      <DialogForm
        visible={visible}
        setVisible={setVisible}
        isAdd={isAdd}
        setIsAdd={setIsAdd}
        form={form}
        loadData={loadData}
        boatID={boatID}
      />

      <DialogForm_Amenities
        visible_Amenities={visible_Amenities}
        setVisible_Amenities={setVisible_Amenities}
        boatID={boatID}
      />

      <DialogForm_Trip
        visible_Trip={visible_Trip}
        setVisible_Trip={setVisible_Trip}
        boatID={boatID}
      />
    </>
  );
};

export default Boat;
