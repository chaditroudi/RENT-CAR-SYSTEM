const { Router: expressRouter } = require("express");
const authRouter = require("./auth.routes");
const contractRouter = require("./contract.routes");
const carRouter = require("./car.routes");
const customerRouter = require("./customer.routes");
const userRouter = require("./user.routes");

const adminRouter = require('./admin.routes');
const router = expressRouter();

// auth routes
router.use("/auth", authRouter);

router.use('/contract',contractRouter);
router.use('/car',carRouter);
router.use('/customer',customerRouter);
router.use('/admin',adminRouter);
router.use('/user',userRouter);

module.exports = router;