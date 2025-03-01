import express from "express";
import { NamedRouter, ordersRouter } from "@server/routers";

console.log("IF you run 'npm run dev', you will see this message in the console");
console.log("TYPESCRIPT IS BEING COMPILED ON THE FLY");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// OUR FIRST ROUTE
// This is a simple route that returns a message when the root URL is accessed
server.get("/", (req, res) => {
    res.send("Yeah i think this works");
});

const PublicAPIs: NamedRouter[] = [
    ordersRouter,
    // Add more routers here as needed
];

for (const api of PublicAPIs) {
    server.use(`/api/${api.prefix}`, api);
}


server.listen(process.env['PORT'], () => {
    console.log(`Server is running on port ${process.env['PORT']}`);
    console.log("You can access the server at http://localhost:" + process.env['PORT']);
});