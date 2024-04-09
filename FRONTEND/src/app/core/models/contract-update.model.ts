import { Contract } from "./contract.model";

export function createUpdatedContract(
    inputsValue: string[],
    carId: any,
    customerId:any,
    selectedItems: string[],
    status: string,
    res: any
  ): Contract {

    console.log("STATUS",status);
    return {
      serial: inputsValue[0] || res.serial,
      version: inputsValue[1] || res.version,
      sponsor: inputsValue[2] || res.sponsor,
      car_out: inputsValue[3] || res.car_out,
      days: inputsValue[4] || res.days,
      car_back: inputsValue[5] || res.car_back,
      car: carId || res.car,
      owner: customerId || res.owner,

      select_one: inputsValue[7] || res.select_one,
      location: inputsValue[8] || res.location,
      deposit: inputsValue[20] || res.deposit,
      comments: inputsValue[11] || res.comments,
      daily: inputsValue[12] || res.daily,
      weekly: inputsValue[13] || res.weekly,
      monthly: inputsValue[14] || res.monthly,
      annual: inputsValue[15] || res.annual,
      fuel_out: inputsValue[16] || res.fuel_out,
      no_km_out: inputsValue[17] || res.no_km_out,
      fuel_back: inputsValue[18] || res.fuel_back,
      no_km_back: inputsValue[19] || res.no_km_back,
      features: selectedItems,
      daily_val1: inputsValue[21] || res.daily_val1,
      daily_val2: inputsValue[22] || res.daily_val2,
      daily_result: inputsValue[23] || res.daily_result,
      sum: inputsValue[24] || res.sum,
      status:status,
      discount: inputsValue[25] || res.discount,
      advance: inputsValue[26] || res.advance,
      payable: inputsValue[27] || res.payable,
      amount: inputsValue[33] || res.amount,
      
    };
  }
  