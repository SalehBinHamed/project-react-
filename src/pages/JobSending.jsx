import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { AuthContext } from "../context/AuthProvider";
import { Button } from "@nextui-org/react";

const JobSending = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { user } = useContext(AuthContext);
  const [sent, setSent] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch job details and set it to state
    fetch(`http://localhost:5000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]);
  const sendEmail = (e) => {
    e.preventDefault();
  
    // Ensure the job and user details are loaded
    if (!job || !user?.email) {
      alert("Job details are not loaded or user is not logged in.");
      
      return;
    }
  
    const templateParams = {
      subject: "Saleh Hamed project", // The subject from the form
      user: user.displayName || user.email, // The name of the user sending the email
      email: user.email, // The email of the user sending the email
      message: message, // The message from the form
      reply_to: user.email, // The reply-to email address (user's email)
      jobPosted: job.postedBy // The email address of the job poster
    };
  
    emailjs.send('service_pj197le', 'template_u60p3e3', templateParams, 'xB6FQOnmuGzjwWNoW')
    .then((result) => {
        console.log("Email sent to job poster!", result.text);
        setSent(true);
        setSubject('');
        setMessage('');
      }, (error) => {
        console.error("Failed to send email to job poster.", error.text);
      });
  };

  if (!job) {
    return <div>Loading...</div>; // Show loading state until job details are fetched
  }

  return (
    <div>
      <h2>{job.title}</h2>
      {/* Display other job details here */}
      {sent ? (
        <p>Email sent successfully!</p>
      ) : (
        <form onSubmit={sendEmail} className="space-y-4">
        
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
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
     
            Send Email
          </Button>
        </form>
      )}
    </div>
  );
};

export default JobSending;
