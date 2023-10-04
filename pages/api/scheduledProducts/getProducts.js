import { getXataClient } from "../../../utils/xata";
const xata = getXataClient();
const handler = async (req, res) => {
  // getMany or getAll method can be used to create records in database
  try {
    const data = await xata.db.scheduledProducts.getAll();
    res.json({ message: "Success 😁", data });
  } catch (error) {
    res.status(500).json({ message: error.message, data: [] });
  }
};
export default handler;