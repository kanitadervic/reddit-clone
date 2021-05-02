package ba.redditclone.service;

import ba.redditclone.exception.PostNotFoundException;
import ba.redditclone.http.request.CommentRequest;
import ba.redditclone.mapper.CommentMapper;
import ba.redditclone.model.Comment;
import ba.redditclone.model.NotificationEmail;
import ba.redditclone.model.Post;
import ba.redditclone.model.User;
import ba.redditclone.repository.CommentRepository;
import ba.redditclone.repository.MailService;
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

    private static final String POST_URL = "";
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final CommentMapper commentMapper;
    private final MailContentBuilder mailContentBuilder;
    private final MailService mailService;

    public Comment createComment(CommentRequest commentRequest) {
        Post post = postRepository.findById(commentRequest.getPostId())
                .orElseThrow(() -> new PostNotFoundException("Post with id " + commentRequest.getPostId() + " not found"));

        Comment map = commentMapper.map(commentRequest, post, authService.getCurrentUser());

        System.out.println(map);
        commentRepository.save(map);

        String message = mailContentBuilder.build(post.getUser().getUsername() + " posted a comment on your post. " + POST_URL);
        sendCommentNotification(message, post.getUser());

        return map;
    }

    private void sendCommentNotification(String message, User user) {
        mailService.sendMail(new NotificationEmail(user.getUsername() + " commented on your post", user.getEmail(), message));
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

        return commentRepository.findAllByUser(user).stream()
                .map(commentMapper::mapToRequest)
                .collect(Collectors.toList());
    }
}
