package ba.redditclone.service;

import ba.redditclone.exception.SpringRedditException;
import ba.redditclone.http.request.SubredditRequest;
import ba.redditclone.mapper.SubredditMapper;
import ba.redditclone.model.Subreddit;
import ba.redditclone.repository.SubredditRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
@Slf4j
public class SubredditService {

    private final SubredditRepository subredditRepository;
    private final SubredditMapper subredditMapper;
    private final AuthService authService;

    @Transactional
    public SubredditRequest save(SubredditRequest subredditRequest) {
        Subreddit save = subredditRepository.save(subredditMapper.mapRequestToSubreddit(subredditRequest, authService.getCurrentUser()));
        subredditRequest.setId(save.getId());
        return subredditRequest;
    }

    @Transactional(readOnly = true)
    public List<SubredditRequest> getAll() {
        return subredditRepository.findAll()
                .stream()
                .map(subredditMapper::mapSubredditToRequest)
                .collect(toList());
    }

    public SubredditRequest getSubreddit(Long id) {
        Subreddit subreddit = subredditRepository.findById(id)
                .orElseThrow(() -> new SpringRedditException("No subreddit found with ID - " + id));
        return subredditMapper.mapSubredditToRequest(subreddit);
    }
}
