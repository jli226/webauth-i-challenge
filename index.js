const server = require("./server.js");

server.get("/", (req, res) => {
  res.send("API is running...");
});

const port = process.env.PORT || 5555;

server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
