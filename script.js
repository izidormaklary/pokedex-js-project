(function(){
    const evoTarget = document.getElementById("dispEvo");
    const ol = document.createElement("OL");
    const li =  document.createElement("LI");
    document.getElementById("run").addEventListener("click", getPoke)
    const targetContainers = document.querySelectorAll(".showContent");
    let buttons = document.querySelectorAll(".show")
    buttons.forEach(element=> {
        let button = element.dataset.target;
        element.addEventListener('click', e=>{
            display(button)
        })
    });

    function display(button){
        targetContainers.forEach(div=> {
            div.style.display="none"
        });
        document.getElementById(button).style.display = "block";
    }

    async function getPoke() {
        const input = document.getElementById("input").value

        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        let result = await data.json();

        showPoke(result)

        const dataEv = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${input}`);
        let resultEv = await dataEv.json();
        evoTarget.innerHTML= "";
        showEvo(resultEv)

    }

    function showPoke(result) {
        // display name and ID
        const nameId = document.getElementById("nameNid")
        nameId.innerText = result.name + "  " + result.id;

        //display image in the specified div

        const imageTarget = document.getElementById("dispImage");
        //removing children (in case there is from last round)
        imageTarget.removeChild(imageTarget.childNodes[0])

        //creating image with its attributes, and the specified source from api
        const image = document.createElement("IMG");
        image.setAttribute("src", result.sprites.front_default);
        image.setAttribute("height", "300px");
        image.setAttribute("width", "300px");
        // adding image as selected divs child
        imageTarget.appendChild(image);


        //displaying moves
        const moves = document.getElementById("dispMoves");
        moves.removeChild(moves.childNodes[0])
        const ul = document.createElement("UL");


        const arrayMoves = result.moves;
        arrayMoves.forEach(element => {
            const li = document.createElement("li");
            li.innerText = element.move.name;
            ul.appendChild(li);

        })

        moves.appendChild(ul)





    }
    function showEvo(resultEv){
        evoTarget.innerHTML= "";
        ol.innerHTML="";
        //display evolutions



        let previous = resultEv.evolves_from_species;

        console.log(previous)
        if (previous == null) {
        evoTarget.appendChild(ol)
        }else{
            li.innerText= previous.name
            ol.appendChild(li);
            let link = previous.url;
            prevEvo(link)
        }


      //  const arrayMoves = resultEv.moves;
      //  arrayMoves.forEach( element => {
      //      const li = document.createElement("li");
      //      li.innerText=element.move.name;
      //      ul.appendChild(li);
      //      console.log(element.move.name)
      //  })
    }
    async function prevEvo(link) {
        const dataPrev = await fetch(link);
        let resultPrev = await dataPrev.json();
        console.log(resultPrev.name)

        if (resultPrev.evolves_from_species == null) {
            evoTarget.appendChild(ol)
        }else{
            console.log(resultPrev.evolves_from_species)

            const otherli =  document.createElement("LI");
            let previous = resultPrev.evolves_from_species;
            otherli.innerText= previous.name;

            ol.insertBefore(otherli, ol.firstChild);

            link = resultPrev.evolves_from_species.url;

            prevEvo(link)
        }
    }
})();