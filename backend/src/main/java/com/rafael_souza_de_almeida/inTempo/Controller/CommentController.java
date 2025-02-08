package com.rafael_souza_de_almeida.inTempo.Controller;

import com.rafael_souza_de_almeida.inTempo.DTO.Comment.CommentDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Comment.CommentRequestDTO;
import com.rafael_souza_de_almeida.inTempo.Exception.CommentNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.PostNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<CommentDTO>> findAllPostComments(@PathVariable Long id) {
        var result = commentService.findAllPostComments(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/add")
    public ResponseEntity<?> save(@RequestBody CommentRequestDTO dto, HttpServletRequest request) {

        try {
            var result = commentService.save(dto, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (UserNotFoundException | PostNotFoundException | BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, HttpServletRequest request) {

        try {
            commentService.delete(id, request);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch(CommentNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }
}
