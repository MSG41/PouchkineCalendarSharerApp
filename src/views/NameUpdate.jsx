// import { createClient } from "contentful-management";
const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: "CFPAT-HPgZzJrSBWw7tZvKo099X0Ua7d3y7XzAD9Ugk8cvceM",
});
const NameUpdate = () => {
  client
    .getSpace("3seggq75gekz")
    .then((space) => space.getEnvironment("master"))
    .then((environment) =>
      environment.createEntry("form", {
        fields: {
          eventTitle: {
            "en-US": "This is a new entry - yayyyy it works super nicely !!!! ",
          },
        },
      })
    )
    .then((entry) => console.log(entry))
    .catch(console.error);

  return (
    <form>
      <input type="text" name="field1" />
      <input type="text" name="field2" />
      <button type="submit">Submit</button>
    </form>
  );
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
