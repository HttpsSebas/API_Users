import addUser, {
  getUser,
  updateUser,
  deleteUser,
} from "../services/user.service.js";

export default async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await getUser({ id });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function createUser(req, res) {
  const user = await addUser(req.body);
  res.status(201).send(user);
}

export async function putUser(req, res) {
  try {
    const user = await updateUser({ id: req.params.id, ...req.body });
    res.status(201).send(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function deleteUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await deleteUser({id});

    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
