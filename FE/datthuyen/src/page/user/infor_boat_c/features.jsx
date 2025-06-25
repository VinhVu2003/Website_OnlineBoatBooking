import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetAllBoat_AmenitiesByBoatID } from "../../../api/Boat_Amenities";

const Features = () => {
  const { id } = useParams();
  // console.log("dataBoat", dataBoat);
  const [ArrAmenities, setArrAmenities] = useState([]);
  useEffect(() => {
    const fetchBoatDetails = async () => {
      const response = await GetAllBoat_AmenitiesByBoatID(id);
      setArrAmenities(response);
      // console.log("ArrAmenities", response);
    };
    fetchBoatDetails();
  }, [id]);
  return (
    <>
      <div
        id="features"
        className="flex flex-col gap-40  ShipDetail_features__yRuTS"
      >
        <div className="SectionHeader_sectionHeader__60CR7  ">
          <div className="SectionHeader_title__eE2Rf">
            <h4>Đặc điểm nổi bật</h4>
            <img style={{width: "100px"}} src={`../../../assets/img/ke_ngang.webp`} alt="" />
          </div>
        </div>
        <div className="ShipDetail_overview__yB_ss">
          {/* start_amenities */}

          {ArrAmenities.map((item, index) => (
          <div className="flex gap-8 align-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
            >
              
              <path
                d="M4 12.6111L8.92308 17.5L20 6.5"
                stroke="var(--primary-base)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <label className="md">{item.Name}</label>
            </div>
          ))}
          {/* end_amenities */}
        </div>
      </div>
    </>
  );
};
export default Features;
