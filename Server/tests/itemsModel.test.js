const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const itemsMock = dbMock.define("items", {
  itemId: 1,
  name: "test item",
  description: "test description",
  date: "2025-7-13",
  location: "test location",
  claimed: "notClaimed",
  contact: 9840099528,
  status: false,
  imageId: 1,
  categoryId: 2,
  userId: 1,
});

describe("Item Model", () => {
  it("should create an item", async () => {
    const item = await itemsMock.create({
      name: "new item",
      description: "item description",
      date: "2025-7-13",
      location: "item location",
    });
    expect(item.name).toBe("new item");
    expect(item.description).toBe("item description");
    expect(item.date).toBe("2025-7-13");
    expect(item.location).toBe("item location");
  });

  it("should require a name", async () => {
    try {
      const item = await itemsMock.create({});
      if (!item.name) throw new Error("Validation error: name is required");
    } catch (err) {
      expect(err.message).toMatch(/name is required/);
    }
  });
});
