const autoIncrement = async (model, serial) => {
    try {
        const highestSerial = await model
            .findOne({  }, { [serial]: 1, _id: 0 })
            .sort({ [serial]: -1 })
            .exec();

        console.log("High", highestSerial);
        const autoInc = highestSerial ? highestSerial[serial] + 1 : 0;

        return autoInc;
    } catch (error) {
        console.error('Error in autoIncrement:', error);
        throw new Error('Error generating auto increment value');
    }
};

const autoIncrementCodeCustomer = async (model, code) => {
    try {
        const highestSerial = await model
            .findOne({  }, { [code]: 1, _id: 0 })
            .sort({ [code]: -1 })
            .exec();

        console.log("High", highestSerial);
        const autoInc = highestSerial ? highestSerial[code] + 1 : 3000;

        return autoInc;
    } catch (error) {
        console.error('Error in autoIncrementCodeCustomer:', error);
        throw new Error('Error generating auto increment value');
    }
};

module.exports = {
    autoIncrement,
    autoIncrementCodeCustomer
};
