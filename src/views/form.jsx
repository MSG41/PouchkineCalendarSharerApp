import React, { useState } from "react";
import { createClient } from "contentful-management";
import "contentful-management";
import "./Form.css";

const client = createClient({
  accessToken: "dri45iG7hNQmgyIfpE1p3QQiF_geMBs3DDL6x8OxeYY",
});

function Form() {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await client.getSpace("3seggq75gekz").then((space) => {
        // This API call will request an environment with the specified ID
        space.getEnvironment("master").then((environment) => {
          // Now that we have an environment, we can get entries from that space
          environment.getEntries().then((entries) => {
            console.log(entries.items);
          });

          // let's get a content type
          environment.getContentType("form").then((contentType) => {
            // and now let's update its name
            contentType.name = "New Product";
            contentType.update().then((updatedContentType) => {
              console.log("Update was successful", updatedContentType);
            });
          });
        });
      });

      console.log("Success:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="field1" onChange={handleChange} />
      <input type="text" name="field2" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
