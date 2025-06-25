import emailjs from 'emailjs-com';

// Hàm gửi email
export const sendEmail_Booking = ( toEmail,customer_name,Detial_Booking ) => {
  const templateParams = {
    email: "vuv28104@gmail.com",  // Email đăng ký dịch vụ EmailJS
    to_gamil: toEmail,   // Email người nhận chính
    customer_name:customer_name, //tên khách hàng
    Detial_Booking:Detial_Booking // chi tiết đơn đặt
  };
  
  return emailjs
    .send(
      "service_4yqnffb",  // ID dịch vụ của bạn trên EmailJS
      "template_mts6zgl",  // ID template của bạn
      templateParams,
      "E78NkKZWgxTRU6TfH"  // User ID của bạn trên EmailJS
    )

    .then(
      (response) => {
        console.log("Email sent successfully!", response.status, response.text);
        return response;  // Trả về response nếu gửi thành công
      },
      (err) => {
        console.error("Failed to send email. Error:", err);
        throw err;  // Throw lỗi nếu gửi thất bại
      }
    );
};
