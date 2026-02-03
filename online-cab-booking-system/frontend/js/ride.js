document.addEventListener('DOMContentLoaded', () => {
    const currentRide = Storage.get('currentRide');
    if (!currentRide) {
        window.location.href = 'dashboard.html';
        return;
    }

    // UI Elements
    const rideIdEl = document.getElementById('ride-id');
    const statusTextEl = document.getElementById('status-text');
    const subStatusEl = document.getElementById('sub-status');
    const radarView = document.getElementById('radar-view');
    const mapView = document.getElementById('map-view');
    const driverInfoEl = document.getElementById('driver-info');
    const cancelBtn = document.getElementById('cancel-btn');
    const homeBtn = document.getElementById('home-btn');

    // Fill Static Data
    rideIdEl.textContent = '#' + currentRide.id.slice(-6);
    document.getElementById('drop-text').textContent = currentRide.drop;
    document.getElementById('fare-text').textContent = Currency.format(currentRide.car.fare);

    // Mock Drivers
    const DRIVERS = [
        { name: 'Rahul Kumar', carNo: 'MH 14 DN 4521', model: `White ${currentRide.car.name}` },
        { name: 'Vikram Singh', carNo: 'MH 12 AB 9988', model: `Silver ${currentRide.car.name}` },
        { name: 'Amit Patel', carNo: 'MH 02 XZ 1122', model: `Black ${currentRide.car.name}` }
    ];

    let simulationStep = 0;
    let timeouts = [];

    // Helper to secure timeouts so we can clear them on cancel
    function wait(ms, callback) {
        const id = setTimeout(callback, ms);
        timeouts.push(id);
    }

    function updateStatus(title, subtitle, view = 'map') {
        statusTextEl.textContent = title;
        subStatusEl.textContent = subtitle;

        if (view === 'radar') {
            radarView.classList.remove('hidden');
            mapView.classList.add('hidden');
        } else {
            radarView.classList.add('hidden');
            mapView.classList.remove('hidden');

            // Map text update
            const messages = {
                'driver': 'Driver is on the way',
                'ride': 'Great ride!',
                'arrived': 'Destination Reached'
            };
            document.getElementById('map-message').textContent = messages[view] || 'On Trip';
        }
    }

    // START SIMULATION
    startSimulation();

    function startSimulation() {
        // Step 1: Searching
        updateStatus('Searching...', 'Connecting you to nearby drivers', 'radar');

        // Step 2: Driver Found (after 3s)
        wait(3000, () => {
            const driver = DRIVERS[Math.floor(Math.random() * DRIVERS.length)];

            // Update UI with Driver Info
            document.getElementById('driver-name').textContent = driver.name;
            document.getElementById('car-number').textContent = driver.carNo;
            document.getElementById('car-model').textContent = driver.model;

            driverInfoEl.classList.remove('hidden');
            driverInfoEl.classList.add('animate-slide-up');

            updateStatus('Driver Found!', `${driver.name} is arriving in 2 mins`, 'driver');
            UI.showToast('Driver assigned!', 'success');
        });

        // Step 3: Arrived (after 6s)
        wait(6000, () => {
            updateStatus('Driver Arrived', 'Please board the cab', 'driver');
            cancelBtn.disabled = true; // Cannot cancel now
            cancelBtn.textContent = "Ride Started";
        });

        // Step 4: Ride Started (after 9s)
        wait(9000, () => {
            updateStatus('On Route', `Heading to ${currentRide.drop}`, 'ride');
            cancelBtn.classList.add('hidden');
        });

        // Step 5: Completed (after 14s)
        wait(14000, () => {
            updateStatus('Ride Completed', 'You have reached your destination', 'arrived');
            homeBtn.classList.remove('hidden');

            // Save to History
            const completedRide = { ...currentRide, status: 'COMPLETED', completedAt: new Date().toISOString() };
            completeRide(completedRide);
        });
    }

    function completeRide(ride) {
        const history = Storage.get('rides') || [];
        history.unshift(ride); // Add to top
        Storage.set('rides', history);
        Storage.remove('currentRide');
    }

    // Cancel Logic
    cancelBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to cancel?')) {
            // clear all simulation timeouts
            timeouts.forEach(clearTimeout);

            const cancelledRide = { ...currentRide, status: 'CANCELLED', cancelledAt: new Date().toISOString() };

            const history = Storage.get('rides') || [];
            history.unshift(cancelledRide);
            Storage.set('rides', history);
            Storage.remove('currentRide');

            UI.showToast('Ride Cancelled', 'info');
            setTimeout(() => window.location.href = 'dashboard.html', 1000);
        }
    });

    homeBtn.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
});
