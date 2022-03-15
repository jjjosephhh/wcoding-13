import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";

function Filter() {
  const { products, setFiltered, selectedCategory, setSelectedCategory } =
    useContext(AppContext);

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    const categoriesResponse = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const categoriesJson = await categoriesResponse.json();
    console.log(categoriesJson);
    setCategories(categoriesJson);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const s = search.toLowerCase();
    const filteredProducts = products.filter((product) => {
      const titleHasSearch = product.title.toLowerCase().includes(s);
      //const categoryHasSearch = product.category.toLowerCase().includes(s);
      //const descHasSearch = product.description.toLowerCase().includes(s);
      return titleHasSearch; // || categoryHasSearch || descHasSearch;
    });

    const furtherFilteredProducts = filteredProducts.filter((product) => {
      return !selectedCategory || product.category === selectedCategory;
    });

    setFiltered(furtherFilteredProducts);
  }, [search, selectedCategory]);

  return (
    <>
      <input
        className="input is-primary"
        type="text"
        placeholder="Primary input"
        value={search}
        onChange={(event) => {
          const value = event.target.value;
          setSearch(value);
        }}
      />

      <div className="tabs">
        <ul>
          <li>
            <a
              onClick={() => {
                setSelectedCategory("");
                setSearch("");
              }}
            >
              None
            </a>
          </li>
          {categories.map((category) => {
            return (
              <li
                key={`category-${category}`}
                className={category === selectedCategory ? "is-active" : ""}
              >
                <a onClick={() => setSelectedCategory(category)}>{category}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Filter;
