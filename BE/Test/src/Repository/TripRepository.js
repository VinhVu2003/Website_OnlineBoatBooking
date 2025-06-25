const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");

class TripRepository {
  // Thêm mới chuyến đi
  async createTrip(tripData) {
    try {
      const { BoatID, Schedule, Str_Date, Ed_Date, Duration, Detail, Dock } = tripData;
      const query = `
        INSERT INTO Trip (BoatID, Str_Date, Ed_Date, Schedule, Duration, Detail,Dock) 
        VALUES (:BoatID, :Str_Date, :Ed_Date, :Schedule, :Duration, :Detail,:Dock)
      `;
      const [result] = await sequelize.query(query, {
        replacements: {
          BoatID,
          Str_Date,
          Ed_Date,
          Schedule,
          Duration,
          Detail,
          Dock,
        },
        type: QueryTypes.INSERT,
      });
      return result;
    } catch (error) {
      throw new Error(`Lỗi tạo chuyến đi: ${error.message}`);
    }
  }

  // Lấy chuyến đi theo BoatID
  async getTripsByBoatID(BoatID) {
    try {
      const query = `SELECT * FROM Trip WHERE BoatID = ?`;
      const trips = await sequelize.query(query, {
        replacements: [BoatID],
        type: QueryTypes.SELECT,
      });
      return trips;
    } catch (error) {
      throw new Error(`Lỗi lấy chuyến đi theo BoatID: ${error.message}`);
    }
  }

  // Lấy chuyến đi theo điều kiện
  async getTripsByCondition(conditions) {
    try {
      // Xây dựng điều kiện động
      const whereClause = Object.keys(conditions)
        .map((key) => `${key} = ?`)
        .join(" AND ");

      const query = `SELECT * FROM Trip WHERE ${whereClause}`;
      const trips = await sequelize.query(query, {
        replacements: Object.values(conditions),
        type: QueryTypes.SELECT,
      });
      return trips;
    } catch (error) {
      throw new Error(`Lỗi lấy chuyến đi: ${error.message}`);
    }
  }

  // Cập nhật chuyến đi (cập nhật nhiều trường)
  // Cập nhật lịch trình chuyến đi
  async updateTrip(id, tripData) {
    try {
      const { BoatID, Schedule, Str_Date, Ed_Date, Duration, Detail ,Dock} = tripData;
      const query = `
      UPDATE Trip
      SET BoatID = ?, Schedule = ?, Str_Date = ?, Ed_Date = ?, Duration = ?, Detail = ?,Dock =?
      WHERE Id = ?
    `;
      const replacements = [BoatID, Schedule, Str_Date, Ed_Date, Duration, Detail,Dock, id];

      const [result] = await sequelize.query(query, {
        replacements,
        type: QueryTypes.UPDATE,
      });

      return true;
    } catch (error) {
      throw new Error(`Lỗi cập nhật chuyến đi: ${error.message}`);
    }
  }

  // Xóa chuyến đi
  async deleteTrip(id) {
    try {
      const query = `DELETE FROM Trip WHERE Id = ?`;
      const [result] = await sequelize.query(query, {
        replacements: [id],
        type: QueryTypes.DELETE,
      });
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Lỗi xóa chuyến đi: ${error.message}`);
    }
  }

  // Lấy tất cả chuyến đi
  async getAllTrips() {
    try {
      const query = `SELECT Trip.*, Boat.Name AS BoatName,Boat.ID AS IDinBoat FROM Trip RIGHT JOIN Boat ON Trip.BoatID = Boat.ID`;
      const trips = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return trips;
    } catch (error) {
      throw new Error(`Lỗi lấy tất cả chuyến đi: ${error.message}`);
    }
  }
}

module.exports = new TripRepository();
