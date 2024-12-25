// import cron from "node-cron";
// import { db } from "@/lib/db"; // Replace with your actual DB instance

// // Schedule the job to run every day at midnight
// cron.schedule("0 0 * * *", async () => {
//   const today = new Date();
//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1);

//   try {
//     // Fetch projects whose endDate is 1 day from now
//     const projects = await db.project.findMany({
//       where: {
//         endDate: {
//           gte: today,
//           lt: tomorrow,
//         },
//       },
//       include: {
//         user: true,
//       },
//     });

//     // Create notifications for each project
//     for (const project of projects) {
//       await db.notification.create({
//         data: {
//           userId: project.userId,
//           projectId: project.id, // Include the required projectId
//           message: `The project "${project.name}" is nearing its deadline. Please review it.`,
//           read: false,
//         },
//       });
//     }

//     console.log(`Notifications created for ${projects.length} projects.`);
//   } catch (error) {
//     console.error("Error creating notifications:", error);
//   }
// });
