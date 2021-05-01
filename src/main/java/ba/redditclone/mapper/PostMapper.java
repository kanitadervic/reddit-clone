package ba.redditclone.mapper;

import ba.redditclone.http.request.PostRequest;
import ba.redditclone.http.response.PostResponse;
import ba.redditclone.model.Post;
import ba.redditclone.model.Subreddit;
import ba.redditclone.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {
    @Mapping(target = "createdDate", expression = "java(java.time.Instant.now())")
    @Mapping(target = "description", source = "postRequest.description")
    @Mapping(target = "subreddit", source = "subreddit")
    @Mapping(target = "user", source = "user")
    Post map(PostRequest postRequest, Subreddit subreddit, User user);

    @Mapping(target = "id", source = "postId")
    @Mapping(target = "username", source = "user.username")
    @Mapping(target = "subredditName", source = "subreddit.name")
    PostResponse mapToRequest(Post post);
}
