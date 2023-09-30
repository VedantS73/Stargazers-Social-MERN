import React, { useState } from 'react';
import axios from 'axios'; // You may need to install axios if not already installed

function CreatePost() {
    const [formData, setFormData] = useState({
      headline: '',
      content: '',
      imageUrl: '',
      username: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Send a POST request to your server endpoint
        await axios.post('http://localhost:3001/api/posts/createpost', formData);
  
        // Optionally, you can clear the form fields here
        setFormData({
          headline: '',
          content: '',
          imageUrl: '',
          username: '',
        });
  
        // Handle success or redirect as needed
        // For example, you can display a success message or redirect to the post list page
      } catch (error) {
        console.error(error);
        // Handle errors, display an error message, or redirect to an error page
      }
    };
  
    return (
      <div>
        <h2>Make a Post</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="headline">Headline:</label>
          <input
            type="text"
            id="headline"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            required
          /><br /><br />
  
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea><br /><br />
  
          <label htmlFor="imageUrl">Image URL (optional):</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          /><br /><br />
  
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          /><br /><br />
  
          <button type="submit">Make a Post</button>
        </form>
      </div>
    );
  }
  
  export default CreatePost;
  