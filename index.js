import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const PORT = 3000;
const app = express();
app.listen(PORT, () => {
    console.log("Server started")
});

// app.use(express.routes(path.resolve(__dirname, 'routes')));
//
app.use(express.static(__dirname + '/routes'));
// app.use(express.static(__dirname + '/routes/js'))
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'routes', 'index.html'));
})



