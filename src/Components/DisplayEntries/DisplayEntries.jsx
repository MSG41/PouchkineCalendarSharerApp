import React, { useState, useEffect } from "react";
import "./DisplayEntries.scss";

const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: "CFPAT-HPgZzJrSBWw7tZvKo099X0Ua7d3y7XzAD9Ugk8cvceM",
});

const DisplayEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await client
        .getSpace("3seggq75gekz")
        .then((space) => space.getEnvironment("master"))
        .then((environment) => environment.getEntries({ content_type: "form" }))
        .then((entries) => setEntries(entries.items))
        .catch(console.error);
    };

    fetchEntries();
  }, []);

  return (
    <div className="center">
      <div className="wrapper-entries">
        {" "}
        <h3>DATA: </h3>
        {entries.map((entry) => (
          <div className="entry" key={entry.sys.id}>
            <h3>Event Title: {entry.fields.eventTitle["en-US"]}</h3>
            <p>Event Description: {entry.fields.eventDescription["en-US"]}</p>
            <p>Location: {entry.fields.location["en-US"]}</p>
            <p>Date: {entry.fields.pouchkineDate["en-US"]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayEntries;
