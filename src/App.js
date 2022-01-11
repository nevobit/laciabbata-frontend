import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientsScreen from "./screens/ClientsScreen";
import Navigation from "./components/Navigation";
import Users from "./components/Users";
import CategoriesScreen from "./screens/CategoriesScreen";
import LoginScreen from "./screens/LoginScreen";
import ProductsScreen from "./screens/ProductsScreen";
import SellScreen from "./screens/SellScreen";
import SellsScreen from "./screens/SellsScreen";
import ExpensesScreen from "./screens/ExpensesScreen";
import ReportsScreen from "./components/ReportsScreen";

function App() {

  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;

  return (
    <BrowserRouter>
      <div className="App">
        {userInfo? (
          <>
          <Navigation></Navigation>
          
          <Routes>
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/categories" element={<CategoriesScreen/>}></Route>
          <Route path="/products" element={<ProductsScreen/>}></Route>
          <Route path="/clients" element={<ClientsScreen/>}></Route>
          <Route path="/sell" element={<SellScreen/>}></Route>
          <Route path="/sells" element={<SellsScreen/>}></Route>
          <Route path="/expenses" element={<ExpensesScreen/>}></Route>
          <Route path="/reports" element={<ReportsScreen/>}></Route>
          </Routes>
          </>
          ):(
          <Routes>

            <Route path="/" element={<LoginScreen />}></Route>
          </Routes>
            
            )
          }
      </div>
    </BrowserRouter>
  );
}

export default App;
