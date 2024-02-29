export default async (req, context) => {
  const fullURL = req.url;
  const test = Netlify.env.get('test');
  const map_key = Netlify.env.get('map_key');
  return new Response(
    JSON.stringify({ 'my test json': 'route.mjs', envTest: test, map_key: map_key, req: JSON.stringify(req), context })
  );
};
