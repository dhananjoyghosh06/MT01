package com.example.backend.dto;

import lombok.Data;

@Data
public class OtpDetails {
    private final int otp;
    private final long expiresAt;

    public OtpDetails(int otp, long expiresAt) {
        this.otp = otp;
        this.expiresAt = expiresAt;
    }

    public int getOtp() {
        return otp;
    }

    public long getExpiresAt() {
        return expiresAt;
    }
}
