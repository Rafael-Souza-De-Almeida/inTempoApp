package com.rafael_souza_de_almeida.inTempo.Service;

import com.rafael_souza_de_almeida.inTempo.DTO.Post.CreateOrEditPostDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Post.PostDTO;
import com.rafael_souza_de_almeida.inTempo.Entity.Post;
import com.rafael_souza_de_almeida.inTempo.Entity.User;
import com.rafael_souza_de_almeida.inTempo.Exception.PostNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Repository.PostRepository;
import com.rafael_souza_de_almeida.inTempo.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public PostService(PostRepository postRepository, UserRepository userRepository, JwtService jwtService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public List<PostDTO> findAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(PostDTO::new).toList();
    }

    public PostDTO save(CreateOrEditPostDTO dto, HttpServletRequest request) throws UserNotFoundException {

        String user_id = jwtService.extractIdFromCookie(request);

        User user = userRepository.findById(user_id).orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        Post post = new Post();

        post.setContent(dto.getContent());
        post.setUser(user);

        postRepository.save(post);

        return new PostDTO(post);


    }

    public void delete(Long id, HttpServletRequest request) throws PostNotFoundException, AccessDeniedException {
        Post post = postRepository.findById(id).orElseThrow(() -> new PostNotFoundException("Post não encontrado"));

        if(!post.getUser().getId().equals(jwtService.extractIdFromCookie(request))) {

            throw new AccessDeniedException("Acesso negado");
        }

        postRepository.delete(post);

    }

    @Transactional
    public PostDTO update(CreateOrEditPostDTO dto, Long id, HttpServletRequest request) throws PostNotFoundException, AccessDeniedException {

        Post postToUpdate = postRepository.findById(id).orElseThrow(()-> new PostNotFoundException("Post não encontrado"));

        if(!postToUpdate.getUser().getId().equals(jwtService.extractIdFromCookie(request))) {
            throw new AccessDeniedException("Acesso negado");
        }

        postToUpdate.setContent(dto.getContent());

        postRepository.save(postToUpdate);

        return new PostDTO(postToUpdate);

    }


}
