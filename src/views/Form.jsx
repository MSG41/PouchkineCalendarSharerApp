import moment from "moment";
import { useState } from "react";
import "./Form.css";
import Spinner from "../Components/Spinner/Spinner";

const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

const Form = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShowMessage(false);
  };

  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDescription: "",
    location: "",
    pouchkineDate: moment().format("YYYY-MM-DD"),
    pouchkineTime: moment().format("HH:mm"),
  });

  const [error, setError] = useState({
    eventTitle: "",
    eventDescription: "",
    location: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "pouchkineDate" || name === "pouchkineTime") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (value.length <= 2 || value.length > 500) {
        setError({
          ...error,
          [name]:
            "Event title and description must be between 5 and 500 characters",
        });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
  };

  // Location Suggestions:
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionSelected, setSuggestionSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLocationChange = async (value) => {
    setFormData({ ...formData, location: value });
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=pk.eyJ1Ijoic2FsaW1pdGxlc3MiLCJhIjoiY2tsMDBnbDVnMHYxZzJvbW9qZ3BvajY2bSJ9.G1OmhUI_1cUKsDROu1V9bA`
        );
        const data = await response.json();
        console.log("suggestion data: ", data.features);
        setSuggestions(data.features);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }, 1000);
  };

  const handleLocationSelect = (selectedLocation) => {
    setFormData({ ...formData, location: selectedLocation });
    setSuggestionSelected(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!error.eventTitle && !error.eventDescription) {
      try {
        const response = await client
          .getSpace("3seggq75gekz")
          .then((space) => space.getEnvironment("master"))
          .then((environment) =>
            environment.createEntry("form", {
              fields: {
                eventTitle: {
                  "en-US": formData.eventTitle,
                },
                eventDescription: {
                  "en-US": formData.eventDescription,
                },
                location: {
                  "en-US": formData.location,
                },
                pouchkineDate: {
                  "en-US": new Date(
                    `${formData.pouchkineDate}T${formData.pouchkineTime}:00.000Z`
                    // This fixes the Contentful hour difference ;) !!
                  ).toISOString(),
                },
              },
            })
          )
          .then((entry) => entry.publish())
          .then((entry) => console.log(entry))
          .catch(console.error);

        setFormData({
          eventTitle: "",
          eventDescription: "",
          location: "",
          pouchkineDate: moment().format("YYYY-MM-DD"),
          pouchkineTime: moment().format("HH:mm"),
        });
        console.log("The form was submitted successfully:", response);
      } catch (error) {
        // alert("EROOOR, fill all fields please !!! ");
        console.error("Error:", error);
      }
    } else {
      alert("Event title and description must be between 5 and 60 characters");
    }
    setShowMessage(true);
    setIsLoading(false);
  };

  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        {isLoading && <Spinner />}
        <div className="form-group">
          <label className="label">Event Title</label>
          <input
            type="text"
            name="eventTitle"
            placeholder="Enter event title"
            value={formData.eventTitle}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Event Description</label>
          <textarea
            className="textarea"
            placeholder="Enter event description..."
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="label">Event Location</label>
          <input
            type="text"
            className="input"
            required
            value={formData.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            placeholder="Enter event location"
          />
          {!suggestionSelected && suggestions.length > 0 && (
            <div className="location-suggestions">
              {loading && <Spinner />}

              {suggestions.map((suggestion, index) => (
                <div
                  className="location-suggestion"
                  key={index}
                  onClick={() => handleLocationSelect(suggestion.place_name)}
                >
                  {suggestion.place_name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="label">Event Date</label>
          <input
            type="date"
            name="pouchkineDate"
            value={formData.pouchkineDate}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Event Time</label>
          <input
            type="time"
            name="pouchkineTime"
            value={formData.pouchkineTime}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <button
          className="button"
          type="submit"
          hidden={
            formData.eventTitle.length <= 2 ||
            formData.eventDescription.length <= 2 ||
            !formData.eventTitle ||
            !formData.eventDescription ||
            !formData.pouchkineDate ||
            !formData.pouchkineTime
          }
        >
          Submit
        </button>
        {showMessage && (
          <div className="message">
            <p className="msg">The Form is submitted!</p>
            <button className="message-button" onClick={handleClose}>
              OK
            </button>
          </div>
        )}
      </form>
      <footer className="form-footer">
        <p>&copy; MSG41 Designs</p>
      </footer>
    </div>
  );
};

export default Form;
