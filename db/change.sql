-- ALTER TABLE albums MODIFY album_title VARCHAR(255);
-- ALTER TABLE users DROP FOREIGN KEY users_ibfk_2;
-- ALTER TABLE users MODIFY user_tag varchar(255);
-- ALTER TABLE blogs DROP FOREIGN KEY blogs_ibfk_2;
-- ALTER TABLE blogs MODIFY blog_img VARCHAR(255);
-- ALTER TABLE movies ADD COLUMN movie_poster varchar(255);
ALTER TABLE movies
MODIFY movie_title varchar(64);

ALTER TABLE movies
MODIFY movie_director varchar(50);

ALTER TABLE movies
MODIFY movie_date date;

ALTER TABLE movies
MODIFY movie_genre varchar(50);

ALTER TABLE movies
MODIFY movie_cast varchar(255);

ALTER TABLE movies
MODIFY movie_duration int;

ALTER TABLE movies
MODIFY movie_language varchar(64);

ALTER TABLE movies
MODIFY movie_summary text;

ALTER TABLE movies
MODIFY movie_rating int;

ALTER TABLE movies
MODIFY movie_imdburl varchar(255);