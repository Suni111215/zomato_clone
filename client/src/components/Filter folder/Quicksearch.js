import React, { useEffect, useState } from "react";
import axios from "axios";
import Restaurantlist from "./Restaurantlist";
import Header from "./Header";
import Filteroptions from "./Filteroptions";
import { useParams } from "react-router-dom";

export default function Quicksearch() {
  let [locationlist, setLocationList] = useState([]);
  let [restaurantList, setRestaurantList] = useState([]);
  let { meal_id } = useParams();
  let [filterData, setfilterData] = useState({
    mealtype: meal_id,
  });
  let [page, setpage] = useState(1);

  let nextpage = async () => {
    setpage(page + 1);
    let url = `http://localhost:3003/filter?page=${page + 1}`;
    let { data } = await axios.post(url, filterData);
    if (data.status === true) {
      setRestaurantList([...data.restrolist]);
    } else {
      setRestaurantList([]);
    }
  };

  let previouspage = async () => {
    setpage(page - 1);
    let url = `http://localhost:3003/filter?page=${page - 1}`;
    let { data } = await axios.post(url, filterData);
    if (data.status === true) {
      setRestaurantList([...data.restrolist]);
    } else {
      setRestaurantList([]);
    }
  };

  let getlocationlist = async () => {
    let url = "http://localhost:3003/getrestro";
    let { data } = await axios.get(url);
    //console.log(data);
    setLocationList([...data.restrolist]);
  };

  let filter = async () => {
    let url = `http://localhost:3003/filter?page=${page}`;

    let { data } = await axios.post(url, filterData);
    if (data.status === true) {
      setRestaurantList([...data.restrolist]);
    } else {
      setRestaurantList([]);
    }
  };

  let getfilterresult = (event, type) => {
    let value = event.target.value;

    switch (type) {
      case "sort":
        filterData["sort"] = value;
        break;
      case "costfortwo":
        value = value.split("-");
        filterData["l_cost"] = Number(value[0]);
        filterData["h_cost"] = Number(value[1]);
        break;
      default:
        break;
    }
    setfilterData({ ...filterData }); //recreate this particular object
  };

  useEffect(() => {
    getlocationlist();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    filter(); // eslint-disable-next-line
  }, [filterData]);
  // updating ===> on state update every time

  return (
    
    <div>
            
      <Header bg="bg-danger" />

      <h2 className="my-2" style={{ color: "blue" }}>
        breakfast in mumbai
      
      </h2>
      <div className="row">
        <Filteroptions
          locationlist={locationlist}
          getfilterresult={getfilterresult}
        />

        <Restaurantlist restaurantList={restaurantList} page={page} />
        <div className="text-center my-3">
          <button onClick={previouspage} className="boxes">
            &lt;
          </button>
          <span>Previous Page ||</span>

          <span> Next Page</span>
          <button onClick={nextpage} className="boxes">
            &gt;
          </button>
        </div>
    
      </div>
            

    </div>
    
  );
}

/**
 * we click radio/check,select inputs
 * getFilterResult (event,type) get triggered
 * value of input is access
 * we create a local filter data variable , to avoid the issue if reference;
 * as per the switch operation filterData is update
 * useFilterData() is triggered to update the  filterData state
 * as soon as filterData updates a useEffect() having filterData dependance get call
 * in useEffect() we have filter method , it get call
 * and the filter API is trigger
 * and on response restaurant list is update**/
