import express from "express";
import cors from "cors";
import { NamedRouter, ordersRouter, stockRouter} from "@server/routers";


console.log(
  "IF you run 'npm run dev', you will see this message in the console"
);

console.log("TYPESCRIPT IS BEING COMPILED ON THE FLY");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Enable CORS
server.use(cors());

const PublicAPIs: NamedRouter[] = [
  ordersRouter, stockRouter
  // Add more routers here as needed
];

for (const api of PublicAPIs) {
  server.use(`/api/${api.prefix}`, api);
}

server.listen(process.env["PORT"], () => {
  console.log(`Server is running on port ${process.env["PORT"]}`);
  console.log(
    "You can access the server at http://localhost:" + process.env["PORT"]
  );
});
