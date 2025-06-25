const CustomerService = require('../Service/Customer_S');
class CustomerController {
    async create(req, res) {
        try {
              // Kiểm tra xem dữ liệu đầu vào có hợp lệ không
              const { Name, Sex, Address, Phone, Email } = req.body;
              if (!Name || !Sex || !Address || !Phone || !Email  ) {
                  return res.status(400).json({ message: 'Tất cả các trường là bắt buộc' });
              }
            const customer = await CustomerService.create(req.body);
            res.status(201).json({ message: 'Thêm khách hàng thành công', data: customer });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server: ' + error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        try {
            const customer = await CustomerService.update(id, req.body);
            res.json({ message: 'Customer updated successfully', data: customer });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            await CustomerService.delete(id);
            res.json({ message: 'Customer deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

     async search(req, res) {
        try {
            const { name } = req.body; // Lấy tên từ body

            if (!name) {
                return res.status(400).json({ message: 'Tên không được để trống' });
            }

            const customers = await CustomerService.searchByName(name);
            res.json(customers);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server: ' + error.message });
        }
    }
    async getById(req, res) {
        const { id } = req.params;
        try {
            const customer = await CustomerService.getById(id);
            res.json({ message: 'Customer retrieved successfully', data: customer });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async getAllCus(req, res) {
        try {
            const customers = await CustomerService.getAllCus();
            res.json(customers);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server: ' + error.message });
        }
    }
}
module.exports = new CustomerController();