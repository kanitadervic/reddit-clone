package ba.redditclone.service;

import ba.redditclone.exception.PostNotFoundException;
import ba.redditclone.exception.SubredditNotFoundException;
import ba.redditclone.http.request.PostRequest;
import ba.redditclone.http.response.PostResponse;
import ba.redditclone.mapper.PostMapper;
import ba.redditclone.model.Post;
import ba.redditclone.model.Subreddit;
import ba.redditclone.model.User;
import ba.redditclone.repository.PostRepository;
import ba.redditclone.repository.SubredditRepository;
import ba.redditclone.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class PostService {

    private final PostRepository postRepository;
    private final SubredditRepository subredditRepository;
    private final AuthService authService;
    private final PostMapper postMapper;
    private final UserRepository userRepository;

    public Post save(PostRequest postRequest) {
        Subreddit subreddit = subredditRepository.findByName(postRequest.getSubredditName())
                .orElseThrow(() -> new SubredditNotFoundException(postRequest.getSubredditName()));

        System.out.println(authService.getCurrentUser());

        Post mappedPost = postMapper.map(postRequest, subreddit, authService.getCurrentUser());

        postRepository.save(mappedPost);

        return mappedPost;
    }

    @Transactional(readOnly = true)
    public PostResponse getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("Post with id " + id + " does not exist!"));

        return postMapper.mapToRequest(post);
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(postMapper::mapToRequest)
                .collect(toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsBySubreddit(Long subredditId) {
        Subreddit subreddit = subredditRepository.findById(subredditId)
                .orElseThrow(() -> new SubredditNotFoundException(subredditId.toString()));
        List<Post> posts = postRepository.findAllBySubreddit(subreddit);
        return posts.stream().map(postMapper::mapToRequest).collect(toList());
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getPostsByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return postRepository.findByUser(user)
                .stream()
                .map(postMapper::mapToRequest)
                .collect(toList());
    }
}
