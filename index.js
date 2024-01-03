import express from 'express';
import fetchMeta from 'fetch-meta-tags';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is missing' });
  }
  try {
    const response = await fetchMeta(url);
    const ogData = response; 
    res.status(200).json(ogData);
  } catch (error) {
    console.log(error);
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.statusText : 'Internal server error',
    });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
