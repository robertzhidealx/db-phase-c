const fs = require("fs");
require("dotenv").config();

const token = process.env.TOKEN;
console.log(token);

async function organization() {
  const orgs = ["facebook", "google", "amzn"];
  const db = [];
  for (const org of orgs) {
    const {
      id,
      login,
      name,
      description,
      email,
      created_at,
      updated_at,
      location,
      type,
    } = await get(`https://api.github.com/orgs/${org}`);
    db.push(
      `${id},${login},${name},${description},${email},${created_at},${updated_at},${location},${type}`
    );
  }
  writeFile("organization.txt", db.join("\n"));
}

function get(url) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
    },
  };
  return fetch(url, options).then((res) => res.json());
}

function writeFile(fileName, content) {
  fs.writeFile(fileName, content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

organization();
