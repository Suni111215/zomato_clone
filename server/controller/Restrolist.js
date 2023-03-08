const data = require("../model/restromodel");

module.exports.getrestrolist = async (request, response) => {
  let data1 = await data.find();
  response.send({
    status: true,
    restrolist: data1,
  });
};

module.exports.searchrestaurant = async (request, response) => {
  let { restaurant, loc_id } = request.body;
  let result = await data.find({
    name: { $regex: restaurant + ".*", $options: "i" },
    location_id: Number(loc_id),
  });
  response.send({
    status: true,
    message: "working",
    result,
  });
};
module.exports.getrestrolistbyid = async (request, response) => {
  let locationid = request.params.loc_id;
  let data1 = await data.find(
    { location_id: locationid },
    { locality: 1, name: 1, city: 1, name: 1 } //denoting what all things we require rather than using map method-called projection logic
  );

  response.send({
    status: true,
    restrolist: data1,
  });
};
module.exports.getrestrolistbyrestroid = async (request, response) => {
  let { restro_id } = request.params;
  try {
    let data1 = await data.findById(
      restro_id //denoting what all things we require rather than using map method-called projection logic
    ); //special method of find by id of mongoose

    response.send({
      status: true,
      restrolist: data1,
    });
  } catch {
    response.status(500).send({
      status: false,
      message: "invalid is passed",
      error: error.message,
    });
  }
};

module.exports.filter = async (request, response) => {
  //filter
  //mealtype is mandatory
  //location,cuisine ,cost for 2 (l_cost and h_cost) and sorting in asc or desc,
  //page (per page 2 restaurants)

  // The above will be the filter operations
  var { mealtype, location, l_cost, h_cost, sort, cuisine } = request.body;

  const filterData = {};
  sort = sort ? sort : 1;
  if (mealtype !== undefined) {
    filterData["mealtypeid"] = mealtype;
  }
  if (location !== undefined) {
    filterData["location_id"] = location;
  }
  if (cuisine !== undefined) {
    filterData["cuisine_id"] = { $in: cuisine }; //special mongodb command for search in an array since cuisine should be an array
  }
  //important logic in mongodb
  if (l_cost !== undefined && h_cost !== undefined) {
    filterData["min_price"] = { $gt: l_cost, $lt: h_cost }; //imp oprators
  }

  // console.log(filterData);
  let result = await data
    .find(filterData, {
      name: 1,
      city: 1,
      locality: 1,
      location: 1,
      min_price: 1,
      image: 1,
      cuisine_id: 1,
      cuisine: 1,
    })
    .sort({
      min_price: sort,
    });
  //denoting what all things we require rather than using map method-called projection logic
  //sorting is of 2 types-asc(1) and desc(-1) we will use mongodb function for sorting

  if (result.length === 0) {
    response.send({
      status: false,
      message: "restaurant is not available",
    });
  } else {
    const page = request.query.page;
    const limit = 2;

    const startindex = (page - 1) * limit;
    const endindex = page * limit;
    let pagiresult = result.slice(startindex, endindex);
    response.send({
      status: true,
      restrolist: pagiresult,
    });
  }
};
