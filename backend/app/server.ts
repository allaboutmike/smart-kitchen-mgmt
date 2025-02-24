import express from "express";

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


server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log("You can access the server at http://localhost:" + process.env.PORT);
});