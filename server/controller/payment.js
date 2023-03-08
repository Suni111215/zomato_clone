const Razorpay = require("razorpay");
// const { response } = require("../app");
const KEY_ID = "rzp_test_RB0WElnRLezVJ5";
const SECRET_ID = "VLMCIrqKxRMNR9EcRcbL2UG8";
const ordermodel = require("../model/orders");

var instance = new Razorpay({ key_id: KEY_ID, key_secret: SECRET_ID });

let _saveneworder = async (data) => {
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
      totalamount: data.totalamount,
    });

    await neworder.save();
    return true;
  } catch (error) {
    return false;
  }
};
module.exports.genorderid = async (request, response) => {
  let { amount } = request.body;
  var options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "order receipt",
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      response.status(500).send({ status: false });
    }

    response.status(200).send({ status: true, order });
  });
};
module.exports.verifypayment = async (request, response) => {
  let data = request.body;
  let { payment_id, order_id, signature } = data;
  let body = order_id + "|" + payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", SECRET_ID)
    .update(body.toString())
    .digest("hex");
  console.log("sig received", signature);
  console.log("sig generated", expectedSignature);

  if (expectedSignature === signature) {
    data["payment_status"] = true;
    await _saveneworder(data);
    response.status(200).send({ status: true });
  } else {
    response.status(500).send({
      status: false,
    });
  }

  // let body = order_id + "|" + payment_id;
};
