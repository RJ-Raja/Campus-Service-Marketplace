import 'dotenv/config';
import app from './app';
import connectDB from './config/database';
import { configureCloudinary } from './config/cloudinary';
import { initializeRedis } from './config/redis';

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const startServer = async (): Promise<void> => {
  try {
    // Connect to databases
    console.log('🔄 Initializing services...');
    await connectDB();
    configureCloudinary();
    initializeRedis();

    // Start the server
    app.listen(PORT, () => {
      console.log(
        `\n✅ Server is running on http://localhost:${PORT}`
      );
      console.log(`📋 Environment: ${NODE_ENV}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
