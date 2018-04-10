const newsArticles = document.querySelector('.vita-container');
const sourceSelector = document.querySelector('#sources');
const apiKey = '8fe44449691b48469b10f822c3bda875';
const defaultSource = 'techcrunch';


//check for service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () =>
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('Service Worker registered'))
            .catch(err => 'SW registration failed'));
} 



window.addEventListener('load', async function(){
    updateNews();

    //to update news based on preference
    await updateNewsSources();

    sourceSelector.value = defaultSource;
    //listen to the select for changes
    sourceSelector.addEventListener('change', function (e) {
        updateNews(e.target.value);
    });

})



async function updateNewsSources() {
    const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
    const json = await response.json();
    sourceSelector.innerHTML =
        json.sources
            .map(source => `<option value="${source.id}">${source.name}</option>`)
            .join('\n');
}

async function updateNews(source = defaultSource) {
    newsArticles.innerHTML = '';
    const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
    const json = await response.json();
    newsArticles.innerHTML =
        json.articles.map(createArticle).join('\n');
}


function createArticle(article) {
    return `
        <div class="grid col col-md-12">

            <div class="col-md-6 col-sm-6 vita_br">
                <img src="${article.urlToImage}" class="img-responsive" alt="Image">
			</div>
            <div class="col-md-6 col-sm-6 vita_bm">
                <h4>${article.title}</h4>
                <h6><i>Published on :${article.publishedAt}, by ${article.author} </i></h6>
                <p>${article.description}</p>
                <button class=" btn btn-info btn-flat"><a  target="_blank" href="${article.url}">Read More </a></button>
                     
            </div>
            <div class="clearfix"></div>

        </div>`;
}