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

export const AddPost = () => {
	const { isAuth } = useAuth();
  const { id } = useParams();
  console.log("isAuth",isAuth);
	const [isLoading, setIsLoading] = useState(false);
	const [imageURL, setImageUrl] = useState("");
	const [text, setText] = useState("");
	const [title, setTitle] = useState("");
	const [tags, setTags] = useState("");
	// const [data, setData] = useState(initialState);
	const navigate = useNavigate();
	const handleChangeFile = async (e) => {
		try {
			const formData = new FormData();
			formData.append("image", e.target.files[0]);
			const { data } = await axios.post("upload", formData);
			setImageUrl(`http://localhost:4444${data.url}`);
		} catch (err) {
			console.log(err);
			alert("Помилка при загрузці картинки");
		}
	};
	const isEdit = Boolean(id);
	const inputFileRef = useRef(null);
	const onClickRemoveImage = async (event) => {
		setImageUrl("");
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
	}, []);

	const onSubmit = async () => {
		try {
			setIsLoading(true);
			const fields = {
				title,
				text,
				imageURL,
				tags,
			};
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
			placeholder: "Введите текст...",
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
      Загрузить превью
    </Button>
    <input
      type="file"
      ref={inputFileRef}
      onChange={handleChangeFile}
      hidden
    />{" "}
    {imageURL && (
      <Button variant="contained" color="error" onClick={onClickRemoveImage}>
        Удалить
      </Button>
    )}
    {imageURL && (
      <img className={styles.image} src={imageURL} alt="Uploaded" />
    )}
    <br />
    <br />
    <TextField
      classes={{
        root: styles.title,
      }}
      variant="standard"
      placeholder="Заголовок статьи..."
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
        {isEdit ? "Зберегти" : "Опубликовать"}
      </Button>
      <Link to="/">
        <Button size="large">Отмена</Button>
      </Link>
    </div>
  </Paper>
	);
};
