// Controller/BoatController.js
const BoatService = require("../Service/BoatService");
const BoatRepository = require("../Repository/BoatRepository");
class BoatController {
  async create(req, res) {
    try {
      const boat = await BoatService.create(req.body);
      res
        .status(201)
        .json({ message: "Boat created successfully", data: boat });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      const boat = await BoatService.update(id, req.body);
      res.json({ message: "Boat updated successfully", data: boat });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await BoatService.delete(id);
      res.json({ message: "Boat deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const boats = await BoatService.findAll();
      res.json(boats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findById(req, res) {
    const { id } = req.params;
    try {
      const boat = await BoatService.findById(id);
      if (boat) {
        res.json(boat);
      } else {
        res.status(404).json({ message: "Boat not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllBoatOwnerLocationTrip(req, res) {
    try {
      const data = await BoatRepository.callGetAllBoatOwnerLocationTrip();
      res.json(data);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving data: " + error.message });
    }
  }
  // Tìm thuyền theo ID
  async findByIdUser(req, res) {
    const { id } = req.params; // Lấy id từ tham số URL
    try {
      const boat = await BoatRepository.callGetBoatByID(id); // Gọi repository trực tiếp để lấy thuyền theo ID
      if (boat) {
        res.json(boat); // Trả về dữ liệu thuyền nếu tìm thấy
      } else {
        res.status(404).json({ message: "Boat not found" }); // Nếu không tìm thấy thuyền
      }
    } catch (error) {
      console.error("Error fetching boat by ID:", error);
      res
        .status(500)
        .json({ message: "Error fetching boat by ID: " + error.message });
    }
  }

  
}

module.exports = new BoatController();
