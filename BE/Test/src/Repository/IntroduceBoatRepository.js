const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");
class IntroduceBoatRepository {
  async createIntroduceBoat(tripData) {
    try {
      const { BoatID, Content, IMG } = tripData;
      const query = `
            INSERT INTO Introduce_B (BoatID, Content, IMG) 
            VALUES (?, ?, ?)
          `;
      const [result] = await sequelize.query(query, {
        replacements: [BoatID, Content, IMG],
        type: QueryTypes.INSERT,
      });
      return result;
    } catch (error) {
      throw new Error(`Lỗi tạo gioi thieu: ${error.message}`);
    }
  }

  async getAllIntroduceBoat() {
    try {
      const query = `
            SELECT 
              Boat.ID as BoatIDinBoat,
              Boat.Name as BoatName,  
              Introduce_B.*
          FROM 
              Boat
          LEFT JOIN 
              Introduce_B 
          ON 
              Boat.ID = Introduce_B.BoatID;
        `;
      const result = await sequelize.query(query, {
        type: QueryTypes.SELECT,
      });
      return result;
    } catch (error) {
      throw new Error(`Lỗi lấy tất cả giới thiệu thuyền: ${error.message}`);
    }
  }

  async updateIntroduceBoat(tripData) {
    try {
      const { ID, Content, IMG } = tripData;
      const query = `
            UPDATE Introduce_B 
            SET Content = ?, IMG = ? 
            WHERE ID = ?;
          `;
      const [result] = await sequelize.query(query, {
        replacements: [Content, IMG, ID],
        type: QueryTypes.UPDATE,
      });
      return result;
    } catch (error) {
      throw new Error(`Lỗi cập nhật gioi thieu: ${error.message}`);
    }
  }
  async getIntroduceBoatById(boatId) {
    try {
      const query = `
            SELECT 
              Boat.ID as BoatIDinBoat,
              Boat.Name as BoatName,  
              Introduce_B.*
          FROM 
              Boat
          LEFT JOIN 
              Introduce_B 
          ON 
              Boat.ID = Introduce_B.BoatID
          WHERE 
              Boat.ID = ?;
        `;
      const result = await sequelize.query(query, {
        replacements: [boatId],
        type: QueryTypes.SELECT,
      });
      return result;
    } catch (error) {
      throw new Error(`Lỗi lấy giới thiệu thuyền theo ID: ${error.message}`);
    }
  }
}

module.exports = new IntroduceBoatRepository();
