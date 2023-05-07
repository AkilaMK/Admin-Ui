import React from "react";
import { Container, Box, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

const store = configureStore();

function App({ mode, toggleMode }) {
	return (
		<Provider store={store}>
			<Router>
				<NavBar />
				<Container maxWidth="sm">
					<Box sx={{ mt: 6 }}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/about" element={<About />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</Routes>
					</Box>
				</Container>
				<Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
					<IconButton
						color="primary"
						onClick={toggleMode}
						sx={{
							bgcolor: mode === "dark" ? "grey.800" : "grey.200",
						}}
					>
						{mode === "dark" ? <Brightness7 /> : <Brightness4 />}
					</IconButton>
				</Box>
			</Router>
		</Provider>
	);
}

export default App;
