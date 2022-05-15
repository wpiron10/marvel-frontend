import "./Favorites.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
const Favorites = () => {
  // Recupération de l'objet Character dans un tab
  let FavoritesCookiesCharStr = Cookies.get(`tokenFavoritesCharacters`);
  let FavoritesCookiesCharObj;
  if (FavoritesCookiesCharStr) {
    let FavoritesCookiesCharObj = JSON.parse(FavoritesCookiesCharStr);
  }
  let FavoritesCharTab = [];
  FavoritesCharTab.push(FavoritesCookiesCharObj);
  // Recupération de l'objet Comic dans un tab
  let FavoritesCookiesComStr = Cookies.get(`tokenFavoritesComics`);
  let FavoritesCookiesComObj;
  if (FavoritesCookiesComStr) {
    let FavoritesCookiesComObj = JSON.parse(FavoritesCookiesComStr);
  }

  let FavoritesComTab = [];
  FavoritesComTab.push(FavoritesCookiesComObj);

  return (
    <div>
      <div>
        {FavoritesCharTab.map((favorite, index) => {
          return (
            <div className="main-favorites" key={index}>
              <div className="container">
                <div className="title-fav">
                  <h2>Vos Personnages favoris</h2>
                </div>
              </div>
              <div className="container">
                {FavoritesCharTab.length > 1 ? (
                  <div className="content-card-fav">
                    <div className="favorite">
                      <h3 className="favorite-title">{favorite[index].name}</h3>
                      <img
                        className="favorite-img"
                        src={
                          favorite[index].thumbnail.path +
                          "." +
                          favorite[index].thumbnail.extension
                        }
                        alt={favorite[index].name}
                      />
                      {favorite[index].description && (
                        <div key={index}>{favorite[index].description}</div>
                      )}
                      <Link
                        to={`/comics/${favorite[index]._id}`}
                        className="favorite-btn-com"
                      >
                        <button className="btn-com">Voir les comics</button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="no-favorite">
                    <h4>Vous n'avez pas de favori.</h4>{" "}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <div className="main-favorites">
          <div className="container">
            <div className="title-fav">
              <h2>Vos Comics favoris</h2>
            </div>
          </div>

          <div className="container">
            {FavoritesComTab.map((favorite, index) => {
              return FavoritesComTab.length > 1 ? (
                <div key={index} className="content-card-fav">
                  <div className="favorite">
                    <h3 className="favorite-title">{favorite[index].title}</h3>
                    <div>
                      <img
                        className="favorite-img"
                        src={
                          favorite[index].thumbnail.path +
                          "." +
                          favorite[index].thumbnail.extension
                        }
                        alt={favorite[index].name}
                      />{" "}
                    </div>
                    {/* {favorite[index].description && (
                    <div key={index}>{favorite[index].description}</div>
                  )} */}
                  </div>
                  {/* </Link> */}
                </div>
              ) : (
                <div className="no-favorite" key={index}>
                  <h4>Vous n'avez pas de favori.</h4>{" "}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
