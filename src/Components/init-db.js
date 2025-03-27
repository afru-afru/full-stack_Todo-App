import { connectDb } from '../lib/config/db';

const InitDb = async () => {
  await connectDb();
};

export default InitDb;