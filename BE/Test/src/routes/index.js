const staffRouter = require('./StaffRouter');
const chuyenMucRoutes = require('./chuyenmuc.route');
const CusRoutes = require('./Customer');
const Acc = require('./accountRoutes');
const articleCategoryRouter = require('./ArticleCategoryRouter');
const locationRouter = require('./LocationRouter');
const boatRouter = require('./BoatRouter');
const ownerRouter = require('./OwnerRouter');
const priceRouter = require('./PriceRouter');
const roomRouter = require('./RoomRouter');
const authRoutes = require('./authRoutes');
// const bookingrouter = require('./BookingRouter');
const boatAmenities = require('./Boat_AmenitiesRouter');
const amenitiesRouter = require('./AmenitiesRouter');
const introduceBoatRouter = require('./IntroduceBoatRouter');
const tripRouter = require('./TripRouter');
const bookingRouter = require('./BookingRouter');

function setupRoutes(app,io) {// Thêm io vào tham số
    app.use('/staff', staffRouter);
    app.use("/chuyenmuc", chuyenMucRoutes);
    app.use("/customer", CusRoutes);
    app.use("/acc", Acc);
    app.use('/dmbv', articleCategoryRouter);
    app.use('/location', locationRouter);
    app.use('/boat', boatRouter);
    app.use('/owner', ownerRouter);
    app.use('/price', priceRouter);
    app.use('/room', roomRouter);
    app.use('/login', authRoutes);
    app.use('/booking', bookingRouter(io));
    app.use('/boatAmenities', boatAmenities);
    app.use('/amenities', amenitiesRouter);
    app.use('/trip', tripRouter);
    app.use('/introduceBoat', introduceBoatRouter);
}

module.exports = setupRoutes;