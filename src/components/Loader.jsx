import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Loader = () => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
                justifyContent:"center",
				width: "100%",
				height: "100vh",
			}}
		>
			<CircularProgress color="primary" size="200px" />
		</Box>
	);
};

export default Loader;
