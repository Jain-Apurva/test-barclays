import { useState } from "react";
import './app.css';

export default function App() {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const data = [
    {
      program: "prg1",
      project: "prj1",
      release: "Release1"
    },
    {
      program: "prg1",
      project: "prj1",
      release: "Release2"
    },
    {
      program: "prg1",
      project: "prj2",
      release: "Release3"
    },
    {
      program: "prg1",
      project: "prj2",
      release: "Release4"
    },
    {
      program: "prg1",
      project: "prj2",
      release: "Release5"
    },
    {
      program: "prg2",
      project: "prj5",
      release: "Release1"
    },
    {
      program: "prg2",
      project: "prj5",
      release: "Release2"
    },
    {
      program: "prg2",
      project: "prj6",
      release: "Release3"
    },
    {
      program: "prg2",
      project: "prj6",
      release: "Release4"
    },
    {
      program: "prg2",
      project: "prj7",
      release: "Release5"
    }
  ];

  const newData = data.reduce((acc, ele) => {
    const { program, project, release } = ele;
    acc[program] = { ...acc[program] } || {};
    acc[program][project] = acc[program][project] ? acc[program][project] : [];
    acc[program][project].push(release);
    return acc;
  }, {});

  const selectProgramHandler = (e) => {
    e.stopPropagation();
    setSelectedProgram(e.target.id);
    setSelectedProject('')
  };

  const selectProjectHandler = (e) => {
    e.stopPropagation();
    setSelectedProject(e.target.id);
  };

  const createSubSublist = (data, key) => {
    return (
      <div id="supersublist">
        {data[key].map((e, i) => {
          return <div 
          key={i} 
          className={`${selectedProject === key ? "active" : ""} release`}>
              {e}
          </div>;
        })}
      </div>
    );
  };

  const createSublist = (data) => {
    return (
      <div id="sublist">
        {Object.keys(newData[data]).map((key, i) => {
          return (
            <div 
                key={i} 
                id={key} 
                onClick={selectProjectHandler}
                className={`${selectedProgram === data ? "active" : ""} project`}
                >
              {key}
              {createSubSublist(newData[data], key)}
            </div>
          );
        })}
      </div>
    );
  };

  const createList = () => {
    return (
      <div>
        {Object.keys(newData).map((key, i) => {
          return (
            <div
              key={i}
              id={key}
              onClick={selectProgramHandler}
              className={`program`}
            >
              {key}
              <>{createSublist(key)}</>
            </div>
          );
        })}
      </div>
    );
  };

  return <div className="App">{createList()}</div>;
}
