import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Pagination } from '@nextui-org/react';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  // Calculate the current jobs to display
  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };

  return (
    <div className=" lg:px-24 px-4 py-12">
      <div className="content-area">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {currentJobs.map((job, i) => (
                  <div key={i} className="card-container">

              <Card key={i} data={job} />
              </div>

            ))}
            <div className="flex justify-center">
              <Pagination
color="default"      
variant="faded"
          total={Math.ceil(jobs.length / itemsPerPage)}
                initialPage={1}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
