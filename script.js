(function(){
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
    const input = document.getElementById("input").value
    async function getPoke() {
        const input = document.getElementById("input").value

        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        let result = await data.json();



        showPoke(result)
    }

    function showPoke(result){
        const nameId = document.getElementById("nameNid")
        nameId.innerText = result.name + "  "+ result.id;


        const imageTarget = document.getElementById("dispImage");
        imageTarget.removeChild(imageTarget.childNodes[0])
        const  image = document.createElement("IMG");
        image.setAttribute("src", result.sprites.front_default);
        image.setAttribute("height", "300px");
        image.setAttribute("width", "300px");
        imageTarget.appendChild(image);


        console.log(result.id)
    }
})();