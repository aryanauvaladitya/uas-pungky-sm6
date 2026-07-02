import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = {
  'strawberry.jpg': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80',
  'lychee.jpg': 'https://images.unsplash.com/photo-1517093602195-b40af9688b46?auto=format&fit=crop&w=400&q=80',
  'tea.jpg': 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=400&q=80',
  'telur.jpg': 'https://images.unsplash.com/photo-1525385966597-9eeb85ed6e0e?auto=format&fit=crop&w=400&q=80',
  'mayo.jpg': 'https://images.unsplash.com/photo-1624803362148-356de1cf6f8d?auto=format&fit=crop&w=400&q=80',
  'salad.jpg': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
  'ebi.jpg': 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?auto=format&fit=crop&w=400&q=80',
  'katsu.jpg': 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=400&q=80',
  'beef.jpg': 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=400&q=80',
  'teriyaki.jpg': 'https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=400&q=80',
  'spicy.jpg': 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&w=400&q=80',
  'mix.jpg': 'https://images.unsplash.com/photo-1544681280-d2dc1e175dc8?auto=format&fit=crop&w=400&q=80',
  'default.jpg': 'https://images.unsplash.com/photo-1580828369018-8686121f1fb6?auto=format&fit=crop&w=400&q=80'
};

const download = (filename, url) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(__dirname, filename));
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', err => {
      fs.unlink(filename, () => reject(err));
    });
  });
};

async function run() {
  for (const [filename, url] of Object.entries(images)) {
    try {
      await download(filename, url);
    } catch (e) {
      console.error(e);
    }
  }
}

run();
