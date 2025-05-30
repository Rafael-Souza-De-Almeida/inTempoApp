package com.rafael_souza_de_almeida.inTempo.Controller;

import com.rafael_souza_de_almeida.inTempo.DTO.Post.CreateOrEditPostDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Post.PostDTO;
import com.rafael_souza_de_almeida.inTempo.Exception.PostNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<List<PostDTO>> findAllPosts() {
        var result = postService.findAllPosts();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/add")
    public ResponseEntity<?> save(@RequestBody CreateOrEditPostDTO dto, HttpServletRequest request) {
        try {
            var result = postService.save(dto, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (UserNotFoundException | BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id,
                                    HttpServletRequest request) {
        try {
            postService.delete(id, request);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch(PostNotFoundException | AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/show/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {

        try {
            var result = postService.show(id);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch(PostNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        }

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody CreateOrEditPostDTO dto, @PathVariable Long id, HttpServletRequest request) {
        try {
            var result = postService.update(dto, id, request);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch(PostNotFoundException | AccessDeniedException | BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
