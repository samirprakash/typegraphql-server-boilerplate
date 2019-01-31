/* 
cors enables Cross Origin Resource Sharing params. Here we want any incoming calls to the server to be 
validated with credentials and we only allow the incoming requests from the localhost:3000 server.

These values would differ based on the development or production environments.
 */
import cors from "cors";

export default cors({
  credentials: true,
  origin: "http://localhost:3000"
});
