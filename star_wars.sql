ALTER TABLE IF EXISTS ONLY public.accounts DROP CONSTRAINT IF EXISTS pk_accounts_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.planet_votes DROP CONSTRAINT IF EXISTS pk_planet_votes_id CASCADE;


DROP TABLE IF EXISTS public.accounts;
DROP SEQUENCE IF EXISTS public.accounts_id_seq;
CREATE TABLE accounts (
    id serial NOT NULL,
    user_name varchar(30) UNIQUE,
    password varchar(200) NOT NULL,
    reg_date timestamp without time zone NOT NULL
);

ALTER TABLE ONLY accounts
    ADD CONSTRAINT pk_accounts_id PRIMARY KEY (id);


DROP TABLE IF EXISTS public.planet_votes;
DROP SEQUENCE IF EXISTS public.planet_votes_id_seq;
CREATE TABLE planet_votes (
    id serial NOT NULL,
    planet_id int NOT NULL,
    planet_name varchar NOT NULL,
    user_id int NOT NULL,
    submission_time timestamp without time zone NOT NULL
);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT pk_planet_votes_id PRIMARY KEY (id);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES accounts(id)
    ON UPDATE CASCADE ON DELETE CASCADE;