document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchQuery').value;
    if (query) {
        fetchJobs(query);
    }
});

async function fetchJobs(query) {
    const appId = '6c65512e';
    const apiKey = 'ae74f802cd3f78a0e81ab7435731685d';
    const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${apiKey}&what=${query}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
}

function displayResults(jobs) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (jobs && jobs.length > 0) {
        jobs.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.classList.add('job');
            jobElement.innerHTML = `
                <h3>${job.title}</h3>
                <p>${job.company.display_name}</p>
                <p>${job.location.display_name}</p>
                <p>${job.description}</p>
                <a href="${job.redirect_url}" target="_blank">View Job</a>
            `;
            resultsContainer.appendChild(jobElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found</p>';
    }
}
