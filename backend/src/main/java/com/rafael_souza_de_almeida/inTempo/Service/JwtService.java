package com.rafael_souza_de_almeida.inTempo.Service;

import com.rafael_souza_de_almeida.inTempo.Entity.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;

@Service
public class JwtService {

    private final JwtEncoder encoder;
    private final JwtDecoder jwtDecoder;

    public JwtService(JwtEncoder encoder, JwtDecoder jwtDecoder) {
        this.encoder = encoder;
        this.jwtDecoder = jwtDecoder;
    }

    public void generateToken(User user, HttpServletResponse response) {
        Instant now = Instant.now();
        long expiry = 3600L;

        var claims = JwtClaimsSet.builder()
                .issuer("InTempo-App")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(user.getEmail())
                .claim("user_id", user.getId())
                .build();

        String token = encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        ResponseCookie cookie = ResponseCookie.from("jwt_token", token)
                .httpOnly(true)
                .path("/")
                .secure(true)
                .maxAge(expiry)
                .sameSite("Strict")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());

    }

    public String extractIdFromCookie(HttpServletRequest request) {

        try {

            String token = getTokenFromCookies(request);

            if (token == null) {
                throw new AccessDeniedException("Token não encontrado");
            }


            Jwt jwt = jwtDecoder.decode(token);

            return jwt.getClaim("user_id");
        } catch(Exception e) {
            throw new AccessDeniedException("Token inválido ou não autorizado");
        }

    }

    public String getTokenFromCookies(HttpServletRequest request) {
        if(request.getCookies() != null) {
            for(Cookie cookie : request.getCookies()) {
                if("jwt_token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }


}
