import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useFetchCurrentPost } from "../../reactQuery/posts/posts.hooks";
import axios from "./../../axios";
import { Typography } from "@mui/material";
import Loader from "../../components/Loader";
import { useMutation } from "react-query";
import { services } from "../../reactQuery/service";

export const AddPost = () => {
	const { isAuth } = useAuth();
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const {
		data,
		isLoading: isLoadingImage,
		mutateAsync,
	} = useMutation(services.postImage);
	const [imageURL, setImageUrl] = useState("");
	const [text, setText] = useState("");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	const [errMsg, setErrMsg] = useState("");

	const navigate = useNavigate();

	const handleFileInputChange = async (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = async () => {
			const params = { data: reader.result, dest: "posts" };
			await onClickRemoveImage();
			await mutateAsync(params);
		};
		reader.onerror = () => {
			setErrMsg("something went wrong!");
		};
	};
	const isEdit = Boolean(id);
	const inputFileRef = useRef(null);
	const onClickRemoveImage = async () => {
		const params = { public_id: imageURL.public_id };
		axios
			.delete(`/upload`, { data: params })
			.then((res) => {
				setImageUrl("");
				return res.data;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (id) {
			const params = { id: id };
			axios
				.get("/getCurrentPost", { params })
				.then(({ data }) => {
					setTitle(data.title);
					setImageUrl(data.imageURL);
					setTags(data.tags.join(","));
					setText(data.text);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [id]);
	useEffect(() => {
		setImageUrl({ image: data?.url, public_id: data?.public_id });
	}, [data]);

	const onSubmit = async () => {
		try {
			setIsLoading(true);
			const fields = {
				title,
				text,
				imageURL: imageURL,
				tags,
			};
			console.log(fields);
			const { data } = isEdit
				? await axios.patch(`/posts/${id}`, fields)
				: await axios.post("/posts", fields);

			const _id = isEdit ? id : data._id;

			if (_id) {
				navigate(`/posts/${_id}`);
			}
		} catch (err) {
			console.log(err);
			alert("Помилка при створенні статті");
		}
	};

	const onChange = React.useCallback((text) => {
		setText(text);
	}, []);

	const options = React.useMemo(
		() => ({
			spellChecker: false,
			maxHeight: "400px",
			autofocus: true,
			placeholder: "Введіть текст...",
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	);

	if (!isAuth) {
		return navigate("/");
	}

	if (isLoading) return <Typography>Loading...</Typography>;

	return (
		<Paper
			style={{
				padding: 30,
			}}
		>
			<Button
				variant="outlined"
				size="large"
				onClick={() => inputFileRef.current.click()}
			>
				Завантажте превю
			</Button>
			<input
				type="file"
				accept=".png, .jpg, .jpeg"
				ref={inputFileRef}
				onChange={handleFileInputChange}
				hidden
			/>{" "}
			{imageURL && (
				<Button variant="contained" color="error" onClick={onClickRemoveImage}>
					Видалити
				</Button>
			)}
			{isLoadingImage ? (
				<Loader />
			) : (
				imageURL.image && (
					<img className={styles.image} src={imageURL.image} alt="Uploaded" />
				)
			)}
			<br />
			<br />
			<TextField
				classes={{
					root: styles.title,
				}}
				variant="standard"
				placeholder="Заголовок статті..."
				fullWidth
				name="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<TextField
				classes={{
					root: styles.tags,
				}}
				variant="standard"
				placeholder="Тэги"
				fullWidth
				name="tags"
				value={tags}
				onChange={(e) => setTags(e.target.value)}
			/>
			<SimpleMDE
				className={styles.editor}
				value={text}
				onChange={onChange}
				options={options}
			/>
			<div className={styles.buttons}>
				<Button size="large" variant="contained" onClick={onSubmit}>
					{isEdit ? "Зберегти" : "Опублікувати"}
				</Button>
				<Link to="/">
					<Button size="large">Відмінити</Button>
				</Link>
			</div>
		</Paper>
	);
};
