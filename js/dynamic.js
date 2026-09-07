const container = document.getElementById("container");

let imageData = "";


const params = new URLSearchParams(window.location.search);

const editMode =
    params.get("edit") === "true";

const newMode =
    params.get("new") === "true";
const savedProfile =
    JSON.parse(localStorage.getItem("userData")) || null;



const form = document.createElement("form");
form.id = "profileForm";
form.noValidate = true;
form.autocomplete = "off";


const heading = document.createElement("h1");

heading.textContent = editMode
    ? "Edit Your Profile"
    : "Create Your Profile";


const subtitle = document.createElement("p");

subtitle.textContent = editMode
    ? "Update your information below."
    : "Enter your information to create your profile.";


form.appendChild(heading);
form.appendChild(subtitle);



const imageSection = document.createElement("div");
imageSection.classList.add("image-section");


const previewImage = document.createElement("img");
previewImage.id = "previewImage";
previewImage.alt = "Profile preview";
previewImage.hidden = true;


const imageLabel = document.createElement("label");
imageLabel.textContent = "Profile Picture";


const imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = "image/*";


const imageError = document.createElement("small");
imageError.classList.add("error");


imageSection.appendChild(imageLabel);
imageSection.appendChild(previewImage);
imageSection.appendChild(imageInput);
imageSection.appendChild(imageError);

form.appendChild(imageSection);


function createField(labelText, id, type, placeholder) {

    const field = document.createElement("div");
    field.classList.add("field");

    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = id;
    input.placeholder = placeholder;

    const error = document.createElement("small");
    error.classList.add("error");
    error.id = `${id}Error`;

    field.appendChild(label);
    field.appendChild(input);
    field.appendChild(error);

    form.appendChild(field);

    return {
        input,
        error
    };
}



const usernameField = createField(
    "Username",
    "username",
    "text",
    "Enter your username"
);


const emailField = createField(
    "Email",
    "email",
    "email",
    "Enter your email"
);


const phoneField = createField(
    "Phone Number",
    "phone",
    "tel",
    "Enter your phone number"
);



const passwordField = document.createElement("div");
passwordField.classList.add("field");


const passwordLabel = document.createElement("label");
passwordLabel.setAttribute("for", "password");
passwordLabel.textContent = "Password";


const passwordWrapper = document.createElement("div");
passwordWrapper.classList.add("password-wrapper");


const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.id = "password";
passwordInput.autocomplete = "new-password";
passwordInput.placeholder = editMode
    ? "Enter a new password (optional)"
    : "At least 8 characters";

const showPasswordButton = document.createElement("button");
showPasswordButton.type = "button";
showPasswordButton.textContent = "Show";


const passwordError = document.createElement("small");
passwordError.classList.add("error");
passwordError.id = "passwordError";


passwordWrapper.appendChild(passwordInput);
passwordWrapper.appendChild(showPasswordButton);

passwordField.appendChild(passwordLabel);
passwordField.appendChild(passwordWrapper);
passwordField.appendChild(passwordError);

form.appendChild(passwordField);



showPasswordButton.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        showPasswordButton.textContent = "Hide";

    } else {

        passwordInput.type = "password";
        showPasswordButton.textContent = "Show";

    }

});



const genderField = document.createElement("div");
genderField.classList.add("field");


const genderLabel = document.createElement("label");
genderLabel.setAttribute("for", "gender");
genderLabel.textContent = "Gender";


const genderSelect = document.createElement("select");
genderSelect.id = "gender";
genderSelect.name = "gender";


const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.textContent = "Select Gender";
defaultOption.disabled = true;
defaultOption.selected = true;


const femaleOption = document.createElement("option");
femaleOption.value = "Female";
femaleOption.textContent = "Female";


const maleOption = document.createElement("option");
maleOption.value = "Male";
maleOption.textContent = "Male";


genderSelect.appendChild(defaultOption);
genderSelect.appendChild(femaleOption);
genderSelect.appendChild(maleOption);


const genderError = document.createElement("small");
genderError.classList.add("error");


genderField.appendChild(genderLabel);
genderField.appendChild(genderSelect);
genderField.appendChild(genderError);

form.appendChild(genderField);



const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-container");


const submitButton = document.createElement("button");
submitButton.type = "submit";

submitButton.textContent = editMode
    ? "Update Profile"
    : "Create Profile";

submitButton.classList.add("submit-button");


const resetButton = document.createElement("button");
resetButton.type = "reset";

resetButton.textContent = editMode
    ? "Reset Changes"
    : "Clear Form";

resetButton.classList.add("reset-button");


buttonContainer.appendChild(submitButton);
buttonContainer.appendChild(resetButton);

form.appendChild(buttonContainer);



const successMessage = document.createElement("p");
successMessage.id = "successMessage";

form.appendChild(successMessage);



container.appendChild(form);

if (newMode) {
    usernameField.input.value = "";
    emailField.input.value = "";
    phoneField.input.value = "";
    passwordInput.value = "";
    genderSelect.value = "";
    imageData = "";

    previewImage.src = "";
    previewImage.hidden = true;
}


if (editMode && savedProfile) {

    usernameField.input.value =
        savedProfile.username || "";

    emailField.input.value =
        savedProfile.email || "";

    phoneField.input.value =
        savedProfile.phone || "";

    genderSelect.value =
        savedProfile.gender || "";


    if (savedProfile.image) {

        imageData = savedProfile.image;

        previewImage.src = savedProfile.image;
        previewImage.hidden = false;

    }

}



imageInput.addEventListener("change", function () {

    const file = imageInput.files[0];

    imageError.textContent = "";


    if (!file) {

        
        if (editMode && savedProfile && savedProfile.image) {

            imageData = savedProfile.image;

            previewImage.src = savedProfile.image;
            previewImage.hidden = false;

        } else {

            previewImage.hidden = true;
            imageData = "";

        }

        return;
    }


    if (!file.type.startsWith("image/")) {

        imageError.textContent =
            "Please select an image file.";

        imageInput.value = "";

        return;
    }


    if (file.size > 300 * 1024) {

        imageError.textContent =
            "Image must be smaller than 300 KB.";

        imageInput.value = "";

        return;
    }


    const reader = new FileReader();


    reader.onload = function (event) {

        imageData = event.target.result;

        previewImage.src = imageData;
        previewImage.hidden = false;

    };


    reader.readAsDataURL(file);

});



function showError(field, message) {

    field.error.textContent = message;
    field.input.classList.add("invalid");

}



function clearError(field) {

    field.error.textContent = "";
    field.input.classList.remove("invalid");

}



function validateForm() {

    let isValid = true;


    
    clearError(usernameField);
    clearError(emailField);
    clearError(phoneField);

    passwordError.textContent = "";
    passwordInput.classList.remove("invalid");

    genderError.textContent = "";

    const username =
        usernameField.input.value.trim();


    if (username.length < 3) {

        showError(
            usernameField,
            "Username must be at least 3 characters."
        );

        isValid = false;
    }


    
    const email =
        emailField.input.value.trim();


    if (
        !emailField.input.checkValidity() ||
        email === ""
    ) {

        showError(
            emailField,
            "Please enter a valid email address."
        );

        isValid = false;
    }


   
    const phone =
        phoneField.input.value.trim();

    const phoneNumbers =
        phone.replace(/\D/g, "");


    if (phoneNumbers.length < 7) {

        showError(
            phoneField,
            "Please enter a valid phone number."
        );

        isValid = false;
    }


    const password =
        passwordInput.value;


    if (!editMode && password.length === 0) {

        passwordError.textContent =
            "Password is required.";

        passwordInput.classList.add("invalid");

        isValid = false;

    } else if (password.length > 0) {

        if (
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/[0-9]/.test(password)
        ) {

            passwordError.textContent =
                "Password must have 8+ characters, uppercase, lowercase, and a number.";

            passwordInput.classList.add("invalid");

            isValid = false;
        }
    }



    if (genderSelect.value === "") {

        genderError.textContent =
            "Please select a gender.";

        isValid = false;
    }


    return isValid;
}



form.addEventListener("submit", function (event) {

    event.preventDefault();

    successMessage.textContent = "";
    successMessage.classList.remove("show");


    if (!validateForm()) {
        return;
    }


    const userData = {

        username:
            usernameField.input.value.trim(),

        email:
            emailField.input.value.trim(),

        phone:
            phoneField.input.value.trim(),

        gender:
            genderSelect.value,

        image:
            imageData

    };


  
    localStorage.setItem(
        "userData",
        JSON.stringify(userData)
    );


    successMessage.textContent = editMode
        ? "Profile updated successfully!"
        : "Profile created successfully!";

    successMessage.classList.add("show");


    setTimeout(function () {

        window.location.href =
            "./profile.html";

    }, 700);

});



form.addEventListener("reset", function () {

    setTimeout(function () {

        imageError.textContent = "";

        successMessage.textContent = "";
        successMessage.classList.remove("show");

        usernameField.error.textContent = "";
        emailField.error.textContent = "";
        phoneField.error.textContent = "";

        passwordError.textContent = "";
        genderError.textContent = "";


        document
            .querySelectorAll("input, select")
            .forEach(function (input) {

                input.classList.remove("invalid");

            });


      
        if (editMode && savedProfile) {

            usernameField.input.value =
                savedProfile.username || "";

            emailField.input.value =
                savedProfile.email || "";

            phoneField.input.value =
                savedProfile.phone || "";

            genderSelect.value =
                savedProfile.gender || "";


            passwordInput.value = "";


            imageData =
                savedProfile.image || "";


            if (savedProfile.image) {

                previewImage.src =
                    savedProfile.image;

                previewImage.hidden = false;

            } else {

                previewImage.src = "";
                previewImage.hidden = true;

            }

        } else {

            imageData = "";

            previewImage.src = "";
            previewImage.hidden = true;

            imageInput.value = "";

        }

    }, 0);

});