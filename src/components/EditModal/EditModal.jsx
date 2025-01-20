import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./EditModal.css";

const EditProfileModal = ({
  closeActiveModal,
  isOpen,
  handleEditProfile,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [errors, setErrors] = useState({ name: "", avatar: "" });

  const validateForm = () => {
    let isValid = true;
    let errors = {
      name: "",
      avatar: "",
    };

    if (!name.trim()) {
      errors.name = "Name is required.";
      isValid = false;
    }

    if (!avatar.trim()) {
      errors.avatar = "Image URL is required.";
      isValid = false;
    } else if (!/^https?:\/\/.+/.test(avatar)) {
      errors.avatar = "Invalid URL format.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleEditProfile({ name, avatar });
      closeActiveModal();
    }
  };

  const handleNameChange = (e) => setName(e.target.value || "");
  const handleAvatarChange = (e) => setAvatar(e.target.value || "");

  // Update button state based on input values
  useEffect(() => {
    if (name.trim() && avatar.trim()) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [name, avatar]);

  // Populate the form with current user data when the modal is open
  useEffect(() => {
    if (isOpen && currentUser) {
      setName("");
      setAvatar("");
      setErrors({ name: "", avatar: "" }); // Reset errors
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save Changes"
      buttonClass={`modal__submit ${
        isButtonActive ? "modal__submit_active" : ""
      }`}
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      name={"editprofile"}
    >
      <button
        className="modal__close"
        type="button"
        onClick={closeActiveModal}
      />
      <label htmlFor="name" className="modal__label">
        Name *
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name} // Controlled input
          onChange={handleNameChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar *
        <input
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="Image URL"
          value={avatar} // Controlled input
          onChange={handleAvatarChange}
          required
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
