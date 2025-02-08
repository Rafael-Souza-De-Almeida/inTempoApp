package com.rafael_souza_de_almeida.inTempo.Service;

import com.rafael_souza_de_almeida.inTempo.DTO.Comment.CommentDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Comment.CommentRequestDTO;
import com.rafael_souza_de_almeida.inTempo.Entity.Comment;
import com.rafael_souza_de_almeida.inTempo.Entity.Post;
import com.rafael_souza_de_almeida.inTempo.Entity.User;
import com.rafael_souza_de_almeida.inTempo.Exception.CommentNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.PostNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Repository.CommentRepository;
import com.rafael_souza_de_almeida.inTempo.Repository.PostRepository;
import com.rafael_souza_de_almeida.inTempo.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final JwtService jwtService;
    private final CommentRepository commentRepository;

    public CommentService(UserRepository userRepository, PostRepository postRepository, JwtService jwtService, CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.jwtService = jwtService;
        this.commentRepository = commentRepository;
    }

    public List<CommentDTO> findAllPostComments(Long post_id) {

        List<Comment> postComments = commentRepository.findAllPostComments(post_id);

        return postComments.stream().map(CommentDTO::new).toList();

    }

    @Transactional
    public CommentDTO save(CommentRequestDTO dto, HttpServletRequest request) throws UserNotFoundException, PostNotFoundException, BadRequestException {

        String user_id = jwtService.extractIdFromCookie(request);

        User user = userRepository.findById(user_id).orElseThrow(()-> new UserNotFoundException("Usuário não encontrado"));

        Post post = postRepository.findById(dto.getPost_id()).orElseThrow(() -> new PostNotFoundException("Post não encontrado"));

        if(dto.getContent().isEmpty()) {
            throw new BadRequestException("O conteúdo do comentário deve possuir pelo menos 1 caracter.");
        }

        Comment comment = new Comment();

        comment.setUser(user);
        comment.setPost(post);
        comment.setContent(dto.getContent());

        commentRepository.save(comment);

        return new CommentDTO(comment);

    }

    public void delete(Long id, HttpServletRequest request) throws CommentNotFoundException {

        Comment comment = commentRepository.findById(id).orElseThrow(() -> new CommentNotFoundException("Comentário não encontrado"));

        if(!comment.getUser().getId().equals(jwtService.extractIdFromCookie(request))) {
            throw new AccessDeniedException("Acesso negado");
        }

        commentRepository.delete(comment);

    }
}
