import { Avatar } from "@mui/material";
import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
const AvatarStatus = ({ data }) => {
	return (
		<div className={styles.root}>
			<span
				className={clsx(styles.circle, {
					[styles.online]: data.status === "online",
					[styles.offline]: data.status === "offline",
				})}
			></span>
			<Avatar
				className={styles.avatar}
				alt={data.fullName}
				src={data.avatar?.image}
			/>
		</div>
	);
};

export default AvatarStatus;
