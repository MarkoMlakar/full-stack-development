import React from "react";
import SearchBar from "../searchBar/searchBar";
import ImageList from "../products/imageList/imageList";
import "./home.css";
import { GetImages } from "../../api/imageService";
import Spinner from "../spinner/spinner";

class Home extends React.Component {
  state = { images: [], isLoading: false };

  fetchData = async (term) => {
    try {
      this.setState({ isLoading: true });
      const response = await GetImages(term);
      this.setState({ images: response.data.results });
      this.setState({ isLoading: false });
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    this.fetchData("house");
  }

  OnSearchSubmit = (term) => {
    this.fetchData(term);
  };
  render() {
    return (
      <div className="home">
        <div className="top-section">
          <div className="headline">
            <div data-testid="home-title">Hello Friend</div>
            <div className="subtitle">
              Welcome to the front-end of my full-stack project
            </div>
            <SearchBar onSearch={this.OnSearchSubmit} />
          </div>
        </div>
        <div className="bottom-section">
          {this.state.isLoading ? (
            <div className="home-spinner">
              <Spinner />
            </div>
          ) : (
            <ImageList images={this.state.images} />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
