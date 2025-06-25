import { imageURLBoat } from "../../../url/url_IMG";
import { useEffect, useState } from "react"; // Thêm import useState

const BannerIMG = ({ dataBoat }) => {
  const [images, setImages] = useState([]); // Thêm state để lưu danh sách ảnh
  const [selectedImage, setSelectedImage] = useState(""); // Thêm state để lưu ảnh được chọn
  useEffect(() => {
    const imgList = dataBoat?.IMG?.split(",") || [];
    setImages(imgList); // Lưu danh sách ảnh vào state
    setSelectedImage(imgList[0] || ""); // Chọn ảnh đầu tiên làm ảnh hiển thị
  }, [dataBoat]);
  return (
    <>
      <div className="ShipDetail_carousel__nUuEe">
        <div className="flex gap-32 justify-center Carousel_carousel__FAFRR">
          {/* ảnh to */}
          <div className="Carousel_carouselItem__ajGfw">
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {images.length > 0 && (
                <img
                  alt="du-thuyen-banner"
                  src={`${imageURLBoat}/${selectedImage}`}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
          </div>

          <div className="Carousel_thumbs__U_A8F flex gap-12">
            {dataBoat?.IMG?.split(",").map((value, index) => (
              <div className="Carousel_thumbItem__YbHNN ">
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <img
                    alt="carousel-item"
                    src={`${imageURLBoat}/${value}`}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                    onClick={() => setSelectedImage(value)} // Thêm sự kiện onClick
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default BannerIMG;
