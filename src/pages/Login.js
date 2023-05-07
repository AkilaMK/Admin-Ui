import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/authSlice";
import { useForm } from "react-hook-form";
import {
	Container,
	Typography,
	Box,
	TextField,
	Button,
	Stack,
} from "@mui/material";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dispatch = useDispatch();

	const onSubmit = (data) => {
		dispatch(loginUser(data.email, data.password));
	};

	return (
		<Container maxWidth="sm">
			<Box sx={{ mt: 4 }}>
				<Typography variant="h4" align="center" gutterBottom>
					Log In
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={2}>
						<TextField
							label="Email"
							fullWidth
							size="small"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^\S+@\S+$/i,
									message: "Invalid email address",
								},
							})}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
						<TextField
							label="Password"
							type="password"
							fullWidth
							size="small"
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message:
										"Password must be at least 6 characters",
								},
							})}
							error={!!errors.password}
							helperText={errors.password?.message}
						/>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								mt: 2,
							}}
						>
							<Button
								type="submit"
								variant="contained"
								color="primary"
							>
								Log In
							</Button>
						</Box>
					</Stack>
				</form>
			</Box>
		</Container>
	);
};

export default Login;
