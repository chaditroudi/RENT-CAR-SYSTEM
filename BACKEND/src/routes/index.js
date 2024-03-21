const { Router: expressRouter } = require("express");
const authRouter = require("./auth.routes");
const contractRouter = require("./contract.routes");
const carRouter = require("./car.routes");
const router = expressRouter();

// auth routes
router.use("/auth", authRouter);

router.use('/contract',contractRouter);
router.use('/car',carRouter);

module.exports = router;