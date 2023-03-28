import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const Apply = 'fields=name,flags,capital,population,languages'
const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(countryName){
    fetch(`${BASE_URL}${countryName}?${Apply}`)
    .then( res => {
        if(!res.ok) { 
            throw newError(reponse.status)
        }
        return res.json();
    }).then(render)
    .catch(error => {
        Notify.failure('Oops, there is no country with that name');
    
    
   
    });
}
 




input.addEventListener('input', debounce(handleInputForm, DEBOUNCE_DELAY));

function handleInputForm(event){
    
    const countryName = event.target.value.trim();
    console.log(countryName);
    fetchCountries(countryName);
};

function render(countryName) {
    if (countryName.length > 10){
        return Notify.info('Too many matches found. Please enter a more specific name.')
    }
    else if(countryName.length === 1) {countryInfo.innerHTML = '';
         const markup = countryName
        // .filter(el => el.name.official === e.target.textContent)
        .map(({ name, population, capital, flags, languages }) => {
            return `<li><div class="item-flag"><img src="${flags.svg}"
            alt="flag" width="60">
            <h2 class="country-item">${name.official}</h2></div>
            <p>Population: ${population}</p>
            <p>Capital: ${capital}</p>
            <p>Langueges: ${Object.values(languages)}</p></li>`
        }).join('');
        console.log(markup);
        countryList.innerHTML = markup;
    }
    else if (2 <= countryName.length <= 10){
        countryList.innerHTML = '';
            const markupAll = countryName
               .map(({ name, population, capital, flags, languages }) => {
                            return `<li><img src="${flags.svg}"
                            alt="flag" width="30">
                            <p class="country-item">${name.official}</p>
                            </li>`
                        }).join('');
                        console.log(markupAll);
                        countryInfo.innerHTML = markupAll
                        return
                    }
    
        
    
    
    
            
    
    };


