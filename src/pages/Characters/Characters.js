import "./Characters.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://marvel----backend.herokuapp.com/characters"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading === true ? (
    <p> en cours de chargement...</p>
  ) : (
    <div className="main-characters">
      <div className="container">
        <div className="characters">
          {data.results.map((character) => {
            const imgGifSrc =
              character.thumbnail.path + "." + character.thumbnail.extension;
            console.log(imgGifSrc);
            return (
              <Link to={`/character/${character._id}`} key={character._id}>
                <div className="character">
                  <h3>{character.name}</h3>

                  {character.description.length > 0 ? (
                    <img
                      className="character-img"
                      src={imgGifSrc}
                      alt={character.name}
                    />
                  ) : (
                    <img
                      className="character-img"
                      src={imgGifSrc}
                      alt={character.name}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Characters;
