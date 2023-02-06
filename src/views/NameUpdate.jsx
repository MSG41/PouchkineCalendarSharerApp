import moment from "moment";
import { useState } from "react";
import "./NameUpdate.css";

const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: "CFPAT-HPgZzJrSBWw7tZvKo099X0Ua7d3y7XzAD9Ugk8cvceM",
});

const NameUpdate = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShowMessage(false);
  };

  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDescription: "",
    pouchkineDate: moment().format("YYYY-MM-DD"),
    pouchkineTime: moment().format("HH:mm"),
  });

  const [error, setError] = useState({ eventTitle: "", eventDescription: "" });

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

      if (value.length <= 0 || value.length < 5 || value.length > 500) {
        setError({
          ...error,
          [name]: "Event title must be between 5 and 60 characters",
        });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
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
          pouchkineDate: moment().format("YYYY-MM-DD"),
          pouchkineTime: moment().format("HH:mm"),
        });
        console.log("The form was submitted successfully:", response);
      } catch (error) {
        alert("EROOOR, fill all fields please !!! ");
        console.error("Error:", error);
      }
    } else {
      alert("Event title and description must be between 5 and 60 characters");
    }
    setShowMessage(true);
    setIsLoading(false);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        {isLoading && <div className="spinner"></div>}
        <div className="form-group">
          <label className="label">Event Title</label>
          <input
            type="text"
            name="eventTitle"
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
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
            required
          />
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
          // disabled={
          //   formData.eventTitle.length < 5 ||
          //   formData.eventDescription.length < 5 ||
          //   !formData.eventTitle ||
          //   !formData.eventDescription ||
          //   !formData.pouchkineDate ||
          //   !formData.pouchkineTime
          // }
        >
          Submit
        </button>
      </form>
      {showMessage && (
        <div className="message">
          <p>Thank you! The Form is submitted!</p>
          <button className="message-button" onClick={handleClose}>
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default NameUpdate;
