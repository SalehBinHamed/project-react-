/** Functional component to display the jobs data */
const Jobs = ({ result }) => {
  return (
    <>
     <div>
     <h3 className=''>{result.length} Jobs</h3>
     </div>
      <section className="">{result}</section>
    </>
  );
};

export default Jobs;