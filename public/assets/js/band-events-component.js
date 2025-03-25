class BandEvents extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.bandId = this.getAttribute('id-banda') || null;
        this.placeId = this.getAttribute('id-sala') || null;
        this.apiHost = 'https://alcalaesmusica.org';
        this.apiUrl = this.apiHost + '/api/v1/upcoming_events/?limit=5000';
    }

    connectedCallback() {
        this.render();
        this.fetchEvents();
    }

    async fetchEvents() {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            this.renderEvents(data['events']);
        } catch (error) {
            console.error('Error fetching events:', error);
            this.shadowRoot.querySelector('#loading').textContent = 'Error loading events. Please try again later.';
            this.shadowRoot.querySelector('#events').style.display = 'none';
        }
    }

    renderEvents(events) {
        const eventListElement = this.shadowRoot.querySelector('#event-list');
        const loadingElement = this.shadowRoot.querySelector('#loading');
        const eventsSectionElement = this.shadowRoot.querySelector('#events');

        var filteredEvents = []
        if (this.bandId != null) {
            filteredEvents = events.filter(event => event.bands?.some(band => band.id == this.bandId));
        } else if (this.placeId != null) {
            filteredEvents = events.filter(event => event.venues?.id == this.placeId);
        } else {
            console.error('Missing bandId or placeId', error);
            return
        }

        loadingElement.style.display = 'none';

        if (filteredEvents.length === 0) {
            eventsSectionElement.style.display = 'none';
        } else {
            filteredEvents.forEach(event => {
                const eventCard = document.createElement('li');
                eventCard.className = 'event-card';

                const eventDate = new Date(event.day).toLocaleDateString('es-ES', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                }).replace(', ', '<br>');

                let timeDisplay = '';
                if (event.time) {
                    const parts = event.time.split(":");
                    if (parts.length === 3) {
                        timeDisplay = `${parts[0]}:${parts[1]}`;
                    }
                }

                let venueName = event.venues?.name || event.venue_name;
                let venueAddress = event.venues?.address || event.venue_address;
                let description = event.description?.substring(0, 200) || ''

                eventCard.innerHTML = `
                    <a href="${this.apiHost}/events/${event.id}" target="_blank">
                        ${event.poster ? `<img src="${this.apiHost}${event.poster}" class="event-poster">` : ''}
                        <div class="event-info">
                            <p class="event-date">${eventDate}<br>${timeDisplay}</p>
                            <h3 class="event-venue">${venueName || '(No hay información del lugar)'}</h3>
                            <p class="event-address">${venueAddress || ''}</p>
                            <p class="event-description">${description}...</p>
                        </div>
                    </a>
                `;
                eventListElement.appendChild(eventCard);
            });
        }
    }


    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .events-container { text-align: center; max-width: 900px; margin: 0 auto; padding: 20px; }
                .event-header { font-size: 2.25em; line-height: 1.25em; letter-spacing: -0.05em; }
                .event-list { display: inline-grid; grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr)); gap: 30px; list-style: none; padding: 0; }
                .event-card { border-radius: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); background: #fff; transition: transform 0.3s; }
                .event-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); }
                .event-poster { width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid #eee; border-top-right-radius: 12px; border-top-left-radius: 12px;}
                .event-info { padding: 20px; }
                .event-date { color: #ad4582; font-weight: 600; font-size: 1.1rem; line-height: 1.5 }
                .event-venue { color: #1d3557; font-weight: 600; font-size: 1.2rem; }
                .event-address { color: #457b9d; font-size: 0.9rem; line-height: 1.5; }
                .event-description { color: #333; font-size: 0.95rem; line-height: 1.5; overflow: hidden; -webkit-line-clamp: 4; -webkit-box-orient: vertical; }
                .loading, .no-events { text-align: center; padding: 40px; font-size: 1.2rem; }
                .loading { color: #457b9d; }
                .no-events { color: #e63946; display: none; }
                a { text-decoration: none; }
                @media (max-width: 768px) { .event-list { grid-template-columns: 1fr; } }
            </style>
            <div class="events-container" id="events">
                <h2 class="event-header">Próximos eventos</h2>
                <div id="loading" class="loading">Cargando datos...</div>
                <ul id="event-list" class="event-list"></ul>
            </div>
        `;
    }
}

customElements.define('eventos-aem', BandEvents);