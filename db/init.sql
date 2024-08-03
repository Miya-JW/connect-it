drop table if exists tweet_comments;

drop table if exists blog_comments;

drop table if exists movie_comments;

drop table if exists album_comments;

drop table if exists book_comments;

drop table if exists comments;

drop table if exists blogs;

drop table if exists tweets;

drop table if exists user_movie_status;

drop table if exists user_place_status;

drop table if exists user_album_status;

drop table if exists user_book_status;

drop table if exists user_topics;

drop table if exists topics;

drop table if exists user_tags;

drop table if exists user_artists;

drop table if exists users;

drop table if exists artist_albums;

drop table if exists images;

drop table if exists photo_albums;

drop table if exists books;

drop table if exists albums;

drop table if exists artists;

drop table if exists movies;

drop table if exists places;

drop table if exists tags;

create table books(
    book_id int auto_increment primary key,
    book_title varchar(64) not null,
    book_ISBN varchar(64),
    book_publisher varchar(64),
    book_publish_date varchar(64),
    book_genre varchar(64),
    book_summary text,
    book_language varchar(64),
    book_number_of_page int
);

create table movies(
    movie_id int auto_increment primary key,
    movie_title varchar(64) not null,
    movie_director varchar(50) not null,
    movie_date date not null,
    movie_genre varchar(50) not null,
    movie_cast varchar(255) not null,
    movie_duration int not null,
    movie_language varchar(64) not null,
    movie_summary text not null,
    movie_rating int not null,
    movie_imdburl varchar(255)
);

create table artists(
    artist_id int auto_increment primary key,
    artist_name varchar(50) not null,
    artist_image varchar(255),
    artist_spotify_url varchar(255),
    artist_genre varchar(60) not null,
    artist_popularity int,
    artist_followers int
);

create table albums(
    album_id int auto_increment primary key,
    album_title varchar(60) not null,
    album_image varchar(255),
    album_release_date varchar(60),
    album_total_tracks int,
    album_spotifyUrl varchar(255),
    album_market varchar(255)
);

create table tags (
    tag_id int auto_increment primary key,
    tag_content varchar(64) not null
);

create table places(
    place_id int primary key,
    place_name varchar(64) not null,
    place_address varchar(255) not null,
    place_type varchar(64),
    place_phone_number varchar(50),
    -- user input
    place_info text
);

create table photo_albums(
    photo_album_id int auto_increment primary key,
    photo_album_date date not null,
    photo_album_location int,
    foreign key(photo_album_location) references places(place_id)
);

create table images(
    image_id int auto_increment primary key,
    image_url varchar(255) not null,
    image_album_id int,
    foreign key(image_album_id) references photo_albums(photo_album_id)
);

create table artist_albums(
    artist_id int,
    album_id int,
    primary key(artist_id, album_id),
    foreign key(artist_id) references artists(artist_id),
    foreign key(album_id) references albums(album_id)
);

create table users (
    user_id int auto_increment primary key,
    user_name varchar(50) not null,
    user_password varchar(64) not null,
    user_date_of_birth date not null,
    user_place int,
    user_about_me int,
    user_avatar int,
    user_tag int,
    foreign key (user_place) references places (place_id),
    foreign key (user_avatar) references images (image_id),
    foreign key (user_tag) references tags (tag_id)
);

create table topics(
    topic_id int auto_increment primary key,
    topic_owner_id int,
    topic_date date not null,
    topic_content text not null,
    foreign key (topic_owner_id) references users (user_id)
);

create table user_tags(
    user_id int,
    tag_id int,
    primary key (user_id, tag_id),
    foreign key(user_id) references users(user_id),
    foreign key(tag_id) references tags(tag_id)
);

create table user_topics(
    user_id int,
    topic_id int,
    primary key (user_id, topic_id),
    foreign key(user_id) references users(user_id),
    foreign key(topic_id) references topics(topic_id)
);

create table user_book_status(
    user_id int,
    book_id int,
    book_status enum('to read', 'reading', 'read'),
    primary key (user_id, book_id),
    foreign key(user_id) references users(user_id),
    foreign key(book_id) references books(book_id)
);

create table user_movie_status(
    user_id int,
    movie_id int,
    movie_status enum('to watch', 'watching', 'watched'),
    primary key (user_id, movie_id),
    foreign key(user_id) references users(user_id),
    foreign key(movie_id) references movies(movie_id)
);

create table user_artists(
    user_id int,
    artist_id int,
    primary key(user_id, artist_id),
    foreign key(user_id) references users(user_id),
    foreign key(artist_id) references artists(artist_id)
);

create table user_album_status(
    user_id int,
    album_id int,
    album_status enum('to listen', 'listening', 'listened'),
    primary key (user_id, album_id),
    foreign key(user_id) references users(user_id),
    foreign key(album_id) references albums(album_id)
);

create table user_place_status(
    user_id int,
    place_id int,
    place_status enum('to visit', 'visiting', 'visited'),
    primary key (user_id, place_id),
    foreign key(user_id) references users(user_id),
    foreign key(place_id) references places(place_id)
);

create table tweets (
    tweet_id int auto_increment primary key,
    tweet_auther_id int not null,
    tweet_content varchar(300) not null,
    tweet_date date not null,
    tweet_img int,
    tweet_topic int,
    tweet_movie int,
    tweet_book int,
    tweet_music int,
    tweet_place int,
    foreign key (tweet_auther_id) references users (user_id),
    foreign key (tweet_img) references images (image_id),
    foreign key (tweet_topic) references topics (topic_id),
    foreign key (tweet_movie) references movies (movie_id),
    foreign key (tweet_book) references books (book_id),
    foreign key (tweet_music) references albums (album_id),
    foreign key (tweet_place) references places (place_id)
);

-- create table tweet_comments(
--     comment_id int auto_increment primary key,
--     comment_tweet_id int,
--     comment_user_id int,
--     comment_date date not null,
--     comment_content varchar(255) not null,
--     comment_comment_id int,
--     foreign key(comment_tweet_id) references tweets(tweet_id),
--     foreign key(comment_user_id) references users(user_id),
--     foreign key(comment_comment_id) references tweet_comments(comment_id)
-- );

create table blogs (
    blog_id int auto_increment primary key,
    blog_auther_id int not null,
    blog_title varchar(100) not null,
    blog_content text not null,
    blog_date date not null,
    blog_img int,
    blog_topic int,
    blog_movie int,
    blog_book int,
    blog_music int,
    blog_place int,
    foreign key (blog_auther_id) references users (user_id),
    foreign key (blog_img) references images (image_id),
    foreign key (blog_topic) references topics (topic_id),
    foreign key (blog_movie) references movies (movie_id),
    foreign key (blog_book) references books (book_id),
    foreign key (blog_music) references albums (album_id),
    foreign key (blog_place) references places (place_id)
);

-- create table blog_comments(
--     comment_id int auto_increment primary key,
--     comment_blog_id int,
--     comment_user_id int,
--     comment_date date not null,
--     comment_content varchar(255) not null,
--     comment_comment_id int,
--     foreign key(comment_blog_id) references blogs(blog_id),
--     foreign key(comment_user_id) references users(user_id),
--     foreign key(comment_comment_id) references blog_comments(comment_id)
-- );

-- create table movie_comments(
--     comment_id int auto_increment primary key,
--     comment_movie_id int,
--     comment_user_id int,
--     comment_date date not null,
--     comment_content varchar(255) not null,
--     comment_comment_id int,
--     foreign key(comment_movie_id) references movies(movie_id),
--     foreign key(comment_user_id) references users(user_id),
--     foreign key(comment_comment_id) references movie_comments(comment_id)
-- );

-- create table album_comments(
--     comment_id int auto_increment primary key,
--     comment_album_id int,
--     comment_user_id int,
--     comment_date date not null,
--     comment_content varchar(255) not null,
--     comment_comment_id int,
--     foreign key(comment_album_id) references albums(album_id),
--     foreign key(comment_user_id) references users(user_id),
--     foreign key(comment_comment_id) references album_comments(comment_id)
-- );

-- create table book_comments(
--     comment_id int auto_increment primary key,
--     comment_book_id int,
--     comment_user_id int,
--     comment_date date not null,
--     comment_content varchar(255) not null,
--     comment_comment_id int,
--     foreign key(comment_book_id) references books(book_id),
--     foreign key(comment_user_id) references users(user_id),
--     foreign key(comment_comment_id) references book_comments(comment_id)
-- );

create table comments(
    comment_id int auto_increment primary key,
    comment_user_id int not null,
    comment_date date not null,
    comment_content varchar(255) not null,
    comment_tweet_id int,
    comment_blog_id int,
    comment_movie_id int,
    comment_album_id int,
    comment_book_id int,
    comment_comment_id int,
    foreign key(comment_user_id) references users (user_id),
    foreign key(comment_tweet_id) references tweets (tweet_id),
    foreign key(comment_blog_id) references blogs (blog_id),
    foreign key(comment_movie_id) references movies (movie_id),
    foreign key(comment_album_id) references albums (album_id),
    foreign key(comment_book_id) references books (book_id),
    foreign key(comment_comment_id) references comments (comment_id)
)