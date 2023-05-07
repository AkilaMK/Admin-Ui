import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";

const CustomThemeProvider = ({ children }) => {
	const [mode, setMode] = useState("light");

	const toggleMode = () => {
		setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
	};

	const theme = createTheme({
		palette: {
			mode: mode,
			primary: {
				main: mode === "light" ? "#71C9CE" : "#0F4C75",
			},
			secondary: {
				main: mode === "light" ? "#A6E3E9" : "#3282B8",
			},
			background: {
				default: mode === "light" ? "#E3FDFD" : "#BBE1FA",
				paper: mode === "light" ? "#CBF1F5" : "#1B262C",
			},
			text: {
				primary: mode === "light" ? "#1B262C" : "#BBE1FA",
			},
		},
		components: {
			MuiInputLabel: {
				styleOverrides: {
					root: {
						color: mode === "light" ? "#000" : "#BBE1FA",
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						"&:hover .MuiOutlinedInput-notchedOutline": {
							borderColor:
								mode === "light" ? "#1B262C" : "#BBE1FA",
						},
						"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
							borderColor:
								mode === "light" ? "#1B262C" : "#BBE1FA",
						},
					},
					notchedOutline: {
						borderColor: mode === "light" ? "#1B262C" : "#BBE1FA",
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			{children({ mode, toggleMode })}
		</ThemeProvider>
	);
};

export default CustomThemeProvider;
