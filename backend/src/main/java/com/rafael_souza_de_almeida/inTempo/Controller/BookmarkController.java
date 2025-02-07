package com.rafael_souza_de_almeida.inTempo.Controller;

import com.rafael_souza_de_almeida.inTempo.DTO.Bookmark.BookmarkDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Bookmark.BookmarkRequestDTO;
import com.rafael_souza_de_almeida.inTempo.Exception.BookmarkNotFound;
import com.rafael_souza_de_almeida.inTempo.Exception.PostAlredyBookmarked;
import com.rafael_souza_de_almeida.inTempo.Exception.PostNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Service.BookmarkService;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/bookmark")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @GetMapping
    public ResponseEntity<List<BookmarkDTO>> findAllUserBookmarks(HttpServletRequest request) {

        var result = bookmarkService.findAllUserBookmarks(request);
        return ResponseEntity.status(HttpStatus.OK).body(result);

    }

    @PostMapping("/add")
    public ResponseEntity<?> save(@RequestBody BookmarkRequestDTO dto, HttpServletRequest request) {
        try {
            var result = bookmarkService.save(dto, request);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (UserNotFoundException | PostNotFoundException | PostAlredyBookmarked e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, HttpServletRequest request) {

        try {
            bookmarkService.delete(id, request);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch(BookmarkNotFound | AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }


}
