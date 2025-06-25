const { pool, sql } = require("../config/database2");
class AmenitiesRepository {
  async getAll() {
    try {
      const result = await pool.request()
        .query('SELECT * FROM Amenities');
      return result.recordset;
    } catch (error) {
      if (error.message === "Connection is closed.") {
        throw new Error("Error fetching boat amenities: Connection is closed.");
      } else {
        throw new Error(`Error fetching boat amenities: ${error.message}`);
      }
    }
  }
}
module.exports = new AmenitiesRepository();