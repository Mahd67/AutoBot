
import {confirmOrder, getallaccessories, getallparts} from '../Models/supabaseModel.js';

export async function saveNewOrder(req, res) {
  const orderdetails = req.body;
  try {
        const data = await confirmOrder(orderdetails);
        return res.status(200).json({ message: 'Order saved successfully', data });
  } catch (error) {
    console.error('Error saving history:', error);
    return res.status(500).json({ message: 'An error occurred while saving Order.' });
  }
  return
}

export async function getaccessoriesdata(req, res) {
  try {
        const data = await getallaccessories();
        if (data === null) {
          return res.status(404).json();
        } 
        return res.status(200).json({ message: 'Accessories found', data });
  } catch (error) {
    console.error('Error getting Accessories:', error);
    return res.status(500).json({ message: 'An error occurred while getting Accessories.' });
  }
  return
}

export async function getpartsdata(req, res) {
  try {
        const data = await getallparts();
        if (data === null) {
          return res.status(404).json();
        } 
        return res.status(200).json({ message: 'parts found', data });
  } catch (error) {
    console.error('Error getting parts:', error);
    return res.status(500).json({ message: 'An error occurred while getting parts.' });
  }
  return
}

// export async function getReportdataOne(req, res) {
//   const { customer_id,uuid } = req.body;
//   try {
//         const data = await getReportOne(customer_id,uuid);
//         if (data === null) {
//           return res.status(404).json();
//         } 
//         return res.status(200).json({ message: 'Report found', data });
//   } catch (error) {
//     console.error('Error getting Report:', error);
//     return res.status(500).json({ message: 'An error occurred while getting Report.' });
//   }
// }
