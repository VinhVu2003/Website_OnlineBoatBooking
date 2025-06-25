import axios from "axios";
import API_URL from "../config/apiConfig"; // Import URL từ cấu hình

export const uploadFiles = async (files) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i].originFileObj); // Sử dụng originFileObj để lấy tệp thực
  }

  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
      credentials: "include", // Nếu cần chia sẻ cookies
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về dữ liệu từ server
  } catch (error) {
    console.error("Error:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

export const uploadFiles_Introduce = async (files) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i].originFileObj); // Sử dụng originFileObj để lấy tệp thực
  }
  try {
    const response = await fetch(`${API_URL}/upload/introduceBoat`, {
      method: "POST",
      body: formData,
      credentials: "include", // Nếu cần chia sẻ cookies
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về dữ liệu từ server
  } catch (error) {
    console.error("Error:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

export const uploadFiles_Boat = async (files) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i].originFileObj); // Sử dụng originFileObj để lấy tệp thực
  }
  try {
    const response = await fetch(`${API_URL}/upload/boat`, {
      method: "POST",
      body: formData,
      credentials: "include", // Nếu cần chia sẻ cookies
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về dữ liệu từ server
  } catch (error) {
    console.error("Error:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

export const uploadFiles_Room = async (files) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i].originFileObj); // Sử dụng originFileObj để lấy tệp thực
  }
  try {
    const response = await fetch(`${API_URL}/upload/room`, {
      method: "POST",
      body: formData,
      credentials: "include", // Nếu cần chia sẻ cookies
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // Trả về dữ liệu từ server
  } catch (error) {
    console.error("Error:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};
