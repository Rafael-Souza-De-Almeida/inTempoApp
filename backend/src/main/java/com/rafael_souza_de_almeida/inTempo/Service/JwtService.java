package com.rafael_souza_de_almeida.inTempo.Service;

import com.rafael_souza_de_almeida.inTempo.Entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JwtService {

    private final JwtEncoder encoder;

    public JwtService(JwtEncoder encoder) {
        this.encoder = encoder;
    }

    public String generateToken(User user) {
        Instant now = Instant.now();
        long expiry = 3600L;

        var claims = JwtClaimsSet.builder()
                .issuer("InTempo-App")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(user.getEmail())
                .claim("username", user.getName())
                .build();

        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }


}
