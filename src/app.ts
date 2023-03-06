import express, { Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  {
    name: "Oleh",
    age: 22,
    gender: "male",
  },
  {
    name: "Sabina",
    age: 45,
    gender: "female",
  },
  {
    name: "Anton",
    age: 42,
    gender: "female",
  },
  {
    name: "cocos",
    age: 4,
    gender: "male",
  },
];

app.get("/users", (req: Request, res: Response) => {
  res.status(200).json(users);
});

app.get("/users/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = users[+userId - 1];

  res.json(user);
});

app.get("/welcome", (req: Request, res: Response) => {
  res.send("welcome!!!");
  // res.end()
});

app.post("/users", (req: Request, res: Response) => {
  const body = req.body;
  users.push(body);

  res.status(201).json({
    message: "user created",
  });
});

app.put("/users/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  const updatedUser = req.body;

  users[+userId] = updatedUser;

  res.status(200).json({
    message: "User updated",
    data: users[+userId],
  });
});

// app.patch()

app.delete("/users/:userId", (req, res) => {
  const { userId } = req.params;

  users.splice(+userId, 1);

  res.status(200).json({
    message: "User deleted",
  });
});

const PORT = 5100;

app.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
