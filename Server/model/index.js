import User from "./user.js";
import Image from "./image.js";
import Items from "./items.js";
import Category from "./category.js";

Items.belongsTo(Image, { foreignKey: "imageId", as: "image" });
