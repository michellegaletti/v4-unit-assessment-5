INSERT INTO helo_users (username, password, profile_pic)
VALUES ($1, $2, $3)
RETURNING user_id, username, profile_pic;