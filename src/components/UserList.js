import React from "react";
import { useSelector } from "react-redux";
import { List, ListItem, ListItemText } from "@mui/material";

const UserList = () => {
	const users = useSelector((state) => state.user.users);

	return (
		<List>
			{users.map((user, index) => (
				<ListItem key={index}>
					<ListItemText primary={user.name} />
				</ListItem>
			))}
		</List>
	);
};

export default UserList;
