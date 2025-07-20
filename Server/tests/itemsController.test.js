const itemsController = require("../controllers/itemsController.js");
const item = require("../model/items.js");

//Mock Sequelize Methods

jest.mock("../model/items.js", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe("Item Controller", () => {
  // Mock Images.create for postItem
  const Images = require("../model/image.js");
  Images.create = jest.fn().mockResolvedValue({
    id: 1,
    filename: "test-image.jpg",
    path: "uploads/test-image.jpg",
  });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  it("should create a new product", async () => {
    const req = {
      body: {
        name: "test item",
        description: "test desc",
        location: "test location",
        dateLost: "2025-07-112",
        status: false,
        category: "Keys",
        email: "rijankrishna14@gmail.com",
        userId: 1,
        claimed: "notClaimed",
        imageId: 1,
      },
      file: {
        filename: "test-image.jpg", // or any dummy filename
        path: "uploads/test-image.jpg",
        mimetype: "image/jpeg",
        // optional: originalname, buffer, etc.
      },
    };
    const res = mockResponse();
    item.create.mockResolvedValue(req.body);
    // Mock categories.findOne to return a valid category
    const categories = require("../model/category.js");
    categories.findOne = jest
      .fn()
      .mockResolvedValue({ categoryId: 6, category_name: "Keys" });

    await itemsController.postItem(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Item added successfully.",
    });
  }, 10000);
  it("should return all item", async () => {
    const req = {};
    const res = mockResponse();
    item.findAll.mockResolvedValue([{ itemId: 1, name: "test item" }]);

    await itemsController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({ itemId: 1, name: "test item" }),
        ]),
        message: expect.any(String),
      })
    );
  });
  it("should return a product by ID", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    item.findByPk.mockResolvedValue({ itemId: 1, name: "test item" });

    await itemsController.getItemById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ itemId: 1 })
    );
  });
  it("should return 404 if product not found", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    item.findByPk.mockResolvedValue(null);

    await itemsController.getItemById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "No item found" });
  });
});
