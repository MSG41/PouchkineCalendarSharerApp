import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://api.contentful.com/spaces/<space_id>/entries",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer <api_key>",
            "Content-Type": "application/vnd.contentful.management.v1+json",
          },
          body: JSON.stringify({
            fields: formData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error creating entry: ${response.statusText}`);
      }

      console.log("Entry created");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="field1">Field 1</label>
        <input
          type="text"
          id="field1"
          name="field1"
          value={formData.field1}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="field2">Field 2</label>
        <input
          type="text"
          id="field2"
          name="field2"
          value={formData.field2}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
