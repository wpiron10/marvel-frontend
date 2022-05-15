import "./ComicCharacterId.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ComicCharacterId = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // const params = useParams();
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel----backend.herokuapp.com/comics/${characterId}`
        );
        // console.log(response, "response data");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading === true ? (
    <p> en cours de chargement...</p>
  ) : (
    <div className="main-charac-ID">
      <div className="container-characID">
        {data.comics.map((comic) => {
          return (
            <div className="charac-ID-content" key={comic._id}>
              <div className="charac-ID-title">
                <h3>{comic.title}</h3>
              </div>
              <img
                className="characID-img"
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
              />
              {comic.description && <p>{comic.description}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComicCharacterId;
