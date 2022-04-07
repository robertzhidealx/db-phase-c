fetch("https://api.github.com/orgs/facebook")
  .then((res) => res.json())
  .then((data) => console.log(data));
