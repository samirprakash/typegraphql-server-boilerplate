/* 
SESSION defines the connection params to connect to the redis store.

Specifically, it sets the cookie na,e, expiration time and the secret to access the token. This cookie is what we use for validating our user sessions.
*/
import connectRedis from "connect-redis";
import session from "express-session";
import redis from "./redis";

const RedisStore = connectRedis(session);

export default session({
  store: new RedisStore({
    client: redis as any
  }),
  name: "qid",
  secret: "dsdsdsdsds",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365
  }
});
