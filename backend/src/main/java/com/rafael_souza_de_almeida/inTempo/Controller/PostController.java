package com.rafael_souza_de_almeida.inTempo.Controller;

import com.rafael_souza_de_almeida.inTempo.DTO.Post.CreateOrEditPostDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Post.PostDTO;
import com.rafael_souza_de_almeida.inTempo.Exception.PostNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public ResponseEntity<?> save(@RequestBody CreateOrEditPostDTO dto) {
        try {
            var result = postService.save(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            postService.delete(id);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch(PostNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody CreateOrEditPostDTO dto, @PathVariable Long id) {
        try {
            var result = postService.update(dto, id);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch(PostNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
