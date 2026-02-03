package repository;

import model.Ride;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class RideRepository {
    private List<Ride> rides = new ArrayList<>();

    public void save(Ride ride) {
        rides.add(ride);
    }

    public List<Ride> findByUserId(String userId) {
        return rides.stream()
                .filter(r -> r.getUser().getId().equals(userId))
                .collect(Collectors.toList());
    }

    public Ride findById(String rideId) {
        return rides.stream()
                .filter(r -> r.getId().equals(rideId))
                .findFirst()
                .orElse(null);
    }
}
