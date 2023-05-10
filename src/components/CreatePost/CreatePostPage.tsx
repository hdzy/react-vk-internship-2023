import TextField from '@mui/material/TextField';
import React, {useEffect, useRef} from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// @ts-ignore
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
// @ts-ignore
import styles from "./createPost.module.css";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "../../slices/auth";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios";

export const CreatePostPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const isAuthenticated:any = useSelector(selectIsAuthenticated);

    const [value, setValue] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

    const inputRef: any = useRef(null);
    const handleChangeFile = async (event: any) => {
        try {
           const formData = new FormData();
           formData.append('image', event.target.files[0]);
           const {data} = await axios.post('/upload', formData);
           setImageUrl(data.url);
        }
        catch (error) {
            console.log(error);
            alert('Ошибка при загрузке файла');
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    const onChange = React.useCallback((value: any) => {
        setValue(value);
    }, []);

    const onSubmit = async () => {
        try {
            const tagsArray = tags.split(' ');

            const {data} = isEditing ? await axios.patch(`/posts/${id}`, {
                title: title,
                content: value,
                tags: tagsArray,
                imageUrl: imageUrl,
            }) : await axios.post('/posts', {
                title: title,
                content: value,
                tags: tagsArray,
                imageUrl: imageUrl,
            });
            const _id = isEditing ? id : data._id;

            navigate(`/post/${_id}`);
        }
        catch (error) {
            console.log(error);
            alert('Ошибка при загрузке файла');
        }
    }

    useEffect(() => {
        if (id) {
            axios.get(`/posts/${id}`)
                .then(res => {
                setValue(res.data.content);
                setTitle(res.data.title);
                setTags(res.data.tags.join(' '));
                setImageUrl(res.data.imageUrl);
            })
                .catch(
                    error => {
                        console.log(error);
                        alert('Ошибка при получении статьи');
                    }
                )
        }
    }, [])

    const options = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                uniqueId: 'addPost',
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );


    if (!window.localStorage.getItem('token') && !isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className={styles.content}>
            <Paper style={{ padding: 30 }}>
                <Button onClick={() => inputRef.current.click()} variant="outlined" size="large">
                    Загрузить превью
                </Button>
                <input type="file" onChange={handleChangeFile} hidden ref={inputRef}/>
                {imageUrl && (
                    <Button variant="contained" color="error" onClick={onClickRemoveImage}>
                        Удалить
                    </Button>
                )}
                {imageUrl && (
                    <img className={styles.image} src={`http://localhost:3000${imageUrl}`} alt="Uploaded" />
                )}
                <br />
                <br />
                <TextField
                    classes={{ root: styles.title }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="standard"
                    placeholder="Заголовок статьи"
                    fullWidth
                />
                <TextField classes={{ root: styles.tags }} value={tags} onChange={(e) => setTags(e.target.value)} variant="standard" placeholder="Теги" fullWidth />
                <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
                <div className={styles.buttons}>
                    <Button size="large" variant="contained" onClick={onSubmit}>
                        {isEditing ? 'Сохранить' : 'Опубликовать'}
                    </Button>
                    <a href={isEditing ? `/post/${id}` : "/"}>
                        <Button size="large">Отмена</Button>
                    </a>
                </div>
            </Paper>
        </div>
    );
};