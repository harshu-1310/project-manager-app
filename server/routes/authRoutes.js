router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "member" // default user
    });

    res.status(201).json({
      msg: "Signup successful",
      role: user.role
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});