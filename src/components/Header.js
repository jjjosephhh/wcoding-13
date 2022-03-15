import { useContext } from "react";
import AppContext from "../AppContext";
import UserContext from "../UserContext";

function Header() {
  const { selectedCategory, setSelectedCategory } = useContext(AppContext);
  const { username, phone } = useContext(UserContext);

  return (
    <section className="hero is-primary">
      <div className="hero-body">
        <p className="title">{username}</p>
        <p className="subtitle">{phone}</p>
        <button
          style={{
              fontWeight: selectedCategory === 'electronics' ? 'bold' : 'normal',
          }}
          onClick={() => setSelectedCategory('electronics')}
          className="button is-warning"
        >
          Apply "electronics" filter
        </button>
      </div>
    </section>
  );
}

export default Header;
