import { app, authLimiter } from './app.js';
import mongoose from 'mongoose';
import cluster from 'node:cluster';
import os from 'node:os';
import authRoutes from './routes/auth.routes.js';

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dokkhota';

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.json({ message: 'successful' });
});

// Auth routes with rate limiting
app.use('/api/auth', authLimiter, authRoutes);

const cpu = os.cpus().length;
if (cluster.isPrimary) {
  console.log(`Primary process running on : ${process.pid}`);
  for (let i = 0; i < cpu; i++) {
    const worker = cluster.fork();
    console.log(`Worker is running on Pid : ${worker.pid}`);
  }
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
  });
}
