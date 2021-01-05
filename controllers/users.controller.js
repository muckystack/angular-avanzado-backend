
const getUsers = (req, res) => {
  res.json({
    ok: true,
    users: [
      {
        id: 123,
        name: "safasdf",
      },
    ],
  });
};

module.exports = {
  getUsers,
};