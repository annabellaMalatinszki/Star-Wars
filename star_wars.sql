ALTER TABLE IF EXISTS ONLY public.accounts DROP CONSTRAINT IF EXISTS pk_accounts_id CASCADE;

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

