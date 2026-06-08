import { 
  deleteProjectById, 
  duplicateProjectById, 
  editProjectById, 
  getAllPlaygroundForUser 
} from "@/features/dashboard/actions";
import AddNewButton from "@/features/dashboard/components/add-new";
import AddRepo from "@/features/dashboard/components/add-repo";
import EmptyState from "@/features/dashboard/components/empty-state";
import ProjectTable from "@/features/dashboard/components/project-table";
import React from "react";

const Page = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  console.log("Playgrounds:", playgrounds);

  const formattedPlaygrounds = (playgrounds || []).map((playground) => ({
    ...playground,
    description: playground.description ?? "",
    template: String(playground.template),
    user: playground.user ? {
      ...playground.user,
      name: playground.user.name ?? "Unknown",
      image: playground.user.image ?? "",
      role: String(playground.user.role),
    } : {
      id: "",
      name: "Unknown",
      email: "",
      image: "",
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }));

  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
        <AddRepo />
      </div>

      <div className="mt-10 flex flex-col justify-center items-center w-full">
        {formattedPlaygrounds.length === 0 ? (
          <EmptyState />
        ) : (
          <ProjectTable
            projects={formattedPlaygrounds}
            // Pass the imported Server Actions directly
            onDeleteProject={deleteProjectById}
            onUpdateProject={editProjectById}
            onDuplicateProject={duplicateProjectById}
          />
        )}
      </div>
    </div>
  );
};

export default Page;