(async function loadGallery() {
  const username = 'chad-collins';
  const repo     = 'chad-collins.github.io';
  const branch   = 'main';
  const apiUrl   = `https://api.github.com/repos/${username}/${repo}/contents/images?ref=${branch}`;

  console.log('→ Fetching image list from:', apiUrl);
  try {
    const res = await fetch(apiUrl);
    console.log('← GitHub API status:', res.status);
    if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
    const items = await res.json();
    console.log('← Items returned:', items);

    const gallery = document.getElementById('gallery');
    items
      .filter(i => /\.(jpe?g|png|gif|webp)$/i.test(i.name))
      .forEach(i => {
        const img = document.createElement('img');
        img.src = i.download_url;
        img.alt = i.name;
        gallery.appendChild(img);
      });
  } catch (err) {
    console.error('Gallery load error:', err);
  }
})();
