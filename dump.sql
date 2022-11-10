--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: movieStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."movieStatus" AS ENUM (
    'check',
    'uncheck'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: genre; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.genre (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);


--
-- Name: genre_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.genre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.genre_id_seq OWNED BY public.genre.id;


--
-- Name: movie; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movie (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    "platformId" integer NOT NULL,
    "genreId" integer NOT NULL,
    status public."movieStatus" DEFAULT 'uncheck'::public."movieStatus" NOT NULL,
    rating integer,
    CONSTRAINT movie_rating_check CHECK (((rating >= 0) AND (rating <= 10)))
);


--
-- Name: movie_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.movie_id_seq OWNED BY public.movie.id;


--
-- Name: platform; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.platform (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);


--
-- Name: platform_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.platform_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: platform_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.platform_id_seq OWNED BY public.platform.id;


--
-- Name: genre id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genre ALTER COLUMN id SET DEFAULT nextval('public.genre_id_seq'::regclass);


--
-- Name: movie id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie ALTER COLUMN id SET DEFAULT nextval('public.movie_id_seq'::regclass);


--
-- Name: platform id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platform ALTER COLUMN id SET DEFAULT nextval('public.platform_id_seq'::regclass);


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.genre VALUES (1, 'Action');
INSERT INTO public.genre VALUES (2, 'Animation');
INSERT INTO public.genre VALUES (3, 'Comedy');
INSERT INTO public.genre VALUES (4, 'Adventure');
INSERT INTO public.genre VALUES (5, 'Horror');
INSERT INTO public.genre VALUES (6, 'Romance');
INSERT INTO public.genre VALUES (7, 'Musical');
INSERT INTO public.genre VALUES (8, 'Sci-Fi');


--
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.movie VALUES (4, 'Medieval', 1, 1, 'uncheck', NULL);
INSERT INTO public.movie VALUES (5, 'O Poço', 1, 5, 'uncheck', NULL);
INSERT INTO public.movie VALUES (6, 'Vozes', 1, 5, 'uncheck', NULL);
INSERT INTO public.movie VALUES (7, 'Os Incríveis', 2, 2, 'uncheck', NULL);
INSERT INTO public.movie VALUES (8, 'Dinossauro', 2, 2, 'uncheck', NULL);
INSERT INTO public.movie VALUES (9, 'Deadpool', 2, 3, 'uncheck', NULL);
INSERT INTO public.movie VALUES (10, 'After', 3, 6, 'uncheck', NULL);
INSERT INTO public.movie VALUES (1, 'Bird Box', 1, 5, 'check', 10);
INSERT INTO public.movie VALUES (3, 'Matrix', 1, 1, 'check', 8);


--
-- Data for Name: platform; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.platform VALUES (1, 'Netflix');
INSERT INTO public.platform VALUES (2, 'Disney+');
INSERT INTO public.platform VALUES (3, 'HBO Max');
INSERT INTO public.platform VALUES (4, 'Amazon Prime');
INSERT INTO public.platform VALUES (5, 'Star+');
INSERT INTO public.platform VALUES (6, 'GloboPlay');


--
-- Name: genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.genre_id_seq', 8, true);


--
-- Name: movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.movie_id_seq', 12, true);


--
-- Name: platform_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.platform_id_seq', 6, true);


--
-- Name: genre genre_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_name_key UNIQUE (name);


--
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (id);


--
-- Name: movie movie_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT movie_name_key UNIQUE (name);


--
-- Name: movie movie_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT movie_pkey PRIMARY KEY (id);


--
-- Name: platform platform_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platform
    ADD CONSTRAINT platform_name_key UNIQUE (name);


--
-- Name: platform platform_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platform
    ADD CONSTRAINT platform_pkey PRIMARY KEY (id);


--
-- Name: movie movie_genreId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT "movie_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES public.genre(id);


--
-- Name: movie movie_platformId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT "movie_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES public.platform(id);


--
-- PostgreSQL database dump complete
--

