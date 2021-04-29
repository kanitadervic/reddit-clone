package ba.redditclone.service;

import ba.redditclone.http.request.SubredditRequest;
import ba.redditclone.model.Subreddit;
import ba.redditclone.repository.SubredditRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class SubredditService {

    private final SubredditRepository subredditRepository;

    @Transactional
    public SubredditRequest save(SubredditRequest subredditRequest) {
        Subreddit save = subredditRepository.save(mapSubredditToRequest(subredditRequest));
        subredditRequest.setId(save.getId());

        return subredditRequest;

    }

    private Subreddit mapSubredditToRequest(SubredditRequest subredditRequest) {
        return Subreddit.builder().name(subredditRequest.getSubredditName())
                .description(subredditRequest.getDescription())
                .build();
    }

    @Transactional(readOnly = true)
    public List<SubredditRequest> getAll() {
        return subredditRepository.findAll().stream().map(this::mapSubredditToRequest)
                .collect(Collectors.toList());
    }

    private SubredditRequest mapSubredditToRequest(Subreddit subreddit) {
        return SubredditRequest.builder().subredditName(subreddit.getName())
                .id(subreddit.getId())
                .numberOfPosts(subreddit.getPosts().size())
                .build();
    }
}
