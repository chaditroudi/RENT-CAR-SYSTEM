const { Router: expressRouter } = require("express");
const authRouter = require("./auth.routes");
const contractRouter = require("./contract.routes");
const carRouter = require("./car.routes");
const customerRouter = require("./customer.routes");
const userRouter = require("./user.routes");
const statisticsRouter = require("./statistics.routes");

const reportRouter = require('./report.routes')


const adminRouter = require('./admin.routes');
const notificationRouter = require('./notification.routes');
const branchRouter = require('./branch.routes');
const router = expressRouter();

// auth routes
router.use("/auth", authRouter);

router.use('/contract',contractRouter);
router.use('/car',carRouter);
router.use('/customer',customerRouter);
router.use('/admin',adminRouter);
router.use('/user',userRouter);
router.use('/notification',notificationRouter);
router.use('/statistics',statisticsRouter);
router.use('/report',reportRouter);
router.use('/branch',branchRouter);

module.exports = router;