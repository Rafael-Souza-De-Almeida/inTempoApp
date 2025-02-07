package com.rafael_souza_de_almeida.inTempo.Service;

import com.rafael_souza_de_almeida.inTempo.DTO.Like.LikeDTO;
import com.rafael_souza_de_almeida.inTempo.DTO.Like.LikeRequestDTO;
import com.rafael_souza_de_almeida.inTempo.Entity.Like;
import com.rafael_souza_de_almeida.inTempo.Entity.Post;
import com.rafael_souza_de_almeida.inTempo.Entity.User;
import com.rafael_souza_de_almeida.inTempo.Exception.LikeNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.PostAlreadyLikedException;
import com.rafael_souza_de_almeida.inTempo.Exception.PostNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Exception.UserNotFoundException;
import com.rafael_souza_de_almeida.inTempo.Repository.LikeRepository;
import com.rafael_souza_de_almeida.inTempo.Repository.PostRepository;
import com.rafael_souza_de_almeida.inTempo.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final JwtService jwtService;

    public LikeService(LikeRepository likeRepository, UserRepository userRepository, PostRepository postRepository, JwtService jwtService) {
        this.likeRepository = likeRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.jwtService = jwtService;
    }

    public List<LikeDTO> findAllUserLikes(HttpServletRequest request) {

        String user_id = jwtService.extractIdFromCookie(request);

        List<Like> userLikes = likeRepository.findAllUserLikes(user_id);

        return userLikes.stream().map(LikeDTO::new).toList();


    }

    @Transactional
    public LikeDTO save(LikeRequestDTO dto, HttpServletRequest request) throws UserNotFoundException, PostNotFoundException, PostAlreadyLikedException {

        String userId = jwtService.extractIdFromCookie(request);

        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));

        Post post = postRepository.findById(dto.getPost_id()).orElseThrow(() -> new PostNotFoundException("Post não encontrado"));


        Optional<Like> possibleLike = likeRepository.searchingForLike(user.getId(), post.getId());

        if(possibleLike.isPresent()) {
            throw new PostAlreadyLikedException("Você já curtiu esse post");
        }

        Like like = new Like();

        like.setPost(post);
        like.setUser(user);

        likeRepository.save(like);

        return new LikeDTO(like);

    }

    public void delete(Long id, HttpServletRequest request) throws LikeNotFoundException, AccessDeniedException {

        Like like = likeRepository.findById(id).orElseThrow(() -> new LikeNotFoundException("Like não encontrado"));

        if(!like.getUser().getId().equals(jwtService.extractIdFromCookie(request))) {
            throw new AccessDeniedException("Acesso negado");
        }

        likeRepository.delete(like);

    }


}
