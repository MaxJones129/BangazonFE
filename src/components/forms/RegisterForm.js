import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    // firstName: '',
    // lastName: '',
    username: '',
    address: '',
    email: '',
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form className="register-form" onSubmit={handleSubmit}>
      {/* <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control name="firstName" required placeholder="Enter your first name..." onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control name="lastName" required placeholder="Enter your last name.." onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group> */}
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control name="username" required placeholder="Pick a username..." onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Mailing Address</Form.Label>
        <Form.Control name="address" placeholder="Enter your mailing address..." onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
        <Form.Text>For order shipping purposes only</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control name="email" required placeholder="Enter your email address..." onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
