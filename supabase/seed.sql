INSERT INTO users (email, password_hash, salt, name, twitter_id) VALUES
    ('user1@example.com', 'password1', 'salt1', 'User 1', 'twitter1'),
    ('user2@example.com', 'password2', 'salt2', 'User 2', 'twitter2'),
    ('user3@example.com', 'password3', 'salt3', 'User 3', 'twitter3'),
    ('user4@example.com', 'password4', 'salt4', 'User 4', 'twitter4'),
    ('user5@example.com', 'password5', 'salt5', 'User 5', 'twitter5'),
    ('user6@example.com', 'password6', 'salt6', 'User 6', 'twitter6'),
    ('user7@example.com', 'password7', 'salt7', 'User 7', 'twitter7'),
    ('user8@example.com', 'password8', 'salt8', 'User 8', 'twitter8'),
    ('user9@example.com', 'password9', 'salt9', 'User 9', 'twitter9'),
    ('user10@example.com', 'password10', 'salt10', 'User 10', 'twitter10');

INSERT INTO rooms (name, user_id, description) VALUES
    ('Room 1', 1, 'Room 1 description'),
    ('Room 2', 2, 'Room 2 description'),
    ('Room 3', 3, 'Room 3 description'),
    ('Room 4', 4, 'Room 4 description'),
    ('Room 5', 5, 'Room 5 description'),
    ('Room 6', 6, 'Room 6 description'),
    ('Room 7', 7, 'Room 7 description'),
    ('Room 8', 8, 'Room 8 description'),
    ('Room 9', 9, 'Room 9 description'),
    ('Room 10', 10, 'Room 10 description');

INSERT INTO verification_tokens (user_id, token) VALUES
    (1, '00000000-0000-0000-0000-000000000001'),
    (2, '00000000-0000-0000-0000-000000000002'),
    (3, '00000000-0000-0000-0000-000000000003'),
    (4, '00000000-0000-0000-0000-000000000004'),
    (5, '00000000-0000-0000-0000-000000000005'),
    (6, '00000000-0000-0000-0000-000000000006'),
    (7, '00000000-0000-0000-0000-000000000007'),
    (8, '00000000-0000-0000-0000-000000000008'),
    (9, '00000000-0000-0000-0000-000000000009'),
    (10, '00000000-0000-0000-0000-000000000010');

INSERT INTO room_keys (user_id, room_id) VALUES
    (1,1),
    (2,2),
    (3,3),
    (4,4),
    (5,5),
    (6,6),
    (7,7),
    (8,8),
    (9,9),
    (10,10);

