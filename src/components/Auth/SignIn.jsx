import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Alert,
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";

import React, { useState } from "react";
import axios from "axios";

function SignIn() {
  const initialValues = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // const history = useHistory();
  const handleSubmit = async (values, props) => {
    const { email, password } = values;
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
    //change the url accordinglyy
    axios
      .post("http://localhost:8080/api/login", { email, password })
      .then((response) => {
        if (response.data.success) {
          setError("");
          setLoading(true);
          console.log(response.data);
          //  localStorage.setItem('jwt', response.data.token);
          // redirect to home/dashboard page
          // history.push("/dashboard");
        }
      })
      .catch((error) => {
        setError("Failed to Sign In Enter the Correct Credential ");
      });

    setLoading(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    setValues(...values);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //Css for the components
  const paperStyle = {
    padding: 20,
    height: "80vh",
    width: 350,
    margin: "20px auto",
  };
  const textfieldStyle = {
    bordercolor: "#56c595",
    margin: "6px 0",
    color: "#56c595",
  };
  const avatarStyle = { backgroundColor: "#7BE495" };
  const btnstyle = { backgroundColor: "#56c596", margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlined />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ my: 1, width: "100%" }}>
            {error}
          </Alert>
        )}
        <FormControlLabel />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form autoComplete="off">
              <Field
                as={TextField}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                placeholder="Enter the Username"
                name="email"
                style={textfieldStyle}
                autoFocus
                helperText={<ErrorMessage name="email" />}
              />

              <Field
                as={TextField}
                variant="outlined"
                required
                fullWidth
                name="password"
                style={textfieldStyle}
                label="Password"
                placeholder="Enter Password"
                id="password"
                type={showPassword ? "text" : "password"}
                helperText={<ErrorMessage name="password" />}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={btnstyle}
                disabled={loading}
                // disabled={props.isSubmitting}
              >
                {loading ? "Loading..." : "Sign In"}
              </Button>
              <Typography>
                <Link href="#">Forgot Your Credentials?</Link>
              </Typography>
              <Typography>
                Don't Have An Account? <Link href="#">Sign Up</Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}

export default SignIn;
