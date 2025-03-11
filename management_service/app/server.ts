import express from "express";
import cors from "cors";
import { NamedRouter, ordersRouter } from "@server/routers";
import { PrismaClient } from "@prisma/client";

// SINGLE INSTANCE OF PRISMA CLIENT that gets exported and used in all routers as opposed to creating a new instance in each router
export const Db = new PrismaClient();

console.log(
  "IF you run 'npm run dev', you will see this message in the console"
);

console.log("TYPESCRIPT IS BEING COMPILED ON THE FLY");
console.log("yes");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Enable CORS
server.use(cors());

const PublicAPIs: NamedRouter[] = [
  ordersRouter,
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
