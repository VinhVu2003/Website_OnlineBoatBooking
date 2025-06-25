import emailjs from "emailjs-com";
import React, { useState } from "react";
import { sendEmail_Booking } from "../../utils/sendGmail/sendGmail_Booking";

const Email = () => {
  const [email, setEmail] = useState(""); // Thêm trạng thái để lưu email
  const [message, setMessage] = useState(""); // Thêm trạng thái để lưu thông báo

  const handleSubscribe = () => {
    sendEmail_Booking("vuv47109@gmail.com","s",'s')
  };

  return (
    <div className="position-relative mx-auto">
      <input
        className="form-control border-primary rounded-pill w-100 py-3 ps-4 pe-5"
        type="text"
        placeholder="Email của bạn"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-primary rounded-pill position-absolute top-0 end-0 py-2 px-4 mt-2 me-2"
        onClick={handleSubscribe}
      >
        Theo dõi
      </button>
    </div>
  );
};

export default Email;
