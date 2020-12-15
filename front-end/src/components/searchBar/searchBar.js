import React from "react";
import SearchIcon from "../../assets/icons/pl-icon-search.svg";
import "./searchBar.css";

class SearchBar extends React.Component {
  state = { term: "house" };

  onSearch = (event) => {
    event.preventDefault();
    this.props.onSearch(this.state.term);
  };
  render() {
    return (
      <form onSubmit={this.onSearch}>
        <div className="search-bar">
          <input
            className="input-field"
            placeholder="Looking for something specific?"
            type="text"
            onChange={(e) => {
              this.setState({ term: e.target.value });
            }}
          ></input>
          <img
            src={SearchIcon}
            alt="search-bar"
            className="search-icon"
            style={{ cursor: "pointer" }}
            onClick={this.onSearch}
          ></img>
        </div>
      </form>
    );
  }
}

export default SearchBar;
