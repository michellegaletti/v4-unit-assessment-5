const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const profilePic = `https://robohash.org/${username}.png`;
    const [checkUser] = await db.user.find_user_by_username(username);
    if (checkUser) {
      return res.status(409).send("Email already registered");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const [user] = await db.user.create_user(username, hash, profilePic);
    delete user.password;
    req.session.user = user;
    return res.status(200).send(req.session.user);
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const [user] = await db.user.find_user_by_username(username);
    if (!user) {
      return res.status(401).send("User not found.");
    }
    const isAuthenticated = bcrypt.compareSync(password, user.password);
    if (!isAuthenticated) {
      return res.status(403).send(send("Incorrect Password"));
    }
    delete user.password;
    req.session.user = user;
    return res.status(200).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.sendStatus(200);
  },
  getUser: (req, res) => {
    if (!req.session.user) {
      return res.status(404).send("No user logged in.");
    }
    return res.status(200).send(req.session.user);
  },
};
