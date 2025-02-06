document.addEventListener('DOMContentLoaded', function () {
  fetch('../static/data/li-recommendation.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('recommendations-container');

      data.forEach(rec => {
        const card = document.createElement('div');
        card.classList.add('recommendation-card', 'flex-shrink-0', 'p-4', 'rounded-lg', 'shadow-md', 'dark:bg-gray-800', 'bg-white', 'w-80');

        const linkedinIconLink = document.createElement('a');
        // console.log("profile",rec.profile)
        linkedinIconLink.href = rec.profile;
        linkedinIconLink.target = "_blank";
        linkedinIconLink.rel = "noopener noreferrer";

        const linkedinIcon = document.createElement('img');
        linkedinIcon.src = "static/images/linkedin.png";
        linkedinIcon.alt = "LinkedIn Icon";
        linkedinIcon.classList.add('w-5', 'h-5', 'ml-2');

        linkedinIconLink.appendChild(linkedinIcon);

        const recommended = document.createElement('div');
        recommended.classList.add('mb-2', 'font-bold', 'text-gray-700', 'dark:text-gray-300', 'flex', 'items-center', 'justify-between');
        recommended.textContent = 'Recommended';
        recommended.appendChild(linkedinIconLink);

        const message = document.createElement('p');
        message.classList.add('text-sm', 'mb-4', 'text-gray-900', 'dark:text-white');
        message.textContent = rec.message.substring(0, 200) + '...';

        const profile = document.createElement('div');
        profile.classList.add('flex', 'items-center', 'mt-4');

        const img = document.createElement('img');
        img.src = rec.image;
        img.alt = rec.name;
        img.classList.add('w-10', 'h-10', 'rounded-full', 'mr-4');

        const info = document.createElement('div');
        const name = document.createElement('a');
        name.href = rec.profile;
        name.target = "_blank";
        name.classList.add('text-base', 'font-bold', 'text-gray-900', 'dark:text-white');
        name.textContent = rec.name;

        const title = document.createElement('p');
        title.classList.add('text-sm', 'text-gray-500', 'dark:text-gray-400');
        title.textContent = `${rec.title} • ${rec.date}`;

        info.appendChild(name);
        info.appendChild(title);
        profile.appendChild(img);
        profile.appendChild(info);

        card.appendChild(recommended);
        card.appendChild(message);
        card.appendChild(profile);

        container.appendChild(card);
      });

      let scrollAmount = 0;
      const scrollStep = 300;

      function slideNext() {
        scrollAmount += scrollStep;
        if (scrollAmount >= container.scrollWidth) {
          scrollAmount = 0;
        }
        container.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }

      function slidePrev() {
        scrollAmount -= scrollStep;
        if (scrollAmount < 0) {
          scrollAmount = container.scrollWidth;
        }
        container.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }

      document.getElementById('nextBtn').addEventListener('click', slideNext);
      document.getElementById('prevBtn').addEventListener('click', slidePrev);

      setInterval(slideNext, 2000); // 2 seconds interval
    })
    .catch(error => console.error('Error loading recommendations:', error));
});
