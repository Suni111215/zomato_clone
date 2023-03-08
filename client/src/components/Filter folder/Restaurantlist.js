import React from "react";
import { useNavigate } from "react-router-dom";

function Restaurantlist(props) {
  let { restaurantList } = props;
  let navigate = useNavigate();
  console.log(restaurantList);

  return (
    <>
      <section className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 m-auto">
        {restaurantList.length === 0 ? (
          <div className="col-12 col-lg-8 col-md-7  cuisine1">
            No Restaurants Found
          </div>
        ) : (
          <>
            {restaurantList.map((item) => {
              return (
                <article
                  onClick={() => {
                    navigate("/restaurant/" + item._id);
                  }}
                  key={item.id}
                  className="cuisine1"
                >
                  <div className="row g-0">
                    <div className="col-6 col-xl-4">
                      <img
                        src={"/images/" + item.image}
                        className="images1"
                        alt="/"
                      />
                    </div>
                    <div className="col-6 col-xl-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">
                          <small className="text-muted">
                            {item.locality},{item.city}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-6 col-xl-4">
                      CUISINES:
                      <br />
                      COST FOR TWO:
                    </div>
                    <div className="col-6 col-xl-8">
                      {item.cuisine.reduce((pValue, cValue) => {
                        let value;
                        if (pValue === "") {
                          value = cValue.name;
                        } else {
                          value = pValue + ", " + cValue.name;
                        }
                        return value;
                      }, "")}
                      <br />
                      Rs {item.min_price}
                    </div>
                  </div>
                </article>
              );
            })}
          </>
        )}
      </section>
    </>
  );
}
export default Restaurantlist;
