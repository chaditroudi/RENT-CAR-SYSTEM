
const autoIncrement=async(model) => {
    
    // auto increment serial code when add car :
    const highestSerial = await model.findOne(({},{},{sort:{'serial':-1}}));
    const autoInc= highestSerial ?  highestSerial.serial  + 1 : 1;

    return autoInc;
}

module.exports = {
    autoIncrement
}