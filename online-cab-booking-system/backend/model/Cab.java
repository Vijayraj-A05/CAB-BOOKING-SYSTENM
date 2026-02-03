package model;

public class Cab {
    private String id;
    private String driverName;
    private String carModel;
    private String registrationNumber;
    private String type; // Mini, Sedan, SUV
    private boolean isAvailable;
    private double currentLat; // Mock location
    private double currentLon;

    public Cab(String id, String driverName, String carModel, String registrationNumber, String type) {
        this.id = id;
        this.driverName = driverName;
        this.carModel = carModel;
        this.registrationNumber = registrationNumber;
        this.type = type;
        this.isAvailable = true;
    }

    public String getId() { return id; }
    public String getDriverName() { return driverName; }
    public String getCarModel() { return carModel; }
    public String getRegistrationNumber() { return registrationNumber; }
    public String getType() { return type; }
    public boolean isAvailable() { return isAvailable; }

    public void setAvailable(boolean available) { isAvailable = available; }

    @Override
    public String toString() {
        return "Cab{driver='" + driverName + "', car='" + carModel + "', type='" + type + "'}";
    }
}
