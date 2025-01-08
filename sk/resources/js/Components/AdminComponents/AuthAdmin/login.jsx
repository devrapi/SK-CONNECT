import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Checkbox, Button, Typography, Card, CardBody, Spinner } from "@material-tailwind/react";
import ApiService from "../../Services/ApiService";
import { AppContext } from "../../Context/AppContext";

const Login = () => {
  const { setToken, setRole } = useContext(AppContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await ApiService.post("/admin/login", form);

      if (response.status === 200) {
        const { token, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        setToken(token);
        setRole(role);
        navigate("/admin/verify-2fa");
      }
    } catch (error) {
      console.log("Error during login:", error.response?.data || error.message);

      if (error.response?.status === 422) {
        setForm({ email: "", password: "" });
        setErrors(error.response.data.errors);
      } else if (error.response?.status === 401) {
        setErrors({ global: "Incorrect email or password. Please try again." });
      } else {
        setErrors({ global: "An unexpected error occurred during login." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg bg-gray-800">
        <CardBody className="flex flex-col gap-6">
          <Typography variant="h4" className="text-center text-blue-gray-700 dark:text-gray-100">
            Admin Login
          </Typography>
          <form className="space-y-4" onSubmit={HandleSubmit}>
            <div>
              <Typography className="mb-2 text-gray-100" variant="small" >
                Your Email
              </Typography>
              <Input
                className="text-black bg-white"
                type="email"
                label="Email"
                size="lg"
                color="blue-gray"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                error={!!errors.email}
                aria-label="Email Address"
              />
              {errors.email && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.email}
                </Typography>
              )}
            </div>
            <div>
              <Typography className="mb-2 text-gray-100" variant="small" >
                Password
              </Typography>
              <Input
              className="text-black bg-white"
                type="password"
                label="Password"
                size="lg"
               color="black"
                value={form.password}
                onChange={(event) =>
                  setForm({ ...form, password: event.target.value })
                }
                error={!!errors.password}
                aria-label="Password"
              />
              {errors.password && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.password}
                </Typography>
              )}
            </div>
            {errors.global && (
              <Typography variant="small" color="red" className="mt-2 text-center">
                {errors.global}
              </Typography>
            )}

            <Button
              type="submit"
              color="green"
              size="lg"
              fullWidth
              className="mt-4 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Spinner className="h-5 w-5" /> : "Login"}
            </Button>
          </form>
          <Typography
            variant="small"
            className="mt-4 text-center text-gray-500 dark:text-gray-400"
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/admin/register"
              className="font-medium text-green-500 hover:underline"
            >
              Register here
            </Link>
          </Typography>
        </CardBody>
      </Card>
    </section>
  );
};

export default Login;
