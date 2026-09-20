// Manual run:  npm run seed          -> adds defaults if missing
//              npm run seed -- --reset -> deletes old defaults and re-adds
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./utils/db.js";
import { Property } from "./Models/propertyModel.js";
import seedDefaultProperties from "./utils/seedDefaultProperties.js";

dotenv.config();
await connectDB();
if (process.argv.includes("--reset")) {
  const r = await Property.deleteMany({ isDefault: true });
  console.log(`Removed ${r.deletedCount} old default properties`);
}
await seedDefaultProperties();
await mongoose.disconnect();
