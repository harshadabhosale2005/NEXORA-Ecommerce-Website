
import { useNavigate } from "react-router-dom";

function BackButton({ fallback = "/" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      type="button"
      className="back-button"
      onClick={handleBack}
    >
      Back
    </button>
  );
}

export default BackButton;
