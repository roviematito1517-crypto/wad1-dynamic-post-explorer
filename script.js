const loadButton = document.getElementById("loadButton");
const postsContainer = document.getElementById("posts");
const statusText = document.getElementById("status");

loadButton.addEventListener("click", loadPosts);

async function loadPosts() {
    postsContainer.textContent = "";
    statusText.textContent = "Loading posts...";
    loadButton.disabled = true;

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!response.ok) {
            throw new Error("Unable to load posts. Please try again.");
        }

        const posts = await response.json();

        const firstFivePosts = posts.slice(0, 5);

        firstFivePosts.forEach(function(post) {
            const postDiv = document.createElement("div");
            postDiv.className = "post";

            const title = document.createElement("h3");
            title.textContent = post.title;

            const body = document.createElement("p");
            body.textContent = post.body;

            postDiv.appendChild(title);
            postDiv.appendChild(body);
            postsContainer.appendChild(postDiv);
        });

        statusText.textContent = "Posts loaded successfully!";
    } catch (error) {
        statusText.textContent = "Error: " + error.message;
    } finally {
        loadButton.disabled = false;
    }
}
