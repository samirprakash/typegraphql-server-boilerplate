/* 
Get a reference to the redis client to connect to the redis store via redis server
*/

import Redis from "ioredis";

const redis = new Redis();

export default redis;
