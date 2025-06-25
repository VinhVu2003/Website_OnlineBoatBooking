// controllers/StaffController.js
const StaffService = require('../Service/StaffService');

class StaffController {
    async create(req, res) {
        try {
            const staff = await StaffService.create(req.body);
            res.status(201).json({ message: 'Staff created successfully', data: staff });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        try {
            const staff = await StaffService.update(id, req.body);
            res.json({ message: 'Staff updated successfully', data: staff });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            await StaffService.delete(id);
            res.json({ message: 'Staff deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const staffMembers = await StaffService.findAll();
            res.json(staffMembers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req, res) {
        const { id } = req.params;
        try {
            const staff = await StaffService.findById(id);
            if (staff) {
                res.json(staff);
            } else {
                res.status(404).json({ message: 'Staff not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new StaffController();
