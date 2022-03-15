import { useEffect, useState } from "react";
import "./App.css";
import AppContext from "./AppContext";
import Filter from "./components/Filter";
import Header from "./components/Header";
import Products from "./components/Products";
import UserContext from "./UserContext";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const getData = async () => {
    const productsResponse = await fetch("https://fakestoreapi.com/products");
    const productsJson = await productsResponse.json();
    console.log(productsJson);
    setProducts(productsJson);
    setFiltered(productsJson);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ username: "jjj777", phone: "555-5555-5555" }}>
      <AppContext.Provider value={{ 
        products,
        filtered,
        setFiltered,
        selectedCategory,
        setSelectedCategory,
      }}>
        <Header />
        <div className="container my-container">
          <Filter />
          <Products />
        </div>
      </AppContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
