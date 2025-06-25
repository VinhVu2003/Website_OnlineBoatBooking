import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_getByBoatID } from "../../../api/introduceBoat";

const IntroduceBoat = function ({ dataBoat }) {
  const { id } = useParams();
  // console.log("dataBoat", dataBoat);
  const [boatDetails, setBoatDetails] = useState([]);

  useEffect(() => {
    const fetchBoatDetails = async () => {
      try {
        const response = await API_getByBoatID(id);
        setBoatDetails(response);
        // console.log("introduceBoat", response[0].Content);
      } catch (error) {
        console.error("Error fetching boat details:", error);
      }
      // console.log("id", id);
    };

    fetchBoatDetails();
  }, [id]);
  return (
    <>
      <div className="SectionHeader_sectionHeader__60CR7  ">
        <div className="SectionHeader_title__eE2Rf">
          <h4 style={{ margin: "0px 0px 15px" }}>Giới thiệu</h4>
          
        </div>
      </div>

      <div className="ShipDetail_output__lstAp">
        <h6 className="" style={{ margin: "15px 0px 8px" }}>
          Giới thiệu về du thuyền
        </h6>

        {boatDetails[0]?.Content ? (
          <div
            style={{ maxWidth: "100%" }}
            dangerouslySetInnerHTML={{ __html: boatDetails[0]?.Content.replace(/width=".*?"/g, 'width="100%"').replace(/height=".*?"/g, 'height="auto"') }}
          />
        ) : (
          <p>Trống</p>
        )}
      </div>
    </>
  );
};
export default IntroduceBoat;
