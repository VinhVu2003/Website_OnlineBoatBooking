// src/page/admin/Trip/Trip.jsx
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Popconfirm, Form, Input, Select, Tooltip } from "antd";
import { getallTrips, deleteTrip, API_TripGetall } from "../../../api/trip"; // Giả sử bạn có API cho chuyến đi
import DialogForm_Trip from "./DialogForm";
import moment from "moment";
import { CloseCircleOutlined,SettingOutlined,PlusCircleOutlined } from "@ant-design/icons"; // Import CloseCircleOutlined icon

const Trip = function () {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [isAdd, setIsAdd] = useState(true);

  const [dataBoat, setDataBoat] = useState(null);

  const loadData = async () => {
    try {
      const response = await API_TripGetall();
      // console.log(response);
      setData(response);
      setFilteredData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (record) => {
    // try {
    //   await deleteTrip(record.Id);
    //   Modal.success({
    //     title: "Thành công",
    //     content: "Chuyến đi đã được xóa thành công!",
    //   });
    //   loadData();
    // } catch (error) {
    //   console.error("Error deleting trip:", error);
    // }
  };

  //tìm kiếm
  const handleSearch = (value) => {
    // Lọc dữ liệu ngay lập tức khi người dùng nhập
    const filtered = data.filter(
      (item) => item.BoatName.toLowerCase().includes(value.toLowerCase()) // Lọc dữ liệu theo tên
    );
    setFilteredData(filtered); // Cập nhật trạng thái dữ liệu đã lọc
  };
  const handleAdd = (record) => {
    // console.log(record);
    if(record.Schedule){
      Modal.error({
        title: "Lỗi",
        content: "Thuyền đã có lịch trình",
      });
      return;
    }else{
      setVisible(true);
      setIsAdd(true);
      setDataBoat(record)
      // form.setFieldsValue(record);
    }
  };
  const handleEdit = (record) => {
    if(!record.Schedule){
      Modal.error({
        title: "Lỗi",
        content: "Thuyền chưa có lịch trình",
      });
      return;
    }else{
      setVisible(true);
      setIsAdd(false);
      setDataBoat(record)

      form.setFieldsValue({
        schedule: record.Schedule,
        start_date: moment(record.Str_Date),
        duration: record.Duration,
        detail: record.Detail,
        dock:record.Dock
      });
    }
  };
  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Thuyền",
      dataIndex: "BoatName",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "Str_Date",
      render: (date) => moment(date).format('YYYY-MM-DD'),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "Ed_Date",
      render: (date) => moment(date).format('YYYY-MM-DD'),
    },
    {
      title: "Lịch trình",
      dataIndex: "Schedule",
    },
    {
      title: "Thời gian",
      dataIndex: "Duration",
      filters: data.filter(item => item.Duration).map(item => ({ text: item.Duration, value: item.Duration })),
      onFilter: (value, record) => record.Duration && record.Duration.indexOf(value) === 0,
    },
    {
      title: "Link chi tiết",
      dataIndex: "Detail",
      width: 100,
      render: (text) => text ? <a href={text} target="_blank" rel="noopener noreferrer" style={{color: 'blue', textDecoration: 'underline'}}>Link</a> : "Chưa có",
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', width: '150px' }}>
         
          <Tooltip title="Thêm">
              <PlusCircleOutlined 
                style={{ marginRight: "8px", fontSize: "24px", color: "blue" }}
                onClick={() => handleAdd(record)}
              />
            </Tooltip>
          <Tooltip title="Sửa">
              <SettingOutlined
                style={{ marginRight: "8px", fontSize: "24px", color: "green" }}
                onClick={() => handleEdit(record)}
              />
            </Tooltip>
        </div>
      ),
    },
  ];
  const handleFilterChange = (value) => {
    if (value === "withSchedule") {
      setFilteredData(data.filter((item) => item.Schedule));
    } else if (value === "withoutSchedule") {
      setFilteredData(data.filter((item) => !item.Schedule));
    } else {
      setFilteredData(data);
    }
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
        <Select
          placeholder="Chọn thuyền"
          onChange={(value) => handleFilterChange(value)}
        >
          <Select.Option value="withSchedule">
            Thuyền có lịch trình
          </Select.Option>
          <Select.Option value="withoutSchedule">
            Thuyền chưa có lịch trình
          </Select.Option>
        </Select>
        <Input.Search
          placeholder="Tìm kiếm theo tên thuyền"
          onChange={(e) => handleSearch(e.target.value)} // Gọi hàm tìm kiếm khi người dùng nhập
          style={{ width: 200 }}
        />
      </div>
      <Table columns={columns} dataSource={filteredData} />
      <DialogForm_Trip
        visible={visible}
        setVisible={setVisible}
        isAdd={isAdd}
        setIsAdd={setIsAdd}
        form={form}
        loadData={loadData}
        dataBoat={dataBoat}
      />
    </>
  );
};

export default Trip;
