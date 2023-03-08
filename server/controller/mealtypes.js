const mealtype = require("../model/Mealtypemodel");

module.exports.getmealtypelist = async (request, response) => {
  let result = await mealtype.find();
  response.send({
    status: true,
    mealtypes: result,
  });
};
