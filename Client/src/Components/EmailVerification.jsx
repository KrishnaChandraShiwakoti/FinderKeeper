import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MailCheck } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { auth } from "../Utlis/axios";
import { toast } from "react-toastify";
import "../Styles/EmailVerification.css";

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const email = searchParams.get("email");
  console.log(email);

  useEffect(() => {
    const registered = localStorage.getItem("registered");
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
    if (!registered) {
      navigate("/register"); // or show a warning message
    }
  }, []);
  const handleChange = (index, e) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedString = values.join("");
    const res = await auth.post("/register/verify", {
      email,
      otp: combinedString,
    });
    if (res.status == 201) {
      toast(res.data.message);
      navigate("/login");
    } else {
      toast(res.data.message);
    }
    console.log("Combined value:", combinedString);
  };
  return (
    <div className="register-bg">
      <div className="register-container">
        <div className="register-header">
          <MailCheck className="icon-medium" />
          <h2>Verify Your Email</h2>
          <p>We have sent an OPT to your email</p>
        </div>
        <form className="verification-form " onSubmit={handleSubmit}>
          <div>
            {values.map((value, index) => (
              <input
                key={index}
                type="number"
                min="0"
                max="9"
                required
                value={value}
                onChange={(e) => handleChange(index, e)}
              />
            ))}
          </div>
          <p>
            Didn't get an opt?<span>Resend the code</span>
          </p>
          <div className="buttons-container">
            <button type="button" className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
