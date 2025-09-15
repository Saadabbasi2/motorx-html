(function(){
  const DATA_URL = 'assets/data/cars.json';

  function getId(){
    const p = new URLSearchParams(window.location.search);
    return p.get('id');
  }

  function slugify(str){
    return String(str||'')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g,'-')
      .replace(/^-+|-+$/g,'');
  }

  async function loadData(){
    const res = await fetch(DATA_URL, {cache:'no-store'});
    if(!res.ok) throw new Error('Failed to load car data');
    return res.json();
  }

  function q(sel, root=document){ return root.querySelector(sel); }

  function setText(sel, text){ const el=q(sel); if(el && text!=null) el.textContent = text; }

  function formatAED(n){ try{ return new Intl.NumberFormat('en-AE').format(n) + ' AED'; }catch{ return n + ' AED'; } }

  function updateGallery(images){
    const wrapMain = q('.property-gallary2 .swiper-wrapper');
    const wrapThumb = q('.property-gallary .swiper-wrapper');
    if(!wrapMain || !wrapThumb) return;

    const slide = (src)=>`<div class="swiper-slide"><img src="${src}" alt="Image"></div>`;
    const html = (images||[]).map(slide).join('');
    if(html){
      wrapMain.innerHTML = html;
      wrapThumb.innerHTML = html;
    }
    // Re-init swiper if global init exists
    if(window.initSwiperPropertyGallary){
      try { window.initSwiperPropertyGallary(); } catch(e){}
    }
  }

  function updateOverview(car){
    const row = q('.wrap-car-overview .listing-info .row');
    if(!row) return;
    const items = [
      {label:'Condition', value: car.condition},
      {label:'Fuel Type', value: car.fuel},
      {label:'Doors', value: car.doors},
      {label:'Color', value: car.color},
      {label:'Mileage', value: car.mileageLimit},
      {label:'Seats', value: car.seats},
      {label:'Transmission', value: car.transmission},
      {label:'Year', value: car.year}
    ].filter(i=>i.value!=null && i.value!=='');

    row.innerHTML = items.map(i=>`
      <div class="col-xl-6 col-md-6 item">
        <div class="inner listing-infor-box">
          <div class="icon"><i class="icon-Vector5"></i></div>
          <div class="content-listing-info">
            <span class="listing-info-title">${i.label}:</span>
            <p class="listing-info-value">${i.value}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  function updatePage(car){
    // Title and basic
    setText('.title-heading', `${car.brand||''} ${car.model||''}`.trim() || car.model || car.brand);
    setText('.text-address p', car.location||'');

    // Price
    const priceEl = q('.price-wrap .price-sale');
    if(priceEl && car.pricePerDayAED!=null){ priceEl.textContent = `${formatAED(car.pricePerDayAED)}`; }

    // Description
    const desc = q('.wrap-description p');
    if(desc && car.description){ desc.textContent = car.description; }

    // Gallery
    updateGallery(car.images);

    // Overview/specs
    updateOverview(car);

    // Page title
    document.title = `${car.brand||''} ${car.model||''} – Details`.trim();
  }

  async function init(){
    const id = getId();
    if(!id){
      console.warn('No id provided in URL');
      return;
    }
    try{
      const data = await loadData();
      const cars = data.cars||[];
      let car = cars.find(c=>c.id===id);
      if(!car){
        // Fallback: match slug of brand+model (and with year) to support simple IDs
        car = cars.find(c=> slugify(`${c.brand} ${c.model}`) === id || slugify(`${c.brand} ${c.model} ${c.year||''}`) === id);
      }
      if(!car){
        console.warn('Car not found for id:', id);
        return;
      }
      updatePage(car);
    }catch(e){
      console.error('Failed to initialize listing details:', e);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
