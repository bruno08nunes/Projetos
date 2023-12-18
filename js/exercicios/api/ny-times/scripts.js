// Defining a baseURL and key to as part of the request URL

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'lDu5yS431k3A42dtwEJfBCYQYDkG1gmW';

// Grab references to all the DOM elements you'll need to manipulate
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const section = document.querySelector('section');
const nav = document.querySelector('nav');

// Hide the "Previous"/"Next" navigation to begin with, as we don't need it immediately
nav.style.display = 'none';

// define the initial page number and status of the navigation being displayed
let pageNumber = 0;

// Event listeners to control the functionality

const submitSearch = e => {
    pageNumber = 0;
    fetchResults(e);
}

const fetchResults = e => {
    e.preventDefault();
    
    let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}&fq=document_type:("article")`;
    
    if (startDate.value !== "") {
        url = `${url}&begin_date=${startDate.value}`;
    }
    
    if (endDate.value !== "") {
        url = `${url}&end_date=${endDate.value}`;
    }
    
    fetch(url)
    .then(response => response.json())
    .then(json => displayResults(json))
    .catch(error => {
        console.error(`Error fetching data: ${error.message}`)
        const para = document.createElement("p");
        para.textContent = "No results returned";
        section.appendChild(para);
    });
}

const displayResults = json => {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    
    const articles = json.response.docs;
    
    nav.style.display = articles.length === 10 ? "block" : "none";
    
    if (articles.length === 0) {
        const para = document.createElement("p");
        para.textContent = "No results returned";
        section.appendChild(para);
    } else {
        for (const current of articles) {
            let src, alt;
            if (current.multimedia.length > 0) {
                src = `http://www.nytimes.com/${current.multimedia[0].url}`;
                alt = current.headline.main;
            }

            let spanKeyword;
            for (const keyword of current.keywords) {
                spanKeyword += `<span>${keyword.value}</span> `
            }

            let article = `
                <article>
                    <h2>
                        <a href="${current.web_url}">${current.headline.main}</a>
                    </h2>
                    <img src="${src ?? ""}" alt="${alt ?? ""}">
                    <p>${current.snippet}</p>
                    <p class="keywords">Keywords: ${spanKeyword}</p>
                </article>
            `
            
            section.innerHTML += article;
        }
    }
}

const nextPage = e => {
    pageNumber++;
    fetchResults(e);
}

const previousPage = e => {
    if (pageNumber > 0) {
        pageNumber--;
    } else {
        return;
    }
    fetchResults(e);
}

searchForm.addEventListener("submit", submitSearch);
nextBtn.addEventListener("click", nextPage);
previousBtn.addEventListener("click", previousPage);