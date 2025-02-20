package com.rafael_souza_de_almeida.inTempo.Service;

import com.rafael_souza_de_almeida.inTempo.DTO.Bookmark.BookmarkDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Bookmark.BookmarkRequestDTO;
import com.rafael_souza_de_almeida.inTempo.Entity.Bookmark;
import com.rafael_souza_de_almeida.inTempo.Entity.Post;
import com.rafael_souza_de_almeida.inTempo.Entity.User;
import com.rafael_souza_de_almeida.inTempo.Exception.BookmarkNotFound;
import com.rafael_souza_de_almeida.inTempo.Exception.PostAlredyBookmarked;
import com.rafael_souza_de_almeida.inTempo.Exception.PostNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Repository.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final LikeRepository likeRepository;
    private final CommentRepository commentRepository;
    private final JwtService jwtService;

    public BookmarkService(BookmarkRepository bookmarkRepository, UserRepository userRepository, PostRepository postRepository, LikeRepository likeRepository, CommentRepository commentRepository, JwtService jwtService) {
        this.bookmarkRepository = bookmarkRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.likeRepository = likeRepository;
        this.commentRepository = commentRepository;
        this.jwtService = jwtService;
    }

    public List<BookmarkDTO> findAllUserBookmarks(HttpServletRequest request) {

        String user_id = jwtService.extractIdFromCookie(request);

        List<Bookmark> userBookmarks = bookmarkRepository.findAllUserBookmarks(user_id);

        return userBookmarks.stream().
                map((bookmark -> new BookmarkDTO(bookmark, likeRepository.likeQuantity(bookmark.getPost().getId())
                        , commentRepository.commentsQuantity(bookmark.getPost().getId())))
                ).sorted(Comparator.comparing((BookmarkDTO bookmark) -> bookmark.getPost().getCreated_at()).reversed()).toList();

    }

    @Transactional
    public BookmarkDTO save(BookmarkRequestDTO dto, HttpServletRequest request) throws UserNotFoundException, PostAlredyBookmarked, PostNotFoundException {

        String user_id = jwtService.extractIdFromCookie(request);

        User user = userRepository.findById(user_id).orElseThrow(()-> new UserNotFoundException("Usuário não encontrado"));

        Post post = postRepository.findById(dto.getPost_id()).orElseThrow(() -> new PostNotFoundException("Post não encontrado"));

        Optional<Bookmark> possibleBookmark = bookmarkRepository.searchingForBookmarks(user.getId(), post.getId());

        if(possibleBookmark.isPresent()) {
            throw new PostAlredyBookmarked("Você já favoritou esse post");
        }

        Bookmark bookmark = new Bookmark();

        bookmark.setPost(post);
        bookmark.setUser(user);


        bookmarkRepository.save(bookmark);



        return new BookmarkDTO(bookmark);
    }

    public void delete(Long id, HttpServletRequest request) throws BookmarkNotFound, AccessDeniedException {

        Bookmark bookmark = bookmarkRepository.findById(id).orElseThrow(() -> new BookmarkNotFound("Não foi possivel achar o bookmark"));

        if(!bookmark.getUser().getId().equals(jwtService.extractIdFromCookie(request))) {
            throw new AccessDeniedException("Acesso negado");
        }

        bookmarkRepository.delete(bookmark);

    }
}
