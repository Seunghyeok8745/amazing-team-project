const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;
const functionsURL = `${protocol}//${hostname}${port ? `:${port}` : ''}/.netlify/functions`;

const getRoute = async () => {
  const data = await fetch(`${functionsURL}/route`).then(response => response.json());
  console.log(JSON.stringify(data));
  return data;
};

getRoute();
