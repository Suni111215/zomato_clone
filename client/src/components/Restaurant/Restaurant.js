import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Filter folder/Header";
import { Carousel } from "react-responsive-carousel";
//import { Modal, Button } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import jwtDecode from "jwt-decode";

export default function Restaurantdetails() {
  let [menulist, setmenulist] = useState([]);
  let [totalprice, settotalprice] = useState(0);

  let getlogindata = () => {
    let token = localStorage.getItem("Zomatoclone");
    if (token === null) {
      return false;
    } else {
      try {
        let resultlogin = jwtDecode(token);
        console.log(resultlogin);
        return resultlogin;
      } catch (error) {
        //remove toekn from local storage
        localStorage.removeItem("Zomatoclone");
        return false;
      }
    }
  };
  let [User, setUser] = useState(getlogindata());
  let initrestaurant = {
    aggregate_rating: "",
    city: "",
    city_id: 0,
    contact_number: "",
    cuisine: [],
    cuisine_id: [],
    image: "/images/1.jpg",
    locality: "",
    location_id: 0,
    mealtypeid: 0,
    min_price: 0,
    name: "",
    rating_text: "",
    thumb: [],
    _id: "",
  }; //dummy data
  let { id } = useParams();

  let getmenuitems = async (request, response) => {
    let url = "http://localhost:3003/getmenuitemsbyid/" + id;
    let { data } = await axios.get(url);
    // console.log(data.menu_items);
    if (data.status === true) {
      setmenulist([...data.menu_items]);
    } else {
      setmenulist();
    }
  };
  let addItem = (index) => {
    let _menulist = [...menulist];
    //console.log(menulist[index]);
    _menulist[index].qty += 1;
    setmenulist(_menulist);
    settotalprice(totalprice + _menulist[index].price);
  };
  let removeItem = (index) => {
    let _menulist = [...menulist]; //recreating the array
    console.log(menulist[index]);
    _menulist[index].qty -= 1;
    setmenulist(_menulist);
    settotalprice(totalprice - _menulist[index].price);
  };
  let [restToggle, setrestToggle] = useState(true);
  let [rdetails, setrdetails] = useState({ ...initrestaurant });

  let getrestaurantdetails = async (request, response) => {
    let url = "http://localhost:3003/getrestrobyid/" + id;
    let { data } = await axios.get(url);
    if (data.status === true) {
      setrdetails({ ...data.restrolist });
    } else {
      setrdetails({ ...data.initrestaurant });
    }
  };

  // let loadscript = async function () {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.onload = () => {
  //     return true;
  //   };
  //   script.onerror = () => {
  //     return false;
  //   };
  //   document.body.appendChild(script);
  // };
  let makepayment = async () => {
    // let isloaded = await loadscript();
    // if (isloaded === false) {
    //   alert("script load issue");
    //   return false;
    // } else {
    //   alert("you can make a payment");
    // }
    let userorder = menulist.filter((menu) => menu.qty > 0);
    console.log(userorder);
    let url = "http://localhost:3003/gen-order-id";
    let { data } = await axios.post(url, { amount: totalprice });
    if (data.status === false) {
      alert("unable to gen order id");
      return false;
    }
    let { order } = data;

    var options = {
      key: "rzp_test_RB0WElnRLezVJ5", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Zomato Clone",
      description: "Make payment for your orders",
      image: "https://1000logos.net/wp-content/uploads/2021/06/Zomato-logo.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        //   alert(response.razorpay_payment_id);
        //   alert(response.razorpay_order_id);
        //   alert(response.razorpay_signature);
        // },
        var verifydata = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
          name: User.name,
          mobile: 9988556633,
          email: User.email,
          order_list: userorder,
          totalamount: totalprice,
        };

        let { data } = await axios.post(
          "http://localhost:3003/verifypayment",
          verifydata
        );
        if (data.status === true) {
          alert("payment completed");
          window.location.assign("/");
        } else {
          alert("payment staus");
        }
      },
      prefill: {
        name: "Aayu",
        email: "Aayu@example.com",
        contact: "9999999999",
      },
    };
    var rzp1 = window.Razorpay(options);
    //     rzp1.on("payment.failed",function(response){
    // alert(response.error.code);
    // alert(response.error.description);
    // alert(response.error.source);
    // alert(response.error.step);
    // alert(response.error.reason);
    // alert(response.error.metadata.order_id);
    // alert(response.error.metadata.payment_id);

    //     })
    rzp1.open();
  };
  useEffect(() => {
    getrestaurantdetails();
  }); // eslint-disable-next-line

  return (
    <>
      <div
        className="modal "
        id="menuitems"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{rdetails.name}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {menulist.map((item, index) => {
                return (
                  <div key={item._id} className="row p-2">
                    <div className="col-8">
                      <p className="mb-1 h6">{item.name}</p>
                      <p className="mb-1 ">{item.price}</p>
                      <p className="small text-muted">{item.description}</p>
                    </div>
                    <div className="col-4 d-flex justify-content-end ">
                      <div className="menu-food-item">
                        <img
                          className="w-55 h-50"
                          src={"/images/" + item.image}
                          alt=""
                        />
                        {item.qty === 0 ? (
                          <button
                            className="btn btn-primary btn-sm add "
                            onClick={() => {
                              addItem(index);
                            }}
                          >
                            Add
                          </button>
                        ) : (
                          <div className="order-item-count section align-center">
                            <button
                              className="hand mx-1"
                              onClick={() => {
                                removeItem(index);
                              }}
                            >
                              -
                            </button>
                            <button>{item.qty}</button>
                            <button
                              className="hand mx-1"
                              onClick={() => {
                                addItem(index);
                              }}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                      <hr className="p-0 my-2" />
                    </div>
                  </div>
                );
              })}

              <hr className="p-0 my-2" />
              <div className="d-flex justify-content-between">
                <h3>Subtotal Rs {totalprice}</h3>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-target="#modaluserdetailspage"
                  data-bs-toggle="modal"
                >
                  Proceed for Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <div
        className="modal "
        id="modaluserdetailspage"
        tabIndex="0"
        aria-hidden="true"
        aria-labelledby="exampleModalLabel2"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Please Enter User Details Here</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput" className="form-label">
                  Full Name:
                </label>
                <input
                  placeholder="Enter full Name"
                  className="form-control "
                  value={User.name}
                  onChange={() => {}}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="form-control "
                  value={User.email}
                  onChange={() => {}}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput" className="form-label">
                  Address:
                </label>
                <textarea
                  rows="3"
                  value="Bangalore"
                  placeholder="Type your Address here"
                  className="form-control "
                  onChange={() => {}}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                data-bs-target="#menuitems"
                data-bs-toggle="modal"
              >
                Back
              </button>

              <button
                type="button"
                className="btn btn-success"
                onClick={makepayment}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="Photogallery"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" style={{ height: "75vh" }}>
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
          >
            Back
          </button>
          <div className="modal-content">
            <div className="modal-body h-75">
              <Carousel showThumbs={false} infiniteLoop={true}>
                {rdetails.thumb.map((value, index) => {
                  return (
                    <div key={index} className="w-100">
                      <img src={"/images/" + value} alt="" />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <Header bg="bg-danger" />
      </div>
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="row">
            <div className="col-12 mt-5">
              <div className="restaurant-main-image position-relative">
                <img
                  className="restaurant-main-image"
                  src={"/images/" + rdetails.image}
                  alt=""
                />
                <button
                  className="btn btn-outline-light  position-absolute btn-gallery"
                  data-bs-toggle="modal"
                  data-bs-target="#Photogallery"
                >
                  Click to get image gallery
                </button>
              </div>
              <br />
              <div className="col-12">
                <h3>{rdetails.name}</h3>
                <div className="d-flex justify-content-between">
                  <ul className="list-unstyled d-flex gap-3">
                    <li
                      onClick={() => {
                        setrestToggle(true);
                      }}
                      className="fw-bold"
                    >
                      Overview
                    </li>
                    <li
                      onClick={() => {
                        setrestToggle(false);
                      }}
                      className="fw-bold"
                    >
                      Contact
                    </li>
                  </ul>
                  {User === false ? (
                    <button
                      disabled
                      href="#Modalmenuitems"
                      className="btn btn-danger align-self-start"
                    >
                      Login to place Order
                    </button>
                  ) : (
                    <button
                      href="#Modalmenuitems"
                      className="btn btn-danger align-self-start"
                      data-bs-toggle="modal"
                      data-bs-target="#menuitems"
                      onClick={getmenuitems}
                    >
                      Add Items
                    </button>
                  )}
                </div>
                <hr />
                {restToggle ? (
                  <div className="over-view">
                    <p className="h5 mb-4">About This Place</p>
                    <p className="mb-0 fw-bold">Cuisine</p>
                    <p>
                      {" "}
                      {rdetails.cuisine.reduce((pValue, cValue) => {
                        let value;
                        if (pValue === "") {
                          value = cValue.name;
                        } else {
                          value = pValue + ", " + cValue.name;
                        }
                        return value;
                      }, "")}
                    </p>
                    <p className="mb-0 fw-bold">Average Cost</p>
                    <p>Rs {rdetails.min_price} for two people(Approx.)</p>
                  </div>
                ) : (
                  <div className="over-view">
                    <p className="mb-0 fw-bold">Phone Number</p>
                    <p>+{rdetails.contact_number}</p>
                    <p className="mb-0 fw-bold">Address:</p>
                    <p>
                      {rdetails.locality},{rdetails.city}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
