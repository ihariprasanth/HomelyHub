import { Property } from "../Models/propertyModel.js";
import { defaultProperties } from "./defaultProperties.js";

// Adds the default demo properties to the database.
// - Runs automatically on server start, but ONLY if no default property
//   exists yet, so it never creates duplicates.
// - create() is used (not insertMany) so the slug / city pre-save hooks run.
// - Set SEED_DEFAULT_PROPERTIES=false in .env to switch it off.
const seedDefaultProperties = async () => {
  if (process.env.SEED_DEFAULT_PROPERTIES === "false") return;

  try {
    const already = await Property.countDocuments({ isDefault: true });
    if (already > 0) return;

    for (const property of defaultProperties) {
      await Property.create({ ...property, isDefault: true });
    }
    console.log(`Seeded ${defaultProperties.length} default properties`);
  } catch (error) {
    console.error("Could not seed default properties:", error.message);
  }
};

export default seedDefaultProperties;
