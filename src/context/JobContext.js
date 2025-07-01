import { createContext, useContext, useState } from "react";

const JobContext = createContext();

export function JobProvider({ children }) {
  const [refetchJobs, setRefetchJobs] = useState(() => () => {});

  return (
    <JobContext.Provider value={{ setRefetchJobs, refetchJobs }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobContext() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
}