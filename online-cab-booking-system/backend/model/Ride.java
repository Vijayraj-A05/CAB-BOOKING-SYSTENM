package model;

import java.time.LocalDateTime;

public class Ride {
    private String id;
    private User user;
    private Cab cab;
    private String source;
    private String destination;
    private double fare;
    private String status; // REQUESTED, ON_TRIP, COMPLETED, CANCELLED
    private LocalDateTime bookingTime;

    public Ride(String id, User user, Cab cab, String source, String destination, double fare) {
        this.id = id;
        this.user = user;
        this.cab = cab;
        this.source = source;
        this.destination = destination;
        this.fare = fare;
        this.status = "REQUESTED";
        this.bookingTime = LocalDateTime.now();
    }

    public String getId() { return id; }
    public User getUser() { return user; }
    public Cab getCab() { return cab; }
    public String getSource() { return source; }
    public String getDestination() { return destination; }
    public double getFare() { return fare; }
    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    @Override
    public String toString() {
        return "Ride{id='" + id + "', user=" + user.getName() + ", cab=" + cab.getDriverName() + ", status='" + status + "'}";
    }
}
