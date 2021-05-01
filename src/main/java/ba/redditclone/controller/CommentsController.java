package ba.redditclone.controller;

import ba.redditclone.http.request.CommentRequest;
import ba.redditclone.model.Comment;
import ba.redditclone.service.CommentsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
@AllArgsConstructor
public class CommentsController {

    private CommentsService commentsService;

    @PostMapping("/create")
    public ResponseEntity<Comment> createComment(@RequestBody CommentRequest commentRequest) {
        Comment comment = commentsService.createComment(commentRequest);

        return new ResponseEntity<>(comment, HttpStatus.OK);
    }

    @GetMapping("/by-post/{postId}")
    public ResponseEntity<List<CommentRequest>> getCommentsForPost(@PathVariable Long postId) {
        List<CommentRequest> commentsForPost = commentsService.getCommentsForPost(postId);

        return new ResponseEntity<>(commentsForPost, HttpStatus.OK);
    }

    @GetMapping("/by-user/{username}")
    public ResponseEntity<List<CommentRequest>> getCommentsForUser(@PathVariable String username) {
        List<CommentRequest> commentsForUser = commentsService.getCommentsForUser(username);

        return new ResponseEntity<>(commentsForUser, HttpStatus.OK);

    }
}
