import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useParams } from 'react-router-dom';
import { Button } from "@nextui-org/react";

const UpdateJob = () => {
  const { id } = useParams();
  const { jobTitle, description, postedBy } = useLoaderData();

  const {
    register, 
       handleSubmit,

    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    fetch(`http://localhost:5000/update-job/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((result) => {
      if(result.acknowledged === true){
        alert("Job Updated Successfully!!");
        reset(); // Reset the form fields
      }
    });
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
    <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16 flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full max-w-lg">
            <label className="block mb-2 text-lg">Job Title</label>
            <input
              defaultValue={jobTitle}
              {...register("jobTitle")}
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
            />
        
          
          <div>
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              {...register("description")}
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={6}
              placeholder="job description"
              defaultValue={description}
            />
          </div>

          <div>
            <label className="block mb-2 text-lg">Job Posted by</label>
            <input
              type="email"
              {...register("postedBy")}
              className="w-full pl-3 py-1.5 focus:outline-none"
              placeholder="your email"
              defaultValue={postedBy}
            />
          </div>

         
            <Button
          
          type="submit"
        
   
    style={{
      backgroundColor: 'white', // White background
      color: 'rgba(0, 0, 0, 0.54)', // Google's text color
      boxShadow: '0 2px 4px 0 rgba(0,0,0,0.25)', // Shadow effect
      fontWeight: 'bold', // Font weight as bold
      fontSize: '16px', // Font size
      border: 'none', // No border
      height: '40px', // Height of the button
      padding: '10px 24px', // Padding
      borderRadius: '4px', // Rounded border
    }}
  >
   
   Update Job
           </Button>
      </form>
    </div> 
  </div>
  );
};

export default UpdateJob;
