document.addEventListener('DOMContentLoaded', function() {
    // Get car ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');
    
    // Find the car in our data
    const car = carsData.find(car => car.id === carId);
    
    if (car) {
        // Update page title
        document.title = `${car.title} | Motorx`;
        
        // Update breadcrumb
        const breadcrumbTitle = document.querySelector('.breadcrumb-title');
        if (breadcrumbTitle) {
            breadcrumbTitle.textContent = car.title;
        }
        
        // Update car images
        const galleryContainer = document.querySelector('.property-gallary2 .swiper-wrapper');
        if (galleryContainer) {
            galleryContainer.innerHTML = car.images.map(img => `
                <div class="swiper-slide">
                    <img src="${img}" alt="${car.title}">
                </div>
            `).join('');
            
            // Reinitialize swiper if it exists
            if (typeof Swiper !== 'undefined') {
                new Swiper('.property-gallary2', {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    loop: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            }
        }
        
        // Update car details
        const updateElement = (selector, content) => {
            const element = document.querySelector(selector);
            if (element) element.textContent = content;
        };
        
        updateElement('.car-title', car.title);
        updateElement('.car-price', car.price);
        updateElement('.car-category', car.category);
        updateElement('.car-description', car.description);
        
        // Update features
        const featuresList = document.querySelector('.listing-info');
        if (featuresList) {
            featuresList.innerHTML = `
                <div class="row">
                    <div class="col-xl-6 col-md-6 item">
                        <div class="inner listing-infor-box">
                            <div class="icon">
                                <i class="icon-Vector5"></i>
                            </div>
                            <div class="content">
                                <div class="name">Make</div>
                                <div class="value">${car.make || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 item">
                        <div class="inner listing-infor-box">
                            <div class="icon">
                                <i class="icon-Group-15"></i>
                            </div>
                            <div class="content">
                                <div class="name">Model</div>
                                <div class="value">${car.model || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 item">
                        <div class="inner listing-infor-box">
                            <div class="icon">
                                <i class="icon-Vector-22"></i>
                            </div>
                            <div class="content">
                                <div class="name">Year</div>
                                <div class="value">${car.year || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 item">
                        <div class="inner listing-infor-box">
                            <div class="icon">
                                <i class="icon-Group-16"></i>
                            </div>
                            <div class="content">
                                <div class="name">Mileage</div>
                                <div class="value">${car.mileage || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 item">
                        <div class="inner listing-infor-box">
                            <div class="icon">
                                <i class="icon-Group-17"></i>
                            </div>
                            <div class="content">
                                <div class="name">Transmission</div>
                                <div class="value">${car.transmission || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 item">
                        <div class="inner listing-infor-box">
                            <div class="icon">
                                <i class="icon-Group-18"></i>
                            </div>
                            <div class="content">
                                <div class="name">Fuel Type</div>
                                <div class="value">${car.fuelType || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 item">
                        <div class="inner listing-infor-box">
                            <div class="icon">
                                <i class="icon-Group-19"></i>
                            </div>
                            <div class="content">
                                <div class="name">Engine</div>
                                <div class="value">${car.engine || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 item">
                        <div class="inner listing-infor-box">
                            <div class="icon">
                                <i class="icon-Group-20"></i>
                            </div>
                            <div class="content">
                                <div class="name">Horsepower</div>
                                <div class="value">${car.horsepower || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 item">
                        <div class="inner listing-infor-box">
                            <div class="icon">
                                <i class="icon-Group-21"></i>
                            </div>
                            <div class="content">
                                <div class="name">Seats</div>
                                <div class="value">${car.seats || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 item">
                        <div class="inner listing-infor-box">
                            <div class="icon">
                                <i class="icon-Vector-23"></i>
                            </div>
                            <div class="content">
                                <div class="name">Doors</div>
                                <div class="value">${car.doors || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-md-6 item">
                        <div class="inner listing-infor-box">
                            <div class="icon">
                                <i class="icon-Vector-24"></i>
                            </div>
                            <div class="content">
                                <div class="name">Color</div>
                                <div class="value">${car.color || 'N/A'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Update features list
        const featuresContainer = document.querySelector('#tf-features');
        if (featuresContainer && car.features) {
            featuresContainer.innerHTML = car.features.map(feature => `
                <div class="tf-listing-info-item">
                    <i class="icon-check"></i>
                    <span>${feature}</span>
                </div>
            `).join('');
        }
        
        // Update location
        const locationElement = document.querySelector('.listing-address');
        if (locationElement && car.location) {
            locationElement.querySelector('p').textContent = car.location;
        }
        
        // Update rating
        const ratingElement = document.querySelector('.rating-number');
        if (ratingElement) {
            ratingElement.textContent = car.rating || '4.5';
        }
        
        // Update reviews count
        const reviewsElement = document.querySelector('.reviews-count');
        if (reviewsElement) {
            reviewsElement.textContent = car.reviews ? `(${car.reviews} Reviews)` : '';
        }
    } else {
        // Car not found, redirect to 404 or home
        window.location.href = '404.html';
    }
});
