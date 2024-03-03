const recommendation_base_url = 'https://kncv8tj1ee.execute-api.us-west-2.amazonaws.com/dev';

const getCityRecommendation = async (cityName, weather) => {
  const url = encodeURI(`${recommendation_base_url}?city=${cityName}&weather=${weather}`);
  console.log(`recommendation: ${url}`);
  const res = await fetch(url);
  const data = await res.json();
  const recommendation = JSON.parse(data.Answer);
  //   console.log(recommendation);
  return recommendation;
};

const getRestaurantRecommendation = async (cityName, weather) => {
  console.log('Restaurant recommendation called');
  const url = encodeURI(`${recommendation_base_url}/restaurant?city=${cityName}&weather=${weather}`);
  console.log(`restaurant: ${url}`);
  const res = await fetch(url);
  const data = await res.json();
  const recommendation = JSON.parse(data.Answer);
  console.log(`Restaurant: ${JSON.stringify(recommendation)}`);
  return recommendation;
};
