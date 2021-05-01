package ba.redditclone.service;

import ba.redditclone.exception.PostNotFoundException;
import ba.redditclone.http.request.CommentRequest;
import ba.redditclone.mapper.CommentMapper;
import ba.redditclone.model.Comment;
import ba.redditclone.model.Post;
import ba.redditclone.model.User;
import ba.redditclone.repository.CommentRepository;
import ba.redditclone.repository.PostRepository;
import ba.redditclone.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommentsService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final CommentMapper commentMapper;

    public Comment createComment(CommentRequest commentRequest) {
        Post post = postRepository.findById(commentRequest.getPostId())
                .orElseThrow(() -> new PostNotFoundException("Post with id " + commentRequest.getPostId() + " not found"));

        User currentUser = authService.getCurrentUser();

        Comment map = commentMapper.map(commentRequest, post, currentUser);

        commentRepository.save(map);

        return map;
    }

    @Transactional(readOnly = true)
    public List<CommentRequest> getCommentsForPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(postId.toString()));

        List<Comment> comments = commentRepository.findAllByPost(post);

        return comments.stream().map(commentMapper::mapToRequest).collect(Collectors.toList());
    }


    public List<CommentRequest> getCommentsForUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));

        return commentRepository.findAllByUser(username).stream()
                .map(commentMapper::mapToRequest)
                .collect(Collectors.toList());
    }
}
