package repository;

import model.Cab;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class CabRepository {
    private List<Cab> cabs = new ArrayList<>();

    public CabRepository() {
        // Seed some dummy cabs
        cabs.add(new Cab("CAB001", "Rahul Kumar", "Swift Dzire", "MH12AB1234", "Sedan"));
        cabs.add(new Cab("CAB002", "Vikram Singh", "Wagon R", "MH14XY9876", "Mini"));
        cabs.add(new Cab("CAB003", "Amit Patel", "Innova Crysta", "MH02ZZ5555", "SUV"));
    }

    public List<Cab> findAllAvailable() {
        return cabs.stream()
                .filter(Cab::isAvailable)
                .collect(Collectors.toList());
    }

    public Optional<Cab> findById(String id) {
        return cabs.stream().filter(c -> c.getId().equals(id)).findFirst();
    }
    
    public List<Cab> findByType(String type) {
         return cabs.stream()
                .filter(c -> c.getType().equalsIgnoreCase(type) && c.isAvailable())
                .collect(Collectors.toList());
    }
}
