package service;

import model.User;
import repository.UserRepository;
import util.IdGenerator;

public class AuthService {
    private UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(String name, String email, String password) {
        if (userRepository.exists(email)) {
            throw new IllegalArgumentException("User already exists with email: " + email);
        }
        User user = new User(IdGenerator.generateId(), name, email, password);
        userRepository.save(user);
        return user;
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}
