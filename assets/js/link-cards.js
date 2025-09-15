(function(){
  function slugify(str){
    return String(str||'')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g,'-')
      .replace(/^-+|-+$/g,'');
  }

  function enhanceLinks(){
    const cards = document.querySelectorAll('.listing-grid-item, .listing-list-item');
    cards.forEach(card => {
      const titleEl = card.querySelector('.listing-top-content .title a, .listing-top-content .title, h6.title a, h6.title');
      const link = card.querySelector('.btn-read-more a.more-link');
      if(!titleEl || !link) return;
      const title = (titleEl.textContent || '').trim();
      if(!title) return;

      // if link already has id parameter, keep it
      const url = new URL(link.getAttribute('href'), window.location.origin);
      if(url.searchParams.has('id')) return;

      const id = slugify(title);
      // keep only page path, add id
      const base = url.pathname.split('/').pop() || 'listing-details.html';
      link.setAttribute('href', `${base}?id=${id}`);
    });
  }

  document.addEventListener('DOMContentLoaded', enhanceLinks);
})();
