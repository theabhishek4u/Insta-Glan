const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');

const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://indown.io/',
  'Origin': 'https://indown.io'
};

async function test() {
  try {
    console.log('Fetching homepage to get cookies and CSRF token...');
    const getRes = await axios.get('https://indown.io/', {
      headers: BROWSER_HEADERS
    });

    const getCookies = getRes.headers['set-cookie'] || [];
    console.log('Set-Cookie headers:', getCookies);
    const cookieHeader = getCookies.map(c => c.split(';')[0]).join('; ');
    console.log('Cookie Header:', cookieHeader);

    const $ = cheerio.load(getRes.data);
    const token = $('input[name="_token"]').val();
    const referer = $('input[name="referer"]').val();
    const locale = $('input[name="locale"]').val();

    console.log('CSRF Token:', token);
    console.log('Referer input:', referer);
    console.log('Locale input:', locale);

    if (!token) {
      console.log('Token not found!');
      return;
    }

    const testUrl = 'https://www.instagram.com/stories/cristiano/3378392817293812938'; // Replace with any story or post URL
    console.log(`Sending POST request to indown.io/download for URL: ${testUrl}...`);

    const postData = qs.stringify({
      referer: referer || 'https://indown.io/en1',
      locale: locale || 'en',
      _token: token,
      link: testUrl
    });

    const postRes = await axios.post('https://indown.io/download', postData, {
      headers: {
        ...BROWSER_HEADERS,
        'Cookie': cookieHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('POST Response status:', postRes.status);
    const $post = cheerio.load(postRes.data);
    
    // Check if result div exists
    const resultHtml = $post('#result').html();
    if (resultHtml) {
      console.log('Success! Result container found:');
      console.log($post('#result').text().trim().substring(0, 1000));
    } else {
      console.log('Result container not found in response. Saving html to indown_result_test.html...');
      require('fs').writeFileSync('indown_result_test.html', postRes.data);
    }
  } catch (err) {
    console.error('Error during testing:', err.message);
    if (err.response) {
      console.error('Response data:', err.response.data.substring(0, 500));
    }
  }
}

test();
