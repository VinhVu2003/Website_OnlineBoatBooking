const { pool, sql } = require("../config/database2");
const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");
class BoatAmenitiesRepository {
  async getAll() {
    try {
      const result = await pool.request().query("SELECT * FROM Boat_Amenities");
      return result.recordset;
    } catch (error) {
      throw new Error(`Error fetching boat amenities: ${error.message}`);
    }
  }
  async getAllByBoatId(BoatId) {
    try {
      // Kiểm tra xem kết nối có mở không
      if (!pool.connected) {
        await pool.connect(); // Mở lại kết nối nếu nó đã bị đóng
      }
      const result = await pool
        .request()
        .input("BoatId", sql.Int, BoatId)
        .query(
          `SELECT ba.AmenityId, a.Name, b.Id AS BoatId, b.Name AS BoatName FROM Boat_Amenities ba INNER JOIN Amenities a ON ba.AmenityId = a.Id INNER JOIN Boat b ON ba.BoatId = b.Id WHERE ba.BoatId = @BoatId`
        );
      return result.recordset;
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy tiện nghi thuyền theo ID thuyền: ${error.message}`
      );
    }
  }
  async addNew_Arr_Amenities(AmenityIds, BoatId) {
    try {
      for (const AmenityId of AmenityIds) {
        await pool
          .request()
          .input("AmenityId", sql.Int, AmenityId)
          .input("BoatId", sql.Int, BoatId)
          .query(
            "INSERT INTO Boat_Amenities (AmenityId, BoatId) VALUES (@AmenityId, @BoatId)"
          );
      }
      return true; // Assuming all inserts were successful
    } catch (error) {
      throw new Error(`Error adding new boat amenities: ${error.message}`);
    }
  }

  async findBoatsByAmenity(amenityIDs) {
    console.log("Amenity IDs:", amenityIDs); // Ghi lại để kiểm tra
    try {
      
      // Tạo chuỗi tham số cho truy vấn
      const placeholders = amenityIDs.map((_, index) => `:amenityID${index}`).join(", ");
      const query = `SELECT DISTINCT Boat.* FROM Boat
                     JOIN Boat_Amenities ON Boat.ID = Boat_Amenities.BoatID
                     WHERE Boat_Amenities.AmenityId IN (${placeholders})`;

      const replacements = amenityIDs.reduce((acc, id, index) => {
        acc[`amenityID${index}`] = id; // Tạo đối tượng thay thế cho từng amenityID
        return acc;
      }, {});

      const Boat = await sequelize.query(query, {
        replacements,
        type: QueryTypes.SELECT,
      });
      return Boat;
    } catch (error) {
      console.error("Lỗi khi tìm thuyền theo tiện nghi:", error);
      throw new Error(`Lỗi khi tìm thuyền theo tiện nghi: ${error.message}`);
    }
  }
}
module.exports = new BoatAmenitiesRepository();
