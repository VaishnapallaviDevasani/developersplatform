import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';

import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    text: '',
    githubLink: ''
  });

  const { text, githubLink } = formData;

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addPost({ text, githubLink });
    setFormData({ text: '', githubLink: '' });
  };

  return (
    <div className='post-form'>
      <div className='post-form-header bg-primary'>
        <h3>Say Something...</h3>
      </div>

      <form className='form my-1' onSubmit={handleOnSubmit}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a Post'
          value={text}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          type='url'
          name='githubLink'
          placeholder='GitHub project link (optional)'
          value={githubLink}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <input type='submit' value='Submit' className='btn btn-dark my-1' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
