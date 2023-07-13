// @ts-nocheck
import axios from "axios";
import { Pool } from "pg";

async function fetchFlats() {
  const flats = [];

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  };

  const apiUrl =
    "https://www.sreality.cz/api/en/v2/estates?category_main_cb=1&category_type_cb=1&per_page=500";

  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl, { headers })
      .then((response) => {
        console.log("Connection established");
        const data = response.data;
        console.log(data);
        console.log("Data fetched");
        const keyToSave = data._embedded.estates;
        console.log("Data formatted");

        const pool = new Pool({
          user: "avnadmin",
          password: "AVNS_rJ7Ef9SMWujOn8hx5CH",
          host: "pg-34715f9-filipmahnert-b88b.aivencloud.com",
          port: 15666,
          database: "defaultdb",
          ssl: {
            rejectUnauthorized: false,
          },
        });
        console.log("Connected to the database");

        pool
          .connect()
          .then(async (client) => {
            try {
              await client.query("BEGIN");
              await client.query("DELETE FROM flats");
              console.log("Database cleared");

              const insertQuery =
                "INSERT INTO flats (title, image_url) VALUES ($1, $2)";
              console.log("SQL query INSERT ready");

              for (const element of keyToSave) {
                const flat = [element.name, element._links.images[0].href];
                flats.push(flat);
              }

              console.log("Elements saved, ready to insert");

              const insertPromises = flats.map((flat) =>
                client.query(insertQuery, flat)
              );
              await Promise.all(insertPromises);

              await client.query("COMMIT");
              console.log("Inserted rows into the database");

              resolve(flats);
            } catch (error) {
              await client.query("ROLLBACK");
              reject(error);
            } finally {
              client.release();
              pool.end();
              console.log("Connection closed");
            }
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        console.error("Error fetching or processing data", error);
        reject(error);
      });
  });
}

export default function handler(req, res) {
  fetchFlats()
    .then((flats) => {
      res.status(200).json({ flats });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error fetching flats" });
    });
}
