export default async (req, context) => {
  const test = Netlify.env.get('test');
  return new Response(JSON.stringify({ 'my test json': 'route.mjs', envTest: test }));
};
