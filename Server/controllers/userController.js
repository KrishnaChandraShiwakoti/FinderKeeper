import Items from "../model/items.js";
import User from "../model/user.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const getUserInfo = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ where: { email } });
  if (!user || user == null) {
    res.status(400).json({ message: "User Does not Exists" });
  }
  res.status(200).json({
    username: user.username,
    fullname: user.fullname,
    email: user.email,
    contact: user.contact,
  });
};
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const user = await User.findByPk(id); // same as findOne({ where: { id } })

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter only valid and non-empty fields
    const validUpdates = Object.fromEntries(
      Object.entries(req.body).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    );

    // Update only allowed fields (optional: whitelist field names)
    Object.assign(user, validUpdates);

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to update profile",
      error: err.message,
    });
  }
};
export const deleteAccount = async (req, res) => {
  const { id } = req.params;
  try {
    await Items.destroy({
      where: { userId: id },
    });
    await User.destroy({
      where: { id },
    });
    res.status(200).json({ message: "account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` });
  }
};
export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  try {
    let user = await User.findOne({ where: { id } });
    if (!user) return res.status(400).json({ message: "user does not exists" });
    const storedHashedPassword = user.password;
    bcrypt.compare(
      currentPassword,
      storedHashedPassword,
      async (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (result) {
            bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
              if (err) {
                console.log("Error hashing password", err);
                res.status(400).json({ message: "Error hashing password" });
              } else {
                await User.update({ password: hash }, { where: { id } });
                return res
                  .status(200)
                  .json({ message: "Password updated Successfully" });
              }
            });
          } else {
            res.status(400).json({ message: "Incorrect password" });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` });
  }
};
