package ba.redditclone.exception;

import org.springframework.mail.MailException;

public class SpringRedditException extends RuntimeException{
    public  SpringRedditException(String s, MailException e) {
        super(s, e);
    }
}
