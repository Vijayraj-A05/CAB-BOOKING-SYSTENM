package service;

import model.Ride;
import model.User;
import model.Cab;
import repository.RideRepository;
import util.IdGenerator;
import java.util.List;

public class RideService {
    private RideRepository rideRepository;

    public RideService(RideRepository rideRepository) {
        this.rideRepository = rideRepository;
    }

    public Ride bookRide(User user, Cab cab, String source, String dest, double fare) {
        if (!cab.isAvailable()) {
            throw new IllegalStateException("Cab is not available");
        }

        Ride ride = new Ride(IdGenerator.generateId(), user, cab, source, dest, fare);
        cab.setAvailable(false); // Lock the cab
        rideRepository.save(ride);
        return ride;
    }

    public void completeRide(String rideId) {
        Ride ride = rideRepository.findById(rideId);
        if (ride != null) {
            ride.setStatus("COMPLETED");
            ride.getCab().setAvailable(true); // Release cab
        }
    }

    public List<Ride> getRideHistory(String userId) {
        return rideRepository.findByUserId(userId);
    }
}
