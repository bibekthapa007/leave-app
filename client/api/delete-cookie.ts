export async function GET(request: Request) {
  console.log('Deleting the cookie');
  return new Response('Deleting the cookie', {
    status: 200,
    headers: { 'Set-Cookie': `Cookie=null` },
  });
}
