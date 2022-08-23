import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import Loader from "../Loader";
import styles from "./Modal.module.scss"
const ModalCustom = ({ isLoader, message,children,isOpen }) => {
	return (
		<Modal open={isOpen} className={styles.root} disableBackdropClick >
			{isLoader ? (
				<Loader />
			) : (
				<Box className={styles.box}>
					<Typography>
						{message || children}
						
					</Typography>
				</Box>
			)}
		</Modal>
	);
};

export default ModalCustom;
