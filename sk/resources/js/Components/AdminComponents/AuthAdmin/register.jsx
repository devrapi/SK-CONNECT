import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Checkbox, Button, Typography, Card, CardBody } from "@material-tailwind/react";
import ApiService from "../../Services/ApiService";
import { AppContext } from "../../Context/AppContext";

const Register = () => {
  const { setToken } = useContext(AppContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiService.post("/admin/register", form);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/admin/two-factor");
    } catch (error) {
      console.log("Error during registration:", error.response?.data || error.message);

      if (error.response?.status === 422) {
        setForm({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });
        setErrors(error.response.data.errors);
      } else {
        setErrors({ global: "An unexpected error occurred during registration." });
      }
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-green-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardBody className="flex flex-col gap-6">
          <Typography variant="h4" className="text-center" color="blue-gray">
            Admin Registration
          </Typography>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Typography className="mb-2" variant="small" color="blue-gray">
                Name
              </Typography>
              <Input
                type="text"
                label="Name"
                size="lg"
                color="green"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                error={!!errors.name}
              />
              {errors.name && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.name}
                </Typography>
              )}
            </div>
            <div>
              <Typography className="mb-2" variant="small" color="blue-gray">
                Email
              </Typography>
              <Input
                type="email"
                label="Email"
                size="lg"
                color="green"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                error={!!errors.email}
              />
              {errors.email && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.email}
                </Typography>
              )}
            </div>
            <div>
              <Typography className="mb-2" variant="small" color="blue-gray">
                Password
              </Typography>
              <Input
                type="password"
                label="Password"
                size="lg"
                color="green"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                error={!!errors.password}
              />
              {errors.password && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.password}
                </Typography>
              )}
            </div>
            <div>
              <Typography className="mb-2" variant="small" color="blue-gray">
                Confirm Password
              </Typography>
              <Input
                type="password"
                label="Confirm Password"
                size="lg"
                color="green"
                value={form.password_confirmation}
                onChange={(event) =>
                  setForm({ ...form, password_confirmation: event.target.value })
                }
                error={!!errors.password_confirmation}
              />
            </div>
            {errors.global && (
              <Typography variant="small" color="red" className="mt-2 text-center">
                {errors.global}
              </Typography>
            )}
            <Checkbox
              id="terms"
              label={
                <Typography variant="small" color="blue-gray">
                  I accept the{" "}
                  <a
                    href="#"
                    className="font-medium text-green-500 hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </Typography>
              }
            />
            <Button
              type="submit"
              color="green"
              size="lg"
              fullWidth
              className="mt-4"
            >
              Create an Account
            </Button>
          </form>
          <Typography
            variant="small"
            className="mt-4 text-center text-gray-500 dark:text-gray-400"
          >
            Already have an account?{" "}
            <Link
              to="/admin/login"
              className="font-medium text-green-500 hover:underline"
            >
              Login here
            </Link>
          </Typography>
        </CardBody>
      </Card>
    </section>
  );
};

export default Register;
