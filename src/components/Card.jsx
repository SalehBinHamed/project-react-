import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Card = ({ data }) => {
  // Destructuring data object
  const {
    _id,
    jobTitle,
    description,
  } = data;



  return (
    <div>
      <section className="card">
        <Link to={`/jobs/${_id}`} className="flex gap-4 flex-col sm:flex-row items-start">
         
          <div className="card-details">
            <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>
            <p className="text-base text-primary/70 ">{description}</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Card;
