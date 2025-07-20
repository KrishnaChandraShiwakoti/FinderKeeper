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
      claimed,
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
      claimed,
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
  try {
    await Items.destroy({
      where: { itemId: id },
    });
    res.send(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` });
  }
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
      const plain = typeof news.toJSON === "function" ? news.toJSON() : news;
      return {
        ...plain,
        imageUrl: plain.image ? `/uploads/${plain.image.filename}` : null,
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
      return res.status(404).json({ message: "No data found" });
    }
    // Fetch all categories once
    const allCategories = await categories.findAll();
    const categoryMap = {};
    allCategories.forEach((cat) => {
      categoryMap[cat.categoryId] = cat.category_name;
    });

    const result = data.map((news) => {
      const plain = typeof news.toJSON === "function" ? news.toJSON() : news;
      return {
        ...plain,
        imageUrl: plain.image ? `/uploads/${plain.image.filename}` : null,
        category: categoryMap[plain.categoryId] || "Unknown",
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
export const getRecentItem = async (req, res) => {
  try {
    const data = await Items.findAll({
      include: { model: Images, as: "image" },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });
    if (data.length === 0) {
      return res.status(404).json({ message: "No recent items found" });
    }

    // Fetch all categories once
    const allCategories = await categories.findAll();
    const categoryMap = {};
    allCategories.forEach((cat) => {
      categoryMap[cat.categoryId] = cat.category_name;
    });

    const result = data.map((item) => {
      const plain = typeof item.toJSON === "function" ? item.toJSON() : item;
      return {
        ...plain,
        imageUrl: plain.image ? `/uploads/${plain.image.filename}` : null,
        category: categoryMap[plain.categoryId] || "Unknown",
      };
    });
    res.status(200).json({
      message: "Fetched recent items successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching recent items" });
  }
};
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Items.findByPk(id, {
      include: { model: Images, as: "image" },
    });
    if (!data) {
      return res.status(404).json({ message: "No item found" });
    }
    const plainData = typeof data.toJSON === "function" ? data.toJSON() : data;

    // Find category name for this item
    let categoryName = "Unknown";
    if (plainData.categoryId) {
      const categoryRecord = await categories.findOne({
        where: { categoryId: plainData.categoryId },
      });
      if (categoryRecord) {
        categoryName = categoryRecord.category_name;
      }
    }

    const result = {
      ...plainData,
      imageUrl: plainData.image ? `/uploads/${plainData.image.filename}` : null,
      category: categoryName,
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: { error } });
  }
};
export const changeClaimedStatus = async (req, res) => {
  const { id } = req.params;
  const { claimed } = req.body;
  try {
    const item = Items.update({ claimed }, { where: { itemId: id } });
    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: { error } });
  }
};
