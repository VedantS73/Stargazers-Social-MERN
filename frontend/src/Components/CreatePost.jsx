import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from 'react-router-dom';

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";

function CreatePost(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    headline: "",
    content: "",
    imageUrl: "",
    username: props.usernamepass,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const redirectlogin = () => {
    navigate('/login');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/posts/createpost",
        formData
      );

      console.log("Post created:", response.data);

      setFormData({
        headline: "",
        content: "",
        imageUrl: "",
        username: "",
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  console.log("user logged is :",props.username);
  if (props.username === undefined) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "40vh",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Please login to continue
        </Typography>
        <Button variant="contained" onClick={redirectlogin}>
          Login
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxHeight: "90%", overflowY: "auto", overflowX: "hidden"}}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
          // width: '36ch'
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <Typography variant="h6" gutterBottom>
            New Post
          </Typography>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 200,
              bgcolor: "action.hover",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                textAlign: "center",
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 40 }} />
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Click or Drag to Upload
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Title"
            multiline
            maxRows={4}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginTop: "1.5rem" }}
            sx={{ width: "97%" }}
            name="headline"
            value={formData.headline}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <TextField
            id="standard-multiline-static"
            label="Post Content"
            multiline
            rows={4}
            // variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: "97%" }}
            name="content"
            value={formData.content}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <TextField
            disabled
            id="outlined-basic"
            label="Username"
            multiline
            maxRows={4}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: "97%" }}
            size="small"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic"
            label="Image URL (optional)"
            multiline
            maxRows={4}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: "97%" }}
            size="small"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ width: "100%", marginTop: "1rem" }}
        >
          POST
        </Button>
      </Box>
    </div>
  );
}

export default CreatePost;
