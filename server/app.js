require('dotenv').config();
const express = require('express');

const userRoutes = require('./routes/userRoutes'); // 确保路径正确
const app = express();
app.use(express.json());

app.use('/api', userRoutes); // 确保这一行在其他中间件和路由之前

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});