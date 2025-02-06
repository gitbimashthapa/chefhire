// Navbar Hamburger Menu toggle
document.querySelector('[data-collapse-toggle]').addEventListener('click', function() {
    const target = document.getElementById(this.getAttribute('aria-controls'));
    target.classList.toggle('hidden');
});

async function fetchBlogs() {
    const response = await fetch('../static/data/blogs.json');
    const blogs = await response.json();
    return blogs;
}

function createBlogElement(blog) {
    const blogElement = document.createElement('div');
    blogElement.classList.add('p-4', 'bg-gray-800', 'rounded-lg', 'shadow-md', 'hover:shadow-lg', 'transition', 'duration-300', 'transform', 'hover:scale-105', 'flex', 'items-start');

    const tags = blog.tags.map(tag => `<button class="tag-btn" data-tag="${tag}">${tag}</button>`).join(' ');

    blogElement.innerHTML = `
        <div class="flex-shrink-0 mr-4">
            <span class="text-gray-400">${blog.date}</span>
        </div>
        <div>
            <h2 class="text-xl font-semibold text-white">${blog.title}</h2>
            <p class="text-gray-400 mt-2">${blog.description}</p>
            <div class="mt-2">${tags}</div>
            <a href="${blog.link}" target="_blank" class="text-blue-400 mt-2 block">Read more →</a>
        </div>
    `;
    return blogElement;
}

function displayBlogs(blogs) {
    const blogsContainer = document.getElementById('blogs');
    blogsContainer.innerHTML = '';
    blogs.forEach(blog => {
        const blogElement = createBlogElement(blog);
        blogsContainer.appendChild(blogElement);
    });
    addTagClickEvent();
}

function addTagClickEvent() {
    const tagButtons = document.querySelectorAll('.tag-btn');
    tagButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const tag = e.target.getAttribute('data-tag');
            toggleTagFilter(tag);
        });
    });
}

function toggleTagFilter(tag) {
    const selectedTags = document.getElementById('selected-tags');
    const existingTagElement = selectedTags.querySelector(`[data-tag="${tag}"]`);

    if (existingTagElement) {
        existingTagElement.remove();
    } else {
        const tagElement = document.createElement('span');
        tagElement.classList.add('bg-blue-600', 'text-white', 'py-1', 'px-2', 'rounded', 'flex', 'items-center', 'space-x-2');
        tagElement.setAttribute('data-tag', tag);
        tagElement.innerHTML = `${tag} <button class="remove-tag-btn ml-2"><i class="fas fa-times"></i></button>`;
        selectedTags.appendChild(tagElement);
    }

    const activeTags = Array.from(selectedTags.querySelectorAll('span')).map(el => el.getAttribute('data-tag'));
    if (activeTags.length > 0) {
        selectedTags.classList.remove('hidden');
    } else {
        selectedTags.classList.add('hidden');
    }

    filterBlogsByTags(activeTags);
    addRemoveTagEvent();
}

function addRemoveTagEvent() {
    const removeTagButtons = document.querySelectorAll('.remove-tag-btn');
    removeTagButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const tag = e.target.closest('span').getAttribute('data-tag');
            toggleTagFilter(tag);
        });
    });
}

function filterBlogsByTags(tags) {
    fetchBlogs().then(blogs => {
        const filteredBlogs = blogs.filter(blog => tags.every(tag => blog.tags.includes(tag)));
        displayBlogs(filteredBlogs);
    });
}

async function main() {
    const blogs = await fetchBlogs();
    displayBlogs(blogs);

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredBlogs = blogs.filter(blog => 
            blog.title.toLowerCase().includes(searchTerm) || 
            blog.description.toLowerCase().includes(searchTerm)
        );
        displayBlogs(filteredBlogs);
    });
}

main();
