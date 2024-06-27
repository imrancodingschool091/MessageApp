import "./Auth.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const UserInfo = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      // Use the environment variable correctly
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        UserInfo
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
        });

        localStorage.setItem("SChatApp", JSON.stringify(response.data.newUser));

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.warning(response.data.message || "User already exists", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again.",
        {
          position: "top-center",
        }
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgb(13, 12, 12)",
        width: "100%",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Signup Form</h1>

        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <span className="text-red-600">This field is required</span>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-600">This field is required</span>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-600">This field is required</span>
        )}

        <button type="submit">Signup</button>
        <div className="message">
          <p>Have an account?</p>
          <span>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
