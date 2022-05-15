import "./Characters.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [favoritesCharacters, setFavoritesCharacters] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [favoriteCheck, setfavoriteCheck] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel----backend.herokuapp.com/characters?name=${searchName}&page=${page}&skip=${skip}&limit=${limit}`
        );

        setData(response.data);
        setTotalPages(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [searchName, page, limit, skip, favoritesCharacters]);

  const handlePreviousPage = () => {
    setPage(page - 1); //3

    if (page === 2) setSkip(0);
    else {
      setSkip(limit * (page - 2));
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);

    if (page === 1) setSkip(limit * page);
    else {
      setSkip(limit * page);
    }
  };

  const handleAddtoFavorites = (character) => {
    let CheckList = [...favoritesCharacters];
    CheckList.push(character);

    let strFav = JSON.stringify(CheckList);
    console.log(strFav, "strfav");
    Cookies.set(`tokenFavoritesCharacters`, strFav, {
      expires: 7,
    });
    setFavoritesCharacters(CheckList);
  };

  return isLoading === true ? (
    <p> en cours de chargement...</p>
  ) : (
    <>
      <div className="main-characters">
        <div className="container">
          <div className="search-content">
            <div className="search-bar">
              <input
                value={searchName}
                type="text"
                placeholder="Recherchez un personnage"
                onChange={(event) => {
                  setSearchName(event.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="main-characters">
        <div className="container">
          <div className="pagination-content">
            <div className="pagination">
              {page > 1 && (
                <button onClick={handlePreviousPage}>Page précédente</button>
              )}
              {page} sur {totalPages}
              {page < totalPages && (
                <button onClick={handleNextPage}>Page suivante</button>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="characters">
            {data.results.map((character, index) => {
              const imgGifSrc =
                character.thumbnail.path + "." + character.thumbnail.extension;
              const regex = "/image_not_available";
              return (
                // character.thumbnail.path.search(regex) !==
                // -1(
                <div key={character._id} className="content-card-characters">
                  <Link to={`/comics/${character._id}`}>
                    <div className="character">
                      <h3>{character.name}</h3>
                      <div>
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
                    </div>
                  </Link>

                  <div className="content-options">
                    <div
                      className="content-fav"
                      onClick={() => {
                        handleAddtoFavorites(character, index);
                      }}
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-heart"
                        className={
                          favoriteCheck === true ? "addingToFav" : "removeToFav"
                        }
                        onClick={() => {
                          handleAddtoFavorites(character, index);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
              // );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Characters;
