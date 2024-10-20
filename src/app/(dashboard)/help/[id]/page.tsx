'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

type ContentProps = {
    id: string,
    title: string,
    header?: string,
    contents?: string[]
    list?: { title: string, lists: { listTitle: string, listContent: string}[]}
    footer?: string
    extra?: string[]
}

const HelpPage = () => {

    const { id } = useParams()

    const contents: ContentProps[] = [
        {   
            id: "introduction", 
            title: "Introduction", 
            header: "Introduction to the Web App",
            contents: ["Welcome to our Task Management Web App! Whether you're juggling multiple personal tasks or coordinating a team on a complex project, this app is designed to streamline your work process. It helps you break down large, intricate tasks into smaller, manageable steps, making it easier to track progress and stay organized. Our intuitive interface and powerful features will keep you on top of your to-do list while improving productivity. Read on for a complete guide to unlocking the full potential of the app."],
            extra: ["Task Management Web App", "Tasks", "productivity"]
        },
        {
            id: "navigate",
            title: "Navigation",
            header: "Navigating the Dashboard Overview",
            contents: ["The Dashboard is your mission control for task and project management. It gives you a bird’s-eye view of everything that's on your plate, from urgent tasks to long-term projects. The Dashboard is designed to be both informative and intuitive, so you can instantly understand your workload at a glance.","Overview: Upon logging in, you’ll land on the Dashboard, which displays a summary of all your active tasks and projects. Tasks are organized by status—whether they are Not Started, In Progress, or Completed. This status overview helps you track where you are in each task or project, keeping you focused on what’s next."],
            list: {
                title: "Quick Actions You Can Take from the Dashboard:",
                lists: [
                {
                    listTitle: "Add a New Project or Task",
                    listContent: "By clicking the (New Project) or (New Task) buttons. Customize each one with details like deadlines, priority levels, and descriptions to keep your workflow organized."
                },
                {
                    listTitle: "View Task Details",
                    listContent: "By simply selecting any task from your task list. Here, you can dig into the specifics, like due dates, notes, and sub-tasks, for a more detailed view of your work."
                },
                {
                    listTitle: "Track Progress",
                    listContent: "With visual indicators, such as progress bars or task completion percentages, which show how much of the project or task is complete."
                }
            ]
            },
            footer: "The Dashboard is designed to help you get a clear sense of direction quickly. In just a few clicks, you’ll have full control over your tasks and projects.",
            extra: ["Dashboard", "Status", "Quick Actions","Visual Indicators"]
        },
        {
            id: "create",
            title: "Create",
            header: "Creating Projects and Tasks",
            contents: ["Taking charge of your work begins with structuring it effectively. The app allows you to easily create projects and populate them with tasks and sub-tasks, giving you full control over each aspect of your workflow."],
            list: {
                title: "Step-by-Step Guide to Creating a Project:",
                lists: [
                {
                    listTitle: "Create a New Project:",
                    listContent: "Click the (New Project) button to get started.Give your project a descriptive title to easily identify it.Optionally, set a due date and add relevant notes or details. Clear descriptions can help provide context, especially for complex projects."
                },
                {
                    listTitle: "Add Tasks to Your Project:",
                    listContent: "Once your project is set up, click on it to view the project’s details.Add tasks by selecting the (Add Task) button. Tasks can be personalized with a title, due date, priority level (High, Medium, or Low), and any additional notes.Each task will appear under your project, and its status can be updated as work progresses."
                },
                {
                    listTitle: "Breaking Down Tasks into Sub-tasks:",
                    listContent: "If a task is complex and requires multiple steps to complete, you can break it down into sub-tasks. Click the (Add Sub-task) option under a task to start adding these smaller actions. This makes large tasks more manageable and allows you to check off progress incrementally."
                }
            ]
            },
            extra: ["Create Projects", "Create Tasks"]
        },
        {
            id: "manage", 
            title: "Management", 
            header: "Managing Tasks",
            contents: [
                "Once you’ve created your tasks, managing them is simple. You can update statuses, edit details, and delete tasks as needed to reflect the progress you're making.",
                "Additionally, our AI-powered task manager provides smart recommendations to help guide you through the next steps in your projects. Whether it's suggesting the most important tasks to tackle based on deadlines or recommending status updates, the AI is here to assist."
            ],
            list: {
                title: "Quick Actions Guide to Managing a Project:",
                lists: [
                    {
                        listTitle: "AI-Powered Task Recommendations:",
                        listContent: "Take advantage of AI-generated suggestions that guide you in prioritizing tasks. The AI analyzes your deadlines, task dependencies, and priorities to suggest the best next steps, helping you stay organized and on track."
                    },
                    {
                        listTitle: "Update Task Status:",
                        listContent: "Keep your projects organized by easily dragging and dropping tasks into their appropriate statuses: (To Do), (In Progress), (Cancelled), or (Completed). Simply drag the task to the corresponding column, and the status will be automatically updated based on where you place it. All updates will be instantly reflected on your Dashboard."
                    },
                    {
                        listTitle: "Editing Tasks:",
                        listContent: "Need to make adjustments? Whether it's updating a deadline, changing the task's priority, or adding more details, you can edit any task by clicking on it and selecting (Edit Task)."
                    },
                    {
                        listTitle: "Deleting Tasks:",
                        listContent: "To remove a task, open it and select the trash icon. You'll be prompted to confirm before the task is permanently deleted, preventing accidental removals."
                    }
                ]
            },
            extra: ["Task Status", "Create Tasks", "Edit Task Details", "Remove Tasks", "AI Recommendations"]
        },        
        {   
            id: "organize", 
            title: "Organizing", 
            header: "Organizing and Prioritizing Tasks",
            contents: ["Effective task management isn't just about getting things done—it’s about doing the right things at the right time. Our app helps you categorize, prioritize, and filter tasks, so you can focus on what matters most."],
            list: {
                title: "Quick Actions Guide to Organizing Tasks:",
                lists: [
                {
                    listTitle: "Categorizing Tasks:",
                    listContent: "Organize tasks by assigning them to categories such as Work, Personal, or Urgent. Categories help you keep different areas of your life or business organized and allow you to focus on specific groups of tasks as needed."
                },
                {
                    listTitle: "Setting Task Priorities:",
                    listContent: "Not all tasks are created equal. That’s why you can assign priorities to each task—High, Medium, or Low. Tasks marked as High Priority will help you stay laser-focused on the most important activities."
                },
                {
                    listTitle: "Using Filters:",
                    listContent: "Use the built-in Filter tool to view tasks by priority, due date, or status (e.g., Not Started, In Progress, Completed). This is particularly useful when you have many tasks and need to quickly see what's urgent or overdue."
                }
            ]
        },
        extra: ["Categorize", "Priorities","Filters"]
        },
        {   
            id: "track", 
            title: "Tracking", 
            header: "Tracking Progress",
            contents: ["Staying on top of progress is key to ensuring that projects get done on time. Our app offers visual tools to help you see where you stand at any given moment."],
            list: {
                title: "Guide to Tracking Progress:",
                lists: [
                {
                    listTitle: "Visual Progress Indicators:",
                    listContent: "Each project comes with a progress bar that visually represents how much of the project has been completed. As tasks are marked In Progress or Completed, the bar fills, offering a quick view of how close you are to finishing the project."
                },
                {
                    listTitle: "Task View Options:",
                    listContent: "You can toggle between different task views:List View: Provides a detailed, linear list of your tasks.Grid View: Shows tasks in a more visual, card-based layout, ideal for those who prefer to manage their work with a more visual structure."
                },
            ]
            },
            extra: ["Progress Indicators", "Task View Option"]
        },
        {   
            id: "tips", 
            title: "Tips", 
            header: "Tips for Staying Organized",
            contents: ["Organization is key to maintaining productivity, and the app is designed to support that. Here are some expert tips to help you stay on top of your game:"],
            list: {
                title: "Break Down Tasks:",
                lists: [
                    {
                        listTitle: "Break Down Large Tasks:",
                        listContent: "Don’t let large tasks overwhelm you. Break them down into smaller, more manageable pieces. This makes each step feel achievable and reduces the stress of handling a big project."
                    },
                    {
                        listTitle: "Prioritize Your Day:",
                        listContent: "At the start of each day, review your task list and focus on the highest-priority tasks. Tackling your most important work first sets a productive tone for the rest of the day."
                    },
                    {
                        listTitle: "Set Realistic Deadlines:",
                        listContent: "Avoid burnout by setting deadlines that are achievable. Overestimating how much time you have can lead to unnecessary pressure, while realistic deadlines keep you moving forward steadily."
                    }
                ]
            },
            extra: ["Break Down", "Prioritize", "Deadlines"]
        },
        {   
            id: "FAQ", 
            title: "FAQ", 
            header: "Frequently Asked Questions (FAQs)",
            contents: ["Currently, the app is designed for individual use, but we are actively working on future updates to include team collaboration features. If you want to delete a project, open the project you wish to remove and click the trash icon. After confirming the action, the project will be permanently deleted from your dashboard."],
            extra: ["Delete Project", "Team Collaboration"]
        },
        {   
            id: "handle", 
            title: "Handle", 
            header: "How to handle a Successful Project?",
            contents: ["The difference between success and failure often lies in how well a project is handled from start to finish. A successful project requires not just a clear vision but also a structured approach that guides the team through each phase of the process. The ability to define goals, conduct thorough research, and create a detailed plan are fundamental skills that every project manager must master.","Handling a good project involves a series of strategic steps designed to ensure that objectives are met efficiently and effectively. From understanding the project's purpose and scope to meticulously planning tasks and resources, each phase is crucial in building a solid foundation for success. It is essential to involve stakeholders throughout the process, gather feedback, and make adjustments along the way to enhance the project's outcomes.","Moreover, the dynamic nature of projects necessitates adaptability and continuous improvement. Embracing a mindset of iterative development, where feedback is regularly incorporated, not only improves the project's quality but also fosters collaboration among team members.","This guide will walk you through the essential steps to effectively handle a project, providing insights into best practices that will empower you to achieve your goals. By following these principles, you will enhance your project management skills and contribute to a culture of success within your organization."],
            extra: ["Start","Ethics"]
        },
        {   
            id: "define", 
            title: "Define", 
            list: {
                title: "Define the Project Goals",
                lists: [
                    {
                        listTitle: "Purpose:",
                        listContent: "Begin by understanding the core reason for undertaking the project. What specific problem are you aiming to solve? Articulate the significance of the project and its expected impact."
                    },
                    {
                        listTitle: "Scope:",
                        listContent: "Clearly outline the boundaries of your project. Identify what aspects will be included and what will be excluded to avoid scope creep. A well-defined scope helps ensure all stakeholders have aligned expectations and helps in managing resources effectively."
                    },
                    {
                        listTitle: "Objectives:",
                        listContent: "List specific, measurable outcomes or deliverables the project should achieve. Setting SMART (Specific, Measurable, Achievable, Relevant, Time-bound) objectives will guide your project and help assess its success."
                    }
                ]
            },
            extra:["Purpose","Scope","Objectives"]
        },
        {   
            id: "conduct", 
            title: "Conduct", 
            list: {
                title: "Step 2: Conduct Research",
                lists: [
                    {
                        listTitle: "Background Study:",
                        listContent: "Investigate similar projects to understand potential challenges, success stories, and industry best practices. This research can provide valuable insights that inform your project’s approach."
                    },
                    {
                        listTitle: "Requirements Gathering:",
                        listContent: "Engage with stakeholders, potential users, and relevant parties to collect insights about their needs. This may involve conducting interviews, surveys, or focus groups to gather qualitative and quantitative data that shapes project requirements."
                    },
                ]
            },
            extra:["Background Study","Requirements Gathering","Stakeholders","Surveys"]
        },
        {   
            id: "detail", 
            title: "Detailed", 
            list: {
                title: "Step 3: Create a Detailed Plan",
                lists: [
                    {
                        listTitle: "Work Breakdown Structure (WBS):",
                        listContent: "Break the project into smaller, manageable tasks. This hierarchical decomposition of tasks will facilitate effective time management and help assign responsibilities to team members."
                    },
                    {
                        listTitle: "Timeline & Milestones:",
                        listContent: "Develop a timeline with clear deadlines for each major phase of your project. Utilize project management tools such as Gantt charts to visualize the project timeline, track progress, and identify potential bottlenecks."
                    },
                    {
                        listTitle: "Resource Allocation:",
                        listContent: "Identify the necessary resources, including time, personnel, tools, and technology. Ensure these resources are available and allocate them efficiently to avoid delays during the project."
                    },
                ]
            },
            extra:["Work Breakdown Structure (WBS)","Timeline","Milestones","Resource Allocation"]
        },
        {   
            id: "design", 
            title: "Design", 
            list: {
                title: "Step 4: Design",
                lists: [
                    {
                        listTitle: "System/Project Architecture:",
                        listContent: "For technical projects, create a blueprint outlining how different components will interact (e.g., front-end, back-end, database). For non-tech projects, develop detailed plans or prototypes to visualize the end goal."
                    },
                    {
                        listTitle: "Wireframes or Mockups:",
                        listContent: "Develop visual designs or wireframes of your project to clarify the final product’s appearance and functionality. This stage helps stakeholders visualize the end result, allowing for feedback before development begins."
                    },
                ]
            },
            extra:["System/Project Architecture","Blueprint","Wireframes or Mockups"]
        },
        {   
            id: "implement", 
            title: "Implementation", 
            list: {
                title: "Step 5: Development or Implementation",
                lists: [
                    {
                        listTitle: "Iterate:",
                        listContent: "Embrace an iterative approach to development by working in small stages. Testing each feature or component as you develop allows for early detection of issues and necessary adjustments."
                    },
                    {
                        listTitle: "Test Early and Often:",
                        listContent: "Implement a rigorous testing regime throughout the development process. Regularly check for bugs and usability issues to catch problems before they escalate, making it easier to fix them early on."
                    },
                ]
            },
            extra:["Assign Tasks","Iterate","Test Early and Often"]
        },
        {   
            id: "testing", 
            title: "Testing", 
            list: {
                title: "Step 6: Testing & Evaluation",
                lists: [
                    {
                        listTitle: "User Testing:",
                        listContent: "Conduct user testing sessions where real users interact with your project. Collect feedback to identify usability issues and gather insights that inform improvements."
                    },
                    {
                        listTitle: "Bug Fixing:",
                        listContent: "Analyze the feedback received during testing to make necessary adjustments. Prioritize fixing critical bugs to enhance user experience and project reliability."
                    },
                ]
            },
            extra:["User Testing","Bug Fixing"]
        },
        {   
            id: "review", 
            title: "Review", 
            list: {
                title: "Step 7: Final Review & Presentation",
                lists: [
                    {
                        listTitle: "Polish the Project:",
                        listContent: "Conduct a thorough final review to ensure all objectives have been met. Verify that the project runs smoothly and all features function as intended."
                    },
                    {
                        listTitle: "Prepare Documentation:",
                        listContent: "Create comprehensive documentation that clearly explains how the project works, its features, and instructions for use. Well-organized documentation facilitates user adoption and supports future maintenance."
                    },
                    {
                        listTitle: "Present or Submit:",
                        listContent: "If required, prepare for a formal presentation of your project. Make sure your project is easily demonstrable, highlighting key features and user benefits."
                    },
                ]
            },
            extra:["Polish","Documentation","Present"]
        },
        {   
            id: "evaluation", 
            title: "Evaluation", 
            list: {
                title: "Step 8: Post-Project Evaluation",
                lists: [
                    {
                        listTitle: "Feedback:",
                        listContent: "After project completion, gather feedback from users, stakeholders, or evaluators to assess the project’s impact and effectiveness."
                    },
                    {
                        listTitle: "Improvements:",
                        listContent: "Reflect on the project process to identify successes and areas for improvement. Use these insights to inform your approach in future projects, fostering continuous learning and growth."
                    },
                ]
            },
            extra:["Feedbacks","Improvements","Reflect"]
        },
    ]

    const getContent = contents.find((content) => content.id === id);

    if(!getContent) {
        return <h1>Page not found</h1>
    }

  return (
    <div className='flex flex-col lg:flex-row w-full pb-10'>
        <div className='flex flex-col w-full lg:w-2/3'>
            <h1 className='text-zinc-500 text-base'>Help  &gt;  <span className='text-myDark dark:text-myLight'>{getContent.title}</span></h1>
            <h1 className='text-3xl mt-5 font-semibold'>{getContent.header}</h1>
            {getContent.contents?.map((content,i) => (
                <p key={i} className='mt-10 indent-10 text-zinc-400 text-base'>
                {content}
                </p>
            ))}
            {getContent.list && (
                <>
                <h1 className='text-xl mt-10 font-semibold'>{getContent.list.title}</h1>
                <div className='px-3 mt-3'>
                    {getContent.list.lists.map((list,i) => (
                        <div key={i}>
                            <h1 className='text-lg mt-2'>{i + 1}. {list.listTitle}</h1>
                            <p className='mt-2 indent-10 text-zinc-400 text-sm'>{list.listContent}</p>
                        </div>
                    ))}
                </div>
                </>
            )}
            {getContent.footer && (
                <p className='mt-10 indent-10 text-zinc-400 text-base'>
                {getContent.footer}
                </p>
            )}
        </div>
        <div className='lg:w-1/3 w-full lg:mt-0 mt-10 flex flex-col'>
        <h1 className='font-medium text-base lg:ml-5'>On This Page</h1>
        {getContent.extra?.map((item,i) => (
            <h1 key={i} className='text-zinc-500 lg:ml-7 mt-2'>{item}</h1>
        ))}
        <div className='rounded-xl w-full border p-5 lg:ml-5 my-5'>
            <div className='flex w-full items-center gap-2'>
            <Image src={'/logo.png'} width={40} height={40} alt='logo'/>
            <h1 className='text-main text-xl font-semibold'>Projec<span className='text-follow'>Track</span></h1>
            </div>
            <p className='text-zinc-500 my-5'>Simplify your project by the better management and efficiency of ProjecTrack.</p>
            <Link href={'/'} className='bg-follow px-3 py-2 dark:bg-main text-myLight dark:text-myDark rounded-lg'>Start Now!</Link>
        </div>
        </div>
    </div>
  )
}

export default HelpPage