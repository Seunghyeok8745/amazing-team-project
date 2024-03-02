const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;
const basesURL = `${protocol}//${hostname}${port ? `:${port}` : ''}/.netlify/functions`;
const functionName = 'route';

const getRoute = async () => {
  console.log(`BASE backend URL: ${basesURL}`);
  const data = await fetch(`${basesURL}/${functionName}`).then(response => response.json());
  console.log(JSON.stringify(data));
  return data;
};

export const getCurrentLocationByIp = async () => {
  const url = `${basesURL}/currentLocation`;
  const res = await fetch(url);

  //
  if (data.status / 100 !== 2) {
    new Error('cannot call the backend');
  }

  return await res.json();
};

getRoute();
