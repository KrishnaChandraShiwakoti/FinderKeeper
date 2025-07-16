import User from "../model/user.js";
import Images from "../model/image.js";
import categories from "../model/category.js";

export const postItem = async (req, res) => {
  try {
    const {
      name,
      description,
      date,
      status,
      category,
      imageType,
      contact,
      location,
    } = req.body;

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded." });
    }

    const { filename, path } = req.file;

    // Create image record
    const image = await Images.create({
      filename,
      path,
    });

    // Find category
    const categoryRecord = await categories.findOne({
      where: { category_name: category },
    });

    if (!categoryRecord) {
      return res.status(400).json({ message: "Invalid category." });
    }

    const { categoryId } = categoryRecord;

    // Create news record
    await News.create({
      name,
      description,
      Date: date,
      status,
      categoryId,
      contact,
      location,
      imageId: image.id,
    });

    return res.status(201).json({ message: "News added successfully." });
  } catch (error) {
    console.log("Error in postNews function", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
