import { useState } from "react";
import "./NameUpdate.css";

const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: "CFPAT-HPgZzJrSBWw7tZvKo099X0Ua7d3y7XzAD9Ugk8cvceM",
});

const NameUpdate = () => {
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDescription: "",
    pouchkineDate: "",
  });

  const [error, setError] = useState({ eventTitle: "", eventDescription: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "pouchkineDate") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      if (value.length <= 0 || value.length < 3 || value.length > 60) {
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
    if (!error.eventTitle && !error.eventDescription) {
      // submit form data
      alert("The form is submitted!!!!!! Bravo!!!", !error);
    } else alert("Event title must be between 5 and 60 characters", error);

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
                "en-US": new Date().toISOString(),
              },
            },
          })
        )
        .then((entry) => console.log(entry))
        .catch(console.error);
      console.log("the Title is submitted!!!!!!!! bravo", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">
        Event Title
        <input
          type="text"
          name="eventTitle"
          value={formData.eventTitle}
          onChange={handleChange}
        />
      </label>

      <label className="label">
        Event Description
        <input
          type="text"
          name="eventDescription"
          value={formData.eventDescription}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="pouchkineDate"
        valueAsDate={new Date(formData.pouchkineDate)}
        onChange={handleChange}
      />

      {(formData.eventTitle.length >= 3 && formData.eventDescription.length) >=
      3 ? (
        <button className="button" type="submit">
          Submit
        </button>
      ) : null}
    </form>
  );
};

export default NameUpdate;
