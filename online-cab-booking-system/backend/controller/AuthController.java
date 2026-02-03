package controller;

import model.User;
import service.AuthService;

public class AuthController {
    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    public void handleRegister(String name, String email, String password) {
        try {
            User user = authService.register(name, email, password);
            System.out.println("[SUCCESS] Registered User: " + user);
        } catch (Exception e) {
            System.out.println("[ERROR] " + e.getMessage());
        }
    }

    public User handleLogin(String email, String password) {
        User user = authService.login(email, password);
        if (user != null) {
            System.out.println("[SUCCESS] Login Successful: " + user.getName());
            return user;
        } else {
            System.out.println("[ERROR] Invalid Credentials");
            return null;
        }
    }
}
