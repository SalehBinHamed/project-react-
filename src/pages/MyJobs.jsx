import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/myJobs/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, [user]);

  // Delete a job
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this job?");
    if (confirmed) {
      setIsLoading(true); // Re-enable loading state
      fetch(`http://localhost:5000/job/${id}`, {
        method: "DELETE",
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("Job Deleted Successfully!!");
          // Update the UI by filtering out the deleted job
          setJobs(jobs.filter((job) => job._id !== id));
        }
        setIsLoading(false); // Disable loading state
      });
    }
  };

  return (
       <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="my-jobs-container">
        <h1 className="text-center p-4 ">ALL My Jobs</h1>
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <Link
                      to="/post-job"
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                      Post A New Job
                    </Link>
                  </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-20">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {jobs.map((job, index) => (
              <div key={job._id} className="flex justify-between items-center p-4 m-2 border rounded-md">
                <span>{job.jobTitle}</span>
                <Link to={`/edit-job/${job._id}`} className="text-blue-500">Edit</Link>
                <button 
                  className="bg-red-500 text-white py-2 px-4 rounded" 
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
