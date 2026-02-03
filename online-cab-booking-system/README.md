# Online Cab Booking System

A realistic, frontend-only cab booking application that simulates real-world functionality (User Auth, Booking, Ride Status, History) using **LocalStorage** and **Vanilla JavaScript**.

## 🚀 Features

- **User Authentication**: Register & Login with persistence.
- **Location Memory**: Remembers recent pickup/drop locations.
- **Cab Booking**: Select car types (Mini, Sedan, SUV) and estimate fares.
- **Ride Simulation**: Realistic delays, driver search animation, and status updates.
- **Ride History**: View past completed and cancelled rides.
- **Responsive UI**: Mobile-first design inspired by major cab apps.

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (Animations, Transitions, Flexbox/Grid)
- **Vanilla JavaScript** (ES6+)
- **LocalStorage** (Data Persistence)
- **Font Awesome** (Icons)

## 📂 Project Structure

```
online-cab-booking-system/
│
├── frontend/
│   ├── index.html                # Login / Register
│   ├── dashboard.html            # Home screen
│   ├── book-cab.html             # Pickup & drop selection
│   ├── ride-status.html          # Live ride simulation
│   ├── history.html              # Ride history
│   │
│   ├── css/
│   │   └── style.css             # Main stylesheet
│   │
│   ├── js/
│   │   ├── storage.js            # LocalStorage helper & Auth check
│   │   ├── auth.js               # Authentication logic
│   │   ├── booking.js            # Booking & Fare calculation
│   │   ├── ride.js               # Ride lifecycle simulation
│   │   └── history.js            # History rendering
│   │
│   └── assets/
│       ├── icons/
│       └── animations/
│
└── backend/                      # (Reserved for future Java APIs)
```

## ⚡ How to Run

1.  Open `frontend/index.html` in your browser.
2.  Register a new account.
3.  Start booking rides!
