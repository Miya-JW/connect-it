require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());  // 这将允许所有域的跨域请求
app.use(express.json());

const userRoutes = require('./routes/userRoutes'); 
app.use('/api', userRoutes); 

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

const tagRoutes = require('./routes/tagRoutes');
app.use('/api', tagRoutes);

const topicRoutes = require('./routes/topicRoutes');
app.use('/api', topicRoutes);

const userRelationshipRoutes = require('./routes/userRelationshipRoutes');
app.use('/api', userRelationshipRoutes);

const tweetRoutes = require('./routes/tweetRoutes');
app.use('/api', tweetRoutes);

const blogRoutes = require('./routes/blogRoutes');
app.use('/api', blogRoutes);

const likeRoutes = require('./routes/likeRoutes');
app.use('/api', likeRoutes);

console.log(process.env.PORT_SERVER);
const PORT = process.env.PORT_SERVER || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});