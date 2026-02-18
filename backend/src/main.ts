import express from 'express'

//Creating server
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

//ROUTES


//endpoint prueba
app.get('/ping', (req, res) => {
    res.json("Server running on LocalHost...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});