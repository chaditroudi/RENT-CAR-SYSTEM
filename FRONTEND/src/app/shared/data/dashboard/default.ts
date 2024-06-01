
let primary_color = localStorage.getItem("primary_color") || "#7366ff";
let secondary_color = localStorage.getItem("secondary_color") || "#f73164";

export type ChartOptions = {

  tooltip?: any;
  colors?: string[];
 
};


export let purchase = {
  icon: "cart",
  counter: "10,000",
  name: "Purchase",
  font: "secondary",
  pr: "-20",
};

export let salesReturn = {
  icon: "return-box",
  counter: "10,000",
  name: "Sales return",
  font: "warning",
  pr: "+50",
};

export let sales = {
  icon: "tag",
  counter: "4,200",
  name: "Sales",
  font: "primary",
  pr: "+70",
};

export let purchaseRate = {
  icon: "rate",
  counter: "5700",
  name: "Purchase",
  font: "success",
  pr: "+70",
};
