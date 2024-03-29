exports.up = async function (DB) {
    await DB`
        CREATE TABLE users(
            id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            username VARCHAR(20) UNIQUE NOT NULL, 
            hashed_password TEXT NOT NULL,
            email VARCHAR(254) UNIQUE NOT NULL,
            role VARCHAR(10) DEFAULT 'player' NOT NULL, -- possible values: player, moderator, admin
            country_code VARCHAR(3), 
            is_active BOOLEAN DEFAULT TRUE NOT NULL, 
            is_admin BOOLEAN DEFAULT FALSE NOT NULL,
            is_moderator BOOLEAN DEFAULT FALSE NOT NULL, 
            is_deleted  BOOLEAN DEFAULT FALSE NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE  
        );
    `;

    await DB`
        CREATE TABLE following(
            id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            user_id INT NOT NULL,
            follower_id INT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
            UNIQUE(user_id, follower_id),
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(follower_id) REFERENCES users(id)
        );
    `;
    await DB`ALTER TABLE following ADD CONSTRAINT user_cannot_be_equal_to_follower CHECK (user_id <> follower_id);`;

    await DB`
        CREATE TABLE rating(
            id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            user_id INT NOT NULL,
            variant VARCHAR(3) NOT NULL,
            time_control TEXT NOT NULL,
            rating DECIMAL DEFAULT 1500 NOT NULL,         -- 1500 is initial value in glicko2 
            rating_deviation DECIMAL DEFAULT 350 NOT NULL, -- 350 is initial value in glicko2 
            volatility DECIMAL DEFAULT 0.6 NOT NULL,      -- 0.1 is initial value in glicko2 
            games_played INT DEFAULT 0  NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
            UNIQUE(user_id, variant, time_control),
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
    `;

    await DB`
        CREATE TABLE tournament(
            id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR(50) NOT NULL,
            description TEXT,
            type VARCHAR(10) NOT NULL, -- arena, swiss
            variant VARCHAR(3) NOT NULL,
            time_control TEXT NOT NULL,
            time VARCHAR(7) NOT NULL,
            is_rated BOOLEAN DEFAULT TRUE NOT NULL,
            is_private BOOLEAN DEFAULT FALSE NOT NULL,
            created_by INT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
            FOREIGN KEY(created_by) REFERENCES users(id)
        );
    `;

    await DB`
        CREATE TABLE tournament_standing(
            tournament_id INT NOT NULL,
            user_id INT NOT NULL,
            ranking INT NOT NULL,
            score INT NOT NULL,
            PRIMARY KEY(tournament_id, user_id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
            FOREIGN KEY(tournament_id) REFERENCES tournament(id),
            FOREIGN KEY(user_id) REFERENCES users(id)
        );
    `;

    await DB`
        CREATE TABLE game(
            id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            variant VARCHAR(3) NOT NULL,    -- 7x6, 8x7, 8x8, 9x7, 9x9
            time_control TEXT NOT NULL,     -- bullet, blitz, rapid, classic 
            time VARCHAR(7) NOT NULL,       -- minutes|seconds, example: 30|15
            is_rated BOOLEAN NOT NULL DEFAULT TRUE,
            white_id INT NOT NULL,
            white_rating INT NOT NULL, 
            white_rating_after INT NOT NULL,
            black_id INT NOT NULL,
            black_rating INT NOT NULL,
            black_rating_after INT NOT NULL,
            result VARCHAR(2) NOT NULL, -- WC: white checkmates, BC: black checkmates, D: draw, WR: white resigns, BR: black resigns, WT: white times out, BT: black times out, WF: white forfeits, BF: black forfeits, D: draw
            winner_id INT NOT NULL,
            loser_id INT NOT NULL,
            moves TEXT NOT NULL,
            tournament_id INT, 
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
            FOREIGN KEY(white_id) REFERENCES users(id),
            FOREIGN KEY(black_id) REFERENCES users(id),
            FOREIGN KEY(winner_id) REFERENCES users(id),
            FOREIGN KEY(loser_id) REFERENCES users(id),
            FOREIGN KEY(tournament_id) REFERENCES tournament(id)
        );
    `;
    await DB`ALTER TABLE game ADD CONSTRAINT white_cannot_be_equal_to_black CHECK (white_id <> black_id);`;
  }
  
exports.down = async function (DB) {
    await DB`DROP TABLE IF EXISTS game;`;
    await DB`DROP TABLE IF EXISTS tournament_standing;`;
    await DB`DROP TABLE IF EXISTS tournament;`;
    await DB`DROP TABLE IF EXISTS rating;`;
    await DB`DROP TABLE IF EXISTS following;`;
    await DB`DROP TABLE IF EXISTS users;`;
}