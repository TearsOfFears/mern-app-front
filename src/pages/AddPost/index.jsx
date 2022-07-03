import React, {useState, useRef, useEffect} from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import {useSelector} from "react-redux";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import {selectIsAuth} from "../../redux/slices/auth";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../axios";
import {SettingsRemoteOutlined} from "@mui/icons-material";
const initialState = {
  title: "",
  tags: []
};
export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const {id} = useParams();
  const [isLoading,
    setIsLoading] = useState(false);
  const [imageURL,
    setImageUrl] = useState("");
  const [text,
    setText] = useState("");
  const [title,
    setTitle] = useState("");
  const [tags,
    setTags] = useState("");
  // const [data, setData] = useState(initialState);
  const navigate = useNavigate();
  const handleChangeFile = async(e) => {
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const {data} = await axios.post("upload", formData);
      console.log(data);
      setImageUrl(`http://localhost:4444${data.url}`);
    } catch (err) {
      console.log(err);
      alert("Помилка при загрузці картинки");
    }
    console.log();
  };
  const isEdit = Boolean(id);
  const inputFileRef = useRef(null);

  const onClickRemoveImage = async(event) => {
    setImageUrl("");
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({data}) => {
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
  const onSubmit = async() => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        text,
        imageURL,
        tags
      };
      const {data} = isEdit
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);

      const _id = isEdit
        ? id
        : data._id;

      if (_id) {
        navigate(`/posts/${_id}`);
      }
    } catch (err) {
      console.log(err);
      alert("Помилка при створенні статті");
    }
  };
  // const onHandleInput= (e)=>{   const name = e.target.name   setData({
  // name:e.target.value,   })   // e.target.value   // e.target.name }
  // console.log(data);
  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  const options = React.useMemo(() => ({
    spellChecker: false,
    maxHeight: "400px",
    autofocus: true,
    placeholder: "Введите текст...",
    status: false,
    autosave: {
      enabled: true,
      delay: 1000
    }
  }), []);
  useEffect(() => {
    if (!isAuth) {
      return navigate("/");
    }
  }, [isAuth]);

  return (
    <Paper style={{
      padding: 30
    }}>
      <Button
        variant="outlined"
        size="large"
        onClick={() => inputFileRef.current.click()}>
        Загрузить превью
      </Button>
      <input type="file" ref={inputFileRef} onChange={handleChangeFile} hidden/> {imageURL && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageURL && (<img className={styles.image} src={imageURL} alt="Uploaded"/>)}
      <br/>
      <br/>
      <TextField
        classes={{
        root: styles.title
      }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}/>
      <TextField
        classes={{
        root: styles.tags
      }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        name="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}/>
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}/>
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          {isEdit
            ? "Зберегти"
            : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
