import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClubsThunk } from "../../store/club";
import { useHistory } from "react-router-dom";

export default function ClubFeed() {
const dispatch = useDispatch()
const clubs = useSelector((state) => state.clubs.allClubs);
const history = useHistory();

  useEffect(() => {
    dispatch(getAllClubsThunk());
  }, [dispatch]);


  return (
    <div className="clubs-feed">
      <h2>Club Feed</h2>
      <button
        style={{
          borderRadius: "50%",
          height: "65px",
          width: "65px",
          margin: "5px",
          backgroundColor: "red",
          color: "white",
        }}
        onClick={() => history.push("/clubs-new")}
      >
        Start a Club
      </button>
      <button
        style={{
          borderRadius: "50%",
          height: "65px",
          width: "65px",
          margin: "5px",
          cursor: "not-allowed",
          backgroundColor: "green",
          color: "white",
        }}
      >
        Build a Stand
      </button>
      <div>
        {clubs &&
          Object.values(clubs).map((club, index) => (
            <div
              key={index}
              onClick={(e) => history.push(`/club/${club.id}`)}
              style={{
                width: "30vw",
                border: "3px solid black",
                margin: "15px",
                cursor: "pointer",
              }}
            >
              <p>{club.id}</p>
              <p>{club.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
