require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const userRoutes = require('./routes/userRoutes'); 
app.use('/api', userRoutes); // 确保这一行在其他中间件和路由之前

const albumRoutes = require('./routes/albumRoutes');
app.use('/api', albumRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});