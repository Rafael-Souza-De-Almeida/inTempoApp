package com.rafael_souza_de_almeida.inTempo.Service;

import com.rafael_souza_de_almeida.inTempo.DTO.Comment.CommentDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Post.CreateOrEditPostDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Post.PostDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Post.ShowPostDTO;
import com.rafael_souza_de_almeida.inTempo.Entity.Comment;
import com.rafael_souza_de_almeida.inTempo.Entity.Post;
import com.rafael_souza_de_almeida.inTempo.Entity.User;
import com.rafael_souza_de_almeida.inTempo.Exception.PostNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Repository.CommentRepository;
import com.rafael_souza_de_almeida.inTempo.Repository.LikeRepository;
import com.rafael_souza_de_almeida.inTempo.Repository.PostRepository;
import com.rafael_souza_de_almeida.inTempo.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final JwtService jwtService;
    private final CommentRepository commentRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository, LikeRepository likeRepository, JwtService jwtService, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
        this.jwtService = jwtService;
        this.commentRepository = commentRepository;
    }


    public List<PostDTO> findAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.
                stream().map(post -> new PostDTO(
                        post, likeRepository.likeQuantity(post.getId()), commentRepository.commentsQuantity(post.getId()))
                ).sorted(Comparator.comparing(PostDTO::getCreated_at).reversed()).toList();
    }

    public PostDTO save(CreateOrEditPostDTO dto, HttpServletRequest request) throws UserNotFoundException, BadRequestException {

        String user_id = jwtService.extractIdFromCookie(request);

        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        Post post = new Post();

        String content = verifyContent(dto.getContent());

        post.setContent(content);
        post.setUser(user);

        postRepository.save(post);

        return new PostDTO(post);


    }

    public ShowPostDTO show(Long id) throws PostNotFoundException {

        Post post = postRepository.findById(id).orElseThrow(() -> new PostNotFoundException("Post não encontrado"));

        Long likeQuantity = likeRepository.likeQuantity(id);
        Long commentsQuantity = commentRepository.commentsQuantity(id);
        List<CommentDTO> postComments = commentRepository.findAllPostComments(id).stream().map(CommentDTO::new).toList();

        return new ShowPostDTO(post, likeQuantity, commentsQuantity, postComments);

    }

    public void delete(Long id, HttpServletRequest request) throws PostNotFoundException, AccessDeniedException {
        Post post = postRepository.findById(id).orElseThrow(() -> new PostNotFoundException("Post não encontrado"));

        if(!post.getUser().getId().equals(jwtService.extractIdFromCookie(request))) {

            throw new AccessDeniedException("Acesso negado");
        }

        postRepository.delete(post);

    }

    @Transactional
    public PostDTO update(CreateOrEditPostDTO dto, Long id, HttpServletRequest request) throws PostNotFoundException, AccessDeniedException, BadRequestException {

        Post postToUpdate = postRepository.findById(id).orElseThrow(()-> new PostNotFoundException("Post não encontrado"));

        if(!postToUpdate.getUser().getId().equals(jwtService.extractIdFromCookie(request))) {
            throw new AccessDeniedException("Acesso negado");
        }

        String content = verifyContent(dto.getContent());

        postToUpdate.setContent(content);

        postRepository.save(postToUpdate);

        return new PostDTO(postToUpdate);

    }

    private String verifyContent(String content) throws BadRequestException {
        if(content.isEmpty()) {
            throw new BadRequestException("O conteúdo do post deve possuir pelo menos 1 caracter.");
        }

        return content;
    }


}
