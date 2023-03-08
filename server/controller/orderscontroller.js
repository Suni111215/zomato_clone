const ordermodel = require("../model/orders");
// var data = {
//   "order_id": "123",
//   "name": "aayu",
//   "mobile": 7016,
//   "email": "email",
//   "order_list": "order_list",
//   "payment_id": "payment_id",
//   "payment_status": true,
// };
module.exports.saveneworder = async (request, response) => {
  var data = await request.body;
  console.log(data);
  // response.send({
  //   status: true,
  //   data: data,
  // });
  try {
    var neworder = new ordermodel({
      order_id: data.order_id,
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      order_list: data.order_list,
      payment_id: data.payment_id,
      payment_status: data.payment_status,
    });

    await neworder.save();
    response.status(200).send({
      status: true,
      message: "order placed",
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      message: " invalid id is passed",
      error: error.message,
    });
  }
};
