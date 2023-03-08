//import logo from './logo.svg';
//import "./App.css";
import Quicksearch from "./components/Filter folder/Quicksearch";
import Home from "./components/Home/Home";
// import {  //components of react router
//   BrowserRouter, //inject routing
//   Routes, //handle multiple routing
//   Route, //create a routing
//   Link, //create a element
//   Outlet, //manage child routing
//   //hooks
//   useParams,
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";
import {
  Routes,
  Route,
  // useNavigate,
  // useParams,
  // useSearchParams,
} from "react-router-dom";
import Restaurant from "./components/Restaurant/Restaurant";

function App() {
  return (
    <>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quicksearch/:meal_id" element={<Quicksearch />} />
          <Route path="/Restaurant/:id" element={<Restaurant />} />
        </Routes>
      </main>
    </>
  );
}
export default App;
