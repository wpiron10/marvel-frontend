import "./Comics.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [favoritesComics, setFavoritesComics] = useState([]);
  const [favoriteCheck, setfavoriteCheck] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel----backend.herokuapp.com/comics?title=${searchTitle}&page=${page}&skip=${skip}&limit=${limit}`
        );
        console.log(response.data);
        setData(response.data);
        setTotalPages(Math.ceil(response.data.count / limit));

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [searchTitle, page, limit, skip]);

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

  const handleAddtoFavorites = (comic) => {
    let CheckList = [...favoritesComics];
    CheckList.push(comic);

    let strFav = JSON.stringify(CheckList);
    // console.log(strFav, "strfav");
    Cookies.set(`tokenFavoritesComics`, strFav, {
      expires: 7,
    });
    setFavoritesComics(CheckList);
  };

  return isLoading === true ? (
    <p> en cours de chargement...</p>
  ) : (
    <>
      <div className="main-comics">
        <div className="container">
          <div className="search-content">
            <div className="search-bar">
              <input
                value={searchTitle}
                type="text"
                placeholder="Recherchez un comics"
                onChange={(event) => {
                  setSearchTitle(event.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
        <div className="main-comics">
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
        </div>
        <div className="container">
          <div className="comics">
            {data.results.map((comic) => {
              return (
                comic.description && (
                  <div className="content-card" key={comic._id}>
                    <div className="comic-book">
                      <h3>{comic.title}</h3>

                      <img
                        className="comic-img"
                        src={
                          comic.thumbnail.path +
                          "/portrait_uncanny." +
                          comic.thumbnail.extension
                        }
                        alt={comic.title}
                      />

                      <p className="comic-desc">{comic.description}</p>
                    </div>

                    <div className="content-options">
                      <div
                        className="content-fav"
                        onClick={() => {
                          handleAddtoFavorites(comic);
                        }}
                      >
                        <FontAwesomeIcon
                          icon="fa-solid fa-heart"
                          className={
                            favoriteCheck === true
                              ? "addingToFav"
                              : "removeToFav"
                          }
                        />
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comics;
