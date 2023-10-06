import { getXataClient } from "../../../utils/xata";
const xata = getXataClient();
const handler = async (req, res) => {
  // getMany or getAll method can be used to create records in database
  const query = req.query.location

  try {
    const data = await xata.db.configProfiles.filter({ "location.id": query }).getAll();
    res.json({ message: "Success 😁", data });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};
export default handler;