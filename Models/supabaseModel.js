// models/supabaseModel.js
import supabase from "@supabase/supabase-js";
import { config} from "dotenv";
import { config as dotConfig } from "dotenv";

dotConfig();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

config();

export async function confirmOrder( orderdata, res) {
  try {
    
  } catch (error) {
    throw error;
  }
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
