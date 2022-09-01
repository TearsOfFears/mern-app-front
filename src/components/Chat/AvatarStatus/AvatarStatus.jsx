import { Avatar } from "@mui/material";
import React from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
const AvatarStatus = ({ data, status,direction }) => {
	return (
		<div className={styles.root}>
			<span
				className={clsx(styles.circle, {
					[styles.circleRight]: direction,
					[styles.online]: status === "online",
					[styles.offline]: status === "offline",
				})}
			></span>
			<Avatar
				className={clsx (styles.avatar,{
					[styles.avatarRight]: direction,
				})}
				alt={data.fullName}
				src={data.avatar?.image}
			/>
		</div>
	);
};

export default AvatarStatus;
