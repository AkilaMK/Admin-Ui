import React from "react";
import { useForm } from "react-hook-form";
import {
	Container,
	Typography,
	Box,
	TextField,
	Button,
	Stack,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
// import "../css/registerStyles.css";

const Register = () => {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	const handlePhoneNumberChange = (value) => {
		setValue("phoneNumber", value);
	};

	return (
		<Container maxWidth="sm">
			<Box sx={{ mt: 4 }}>
				<Typography variant="h4" align="center" gutterBottom>
					Register
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={2}>
						<TextField
							label="Name"
							fullWidth
							size="small"
							{...register("name", {
								required: "Name is required",
							})}
							error={!!errors.name}
							helperText={errors.name?.message}
						/>
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
						<MuiTelInput
							className="tel-input"
							label="Phone Number"
							fullWidth
							size="small"
							variant="outlined"
							defaultCountry="US"
							error={!!errors.phoneNumber}
							helperText={errors.phoneNumber?.message}
							{...register("phoneNumber", {
								required: "Phone number is required",
								minLength: {
									value: 8,
									message:
										"Phone number must be at least 8 characters",
								},
							})}
							onChange={handlePhoneNumberChange}
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
						<TextField
							label="Confirm Password"
							type="password"
							fullWidth
							size="small"
							{...register("confirmPassword", {
								required: "Confirm password is required",
								minLength: {
									value: 6,
									message:
										"Confirm password must be at least 6 characters",
								},
							})}
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword?.message}
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
								Register
							</Button>
						</Box>
					</Stack>
				</form>
			</Box>
		</Container>
	);
};

export default Register;
