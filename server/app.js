require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const userRoutes = require('./routes/userRoutes'); 
app.use('/api', userRoutes); // 确保这一行在其他中间件和路由之前

const albumRoutes = require('./routes/albumRoutes');
app.use('/api', albumRoutes);

const artistRoutes = require('./routes/artistRoutes');
app.use('/api', artistRoutes);

const bookRoutes = require('./routes/bookRoutes');
app.use('/api', bookRoutes);

const commentRoutes = require('./routes/commentRoutes');
app.use('/api', commentRoutes);

const photoAlbumRoutes = require('./routes/photoAlbumRoutes');
app.use('/api', photoAlbumRoutes);

const imageRoutes = require('./routes/imageRoutes');
app.use('/api', imageRoutes);

const movieRoutes = require('./routes/movieRoutes');
app.use('/api', movieRoutes);

const placeRoutes = require('./routes/placeRoutes');
app.use('/api', placeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});