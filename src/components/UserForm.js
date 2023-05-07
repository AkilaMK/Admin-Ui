import React from "react";
import { TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const UserForm = () => {
	const { register, handleSubmit, reset } = useForm();
	const dispatch = useDispatch();

	const onSubmit = (data) => {
		dispatch(addUser(data));
		reset();
	};

	return (
		<Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
			<TextField
				label="Name"
				fullWidth
				{...register("name", { required: true })}
			/>
			<Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
				Add User
			</Button>
		</Box>
	);
};

export default UserForm;
