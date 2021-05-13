SELECT post.id AS post_id, title, content, img, profile_pic, date_created, username AS author_username FROM helo_posts post
JOIN helo_users user ON user.id = post.author_id
WHERE lower(title) LIKE $1
ORDER BY date_created ASC;