const userController = require("../controllers/userController.js");
const { default: Items } = require("../model/items.js");
const user = require("../model/user.js");
const db = require("../config/db.js");

jest.mock("../model/user.js", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  findOne: jest.fn(),
}));

describe("User Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  it("should get user info", async () => {
    const req = {
      params: {
        email: "test email",
      },
    };
    const res = mockResponse();
    user.findOne.mockResolvedValue({
      fullname: "test name",
      email: "test email",
    });

    await userController.getUserInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        fullname: "test name",
        email: "test email",
      })
    );
  });
  it("should update user", async () => {
    const req = {
      params: {
        id: 7,
      },
      body: {
        fullname: "new name",
      },
    };
    const res = mockResponse();
    user.findByPk.mockResolvedValue({
      id: 7,
      fullname: "old name",
      save: jest.fn().mockResolvedValue(true),
    });
    await userController.updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User updated successfully",
    });
  });
  it("should delete account", async () => {
    const req = {
      params: {
        id: 7,
      },
    };
    const res = mockResponse();
    // Mock Items.destroy as a Jest function
    Items.destroy = jest.fn().mockResolvedValue(1);
    user.destroy.mockResolvedValue(1);

    await userController.deleteAccount(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "account deleted successfully",
    });
  });
});
