import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container, Typography } from "@mui/material";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import FormInput from "../components/FormInput";
import { useLoginUserMutation } from "../redux/api/authApi";

import { styled } from "@mui/material/styles";

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #3d7587;
  color: #ffffff;
  font-weight: 500;

  &:hover {
    background-color: #274c58;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`;

const loginSchema = object({
  email: string()
    .nonempty("Email address is required")
    .email("Email Address is invalid"),
  password: string().min(1, " Password is required"),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const LoginPage = () => {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();

  const navigate = useNavigate();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success("You successfully logged in", {
        position: "bottom-right",
      });
      navigate("/");
    }
    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "bottom-right",
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: "bottom-right",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    // 👇 Executing the loginUser Mutation
    loginUser(values);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#5d8c9b",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          textAlign="center"
          component="h1"
          sx={{
            color: "#acc8d1",
            fontWeight: 600,
            fontSize: { xs: "2rem", md: "3rem" },
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="body1"
          component="h2"
          sx={{ color: "#acc8d1", mb: 2 }}
        >
          Login to have access!
        </Typography>

        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off"
            maxWidth="27rem"
            width="100%"
            sx={{
              backgroundColor: "#e5e7eb",
              p: { xs: "1rem", sm: "2rem" },
              borderRadius: 2,
            }}
          >
            <FormInput name="email" label="Email Address" type="email" />
            <FormInput name="password" label="Password" type="password" />

            <Typography sx={{ fontSize: "0.9rem", mb: "1rem" }}>
              Need an account? <LinkItem to="/register">Sign Up Here</LinkItem>
            </Typography>

            <LoadingButton
              variant="contained"
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type="submit"
              loading={isLoading}
            >
              Login
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default LoginPage;
