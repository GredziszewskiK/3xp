import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import ProjectDetails  from "./project.details";
import ProjectCreate from "./project.create";
import ProjectCreateConfirm from "./project.createconfirm";
import ProjectDelete from "./project.delete";
import ProjectEdit from "./project.edit";
import ProjectEditConfirm from "./project.editconfirm";
import { ProjectContext } from '../services/context';


function Project() {
  const [project, setProject] = useState()


  return (
    <div>
      <main id="main" className="main">

        <div className="pagetitle">
          <h1>Project</h1>
        </div>

        <section className="section profile">
          <ProjectContext.Provider value={{project, setProject}}> 
            <Routes>
              <Route path="/create" element={<ProjectCreate/>}/>
              <Route path="/create/confirm" element={<ProjectCreateConfirm/>}/>
              <Route path="/details/:id" element={<ProjectDetails/>}/>
              <Route path="/delete/:id" element={<ProjectDelete/>}/>
              <Route path="/edit/:id" element={<ProjectEdit/>}/>
              <Route path="/edit/:id/confirm" element={<ProjectEditConfirm/>} />
            </Routes>
          </ProjectContext.Provider>
        </section>

      </main>
    </div>
  );

};

export default Project