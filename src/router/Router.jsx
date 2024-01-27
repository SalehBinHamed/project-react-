
import {createBrowserRouter,} from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import MyJobs from '../pages/MyJobs';
import CreateJob from '../pages/CreateJob';
import UpdateJob from '../pages/UpdateJob';
import Login from '../pages/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import JobSending from "../pages/JobSending";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/my-job",
            element: <PrivateRoute><MyJobs/></PrivateRoute>
        },
       
        {
          path: "/post-job",
          element: <CreateJob/>
        },
        {
          path: "edit-job/:id",
          element: <UpdateJob/>,
          loader: ({params}) => fetch(`http://localhost:5000/all-jobs/${params.id}`)
        },
        {
          path:"/jobs/:id",
          element: <PrivateRoute><JobSending/></PrivateRoute>,
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>
    },
    
    
  ]
  );
 

  export default router;