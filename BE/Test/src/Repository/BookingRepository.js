const { pool, sql } = require("../config/database2");
const sequelize = require("../config/database");
const { QueryTypes } = require("sequelize");
class BookingRepository {
  async createBookingWithCustomer(data) {
    // {
    //   "customer": {
    //     "name": "John Doe",
    //     "sex": "Male",
    //     "address": "123 Test Street",
    //     "phone": "0123456789",
    //     "email": "john@example.com",
    //     "accountId": 1
    //   },
    //   "booking": {
    //     "boatId": 1,
    //     "checkInDate": "2024-03-20T14:00:00",
    //     "checkOutDate": "2024-03-22T12:00:00",
    //     "bookingMethod": "Online",    // camelCase
    //     "totalPrice": 1500.00,        // camelCase
    //     "status": "Chờ thanh toán",
    //     "isFullBoat": true
    //   },
    //   "bookingDetails": [
    //     {
    //       "roomId": 1,
    //       "gia": 100.00
    //     },
    //     {
    //       "roomId": 2,
    //       "gia": 150.00
    //     }
    //   ]
    // }
    try {
      await pool.connect();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();

      try {
        // 0. Kiểm tra trùng lặp thời gian booking
        const existingBooking = await transaction//
          .request()
          .input("BoatID", sql.Int, data.booking.boatId)
          .input("CheckInDate", sql.DateTime, data.booking.checkInDate)
          .input("CheckOutDate", sql.DateTime, data.booking.checkOutDate)
          .query(`
            SELECT COUNT(*) AS Count
            FROM Booking
            WHERE 
                BoatID = @BoatID
                AND IsFullBoat = 1
                AND (
                    (CheckInDate < @CheckOutDate AND CheckOutDate > @CheckInDate) -- Chồng chéo ngày
                    OR (CheckInDate = @CheckInDate AND CheckOutDate = @CheckOutDate) -- Trùng lặp hoàn toàn
                  )
        `);
        // const existingBookingRoom = await transaction
        // .request()
        // .input("BoatID", sql.Int, data.booking.boatId)
        // .input("CheckInDate", sql.DateTime, data.booking.checkInDate)
        // .input("CheckOutDate", sql.DateTime, data.booking.checkOutDate)
        // .query(`
        //   SELECT COUNT(*) AS Count
        //   FROM Booking
        //   WHERE 
        //       BoatID = @BoatID
        //       AND IsFullBoat = 0
        //       AND (
        //           (CheckInDate < @CheckOutDate AND CheckOutDate > @CheckInDate) -- Chồng chéo ngày
        //           OR (CheckInDate = @CheckInDate AND CheckOutDate = @CheckOutDate) -- Trùng lặp hoàn toàn
        //         )
        //     `);
        if (existingBooking.recordset[0].Count > 0 ) {
          throw new Error(
            "Thuyền đã được đặt trong khoảng thời gian từ " +
              data.booking.checkInDate +
              " đến " +
              data.booking.checkOutDate
          );
        }
        // 1. Thêm Customer trước
        const customerResult = await transaction
          .request()
          .input("Name", sql.NVarChar, data.customer.name)
          .input("Sex", sql.NVarChar, data.customer.sex)
          .input("Address", sql.NVarChar, data.customer.address)
          .input("Phone", sql.VarChar, data.customer.phone)
          .input("Email", sql.VarChar, data.customer.email)
          .input("Account_ID", sql.Int, data.customer.accountId).query(`
            INSERT INTO Customer (Name, Sex, Address, Phone, Email, Account_ID)
            OUTPUT INSERTED.ID
            VALUES (@Name, @Sex, @Address, @Phone, @Email, @Account_ID)
          `);

        const customerId = customerResult.recordset[0].ID;

        // 2. Thêm Booking
        const bookingResult = await transaction
          .request()
          .input("CustomerID", sql.Int, customerId)
          .input("BoatID", sql.Int, data.booking.boatId)
          .input("CheckInDate", sql.DateTime, data.booking.checkInDate)
          .input("CheckOutDate", sql.DateTime, data.booking.checkOutDate)
          .input("Booking_Method", sql.NVarChar, data.booking.bookingMethod)
          .input("Total_Price", sql.Float, data.booking.totalPrice)
          .input("Status", sql.NVarChar, data.booking.status || "Pending")
          .input("IsFullBoat", sql.Bit, data.booking.isFullBoat || false) // Thêm trường IsFullBoat
          .query(`
            INSERT INTO Booking 
            (CustomerID, BoatID, BookingDate, CheckInDate, CheckOutDate, 
            Booking_Method, Total_Price, Status, IsFullBoat)
            OUTPUT INSERTED.*
            VALUES 
            (@CustomerID, @BoatID, GETDATE(), @CheckInDate, @CheckOutDate, 
            @Booking_Method, @Total_Price, @Status, @IsFullBoat)
          `);

        // 3. Thêm Booking Details
        if (data.bookingDetails && Array.isArray(data.bookingDetails)) {
          for (const detail of data.bookingDetails) {
            await transaction
              .request()
              .input("BookingID", sql.Int, bookingResult.recordset[0].ID)
              .input("RoomId", sql.Int, detail.roomId) // Thay đổi từ ServiceID thành RoomId
              .input("Gia", sql.Decimal(18, 2), detail.gia) // Thay đổi từ Price thành Gia
              .query(`
                INSERT INTO Booking_Details  -- Sửa lại tên bảng chính xác
                (BookingID, RoomId, Gia)    -- Sửa lại tên trường chính xác
                VALUES 
                (@BookingID, @RoomId, @Gia)
              `);
          }
        }

        // 4. Nếu IsFullBoat là true, cập nhật trạng thái của Boat thành đã đặt trước
        // Nếu IsFullBoat là false, chuyển những cột Status của bảng phòng được đặt thành giu chỗ
        if (!data.booking.isFullBoat) {
          for (const detail of data.bookingDetails) {
            await transaction
              .request()
              .input("RoomId", sql.Int, detail.roomId)
              .query(`
                UPDATE Room
                SET Status = N'Giữ chỗ'
                WHERE ID = @RoomId
              `);
          }
        } 
        await transaction.commit();

        return {
          customerId: customerId,
          bookingId: bookingResult.recordset[0].ID,
          bookingData: bookingResult.recordset[0],
        };
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      throw new Error(`Create booking error: ${error.message}`);
    } finally {
      pool.close(); // Đóng kết nối sau khi hoàn thành
    }
  }

  async updateBooking(data, detailsAction) {
    //   {
    //     "data": {
    //         "booking": {
    //             "id": 10,
    //             "checkInDate": "2024-03-20T14:00:00",
    //             "checkOutDate": "2024-03-22T12:00:00",
    //             "bookingMethod": "Online",
    //             "totalPrice": 1500.00,
    //             "status": "Confirmed",
    //             "isFullBoat": false
    //         },
    //         "bookingDetails": {
    //             "ID": 14
    //         }
    //     },
    //     "detailsAction": 2
    // }
    try {
      await pool.connect();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();

      try {
        // 1. Cập nhật thông tin Booking
        if (data.booking) {
          await transaction
            .request()
            .input("BookingID", sql.Int, data.booking.id)
            .input("CheckInDate", sql.DateTime, data.booking.checkInDate)
            .input("CheckOutDate", sql.DateTime, data.booking.checkOutDate)
            .input("Booking_Method", sql.NVarChar, data.booking.bookingMethod)
            .input("Total_Price", sql.Float, data.booking.totalPrice)
            .input("Status", sql.NVarChar, data.booking.status)
            .input("IsFullBoat", sql.Bit, data.booking.isFullBoat).query(`
              UPDATE Booking 
              SET CheckInDate = @CheckInDate,
                  CheckOutDate = @CheckOutDate,
                  Booking_Method = @Booking_Method,
                  Total_Price = @Total_Price,
                  Status = @Status,
                  IsFullBoat = @IsFullBoat
              WHERE ID = @BookingID
            `);
        }

        // 2. Xử lý Booking_Details theo action
        if (data.bookingDetails) {
          switch (detailsAction) {
            case 0: // Thêm mới
              await transaction
                .request()
                .input("BookingID", sql.Int, data.booking.id)
                .input("RoomId", sql.Int, data.bookingDetails.RoomId)
                .input("Gia", sql.Decimal(18, 2), data.bookingDetails.Gia)
                .query(`
                  INSERT INTO Booking_Details (BookingID, RoomId, Gia)
                  VALUES (@BookingID, @RoomId, @Gia)
                `);
              break;

            case 1: // Sửa
              await transaction
                .request()
                .input("ID", sql.Int, data.bookingDetails.ID)
                .input("RoomId", sql.Int, data.bookingDetails.RoomId)
                .input("Gia", sql.Decimal(18, 2), data.bookingDetails.Gia)
                .query(`
                  UPDATE Booking_Details 
                  SET Gia = @Gia, RoomId = @RoomId
                  WHERE ID = @ID 
                `);
              break;

            case 2: // Xóa
              await transaction
                .request()
                .input("ID", sql.Int, data.bookingDetails.ID).query(`
                  DELETE FROM Booking_Details 
                  WHERE ID = @ID
                `);
              break;

            default:
              throw new Error(
                "Invalid action. Use 0 for insert, 1 for update, 2 for delete"
              );
          }
        }

        await transaction.commit();
        return {
          success: true,
          message: "Booking and details updated successfully",
          bookingId: data.booking.id,
        };
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      throw new Error(`Update booking error: ${error.message}`);
    } finally {
      pool.close();
    }
  }

  async getAllBookingsbyBoatID(boatId) {
    try {
      const query = `
        SELECT * FROM Booking
        WHERE BoatID = ? 
      `;
      const replacements = [boatId];
  
      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.SELECT,
      });
      return result
      // console.log(result); // Xem kết quả trả về
    } catch (error) {
      throw new Error(`Get all bookings error: ${error.message}`);
    }
  }
  
  async getAllBookings() {
    try {
      await pool.connect();
      const result = await pool.request().query(`
          SELECT Booking.*, Boat.Name AS BoatName, Customer.Name AS CustomerName FROM Booking
          INNER JOIN Boat ON Booking.BoatID = Boat.ID
          INNER JOIN Customer ON Booking.CustomerID = Customer.ID
        `);
      return result.recordset; // Trả về danh sách tất cả các booking
    } catch (error) {
      throw new Error(`Get all bookings error: ${error.message}`);
    } finally {
      pool.close(); // Đóng kết nối sau khi hoàn thành
    }
  }

  async UpdateStatus(id, Status){
    try {
      const query = `
      UPDATE Booking
      SET Status = ?
      WHERE Id = ?
    `;
      const replacements = [Status, id];

      const [result] = await sequelize.query(query, {
        replacements,
        type: QueryTypes.UPDATE,
      });

      return true;
    } catch (error) {
      throw new Error(`Lỗi cập nhật trạng thái booking: ${error.message}`);
    }
  }

  async getAllBookingDetailsByBookingID(ID) {
    try {
      const query = `
        SELECT Booking_Details.*, Room.* FROM Booking_Details
        INNER JOIN Room ON Booking_Details.RoomID = Room.ID
        WHERE Booking_Details.BookingID = ? 
      `;
      const replacements = [ID];
  
      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.SELECT,
      });
      return result
      // console.log(result); // Xem kết quả trả về
    } catch (error) {
      throw new Error(`Get all bookings error: ${error.message}`);
    }
  }

  async getBookingStatistics(startDate, endDate) {
    try {
      const query = `
        SELECT COUNT(*) AS TotalBookings, 
               SUM(Total_Price) AS TotalPrice,
               COUNT(DISTINCT CustomerID) AS TotalCustomers,
               SUM(CASE WHEN Status = 'Pending' THEN 1 ELSE 0 END) AS PendingBookings,
               COUNT(CASE WHEN IsFullBoat = 1 THEN 1 ELSE NULL END) AS TotalFullBoatBookings
        FROM Booking
        WHERE BookingDate >= ? AND BookingDate <= ? 
        AND Status = N'Hoàn tất'
      `;
      const replacements = [startDate, endDate];

      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.SELECT,
      });
      return result;
    } catch (error) {
      throw new Error(`Get booking statistics error: ${error.message}`);
    }
  }
  
}

module.exports = new BookingRepository();
