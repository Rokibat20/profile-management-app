const profileContainer =
    document.getElementById("profileContainer");



const savedProfile =
    localStorage.getItem("userData");



if (!savedProfile) {

    const message = document.createElement("div");

    message.classList.add("empty-profile");

    const heading = document.createElement("h2");

    heading.textContent = "No Profile Found";

    const text = document.createElement("p");

    text.textContent =
        "You haven't created a profile yet.";

    const createButton =
        document.createElement("button");

    createButton.textContent =
        "Create Profile";

    createButton.addEventListener("click", function () {

        window.location.href = "./index.html";

    });

    message.appendChild(heading);
    message.appendChild(text);
    message.appendChild(createButton);

    profileContainer.appendChild(message);

} else {

    const userData =
        JSON.parse(savedProfile);

    displayProfile(userData);

}




function displayProfile(userData) {

    const dashboard =
        document.createElement("section");

    dashboard.classList.add("dashboard");


   
    const heading =
        document.createElement("h1");

    heading.textContent = "My Profile";


    const subtitle =
        document.createElement("p");

    subtitle.textContent =
        "Your profile has been created successfully.";


    const image =
        document.createElement("img");

    image.classList.add("profile-image");

    image.alt = "Profile picture";

    if (userData.image) {

        image.src = userData.image;

    } else {

        image.hidden = true;

    }


  
    const username =
        document.createElement("h2");

    username.textContent =
        userData.username;


    const information =
        document.createElement("div");

    information.classList.add("information");

    const email =
        createInformation(
            "Email",
            userData.email
        );


    
    const phone =
        createInformation(
            "Phone",
            userData.phone
        );


    
    const gender =
        createInformation(
            "Gender",
            userData.gender
        );


    information.appendChild(email);
    information.appendChild(phone);
    information.appendChild(gender);


    
    const buttons =
        document.createElement("div");

    buttons.classList.add("profile-buttons");


    const editButton =
        document.createElement("button");

    editButton.textContent =
        "✏️ Edit Profile";

    editButton.classList.add("edit-button");


    const deleteButton =
        document.createElement("button");

    deleteButton.textContent =
        "🗑️ Delete Profile";

    deleteButton.classList.add("delete-button");


    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);



    editButton.addEventListener("click", function () {
    window.location.href = "./index.html?edit=true";
});
    deleteButton.addEventListener("click", function () {

        const confirmDelete =
            confirm(
                "Are you sure you want to delete your profile?"
            );

        if (!confirmDelete) {
            return;
        }

        localStorage.removeItem("userData");

        window.location.href =
            "./index.html";

    });



    dashboard.appendChild(heading);
    dashboard.appendChild(subtitle);
    dashboard.appendChild(image);
    dashboard.appendChild(username);
    dashboard.appendChild(information);
    dashboard.appendChild(buttons);

    profileContainer.appendChild(dashboard);

}



function createInformation(label, value) {

    const item =
        document.createElement("div");

    item.classList.add("info-item");


    const title =
        document.createElement("span");

    title.textContent = label;


    const content =
        document.createElement("strong");

    content.textContent = value;


    item.appendChild(title);
    item.appendChild(content);

    return item;
}