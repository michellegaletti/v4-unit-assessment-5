SELECT post.post_id AS post_id, title, content, img, profile_pic, date_created, username AS author_username FROM helo_posts post
JOIN helo_users user ON user.user_id = post.author_id
WHERE lower(title) LIKE $1
AND user.user_id != $2
ORDER BY date_created DESC;