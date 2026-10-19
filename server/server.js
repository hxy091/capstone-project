import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import userRoutes from './routes/users.js';
import projectRoutes from './routes/projects.js';
import blogRoutes from './routes/blog.js';
import contactRoutes from './routes/contact.js';
import { notFound, errorHandler } from './middleware/error.js';

connectDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);

// Only listen when run directly (local dev), not when imported by Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
