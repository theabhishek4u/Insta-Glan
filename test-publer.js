const url = 'https://publer.io/api/v1/utility/import-from-url';
const instagramUrl = 'https://www.instagram.com/reel/DYhMbMMsh5w/';

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  },
  body: JSON.stringify({
    url: instagramUrl,
    iphone: false,
  }),
})
  .then(res => res.json())
  .then(data => {
    console.log('Publer Response Status:', data ? 'Received' : 'Empty');
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(err => {
    console.error('Error fetching from Publer:', err);
  });
