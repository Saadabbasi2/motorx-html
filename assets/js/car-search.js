document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('carSearchInput');
    if (!searchInput) return;
    
    // Get all car items on the current page
    const carItems = document.querySelectorAll('.listing-grid-item');
    
    // Create a more visible no results message
    const noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'no-results';
    noResultsMessage.style.display = 'none';
    noResultsMessage.style.textAlign = 'center';
    noResultsMessage.style.padding = '20px';
    noResultsMessage.style.gridColumn = '1 / -1';
    noResultsMessage.style.fontSize = '18px';
    noResultsMessage.style.color = '#ff4d4f';
    noResultsMessage.style.fontWeight = '500';
    noResultsMessage.textContent = 'No cars found matching your search. Try a different term.';
    
    // Add the message after the search container
    const searchContainer = document.querySelector('.listing-list-car-grid');
    if (searchContainer) {
        searchContainer.parentNode.insertBefore(noResultsMessage, searchContainer.nextSibling);
    }

    // Function to perform search on current page
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let hasResults = false;
        let visibleCount = 0;

        // If search term is empty, show all cars
        if (!searchTerm) {
            carItems.forEach(item => {
                item.style.display = '';
            });
            noResultsMessage.style.display = 'none';
            return;
        }

        carItems.forEach(item => {
            item.style.display = 'none'; // Hide all items first
            
            // Get all possible text content that might contain the car make/model
            const titleElement = item.querySelector('.title');
            if (!titleElement) return;

            // Get text from title and all its children
            let allText = titleElement.textContent.toLowerCase();
            
            // Also check image alt text if available
            const img = item.querySelector('img');
            if (img && img.alt) {
                allText += ' ' + img.alt.toLowerCase();
            }

            // Check if any part of the text matches the search term
            if (allText.includes(searchTerm)) {
                item.style.display = '';
                hasResults = true;
                visibleCount++;
            }
        });

        // Show no results message if no matches found
        noResultsMessage.style.display = hasResults ? 'none' : 'block';
    }

    // Add event listeners
    searchInput.addEventListener('input', performSearch);
    
    // Also check for search term in URL on page load
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        searchInput.value = searchParam;
        performSearch();
    }
    
    // Update URL when searching (without reloading the page)
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim();
        const url = new URL(window.location.href);
        if (searchTerm) {
            url.searchParams.set('search', searchTerm);
        } else {
            url.searchParams.delete('search');
        }
        window.history.pushState({}, '', url);
    });
    
    // Handle back/forward browser buttons
    window.addEventListener('popstate', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        searchInput.value = searchParam || '';
        performSearch();
    });

    // Update pagination links to preserve search term
function updatePaginationLinks() {
    const paginationLinks = document.querySelectorAll('.pagination a');
    const searchTerm = searchInput.value.trim();
    
    paginationLinks.forEach(link => {
        const url = new URL(link.href);
        if (searchTerm) {
            url.searchParams.set('search', searchTerm);
        } else {
            url.searchParams.delete('search');
        }
        link.href = url.toString();
    });
}

// Run after page loads
setTimeout(updatePaginationLinks, 100);
});
