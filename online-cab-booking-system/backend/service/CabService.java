package service;

import model.Cab;
import repository.CabRepository;
import java.util.List;

public class CabService {
    private CabRepository cabRepository;

    public CabService(CabRepository cabRepository) {
        this.cabRepository = cabRepository;
    }

    public List<Cab> getAvailableCabs() {
        return cabRepository.findAllAvailable();
    }

    public Cab getCabById(String id) {
        return cabRepository.findById(id).orElse(null);
    }
}
