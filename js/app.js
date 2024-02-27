const hostname = window.location.hostname;
const port = window.location.port;
const functionsURL = `http://${hostname}:${port}/.netlify/functions`;

const getRoute = async () => {
  const data = await fetch(`${functionsURL}/route`).then(response => response.json());
  console.log(data);
  return data;
};

getRoute();
