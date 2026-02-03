document.addEventListener('DOMContentLoaded', () => {
    const pickupInput = document.getElementById('pickup-location');
    const dropInput = document.getElementById('drop-location');
    const carSelection = document.getElementById('car-selection');
    const carList = document.getElementById('car-list');
    const bookBtn = document.getElementById('book-btn');
    const totalFareEl = document.getElementById('total-fare');

    let selectedCar = null;
    let distanceKm = 0;

    // Mock Cab Types
    const CAB_TYPES = [
        { id: 'mini', name: 'Mini', icon: 'fa-car-side', baseRate: 50, perKm: 10, eta: '4 min' },
        { id: 'sedan', name: 'Sedan', icon: 'fa-car', baseRate: 80, perKm: 15, eta: '7 min' },
        { id: 'suv', name: 'SUV', icon: 'fa-van-shuttle', baseRate: 120, perKm: 20, eta: '10 min' }
    ];

    // Auto-fill pickup if available in history or default
    pickupInput.value = "Current Location"; // Simulating GPS

    // Event Listener for Drop Input
    dropInput.addEventListener('change', calculateFares);
    dropInput.addEventListener('blur', calculateFares);

    function calculateFares() {
        if (!pickupInput.value || !dropInput.value) return;

        // Simulate distance calculation (random between 2km and 20km)
        // In a real app, this would use Google Maps API
        if (distanceKm === 0) {
            distanceKm = Math.floor(Math.random() * 18) + 2;
        }

        renderCars();
        carSelection.classList.remove('hidden');
    }

    function renderCars() {
        carList.innerHTML = '';
        CAB_TYPES.forEach(car => {
            const fare = Math.round(car.baseRate + (distanceKm * car.perKm));

            const card = document.createElement('div');
            card.className = `car-card card d-flex align-center justify-between p-2 mb-2 ${selectedCar?.id === car.id ? 'selected' : ''}`;
            card.onclick = () => selectCar(car, fare);

            card.innerHTML = `
                <div class="d-flex align-center gap-2">
                    <div style="font-size: 1.5rem; width: 40px; text-align: center; color: var(--text-dark);">
                        <i class="fa-solid ${car.icon}"></i>
                    </div>
                    <div>
                        <h4 class="mb-0">${car.name}</h4>
                        <small class="text-muted">${car.eta} away</small>
                    </div>
                </div>
                <div class="text-right">
                    <h4 class="mb-0">${Currency.format(fare)}</h4>
                </div>
            `;
            carList.appendChild(card);
        });
    }

    function selectCar(car, fare) {
        selectedCar = { ...car, fare };
        renderCars(); // Re-render to update selected state

        totalFareEl.textContent = Currency.format(fare);
        bookBtn.disabled = false;
        bookBtn.innerHTML = `Book ${car.name}`;
    }

    bookBtn.addEventListener('click', () => {
        if (!selectedCar || !dropInput.value) {
            UI.showToast('Please select a destination and car type', 'error');
            return;
        }

        UI.showLoader('Booking your ride...');

        setTimeout(() => {
            // Save Booking
            const currentRide = {
                id: 'RIDE-' + Date.now(),
                user: Storage.getCurrentUser(),
                pickup: pickupInput.value,
                drop: dropInput.value,
                car: selectedCar,
                distance: distanceKm,
                status: 'SEARCHING',
                date: new Date().toISOString()
            };

            Storage.set('currentRide', currentRide);

            // Add to User's recent locations (Simulated)
            // ...

            UI.hideLoader();
            window.location.href = 'ride-status.html';

        }, 1500);
    });
});
