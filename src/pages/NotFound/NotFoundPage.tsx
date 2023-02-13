import { constans } from "../../constans/constans";
import { Link } from "react-router-dom";
import NotFound from "../../assets/images/404.png";
const NotFoundPage = () => {
  return (
    <>
      <div className="notfound">
        <img src={NotFound} alt="not found" />
      </div>
      <Link to="/">{constans.home}</Link>
    </>
  );
};

export default NotFoundPage;
