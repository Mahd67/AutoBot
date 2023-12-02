// models/supabaseModel.js
import supabase from "@supabase/supabase-js";
import { config} from "dotenv";
import { config as dotConfig } from "dotenv";

dotConfig();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

config();

export async function confirmOrder( orderdata) {
  const order = orderdata.order;
  const shipping_address = orderdata.shipping_address;
  try {
    //first deduct quantites of bought items in their respective tables
    for (const item of order.items) {
      //accessories
      if(item.category === "accessories"){
        const { data, error } = await supabaseClient
        .from('accessories')
        .select('quantity')
        .eq('accessory_id', item.product_id);
        
        console.log(data[0]['quantity']);

        const { data1, error1 } = await supabaseClient
        .from('accessories')
        .update({ quantity: data[0]['quantity'] - item.quantity })
        .eq('accessory_id', item.product_id);
      }
      //parts
      if(item.category === "parts"){
        const { data, error } = await supabaseClient
        .from('parts')
        .select('quantity')
        .eq('part_id', item.product_id);
        
        console.log(data[0]['quantity']);

        const { data1, error1 } = await supabaseClient
        .from('parts')
        .update({ quantity: data[0]['quantity'] - item.quantity })
        .eq('part_id', item.product_id);
      }
    }
    //now we save the order
    const { data, error } = await supabaseClient
      .from('orderhistory')
      .insert([
        { 
          items: order.items,
          sub_total_price: order.sub_total_price,
          shipping_price: order.shipping_price,
          total_price: order.total_price,
          user_id: order.user_id,
          payment_method: order.payment_method,
          firstname: shipping_address.firstname,
          lastname: shipping_address.lastname,
          city: shipping_address.city,
          address: shipping_address.address,
          zip_code: shipping_address.zip_code,
          email: shipping_address.email,
          phone: shipping_address.phone,
        },
      ]);
  } catch (error) {
    throw error;
  }
  return
}

export async function getallaccessories() { 
try {
    const { data, error } = await supabaseClient
      .from('accessories')
      .select()
      .order('type', { ascending: true });
    
    if (error || data.length === 0) {
      return null;
    }
    if (data.length !== 0) {
      const accessoriesdata = data;
      console.log(accessoriesdata);
      return { accessoriesdata };
    }
  } catch (error) {
    console.error('Error retrieving accessories:', error);
    return { message: 'An error occurred while retrieving accessories.' };
  }
  return
}

export async function getallparts() { 
    try {
        const { data, error } = await supabaseClient
          .from('parts')
          .select()
          .order('category', { ascending: true });
        
        if (error || data.length === 0) {
          return null;
        }
        if (data.length !== 0) {
          const partsdata = data;
          console.log(partsdata);
          return { partsdata };
        }
      } catch (error) {
        console.error('Error retrieving parts:', error);
        return { message: 'An error occurred while retrieving parts.' };
      }
      return
    }

// export async function getReportOne(customer_id,uuid) { 
//   try {
//       const { data, error } = await supabaseClient
//         .from('report')
//         .select()
//         .eq('customer_id', customer_id)
//         .eq('uuid', uuid);
      
//       if (error || data.length === 0) {
//         return null;
//       }
//       if (data.length !== 0) {
//         const history = data[0];
//         console.log(history);
//         return { history };
//       }
//     } catch (error) {
//       console.error('Error retrieving Report:', error);
//       return { message: 'An error occurred while retrieving Report.' };
//     }
//   }
