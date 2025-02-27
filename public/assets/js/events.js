
document.addEventListener('DOMContentLoaded', function() {
    const apiHost = 'https://alcalaesmusica.org'
    const apiUrl = apiHost + '/api/v1/upcoming_events/?limit=5000';
    const targetBandId = 265;
    const eventListElement = document.getElementById('event-list');
    const loadingElement = document.getElementById('loading');
    const noEventsElement = document.getElementById('no-events');
    const eventsSectionElement = document.getElementById('events');

    // Fetch data from API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Filter events that include the target band
            const filteredEvents = data['events'].filter(event => {
                return event.bands && event.bands.some(band => band.id === targetBandId);
            });

            // Hide loading indicator
            loadingElement.style.display = 'none';

            if (filteredEvents.length === 0) {
                // Show no events message
                noEventsElement.style.display = 'block';
                eventsSectionElement.style.display = 'none';
            } else {
                // Render events
                filteredEvents.forEach(event => {
                    const eventCard = document.createElement('li');
                    eventCard.className = 'event-card';

                    // Format date
                    const eventDate = new Date(event.day);
                    const formattedDate = eventDate.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    // Format time if available
                    var timeDisplay = ''
                    if (event.time) {
                        const parts = event.time.split(":");
                        if (parts.length === 3) {
                            timeDisplay = `${parts[0]}:${parts[1]}`;
                        }
                    }

                    // Process venue info
                    var venueName = event.venues?.name || event.venue_name;
                    var venueAddress = event.venues?.address || event.venue_address;

                    // Create HTML for the event card
                    eventCard.innerHTML = `
                        <a href="${apiHost}/events/${event.id}" target="_blank">
                        ${event.poster ? `<img src="${apiHost}${event.poster}" alt="Cartel del evento" class="event-poster">` : ''}
                        <div class="event-info">
                            <p class="event-date">${formattedDate} ${timeDisplay}</p>
                            <h3 class="event-venue">${venueName || '(No hay información del lugar)'}</h3>
                            <p class="event-address">${venueAddress || ''}</p>
                            <p class="event-description">${event.description || ''}</p>
                        </a>
                        </div>
                    `;

                    eventListElement.appendChild(eventCard);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching events:', error);
            loadingElement.textContent = 'Error loading events. Please try again later.';
            loadingElement.style.color = '#e63946';
            eventsSectionElement.style.display = 'none';
        });
});