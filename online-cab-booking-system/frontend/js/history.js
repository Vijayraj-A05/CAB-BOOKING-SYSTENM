document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('history-list');
    const rides = Storage.get('rides') || [];

    if (rides.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center mt-3">
                <i class="fa-solid fa-cloud-open" style="font-size: 3rem; color: var(--gray-200);"></i>
                <h3 class="mt-2 text-muted">No rides yet</h3>
                <p class="text-sm text-muted">Book your first ride today!</p>
                <a href="book-cab.html" class="btn btn-primary mt-2" style="width: auto; padding: 8px 20px;">Book Now</a>
            </div>
        `;
        return;
    }

    listContainer.innerHTML = '';
    rides.forEach((ride, index) => {
        const isCancelled = ride.status === 'CANCELLED';
        const date = new Date(ride.date).toLocaleDateString();
        const time = new Date(ride.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const card = document.createElement('div');
        card.className = `card history-card ${isCancelled ? 'cancelled' : ''} animate-slide-up`;
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="d-flex justify-between align-center mb-1">
                <span class="text-sm font-bold text-muted">${date} • ${time}</span>
                <span class="badge" style="
                    background: ${isCancelled ? '#ffe5e5' : '#e6fffa'}; 
                    color: ${isCancelled ? '#e63946' : 'var(--primary-dark)'}; 
                    padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                    ${ride.status}
                </span>
            </div>
            
            <div class="d-flex align-center gap-2 mb-2">
                 <div style="font-size: 1.2rem; min-width: 30px; text-align: center; color: var(--text-dark);">
                     <i class="fa-solid ${ride.car.icon}"></i>
                 </div>
                 <div>
                     <h4 style="margin: 0; font-size: 1rem;">${ride.car.name}</h4>
                     <small class="text-muted">ID: #${ride.id.slice(-6)}</small>
                 </div>
                 <div style="margin-left: auto;">
                    <h4 style="margin: 0;">${Currency.format(ride.car.fare)}</h4>
                 </div>
            </div>

            <div style="border-top: 1px solid var(--gray-100); padding-top: 10px; margin-top: 5px;">
                <div class="d-flex align-center gap-2">
                    <i class="fa-solid fa-circle-dot text-primary" style="font-size: 0.6rem;"></i>
                    <span class="text-sm">${ride.pickup}</span>
                </div>
                <div class="d-flex align-center gap-2 mt-1">
                    <i class="fa-solid fa-location-dot text-secondary" style="font-size: 0.6rem;"></i>
                    <span class="text-sm">${ride.drop}</span>
                </div>
            </div>
        `;

        listContainer.appendChild(card);
    });
});
