

let hash = 'f6628511f952e993d89247e996bf9450';
let apikey = '9c6cdf595b5f0b060548855b36269cf5';
const searchIcon = document.getElementById('icon');
const searchBox = document.getElementById('character');

const searchAction = async () => {
    const character = document.getElementById('character');
    character.classList.toggle("show");

    // let character_url = `https://gateway.marvel.com/v1/public/characters?ts=1&name=${character.value}&hash=${hash}&apikey=${apikey}`;
    let comics_url = `https://gateway.marvel.com/v1/public/comics?ts=1&hash=${hash}&title=${character.value}&apikey=${apikey}`;
    try {
        const response = await fetch(comics_url);
        const resJson = await response.json();
        const comicsContainer = document.getElementById('comics');

        if (resJson.code === 200) {
            const comicsList = resJson.data.results.map(comic => {
                if (!comic.title.includes('Previews')) {

                    const cardSpace = document.createElement('div');
                    cardSpace.className = 'col-lg-3 col-md-4 col-sm-6';

                let card = document.createElement("div");
                card.className = "card";
    
                let cardImage = document.createElement("img");
                cardImage.className = "card-img-top";
                cardImage.src = comic.thumbnail.path + '.' +comic.thumbnail.extension;
                cardImage.height = 400;
                cardImage.width = 100
                cardImage.alt = "Card image cap";
    
                let cardBody = document.createElement("div");
                cardBody.className = "card-body";
                cardBody.style.minHeight = '9rem';
    
                let cardTitle = document.createElement("h5");
                cardTitle.className = "card-title";
                cardTitle.textContent = comic.title;
    
                let cardText = document.createElement("p");
                cardText.className = "card-text";
                cardText.textContent = comic.textObjects[0]?.text ?? comic.description;
    
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
    
                let listGroup = document.createElement("ul");
                listGroup.className = "list-group list-group-flush";
    
                
                let listItem1 = document.createElement("li");
                listItem1.className = "list-group-item";
                listItem1.textContent = `Price: $ ${comic.prices[0].price}`;
                listGroup.appendChild(listItem1);

                
                let listItem2 = document.createElement("li");
                listItem2.className = "list-group-item creators-wrap";

                const creatorsText = comic.creators.items.map(item => `${item.name} (${item.role})`).join(', ');

                listItem2.textContent = creatorsText !== '' ? 'Creators: ' + creatorsText : 'Creators: --';
                listGroup.appendChild(listItem2);

                
    
                let cardBody2 = document.createElement("div");
                cardBody2.className = "card-body";
    
                let cardLink1 = document.createElement("a");
                cardLink1.href = Array.isArray(comic.urls) ? comic.urls[0].url : '#';
                cardLink1.className = "card-link";
                cardLink1.textContent = "Details";
                cardLink1.target = "_blank";
    
                let cardLink2 = document.createElement("a");
                // cardLink2.href = 'https://www.comicshoplocator.com/StoreLocatorPremier';
                cardLink2.className = "card-link";
                cardLink2.textContent = "Buy";
                cardLink2.addEventListener("click", function() {
                    window.open('https://www.comicshoplocator.com/StoreLocatorPremier', "_blank", "width=600,height=400");
                });
    
                cardBody2.appendChild(cardLink1);
                cardBody2.appendChild(cardLink2);
    
                // Append image, card body, list group, and second card body to the card
                card.appendChild(cardImage);
                card.appendChild(cardBody);
                card.appendChild(listGroup);
                card.appendChild(cardBody2);
    
                // Append the card to the body
                cardSpace.appendChild(card);
                comicsContainer.appendChild(cardSpace);
                }
                
            })
        }


    } catch (error) {
        console.error('Error:', error);
    }
};

searchIcon.addEventListener('pointerdown', searchAction);
searchBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchAction();
    }
  });