import React, { useEffect, useState } from "react";
import axios from "axios";
//we will se use navigate hook for navigation from on page to another
import Header from "../Filter folder/Header";
import { useNavigate } from "react-router-dom";
export default function Mainheader() {
  let [locationlist, setLocationList] = useState([]);
  let [locationId, setlocationId] = useState("");
  let [restaurantinputtext, setrestaurantinputtext] = useState("");
  let [searchlist, setsearchlist] = useState([]);
  let navigate = useNavigate();

  let getinputfromsearch = (event) => {
    let { value } = event.target;

    setlocationId(value);
  };
  let getlocationlist = async () => {
    let url = "http://localhost:3003/getrestro";
    let { data } = await axios.get(url);
    //console.log(data);
    setLocationList([...data.restrolist]);
  };

  let searchforrestaurant = async (e) => {
    let userentry = e.target.value;
    setrestaurantinputtext(userentry);
    if (userentry !== "") {
      let url = "http://localhost:3003/search-restaurant";
      let { data } = await axios.post(url, {
        restaurant: userentry,
        loc_id: locationId,
      });
      setsearchlist(data.result);
      console.log(searchlist);
    }
  };
  useEffect(() => {
    setrestaurantinputtext("");
    setsearchlist([]);
  }, [locationId]);
  useEffect(() => {
    getlocationlist();
  }, []);
  return (
    <>
      <div className="container-fluid backimg">
        <Header bg="" />

        <div className="row pt-4 mx-auto text-center">
          <div className="col-12">
            <span className="px-4 py-2" id="eh">
              {" "}
              e!{" "}
            </span>
          </div>
        </div>
        <br />
        <div className="row pt-4 text-center">
          <div className="col-12">
            <h2 id="h">Find the best restaurants,cafe and bars</h2>
          </div>

          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 my-4 m-auto text-center relative">
              <select
                id="select"
                placeholder="Please type a location"
                onChange={getinputfromsearch}
              >
                <option value="">---select---</option>
                {locationlist.map((item, index) => {
                  return (
                    <option key={index} value={item.location_id}>
                      {item.locality},{item.city}
                    </option>
                  );
                })}
              </select>

              <input
                id="search"
                placeholder="Search for restaurants"
                value={restaurantinputtext}
                disabled={locationId === "" ? true : false}
                onChange={searchforrestaurant}
              />
              <ul className="list-group align-items absolute bottom-0">
                {searchlist.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="list-group-item "
                      onClick={() => {
                        navigate("/restaurant/" + item._id);
                      }}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
