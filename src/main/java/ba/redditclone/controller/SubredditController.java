package ba.redditclone.controller;

import ba.redditclone.http.request.SubredditRequest;
import ba.redditclone.service.SubredditService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subreddit")
@AllArgsConstructor
@Slf4j
public class SubredditController {

    private final SubredditService subredditService;

    @PostMapping
    public ResponseEntity<SubredditRequest> createSubreddit(@RequestBody SubredditRequest subredditRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subredditService.save(subredditRequest));
    }

    @GetMapping
    public ResponseEntity<List<SubredditRequest>> getAllSubreddits() {
        return ResponseEntity.status(HttpStatus.OK).body(subredditService.getAll());
    }
}
