// repository/RoomRepository.js
const Room = require("../Model/Room");
const { pool, sql } = require("../config/database2");
const sequelize = require("../config/database"); // Đảm bảo đường dẫn đúng
class RoomRepository {
  async create(data) {
    return await Room.create(data);
  }
  // ... existing code ...

  async createRoomWithPrice(data) {
    try {
      await pool.connect();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();

      try {
        const roomResult = await transaction // Đã sửa tên biến
          .request()
          .input("BoatID", sql.Int, data.BoatID)
          .input("RoomName", sql.NVarChar, data.RoomName)
          .input("PeopleCount", sql.Int, data.PeopleCount)
          .input("Size", sql.Float, data.Size)
          .input("Image", sql.NVarChar, data.Image)
          .input("Quantity", sql.Int, data.Quantity)
          .input("Status", sql.NVarChar, data.Status).query(`
                        INSERT INTO Room (BoatID, RoomName, PeopleCount, Size, Image, Quantity, Status)
                        OUTPUT INSERTED.*
                        VALUES (@BoatID, @RoomName, @PeopleCount, @Size, @Image, @Quantity, @Status)
                    `);

        const roomId = roomResult.recordset[0].ID; // Sử dụng roomResult ở đây

        // Chèn vào bảng Price
        await transaction
          .request()
          .input("RoomID", sql.Int, roomId) // Đã sửa tên biến
          .input("OriginalPrice", sql.Float, data.OriginalPrice).query(`
                        INSERT INTO Price (RoomID, OriginalPrice)
                        VALUES (@RoomID, @OriginalPrice)
                    `);
        await transaction.commit();

        return roomResult.recordset[0]; // Trả về kết quả đúng
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      throw new Error(`Create room error: ${error.message}`);
    } finally {
      pool.close(); // Đóng kết nối sau khi hoàn thành
    }
  }

  async updateRoomWithPrice(id, data) {
    try {
      await pool.connect();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();

      try {
        // Update Room table
        await transaction
          .request()
          .input("ID", sql.Int, id)
          .input("BoatID", sql.Int, data.BoatID)
          .input("RoomName", sql.NVarChar, data.RoomName)
          .input("PeopleCount", sql.Int, data.PeopleCount)
          .input("Size", sql.Float, data.Size)
          .input("Image", sql.NVarChar, data.Image)
          .input("Quantity", sql.Int, data.Quantity)
          .input("Status", sql.NVarChar, data.Status).query(`
                        UPDATE Room
                        SET BoatID = @BoatID, RoomName = @RoomName, PeopleCount = @PeopleCount, Size = @Size, Image = @Image, Quantity = @Quantity, Status = @Status
                        WHERE ID = @ID
                    `);

        // Update Price table
        await transaction
          .request()
          .input("RoomID", sql.Int, id)
          .input("OriginalPrice", sql.Float, data.OriginalPrice).query(`
                        UPDATE Price
                        SET OriginalPrice = @OriginalPrice
                        WHERE RoomID = @RoomID
                    `);
        await transaction.commit();

        return { message: "Room and price updated successfully" };
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      throw new Error(`Update room error: ${error.message}`);
    } finally {
      pool.close();
    }
  }

  // ... existing code ...
  async update(id, data) {
    const room = await Room.findByPk(id);
    if (room) {
      return await room.update(data);
    }
    throw new Error("Room not found");
  }

  async delete(id) {
    const result = await Room.destroy({ where: { ID: id } });
    if (result === 0) {
      throw new Error("Room not found");
    }
    return true;
  }

  async findAll() {
    const query = `
        SELECT Room.*, Price.OriginalPrice
        FROM Room
        LEFT JOIN Price ON Room.ID = Price.RoomID
    `;
    const [results, metadata] = await sequelize.query(query);
    return results;
  }

  async findById(id) {
    return await Room.findByPk(id);
  }
  
 
  async findAllByBoatId(boatId) {
    const query = `
      SELECT Room.*, Price.OriginalPrice
      FROM Room
      LEFT JOIN Price ON Room.ID = Price.RoomID
      WHERE Room.BoatID = :boatId
      AND Price.OriginalPrice IS NOT NULL
    `;
    const results = await sequelize.query(query, {
      replacements: { boatId },
      type: sequelize.QueryTypes.SELECT,
    });
    return results;
  }
}

module.exports = new RoomRepository();
