const { instagramDownload } = require("@mrnima/instagram-downloader");

async function test() {
  try {
    console.log("Testing @mrnima/instagram-downloader...");
    const res = await instagramDownload("https://www.instagram.com/reel/DY1xav5liPg");
    console.log("Success:", JSON.stringify(res, null, 2));
  } catch (err) {
    console.error("Error:", err.message);
  }
}

test();




