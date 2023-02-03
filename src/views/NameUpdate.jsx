import { useState } from "react";
import "./NameUpdate.css";

// import { createClient } from "contentful-management";
const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: "CFPAT-HPgZzJrSBWw7tZvKo099X0Ua7d3y7XzAD9Ugk8cvceM",
});

const NameUpdate = () => {
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDescription: "",
  });
  const [error, setError] = useState({ eventTitle: "", eventDescription: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;

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

      {(formData.eventTitle.length >= 3 && formData.eventDescription.length) >=
      3 ? (
        <button className="button" type="submit">
          Submit
        </button>
      ) : null}
      {/* {!error.eventTitle && !error.eventDescription ? (
        <button className="button" type="submit">
          Submit
        </button>
      ) : null} */}
    </form>
  );

  // <form
  //   style={{
  //     position: "absolute",
  //     top: "50vh",
  //     left: "15%",
  //   }}
  //   onSubmit={handleSubmit}
  // >
  //   <h1
  //     style={{
  //       background: "white",
  //       borderRadius: "10px",
  //       width: "fit-content",
  //       padding: "10px",
  //       fontSize: "40px",
  //     }}
  //   >
  //     Event Title
  //   </h1>
  //   <input
  //     style={{
  //       fontSize: "30px",
  //       padding: "30px",
  //       marginRight: "20px",
  //       minWidth: "400px",
  //       borderRadius: "10px",
  //     }}
  //     placeholder="Write your event title here !!!"
  //     type="text"
  //     name="eventTitle"
  //     onChange={handleChange}
  //   />
  //   {/* <input type="text" name="eventDescription" /> */}
  //   <button
  //     onMouseOver="this.style.color='red'"
  //     style={{
  //       background: "white",
  //       borderRadius: "10px",
  //       width: "fit-content",
  //       padding: "10px",
  //       fontSize: "40px",
  //     }}
  //     type="submit"
  //   >
  //     Submit
  //   </button>
  // </form>
  // );
};

export default NameUpdate;

// Backup for getting an entry
// const NameUpdate = async () => {
// (eventTitle, newName)

// Retrieve the entry
// const space = await client.getSpace("3seggq75gekz");
// // const environment = await space.getEnvironment("master");
// const env = await space.getEnvironment("master");
// console.log("The environoment is : ", env);

// Modify the name field
// entry.fields.name["en-US"] = newName;

// Update the entry
// await entry.update();

//   console.log(`Entry "${eventTitle}" name updated to "${newName}"`);
// };
// catch (error) {
//   console.error(error);
// }
// };

// This code is working for retrieving my entry in contentful: NICE !

// import { useState, useEffect } from "react";
// import { createClient } from "contentful";

// const client = createClient({
//   space: "3seggq75gekz",
//   accessToken: "dri45iG7hNQmgyIfpE1p3QQiF_geMBs3DDL6x8OxeYY",
// });

// function FormEntry() {
//   const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     client
//       .getEntries({
//         content_type: "form",
//       })
//       .then((response) => setEntries(response.items));
//   }, []);

//   return (
//     <div>
//       {entries.map((entry) => (
//         <p style={{ fontSize: "40px" }} key={entry.sys.id}>
//           {entry.fields.eventTitle}
//         </p>
//       ))}
//     </div>
//   );
// }
// export default FormEntry;
