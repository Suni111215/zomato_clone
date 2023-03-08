import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Mealtypes() {
  //instance of use navigate
  let navigate = useNavigate();


  let [mealtypelist, setMealList] = useState([]);

  let getmealtypelist = async () => {
    let url = "http://localhost:3003/getmealtypes";
    let { data } = await axios.get(url);
    //console.log(data.mealtypes);
    setMealList([...data.mealtypes]); //using spread operator for re creation of memory
  };
  //console.log(mealtypelist);
  // console.log("first js code"); //variables are initialised
  useEffect(() => {
    getmealtypelist();
  }, []);
  //when we use empty aray useeffect will run only once on page load]
  //use effect runs when there is a side effect(when state will change) in component //we can use useeffct on component load,on component update,on component death

  return (
    <>
      <div className="container back my-2">
        <h3>Quick Searches</h3>
        <p>Discover restaurants by type of meal</p>
        <div className="row">
          <div className="col-12 d-flex justify-content-between flex-wrap ">
            {mealtypelist
              .sort((a, b) => (a.meal_type > b.meal_type ? 1 : -1))
              .map((meal, index) => {
                return (
                  <div
                    key={meal._id}
                    className="row searchboxes"
                    onClick={() => {
                      navigate("/quicksearch/" + meal.meal_type);
                    }}
                  >
                    <div className="col-4">
                      <img
                        className="images2"
                        alt="/"
                        src={"./images/" + meal.image}
                      />
                    </div>
                    <div className="col-8 text-right">
                      <strong>{meal.name}</strong>
                      <br />
                      <span>{meal.content}</span>
                    </div>
                  </div>
                );
              })}
            {console.log("second rendering")}
          </div>
        </div>
      </div>
    </>
  );
}
