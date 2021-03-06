package ba.redditclone.repository;

import ba.redditclone.model.Comment;
import ba.redditclone.model.Post;
import ba.redditclone.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPost(Post post);

    List<Comment> findAllByUser(User user);

    List<Comment> findByPost(Post post);

}
