import React, { useState, useEffect } from "react";
import { getAllIntroduceBoats } from "../../../api/introduceBoat";
import { Button, Table, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import Introduce_Boat from "./Introduce_Boat";

const IntroduceBoat = () => {
  const [introduceBoats, setIntroduceBoats] = useState([]);
  const [boatID, setBoatID] = useState(null); // Thêm state cho ID của thuyền

  const [visible_Introduce, setVisible_Introduce] = useState(false); //đóng mở modal giới thiệu

  const loadData = async () => {
    try {
      const response = await getAllIntroduceBoats();
      console.log(response);
      setIntroduceBoats(response);
    } catch (error) {
      console.error("Error loading introduce boats:", error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleAction = (record) => {
    // console.log("record: ", record);
    setBoatID(record);
    setVisible_Introduce(true);
  };

  const columns = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên thuyền",
      dataIndex: "BoatName",
    },
    {
      title: "Bài giới thiệu",
      render: (text, record) => (record.ID ? "Có" : "Không"),
      filters: [
        { text: "Có", value: "Có" },
        { text: "Không", value: "Không" },
      ],
      onFilter: (value, record) =>
        value === "Có" ? record.ID : value === "Không" ? !record.ID : true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Tooltip >
            <SettingOutlined
              style={{ marginRight: "8px", fontSize: "24px", color: "green" }}
              onClick={() => handleAction(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={introduceBoats}
        pagination={{ pageSize: 10 }}
      />

      <Introduce_Boat
        loadData={loadData}
        visible_Introduce={visible_Introduce}
        setVisible_Introduce={setVisible_Introduce}
        boatID={boatID}
      />
    </>
  );
};

export default IntroduceBoat;
