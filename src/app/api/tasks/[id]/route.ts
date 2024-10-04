// import { NextApiRequest, NextApiResponse } from 'next';
// import { db } from "@/lib/db";

// export async function PATCH(req: NextApiRequest, res: NextApiResponse): Promise<void> {
//   const { id } = req.query;

//   if (req.method === 'PATCH') {
//     try {
//       const { status } = req.body;

//       if (!status) {
//         return res.status(400).json({ error: 'Status is required' });
//       }

//       const updatedTask = await db.task.update({
//         where: { id: String(id) },
//         data: { status },
//       });

//       res.status(200).json(updatedTask);
//     } catch (error) {
//       console.error('Error updating task:', error);
//       res.status(500).json({ error: 'An error occurred while updating the task' });
//     }
//   } else {
//     res.setHeader('Allow', ['PATCH']);
//     res.status(405).json({ message: `Method ${req.method} not allowed` });
//   }
// }
