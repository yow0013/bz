document.addEventListener("DOMContentLoaded", function() {
    // 📅 Display the current date on the blog post
    let postDate = new Date().toLocaleDateString();
    document.getElementById("postDate").textContent = postDate;

    // ❤️ Like Button Functionality (Stores in Local Storage)
    let likeButton = document.getElementById("likeButton");
    let likeCount = document.getElementById("likeCount");

    let count = localStorage.getItem("likeCount") ? parseInt(localStorage.getItem("likeCount")) : 0;
    likeCount.textContent = count + " Likes";

    likeButton.addEventListener("click", function() {
        count++;
        likeCount.textContent = count + " Likes";
        localStorage.setItem("likeCount", count); // Save to Local Storage

        // ❤️ Like animation
        likeButton.style.transform = "scale(1.2)";
        setTimeout(() => likeButton.style.transform = "scale(1)", 200);
    });

    // 💬 Comment Section Functionality
    let commentInput = document.getElementById("commentInput");
    let submitComment = document.getElementById("submitComment");
    let commentList = document.getElementById("commentList");
    let imageUpload = document.getElementById("imageUpload");

    // 🗂 Load comments from Local Storage
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    renderComments();

    // ➕ Function to add a comment
    submitComment.addEventListener("click", function() {
        let commentText = commentInput.value.trim();
        let imageFile = imageUpload.files[0];

        if (commentText !== "") {
            let newComment = {
                text: commentText,
                image: "", // Default empty image
                user: "Guest" // Default name
            };

            // 🖼️ Handle Image Upload (if exists)
            if (imageFile) {
                let reader = new FileReader();
                reader.onload = function(e) {
                    newComment.image = e.target.result;
                    comments.push(newComment);
                    localStorage.setItem("comments", JSON.stringify(comments));
                    renderComments();
                };
                reader.readAsDataURL(imageFile);
            } else {
                comments.push(newComment);
                localStorage.setItem("comments", JSON.stringify(comments));
                renderComments();
            }

            // ✨ Clear input after submission
            commentInput.value = "";
            imageUpload.value = "";
        }
    });

    // 📜 Function to render comments
    function renderComments() {
        commentList.innerHTML = "";
        comments.forEach(comment => {
            let newComment = document.createElement("li");
            newComment.classList.add("comment");

            // 🖼️ Create user image
            let userImage = document.createElement("img");
            userImage.classList.add("comment-image");
            userImage.src = comment.image ? comment.image : "images/default-user.png"; // Default profile image

            // ✍️ Create comment text
            let commentContent = document.createElement("p");
            commentContent.innerHTML = `<strong>${comment.user}:</strong> ${comment.text}`;

            newComment.appendChild(userImage);
            newComment.appendChild(commentContent);
            commentList.appendChild(newComment);
        });
    }
});
