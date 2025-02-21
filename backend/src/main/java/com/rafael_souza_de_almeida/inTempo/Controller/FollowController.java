package com.rafael_souza_de_almeida.inTempo.Controller;

import com.rafael_souza_de_almeida.inTempo.DTO.Follow.FollowRequestDTO;
import com.rafael_souza_de_almeida.inTempo.Exception.FollowNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Service.FollowService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/follow")
public class FollowController {

    private final FollowService followService;

    public FollowController(FollowService followService) {
        this.followService = followService;
    }

    @GetMapping("/{username}/followers")
    public ResponseEntity<?> findAllUserFollowers(@PathVariable String username) {

        try {
            var result = followService.findAllUserFollowers(username);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{username}/following")
    public ResponseEntity<?> findAllUserFollowing(@PathVariable String username) {

        try {
            var result = followService.findAllUserFollowing(username);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @PostMapping("/add")
    public ResponseEntity<?> save(@RequestBody FollowRequestDTO dto, HttpServletRequest request) {

        try {
            followService.save(dto, request);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch(UserNotFoundException | BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, HttpServletRequest request) {
        try {
            followService.delete(id, request);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch(FollowNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
