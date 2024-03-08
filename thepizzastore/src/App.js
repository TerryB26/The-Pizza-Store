import Navbar from "./components/navbar";
import Home from "./views/home";
import Menu from "./views/menu";
import Toppings from "./views/toppings";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Orders from "./views/orders";
import OrderDetails from "./views/view-order";
import PlaceOrder from "./views/placeOrder";
import Sales from "./views/sales";



function App() {
  return (
      <div>
        <Navbar />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/menu" element={<Menu />} />
            <Route exact path="/view-orders" element={<Orders />} />
            <Route exact path="/toppings" element={<Toppings />} />
            <Route exact path="/view-orders/:id" element={<OrderDetails />} />
              <Route exact path="/new-order" element={<PlaceOrder />} />
              <Route exact path="/sales" element={<Sales />} />

          </Routes>
        </Router>
      </div>
  );
}

export default App;
