package controller;

import model.Cab;
import model.Ride;
import model.User;
import service.CabService;
import service.RideService;
import java.util.List;

public class RideController {
    private RideService rideService;
    private CabService cabService;

    public RideController(RideService rideService, CabService cabService) {
        this.rideService = rideService;
        this.cabService = cabService;
    }

    public void bookRide(User user, String cabId, String source, String dest) {
        if (user == null) {
            System.out.println("[ERROR] User not logged in!");
            return;
        }

        Cab cab = cabService.getCabById(cabId);
        if (cab == null) {
            System.out.println("[ERROR] Cab not found!");
            return;
        }

        try {
            double estimatedFare = 150.0; // Mock fare
            Ride ride = rideService.bookRide(user, cab, source, dest, estimatedFare);
            System.out.println("[SUCCESS] Ride Booked! ID: " + ride.getId());
            System.out.println("Driver: " + cab.getDriverName() + " is on the way.");
        } catch (Exception e) {
            System.out.println("[ERROR] Booking failed: " + e.getMessage());
        }
    }

    public void showHistory(User user) {
        if (user == null)
            return;
        List<Ride> rides = rideService.getRideHistory(user.getId());

        System.out.println("\n--- Ride History for " + user.getName() + " ---");
        if (rides.isEmpty()) {
            System.out.println("No rides found.");
        } else {
            for (Ride r : rides) {
                System.out.println(r);
            }
        }
        System.out.println("----------------------------------------\n");
    }
}
