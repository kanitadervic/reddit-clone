package ba.redditclone.mapper;

import ba.redditclone.http.request.CommentRequest;
import ba.redditclone.model.Comment;
import ba.redditclone.model.Post;
import ba.redditclone.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "text", source = "commentRequest.text")
    @Mapping(target = "createdDate", expression = "java(java.time.Instant.now())")
    Comment map(CommentRequest commentRequest, Post post, User user);

    @Mapping(target = "postId", expression = "java(comment.getPost().getPostId())")
    @Mapping(target = "username", expression = "java(comment.getUser().getUsername())")
    CommentRequest mapToRequest(Comment comment);

}
