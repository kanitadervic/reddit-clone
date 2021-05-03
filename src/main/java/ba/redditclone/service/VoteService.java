package ba.redditclone.service;

import ba.redditclone.exception.PostNotFoundException;
import ba.redditclone.exception.SpringRedditException;
import ba.redditclone.http.request.VoteRequest;
import ba.redditclone.model.Post;
import ba.redditclone.model.Vote;
import ba.redditclone.repository.PostRepository;
import ba.redditclone.repository.VoteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static ba.redditclone.model.VoteType.UPVOTE;

@Service
@AllArgsConstructor
public class VoteService {

    private VoteRepository voteRepository;
    private final PostRepository postRepository;
    private final AuthService authService;

    @Transactional
    public void createVote(VoteRequest voteRequest) {
        Post post = postRepository.findById(voteRequest.getPostId())
                .orElseThrow(() -> new PostNotFoundException("Post with id " + voteRequest.getPostId() + " not found"));

        Optional<Vote> voteByPostAndUser = voteRepository.findTopByPostAndUserOrderByVoteIdDesc(post, authService.getCurrentUser());

        if (voteByPostAndUser.isPresent() &&
                voteByPostAndUser.get().getVoteType()
                        .equals(voteRequest.getVoteType())) {
            throw new SpringRedditException("You have already "
                    + voteRequest.getVoteType().toString().toLowerCase() + "d this post");
        }
        System.out.println(post);
        if (UPVOTE.equals(voteRequest.getVoteType())) {
            post.setVoteCount(post.getVoteCount() + 1);
        } else {
            post.setVoteCount(post.getVoteCount() - 1);
        }
        voteRepository.save(mapToVote(voteRequest, post));
        postRepository.save(post);
    }

    private Vote mapToVote(VoteRequest voteRequest, Post post) {
        return Vote.builder()
                .voteType(voteRequest.getVoteType())
                .post(post)
                .user(authService.getCurrentUser())
                .build();
    }
}
