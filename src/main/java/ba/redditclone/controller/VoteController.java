package ba.redditclone.controller;

import ba.redditclone.http.request.VoteRequest;
import ba.redditclone.service.VoteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vote")
@AllArgsConstructor
public class VoteController {

    private VoteService voteService;

    @PostMapping("/create")
    public ResponseEntity createVote(@RequestBody VoteRequest voteRequest) {
        voteService.createVote(voteRequest);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
