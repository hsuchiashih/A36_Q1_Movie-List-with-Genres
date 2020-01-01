(function () {
    //API url
    const BASE_URL = 'https://movie-list.alphacamp.io'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'

    //get element
    const dataPanel = document.getElementById('data-panel')
    const listmenu = document.getElementById('list-menu')
    
    const sortList =
    {
        "1": "Action",
        "2": "Adventure",
        "3": "Animation",
        "4": "Comedy",
        "5": "Crime",
        "6": "Documentary",
        "7": "Drama",
        "8": "Family",
        "9": "Fantasy",
        "10": "History",
        "11": "Horror",
        "12": "Music",
        "13": "Mystery",
        "14": "Romance",
        "15": "Science Fiction",
        "16": "TV Movie",
        "17": "Thriller",
        "18": "War",
        "19": "Western"
    }
    
    const sortArray = Object.entries(sortList)
    const data = []
   
    axios.get(INDEX_URL)
        .then((response) => {
            data.push(...response.data.results)        
            view.displayDataList(data)        
        })
        .catch((err) => console.log(err))
    

    const model ={}

    const view = {

        listview(){
            sortArray.forEach(item => {
                itemNumber = Number(item[0])
                listmenu.innerHTML += `
                <a class="list-group-item list-group-item-action"  data-toggle="list" href="#" role="tab"  data-id="${itemNumber}">
                ${item[1]}</a>
                `
            })
        },


        displayDataList(data) {
            let htmlContent = ''
            data.forEach(item => {
                let genresdata = []
                genresdata = item.genres
                // console.log(data)
                htmlContent += ` 
        <div class="col-sm-3">
        <div class="card mb-2">
            <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
        <div class="card-body movie-item-body">
            <h6 class="card-title">${item.title}</h6>
        </div>
        <!-- "genres" button -->
        <div class="card-footer">`
            for (i=0 ; i <genresdata.length; i++) {
                    // console.log(genresdata[i])
                    genresdataItem = genresdata[i].toString()
                    result = sortList[`${genresdataItem}`]
            htmlContent += 
            `<span class="badge badge-info m-2" data-id ="${genresdataItem}">${result}</span>` 
        }
        htmlContent += 
        `</div>
        </div>
    </div>`  
    })
        dataPanel.innerHTML = htmlContent
    }
    


            
    }

    const controller = {

        menuClick(){
            listmenu.addEventListener("click", (event)=>{
                let targetId = Number(event.target.dataset.id)
                let newdata = data.filter (item => item.genres.includes(targetId))
                console.log(newdata)
                view.displayDataList(newdata) 
            })
            
        }
    }

    
    view.listview()
    controller.menuClick()
    
    
})()