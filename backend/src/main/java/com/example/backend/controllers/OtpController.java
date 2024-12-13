package com.example.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.dto.OtpDetails;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/forgotpassword")
public class OtpController {

    // In-memory store for OTPs
    private final Map<String, OtpDetails> otpStore = new ConcurrentHashMap<>();

    // Executor to clean expired OTPs
    public OtpController() {
        Executors.newScheduledThreadPool(1).scheduleAtFixedRate(
            this::cleanExpiredOtps, 30, 30, TimeUnit.SECONDS
        );
    }

    @PostMapping("/generate-otp")
    public ResponseEntity<?> generateOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.isBlank()) {
            return new ResponseEntity<>(Map.of("message", "Invalid email address."), HttpStatus.BAD_REQUEST);
        }

        // Generate 4-digit OTP
        int otp = 1000 + (int) (Math.random() * 9000);
        long expiresAt = System.currentTimeMillis() + 30_000; // 30 seconds from now

        // Store OTP in memory
        otpStore.put(email, new OtpDetails(otp, expiresAt));

        // Respond to the client
        return new ResponseEntity<>(Map.of(
            "email", email,
            "otp", otp, // Only for testing. In production, send via email/SMS.
            "message", "OTP generated successfully. It is valid for 30 seconds."
        ), HttpStatus.OK);
    }

    // Periodically clean expired OTPs
    private void cleanExpiredOtps() {
        long now = System.currentTimeMillis();
        otpStore.entrySet().removeIf(entry -> entry.getValue().getExpiresAt() < now);
    }

    @PostMapping("/validate-otp")
    public ResponseEntity<?> validateOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otpString = request.get("otp");

        if (email == null || email.isBlank() || otpString == null || otpString.isBlank()) {
            return new ResponseEntity<>(Map.of("message", "Invalid email or OTP."), HttpStatus.BAD_REQUEST);
        }

        try {
            int otp = Integer.parseInt(otpString);
            OtpDetails otpDetails = otpStore.get(email);

            if (otpDetails == null) {
                return new ResponseEntity<>(Map.of("message", "OTP not found or expired."), HttpStatus.BAD_REQUEST);
            }

            if (otpDetails.getOtp() == otp) {
                otpStore.remove(email); // Remove OTP after successful validation
                return new ResponseEntity<>(Map.of("message", "OTP validated successfully."), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(Map.of("message", "Invalid OTP."), HttpStatus.BAD_REQUEST);
            }
        } catch (NumberFormatException e) {
            return new ResponseEntity<>(Map.of("message", "OTP must be a number."), HttpStatus.BAD_REQUEST);
        }
    }
}
