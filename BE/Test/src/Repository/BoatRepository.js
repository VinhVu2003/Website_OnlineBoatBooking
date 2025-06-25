// Repository/BoatRepository.js
const Boat = require("../Model/Boat");
const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");

class BoatRepository {
  async create(data) {
    return await Boat.create(data);
  }

  async createWithPrice(data) {
    try {
      await pool.connect();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();

      try {
        const result = await transaction
          .request()
          .input("LocationId", sql.Int, data.LocationId)
          .input("Owner_ID", sql.Int, data.Owner_ID)
          .input("Name", sql.NVarChar, data.Name)
          .input("IMG", sql.NVarChar, data.IMG)
          .input("Full_Price", sql.Float, data.Full_Price)
          .input("Cabin_Count", sql.Int, data.Cabin_Count)
          .input("OtherInfo", sql.NVarChar, data.OtherInfo)
          .input("Status", sql.NVarChar, data.Status).query(`
            INSERT INTO Boat (LocationId, Owner_ID, Name, IMG, Full_Price, Cabin_Count, OtherInfo, Status)
            OUTPUT INSERTED.*
            VALUES (@LocationId, @Owner_ID, @Name, @IMG, @Full_Price, @Cabin_Count, @OtherInfo, @Status)
          `);

        const boatId = boatResult.recordset[0].ID;

        // Insert into Price table
        await transaction
          .request()
          .input("BoatID", sql.Int, boatId)
          .input("Price", sql.Float, data.Price).query(`
          INSERT INTO Price (BoatID, Price)
          VALUES (@BoatID, @Price)
        `);
        await transaction.commit();

        return result.recordset[0];
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      throw new Error(`Create boat error: ${error.message}`);
    } finally {
      pool.close(); // Đóng kết nối sau khi hoàn thành
    }
  }

  async update(id, data) {
    const boat = await Boat.findByPk(id);
    if (boat) {
      return await boat.update(data);
    }
    throw new Error("Boat not found");
  }

  async delete(id) {
    const result = await Boat.destroy({ where: { ID: id } });
    if (result === 0) {
      throw new Error("Boat not found");
    }
    return true;
  }

  async findAll() {
    return await Boat.findAll();
  }

  async findById(id) {
    return await Boat.findByPk(id);
  }

  // Gọi stored procedure
  async callGetAllBoatOwnerLocationTrip() {
    const [results, metadata] = await sequelize.query(
      "EXEC GetAllBoatOwnerLocationTrip"
    );
    return results; // Kết quả trả về từ stored procedure
  }

  // Gọi stored procedure với tham số BoatID
  async callGetBoatByID(boatID) {
    try {
      // Gọi stored procedure với tham số BoatID
      const [results, metadata] = await sequelize.query(
        "EXEC GetBoatByID @BoatID = :boatID",
        {
          replacements: { boatID: boatID },
          type: sequelize.QueryTypes.SELECT, // Chỉ định loại câu truy vấn (SELECT)
        }
      );

      return results; // Kết quả trả về từ stored procedure
    } catch (error) {
      console.error("Error calling stored procedure:", error);
      throw error; // Hoặc xử lý lỗi tùy ý
    }
  }



}

module.exports = new BoatRepository();
