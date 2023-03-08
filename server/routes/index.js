const express = require("express");
const router = express.Router();

const controller2 = require("../controller/mealtypes");
const controller = require("../controller/Restrolist.js");
const ordercontroller = require("../controller/orderscontroller");
const menuitemcontroller = require("../controller/menuitems");
const paymentc = require("../controller/payment");

//orders
router.post("/gen-order-id", paymentc.genorderid);
//payments
router.post("/verifypayment", paymentc.verifypayment);
router.get("/getrestro", controller.getrestrolist);

router.get("/getrestrobylocationid/:loc_id", controller.getrestrolistbyid);

router.get("/getrestrobyid/:restro_id", controller.getrestrolistbyrestroid);

router.get("/getmealtypes", controller2.getmealtypelist);

router.post("/saveorders", ordercontroller.saveneworder);

router.get(
  "/getmenuitemsbyid/:restro_id",
  menuitemcontroller.getMenuItemsByRestID
);
router.post("/filter", controller.filter);

router.post("/search-restaurant", controller.searchrestaurant);

module.exports = router;
//133167
//
