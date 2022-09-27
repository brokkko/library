import express from 'express';
import path from 'path';

// const __dirname = path.resolve();
// const PORT = 3000;
// const app = express();
// app.listen(PORT, () => {
//     console.log("Server started")
// });
//
// app.use(express.routes(path.resolve(__dirname, 'routes')));

// app.get('/', (req, res) => {
//     // res.send('<h1>Test</h1>');
//     res.sendFile(path.resolve(__dirname, 'routes', 'index.html'));
// })

import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', 'value');
const value = await client.get('key');


