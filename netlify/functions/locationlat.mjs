const GOOGLE_PLACE_BASE_URL = 'https://places.googleapis.com/v1/';

/**
 * get the photo from the city name or the current location
 */
export default async (req, context) => {
  const fullURL = req.url;
  const cityName = new URL(fullURL).searchParams.get('city') ?? context.geo.city;
  const mapApiKey = Netlify.env.get('GOOGLE_API_KEY');

  return new Response(
    JSON.stringify({
      cityName,
      ...(await getLocation(cityName, mapApiKey)),
    })
  );
};

/**
 * get the photo from the photo ID of google map
 *
 * @param {string} photoId
 * @param {string} map_api_key google map api key
 * @returns the uri of the photoid or empty string if not found
 */
const getPhotoById = async (photoId, map_api_key) => {
  console.log(`first photo id: ${photoId}`);
  const url = `${GOOGLE_PLACE_BASE_URL}${photoId}/media?maxHeightPx=4000&maxWidthPx=4000&skipHttpRedirect=true&key=${map_api_key}`;
  const fetchPhotos = await fetch(url);
  const data = await fetchPhotos.json();

  return data?.photoUri ?? '';
};

/**
 * get the photo from the city name
 *
 * @param {string} name city name
 * @param {string} map_api_key google map api key
 * @returns the uri of the photoid or empty string if not found
 */
const getLocation = async (name, map_api_key) => {
  return fetch(`${GOOGLE_PLACE_BASE_URL}places:searchText`, {
    method: 'POST',
    body: JSON.stringify({
      textQuery: name,
      languageCode: 'en',
    }),
    headers: {
      'X-Goog-Api-Key': map_api_key,
      'X-Goog-FieldMask':
        'places.accessibilityOptions,places.formattedAddress,places.photos,places.allowsDogs,places.rating,places.userRatingCount,places.internationalPhoneNumber,places.editorialSummary,places.reviews,places.location',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => data.places)
    .then(data => data[0])
    .then(data => ({
      latitude: data.location.latitude,
      longitude: data.location.longitude,
    }))
    .catch(error => console.log(`we got following error: {error}`));
};
