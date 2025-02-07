package com.rafael_souza_de_almeida.inTempo.Controller;

import com.rafael_souza_de_almeida.inTempo.DTO.Like.LikeDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Like.LikeRequestDTO;
import com.rafael_souza_de_almeida.inTempo.Exception.LikeNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.PostAlreadyLikedException;
import com.rafael_souza_de_almeida.inTempo.Exception.PostNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Service.LikeService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/like")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping
    public ResponseEntity<List<LikeDTO>> findAllUserLikes(HttpServletRequest request) {
        var result = likeService.findAllUserLikes(request);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/add")
    public ResponseEntity<?> save(@RequestBody LikeRequestDTO dto, HttpServletRequest request) {

        try {
            var result = likeService.save(dto, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch(UserNotFoundException | PostNotFoundException | PostAlreadyLikedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, HttpServletRequest request) {


        try {
            likeService.delete(id, request);
            return  ResponseEntity.status(HttpStatus.OK).build();
        } catch (LikeNotFoundException | AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
