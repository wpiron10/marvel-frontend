import "./Comics.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://marvel----backend.herokuapp.com/comics"
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
    <div className="main-comics">
      <div className="container">
        <div className="comics">
          {data.results.map((comics) => {
            return (
              comics.description && (
                <div className="comic-book" key={comics._id}>
                  <h3>{comics.title}</h3>

                  <img
                    src={comics.thumbnail.path + "/portrait_uncanny.jpg"}
                    alt={comics.title}
                  />
                  <p>{comics.description}</p>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comics;
