import controller.AuthController;
import controller.CabController;
import controller.RideController;
import model.User;
import repository.CabRepository;
import repository.RideRepository;
import repository.UserRepository;
import service.AuthService;
import service.CabService;
import service.RideService;

public class MainServer {
    public static void main(String[] args) {
        System.out.println(">>> STARTING ONLINE CAB BOOKING SERVER...");

        // 1. Initialize Repositories
        UserRepository userRepo = new UserRepository();
        CabRepository cabRepo = new CabRepository();
        RideRepository rideRepo = new RideRepository();

        // 2. Initialize Services
        AuthService authService = new AuthService(userRepo);
        CabService cabService = new CabService(cabRepo);
        RideService rideService = new RideService(rideRepo);

        // 3. Initialize Controllers
        AuthController authController = new AuthController(authService);
        CabController cabController = new CabController(cabService);
        RideController rideController = new RideController(rideService, cabService);

        System.out.println(">>> SERVER READY!\n");

        // --- SIMULATED CLIENT FLOW ---

        // 1. Register User
        System.out.println("--- Test 1: User Registration ---");
        authController.handleRegister("Anand", "anand@example.com", "password123");

        // 2. Login
        System.out.println("\n--- Test 2: User Login ---");
        User currentUser = authController.handleLogin("anand@example.com", "password123");

        // 3. Check Available Cabs
        cabController.showAvailableCabs();

        // 4. Book a Ride
        System.out.println("--- Test 3: Booking a Ride ---");
        // Picking the first available cab manually for test (e.g., CAB001)
        rideController.bookRide(currentUser, "CAB001", "Home", "Office");

        // 5. Check Availability again (CAB001 should be gone)
        cabController.showAvailableCabs();

        // 6. Show History
        rideController.showHistory(currentUser);

        System.out.println(">>> SIMULATION COMPLETE");
    }
}
