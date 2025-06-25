// controllers/chuyenMucController.js
const ChuyenMucService = require('../Repository/ChuyenMucRepository');

class ChuyenMucController {
    async create(req, res) {
        try {
            // Kiểm tra xem req.body có dữ liệu hợp lệ không
            if (!req.body.TenChuyenMuc) {
                return res.status(400).json({ message: 'Tên chuyên mục là bắt buộc' });
            }

            const chuyenMuc = await ChuyenMucService.create(req.body);
            res.status(201).json({ message: 'Thêm chuyên mục thành công', data: chuyenMuc });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server: ' + error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;

            // Kiểm tra xem req.body có dữ liệu hợp lệ không
            if (!req.body.TenChuyenMuc) {
                return res.status(400).json({ message: 'Tên chuyên mục là bắt buộc' });
            }

            const chuyenMuc = await ChuyenMucService.update(id, req.body);
            res.json({ message: 'Cập nhật chuyên mục thành công', data: chuyenMuc });
        } catch (error) {
            // Kiểm tra loại lỗi để trả về mã trạng thái phù hợp
            if (error.message === 'Chuyên mục không tồn tại') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: 'Lỗi server: ' + error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await ChuyenMucService.delete(id);
            res.json({ message: 'Xóa chuyên mục thành công' });
        } catch (error) {
            if (error.message === 'Chuyên mục không tồn tại') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: 'Lỗi server: ' + error.message });
        }
    }

    async findAll(req, res) {
        try {
            const chuyenMucs = await ChuyenMucService.findAll();
            res.json(chuyenMucs);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server: ' + error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const chuyenMuc = await ChuyenMucService.findById(id);
            if (chuyenMuc) {
                res.json(chuyenMuc);
            } else {
                res.status(404).json({ message: 'Chuyên mục không tồn tại' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server: ' + error.message });
        }
    }
}

module.exports = new ChuyenMucController();
