import User from "../model/user.js";
import Images from "../model/image.js";
import categories from "../model/category.js";
import Items from "../model/items.js";

export const postItem = async (req, res) => {
  try {
    const {
      name,
      description,
      dateLost,
      status,
      category,
      imageType,
      email,
      location,
      userId,
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

    // Create new Item record
    await Items.create({
      name,
      description,
      date: dateLost,
      status,
      categoryId,
      contact: email,
      location,
      imageId: image.id,
      userId,
    });

    return res.status(201).json({ message: "Item added successfully." });
  } catch (error) {
    console.log("Error in postNews function", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const deletePost = async (req, res) => {
  console.log(req.params);

  const { id } = req.params;
  await Items.destroy({
    where: { newsId: id },
  });
  res.send(200).json({ message: "News deleted successfully" });
};
export const getItemsByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Items.findAll({
      where: { userId: id },
      include: [{ model: Images, as: "image" }],
    });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the given reporterId" });
    }
    const result = data.map((news) => {
      return {
        ...news.toJSON(),
        imageUrl: news.image ? `/uploads/${news.image.filename}` : null,
      };
    });

    res.status(200).json({
      message: "Fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching data" });
  }
};
export const getAll = async (req, res) => {
  try {
    const data = await Items.findAll({
      include: { model: Images, as: "image" },
    });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the given reporterId" });
    }
    const result = data.map((news) => {
      return {
        ...news.toJSON(),
        imageUrl: news.image ? `/uploads/${news.image.filename}` : null,
      };
    });

    res.status(200).json({
      message: "Fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching data" });
  }
};
