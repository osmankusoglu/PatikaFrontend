import { useState, useEffect } from "react";
import "./Main.css";
import axios from "axios";
import HeaderImage from "../components/Star-wars-logo-new-tall.webp";

function Main() {
  const [starships, setStarships] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStarship, setSelectedStarship] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const response = await axios.get("https://swapi.dev/api/starships/");
        setStarships(response.data.results);
        setNextPage(response.data.next);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStarships();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setSelectedStarship(null);
    } else {
      const results = starships.filter(
        (starship) =>
          starship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (starship.model &&
            starship.model.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSearchResults(results);
      setSelectedStarship(null);
    }
  };

  const handleStarshipClick = (starship) => {
    setSelectedStarship(starship);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleLoadMore = async () => {
    if (nextPage) {
      try {
        const response = await axios.get(nextPage);
        const newData = response.data;

        if (newData.results && newData.results.length > 0) {
          setStarships((prevStarships) => [
            ...prevStarships,
            ...newData.results,
          ]);
        }

        setNextPage(newData.next || null);
      } catch (error) {
        console.error("Error fetching more starships:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <img
          src={HeaderImage}
          alt="Description of the image"
          className="header-image"
          style={{ width: "600px" }}
        />
        <div className="search-container">
          <p>Name / Model </p>
          <input
            type="text"
            placeholder="Search starships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Filter
          </button>
        </div>
      </div>
      <ul className="starship-list">
        {searchResults.length > 0
          ? searchResults.map((starship, index) => (
              <li
                key={index}
                className="starship-item"
                onClick={() => handleStarshipClick(starship)}
              >
                <img
                  src="https://img1.cgtrader.com/items/695727/2b2d3a2bea/large/star-wars-falcon-ship-3d-model-fbx-blend.jpg"
                  className="starship-image"
                  alt={starship.name}
                />
                <br />
                <strong>Name:</strong> {starship.name}
                <br />
                <strong>Model:</strong> {starship.model}
                <br />
                <strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}
                <br />
                <br />
              </li>
            ))
          : starships.map((starship, index) => (
              <li
                key={index}
                className="starship-item"
                onClick={() => handleStarshipClick(starship)}
              >
                <img
                  src="https://img1.cgtrader.com/items/695727/2b2d3a2bea/large/star-wars-falcon-ship-3d-model-fbx-blend.jpg"
                  className="starship-image"
                  alt={starship.name}
                />
                <br />
                <h3>{starship.name}</h3>
                <br />
                <span>
                  <strong>Model:</strong> {starship.model}
                </span>
                <br />
                <span>
                  <strong>Speed:</strong> {starship.max_atmosphering_speed}
                </span>
                <br />
                <br />
              </li>
            ))}
      </ul>
      <div className="load-more-container">
        <button onClick={handleLoadMore} className="load-more-button">
          Load More Ships
        </button>
      </div>
      {selectedStarship && modalVisible && (
        <div className="modal-container">
          <div className="modal-content">
            <h2>{selectedStarship.name}</h2>
            <img
              src="https://img1.cgtrader.com/items/695727/2b2d3a2bea/large/star-wars-falcon-ship-3d-model-fbx-blend.jpg"
              className="starship-image"
              alt={selectedStarship.name}
            />
            <p>
              <strong>Model:</strong> {selectedStarship.model}
            </p>
            <p>
              <strong>Hyperdrive Rating:</strong>{" "}
              {selectedStarship.hyperdrive_rating}
            </p>
            <p>
              <strong>Passengers:</strong> {selectedStarship.passengers}
            </p>
            <p>
              <strong>Max atmosphering speed:</strong>{" "}
              {selectedStarship.max_atmosphering_speed}
            </p>
            <p>
              <strong>Manufacturer:</strong> {selectedStarship.manufacturer}
            </p>
            <p>
              <strong>Crew:</strong> {selectedStarship.crew}
            </p>
            <p>
              <strong>Cargo capacity:</strong> {selectedStarship.cargo_capacity}
            </p>
            <button onClick={handleCloseModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
