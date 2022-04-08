const fs = require("fs");

async function organization() {
  const orgs = ["facebook", "google", "amzn"];
  for (const org of orgs) {
    const data = await get(`https://api.github.com/orgs/${org}`);
    console.log(data);
  }
  writeFile("organization.txt", JSON.stringify(orgs));
}

function get(url) {
  const options = {
    method: "GET",
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
