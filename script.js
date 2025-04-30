(async function loadGallery() {
  // Your GitHub details
  const username = 'chad-collins';
  const repo = 'chad-collins.github.io';
  const branch = 'main';

  const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/images?ref=${branch}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`Error fetching list: ${res.statusText}`);
    const items = await res.json();
    const gallery = document.getElementById('gallery');

    // Use the API's download_url directly for each image
    items
      .filter(item => /\.(jpe?g|png|gif|webp)$/i.test(item.name))
      .forEach(item => {
        const img = document.createElement('img');
        img.src = item.download_url; // direct link to raw file
        img.alt = item.name;
        gallery.appendChild(img);
      });
  } catch (err) {
    console.error(err);
  }
})();
