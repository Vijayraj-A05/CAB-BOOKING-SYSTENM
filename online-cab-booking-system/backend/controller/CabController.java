package controller;

import model.Cab;
import service.CabService;
import java.util.List;

public class CabController {
    private CabService cabService;

    public CabController(CabService cabService) {
        this.cabService = cabService;
    }

    public void showAvailableCabs() {
        List<Cab> cabs = cabService.getAvailableCabs();
        System.out.println("\n--- Available Cabs ---");
        for (Cab cab : cabs) {
            System.out.println(
                    cab.getId() + " | " + cab.getType() + " | " + cab.getCarModel() + " (" + cab.getDriverName() + ")");
        }
        System.out.println("----------------------\n");
    }
}
