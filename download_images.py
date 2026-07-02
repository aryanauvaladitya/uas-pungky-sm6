import os
import urllib.request

images = {
    'hemat-a.jpg': 'https://images.unsplash.com/photo-1544681280-d2dc1e175dc8?auto=format&fit=crop&w=400&q=80',
    'mix-b.jpg': 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&w=400&q=80',
    'mix-c.jpg': 'https://images.unsplash.com/photo-1544681280-d2dc1e175dc8?auto=format&fit=crop&w=400&q=80',
    'mix-d.jpg': 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&w=400&q=80',
    'mix-e.jpg': 'https://images.unsplash.com/photo-1544681280-d2dc1e175dc8?auto=format&fit=crop&w=400&q=80',
    'chicken-teri-a.jpg': 'https://images.unsplash.com/photo-1615591079361-9c864b732fb4?auto=format&fit=crop&w=400&q=80',
    'chicken-teri-b.jpg': 'https://images.unsplash.com/photo-1615591079361-9c864b732fb4?auto=format&fit=crop&w=400&q=80',
    'chicken-katsu.jpg': 'https://images.unsplash.com/photo-1615996001375-c7ef13294436?auto=format&fit=crop&w=400&q=80',
    'beef-teri-a.jpg': 'https://images.unsplash.com/photo-1544681280-d2dc1e175dc8?auto=format&fit=crop&w=400&q=80',
    'beef-teri-b.jpg': 'https://images.unsplash.com/photo-1544681280-d2dc1e175dc8?auto=format&fit=crop&w=400&q=80',
    'chicken-spicy-teri.jpg': 'https://images.unsplash.com/photo-1615591079361-9c864b732fb4?auto=format&fit=crop&w=400&q=80',
    
    'ebi-furay.jpg': 'https://images.unsplash.com/photo-1615996001375-c7ef13294436?auto=format&fit=crop&w=400&q=80',
    'egg-roll.jpg': 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?auto=format&fit=crop&w=400&q=80',
    'chicken-spicy.jpg': 'https://images.unsplash.com/photo-1615591079361-9c864b732fb4?auto=format&fit=crop&w=400&q=80',
    'ekkado.jpg': 'https://images.unsplash.com/photo-1544681280-d2dc1e175dc8?auto=format&fit=crop&w=400&q=80',
    
    'strawberry-tea.jpg': 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=400&q=80',
    'lychee-tea.jpg': 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=400&q=80',
    'jasmine-tea.jpg': 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=400&q=80',
}

out_dir = r"c:\Users\Septian Rafli S\OneDrive\Documents\Documents\tugas  tugas\uas-pungky-sm6\frontend\src\assets\images"
os.makedirs(out_dir, exist_ok=True)

for filename, url in images.items():
    path = os.path.join(out_dir, filename)
    if not os.path.exists(path):
        print(f"Downloading {filename}...")
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
                data = response.read()
                out_file.write(data)
        except Exception as e:
            print(f"Failed to download {filename}: {e}")
    else:
        print(f"{filename} already exists.")
