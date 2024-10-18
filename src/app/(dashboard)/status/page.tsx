"use client";

import React from "react";
import { useGetProjectsQuery, useUpdateProjectStatusMutation } from "@/store/api";
import { Project as ProjectType } from "@prisma/client";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/containers/LoadingSpinner";
import Link from "next/link";
import { format } from "date-fns";

const projectStatus = ["Current", "Finished", "Cancelled"];

const GroupPage = () => {

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };
  const backend = isMobileDevice() ? TouchBackend : HTML5Backend;

  const { data: session} = useSession()

  const { data: projects = [], isLoading, error } = useGetProjectsQuery(session?.user?.id ?? '',{
    skip: !session?.user?.id
  });

  const [updateProjectStatus] = useUpdateProjectStatusMutation();

  const moveProject = async (id: string, toStatus: string) => {
    try {
      await updateProjectStatus({ id, status: toStatus }).unwrap();
      console.log(`Project ${id} moved to ${toStatus}`);
    } catch (err) {
      console.error("Error updating project status", err);
    }
  };

  const lateProjects = projects.filter((project) => project.status === "Late");

  if (!session) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error fetching projects</div>;
  }

  return (
    <div className="bg-myLightFollow dark:bg-myDarkFollow h-full p-5 md:p-10 flex flex-col gap-10">
      <h1 className="text-3xl font-semibold">Project Status</h1>
      <div className="flex xl:flex-row flex-col">
      <DndProvider backend={backend}>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 w-full xl:w-3/4">
          {projectStatus.map((status) => (
            <ProjectColumn key={status} status={status} projects={projects} moveProject={moveProject} />
          ))}
        </div>
      </DndProvider>
      <div className="flex flex-col xl:w-1/4 w-full">
        <div className="p-3 mb-4 bg-yellow-500 h-fit m-3 rounded-lg dark:text-myDark text-myLight flex justify-between items-center px-5">
          <h1 className="text-lg font-semibold ">Late</h1>
          <span className="font-bold text-sm">{lateProjects.length}</span>
        </div>
        {lateProjects.map((project) => (
          <div key={project.id} className={`mx-3 border border-yellow-500 mb-4 rounded-md dark:bg-myDark bg-myLight shadow`}>
          <div className="p-4 md:p-6">
            <div className="my-3 flex justify-between items-center">
              <h4 className="text-md font-bold text-xl">{project.name}</h4>
              <Link href={`/project/${project.id}`} className="px-2 py-1 rounded-lg bg-yellow-500 dark:text-myDark text-myLight text-base font-medium">
                Open
              </Link>
            </div>
            <div className='text-zinc-500 text-end'>
                <h1>{format(new Date(project.startDate), "MMM d, yyyy")} - {format(new Date(project.endDate), "MMM d, yyyy")}</h1>
            </div>
          </div>
        </div>
        ))}
      </div>
      </div>
      {projects?.length === 0 && !isLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-5xl font-bold mt-14 opacity-25">No Projects Found</h1>
          </div>
        )}
    </div>
  );
};

interface ProjectColumnProps {
  status: string;
  projects: ProjectType[];
  moveProject: (id: string, toStatus: string) => void;
}

const ProjectColumn = ({ status, projects, moveProject }: ProjectColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "project", // Match the type with useDrag
    drop: (item: { id: string }) => moveProject(item.id, status), // Handle task drop
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const projectsInColumn = projects.filter((project) => project.status === status);

  return (
    <div ref={(instance) => {drop(instance)}} className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-gray-800" : ""}`}>
      <div className="mb-3 flex w-full">
        <div className="flex w-full items-center justify-between rounded-lg bg-myLight dark:bg-myDark px-5 py-4">
          <h3 className="flex items-center text-lg font-semibold">{status}</h3>
          <span className="font-bold text-sm">{projectsInColumn.length}</span>
        </div>
      </div>

      {projectsInColumn.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  );
};

interface ProjectProps {
  project: ProjectType;
}

const Project = ({ project }: ProjectProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "project", // Ensure this type matches the one used in useDrop
    item: { id: project.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 border dark:border-main border-follow border-opacity-40 rounded-md dark:bg-myDark bg-myLight shadow ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <div className="p-4 md:p-6">
        <div className="my-3 flex justify-between items-center">
          <h4 className="text-md font-bold text-xl">{project.name}</h4>
          <Link href={`/project/${project.id}`} className="px-2 py-1 dark:text-myDark text-myLight rounded-lg bg-follow dark:bg-main text-base font-medium">
            Open
          </Link>
        </div>
        <div className='text-zinc-500 text-end'>
                <h1>{format(new Date(project.startDate), "MMM d, yyyy")} - {format(new Date(project.endDate), "MMM d, yyyy")}</h1>
            </div>
      </div>
    </div>
  );
};

export default GroupPage;
