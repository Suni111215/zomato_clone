import React from "react";

export default function Filteroptions(props) {
  let { getfilterresult } = props;
  return (
    <>
      <section
        id="sectionone"
        className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2"
      >
        <article id="filters">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Filters
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse visible-xl visible-lg show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <h6>Select Location</h6>
                  <select>
                    <option>---Select Location</option>
                    {props.locationlist.map((item, index) => {
                      return (
                        <option key={index}>
                          {item.locality},{item.city}
                        </option>
                      );
                    })}
                  </select>
                  <br />
                  <br />
                  <h6>Cuisine</h6>
                  <input
                    type="checkbox"
                    id="North Indian"
                    name="North Indian"
                    value=""
                  />
                  <label htmlFor=" North Indian"> North Indian</label>
                  <br />
                  <input
                    type="checkbox"
                    id="South Indian"
                    name="South Indian"
                    value=""
                  />
                  <label htmlFor=" South Indian"> South Indian</label>
                  <br />
                  <input type="checkbox" id="Chinese" name="Chinese" value="" />
                  <label htmlFor=" Chinese"> Chinese</label>
                  <br />
                  <input
                    type="checkbox"
                    id="Fast Food"
                    name="Fast Food"
                    value=""
                  />
                  <label htmlFor="Fast Food"> Fast Food</label>
                  <br />
                  <input
                    type="checkbox"
                    id="Street Food"
                    name="Street Food"
                    value=""
                  />
                  <label htmlFor=" Street Food"> Street Food</label>
                  <br /> <br />
                  <h6>Cost for Two</h6>
                  <input
                    type="radio"
                    id="Less than 500"
                    //name="Less than 500"
                    value="0-500"
                    name="cost"
                    onChange={(event) => {
                      getfilterresult(event, "costfortwo");
                    }}
                  />
                  <label htmlFor=" Less than 500"> Less than 500</label>
                  <br />
                  <input
                    type="radio"
                    id="500 to 1000"
                    name="cost"
                    value="500-1000"
                    onChange={(event) => {
                      getfilterresult(event, "costfortwo");
                    }}
                  />
                  <label htmlFor=" 500 to 1000"> 500 to 1000</label>
                  <br />
                  <input
                    type="radio"
                    id="1000 to 1500"
                    name="cost"
                    value="1000-1500"
                    onChange={(event) => {
                      getfilterresult(event, "costfortwo");
                    }}
                  />
                  <label htmlFor=" 1000 to 1500"> 1000 to 1500</label>
                  <br />
                  <input
                    type="radio"
                    id="1500 to 2000"
                    name="cost"
                    value="1500-2000"
                    onChange={(event) => {
                      getfilterresult(event, "costfortwo");
                    }}
                  />
                  <label htmlFor=" 1500 to 2000"> 1500 to 2000</label>
                  <br />
                  <input
                    type="radio"
                    id="2000+"
                    name="cost"
                    value="2000-99999999"
                    onChange={(event) => {
                      getfilterresult(event, "costfortwo");
                    }}
                  />
                  <label htmlFor="2000-99999999"> 2000+</label>
                  <br />
                  <br />
                  <h6>Sort</h6>
                  <input
                    type="radio"
                    id="Price low to High"
                    name="sort"
                    value="1"
                    onChange={(event) => {
                      getfilterresult(event, "sort");
                    }}
                  />
                  <label htmlFor=" Price low to High"> Price Low to High</label>
                  <br />
                  <input
                    type="radio"
                    id="Price High to Low"
                    name="sort"
                    value="-1"
                    onChange={(event) => {
                      getfilterresult(event, "sort");
                    }}
                  />
                  <label htmlFor=" Price High to Low"> Price High to Low</label>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
