import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import Loader from "../Loader";
import styles from "./Modal.module.scss"
const ModalCustom = ({ isLoader, message }) => {
	return (
		<Modal open={true} className={styles.root}>
			{isLoader ? (
				<Loader />
			) : (
				<Box className={styles.box}>
					<Typography>
						{message}
						
					</Typography>
				</Box>
			)}
		</Modal>
	);
};

export default ModalCustom;
