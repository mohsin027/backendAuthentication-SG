export const profile = (req, res) => {
  console.log(req.user);
  const user = req.user;
  console.log("user profile");
  res.json(user);
};
