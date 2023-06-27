const express = require('express');
const routes = require('./routes')

const PORT = process.env.PORT || 3000;
// dynamically set the port
const app = express();

// Express middleware will always run the operation in the order from top to bottom "order matters"
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(routes)


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});