package ba.redditclone.exception;

import org.springframework.mail.MailException;

public class SpringRedditException extends RuntimeException{
    public  SpringRedditException(String s, MailException e) {
        super(s, e);
    }

    public SpringRedditException(String s) {
        super(s);
    }

    public SpringRedditException(String s, Exception e) {
        super(s, e);
    }
}
