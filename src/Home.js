import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
export const Home = () => {
  const [flights, setFlights] = useState([]);
  const [travelDate, setTravelDate] = useState(null);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [returnDate, setReturnDate] = useState(null);

  const API_URL = "http://localhost:3000/flights";

  useEffect(() => {
    getFLights(
      "?source=Pune&destination=Delhi&travel_date=" +
        getFormattedDate(new Date())
    );
  }, []);

  const getFLights = (url) => {
    fetch(API_URL + url)
      .then((response) => response.json())
      .then((data) => setFlights(data))
      .catch((error) => {
        console.log(error);
      });
  };

  const getFormattedDate = (date) => {
    const today = date;
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "-" + mm + "-" + yyyy;
  };

  const search = () => {
    if (source && destination && travelDate) {
      let url = `?source=${source}&destination=${destination}&travel_date=${getFormattedDate(
        travelDate
      )}`;
      if (returnDate) {
        url += `&return_date=${returnDate}`;
      }
      getFLights(url);
    }
  };

  const getFormattedTime = (time) => {
    return new Date(time).toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-2">
          <label>Source City: *</label>
          <select
            value={source}
            className="form-control"
            onChange={(v) => setSource(v.target.value)}
          >
            <option value="" disabled></option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
        <div className="col-sm-2">
          <label>Destination City: *</label>
          <select
            value={destination}
            className="form-control"
            onChange={(v) => setDestination(v.target.value)}
          >
            <option value="" disabled></option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
        <div className="col-sm-2">
          <label>Travel Date: *</label>
          <DatePicker
            className="form-control"
            onChange={(v) => setTravelDate(v)}
            defaultValue={travelDate}
            value={travelDate}
          />
        </div>
        <div className="col-sm-2">
          <label>Return Date:</label>
          <DatePicker
            className="form-control"
            onChange={(v) => setReturnDate(v)}
            defaultValue={returnDate}
            value={returnDate}
          />
        </div>
        <div className="col-sm-2">
          <label>Filter</label>
          <button
            className="btn btn-block btn-primary"
            onClick={search}
            type="submit"
          >
            {" "}
            Search
          </button>
        </div>
      </div>

      <h4>Total number of results: {flights.length}</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Airline Name</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Duration</th>
            <th>No. Of Stops</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {flights.length == 0 ? (
            <tr>
              <td colSpan="8">No flights found</td>
            </tr>
          ) : (
            flights.map((flight) => {
              return (
                <tr key={flight.id}>
                  <td>{flight.number}</td>
                  <td>{flight.airline_name}</td>
                  <td>{getFormattedTime(flight.departure_time)}</td>
                  <td>{getFormattedTime(flight.arrival_time)}</td>
                  <td>{flight.duration} hrs</td>
                  <td>{flight.no_of_stops}</td>
                  <td>Rs. {flight.price}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
};
