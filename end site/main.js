
// Start Setting Box


let mainColors=localStorage.getItem("color-option");
let interval;
let stateBackground=true;

if(mainColors!==null){
document.documentElement.style.setProperty("--main--color",mainColors);
document.querySelector(".setting-box .colors-list .active").classList.remove("active");
document.querySelector(`[data-color='${mainColors}']`).classList.add("active");

}

//toggle calss for rotaiton
document.querySelector(".setting-box .fa-gear").onclick=function(){
   this.classList.toggle("fa-spin");
   //toggle calss for open settig
   document.querySelector(".setting-box").classList.toggle("open");
}

//Changing Colors
let colorLi=document.querySelectorAll(".option-box .colors-list li");

colorLi.forEach(li=>{
    li.addEventListener("click",e=>{
        document.documentElement.style.setProperty("--main--color",e.target.dataset.color);
        localStorage.setItem("color-option",e.target.dataset.color);
        handleActive(e);

    });
});

let btnGear=document.querySelector('.setting-box .fa-gear');
let settingBox=document.querySelector('.setting-box');
document.addEventListener("click",e=>{
    console.log(e.target.className);

    if(e.target!==btnGear && settingBox.className==='setting-box open'){
        document.querySelector('.setting-box').classList.toggle("open");
        btnGear.classList.toggle('fa-spin');
        console.log("yessssssssssss");
       }
});


//Set Random Backgroud 
 
document.querySelectorAll(`.setting-box .option-box span`).forEach(element => {
   element.addEventListener("click",e=>{
  handleActive(e);
    if(e.target.dataset.background==="yes"){
         stateBackground =true;
         runIntervalBackground();
    }
    else if(e.target.dataset.background==="no"){
         stateBackground=false;
         clearInterval(interval);
    }
   }); 
});


//Enable Bulltes

let btnBulltes=document.querySelectorAll('.option-box.bulltes span');
let containerBlulltes=document.querySelector(".nav-bulltes");
let bulltesStorege=localStorage.getItem("bulltes-state");

console.log( btnBulltes);
if(bulltesStorege!==null){
    btnBulltes.forEach(ele=>{
        ele.classList.remove("active");
    });
    if(bulltesStorege==='block'){
        containerBlulltes.style.display="block";
        document.querySelector(" .option-box.bulltes span.yes").classList.add("active");;
    }
    else{
        containerBlulltes.style.display="none";
        document.querySelector(" .option-box.bulltes span.no").classList.add("active");
    }
}


btnBulltes.forEach(ele => {
    ele.addEventListener("click",e=>{
        console.log(e.target);
        console.log(e.target.dataset.show);
        if(e.target.dataset.show==="block"){
          containerBlulltes.style.display="block";
          localStorage.setItem("bulltes-state","block");
        }
        else{
            containerBlulltes.style.display="none";
            localStorage.setItem("bulltes-state","none");
        }
    });
});


//SET REST BUTTON 

let resetButton=document.querySelector(".setting-box button.reset-option");

resetButton.onclick=e=>{
    localStorage.removeItem("color-option");
    localStorage.removeItem("bulltes-state");
    window.location.reload();
}
// End Settign Box

// Start Nav Bullets
 
const blulets=document.querySelectorAll(".nav-bulltes .bullets");

loadSection(blulets);


// End Nav Bullets

// =============================================================

// Select Landing Page Elment
let  landingPage=document.querySelector(".landing-page");

// Get image 
let imagesArray=["image1.jpg","image2.jpg","image3.jpg","image4.jpg","image5.jpg"];



function runIntervalBackground(){
    
    if(stateBackground){
        interval =setInterval(()=>{
            //Create Random Number
        let randomNumber=Math.floor(Math.random()*imagesArray.length);
        
        //Change BackgrounImage
        landingPage.style.backgroundImage=`url('image/${imagesArray[randomNumber]}')`;
        landingPage.style.transition=".6s"
        },1000);
    }

}
runIntervalBackground(); 



let ourSkills=document.querySelector(`.skills`);

window.onscroll=()=>{

    let skillsOffsetTop=ourSkills.offsetTop;
    let skillsOffsetHeight=ourSkills.offsetHeight;
    let windowHeight=this.innerHeight;
    let windowsScrolltop=this.pageYOffset;
    // console.clear();
    // console.log(`MY SUM CALCK is ${skillsOffsetTop +skillsOffsetHeight-windowHeight }`);
    // console.log(`skillsOffsetHeight is ${skillsOffsetHeight}`);
    // console.log(`skillsOffsetTop is ${skillsOffsetTop}`);
    // console.log(`windowHeight is ${windowHeight}`);
    // console.log(`windowsScrolltop is ${windowsScrolltop}`);


    let sameHeighwind=skillsOffsetHeight+skillsOffsetTop -windowHeight
    // console.log(skillsOffsetTop);
    // console.log(`scrol top is ${windowsScrolltop}`);

    if(windowsScrolltop-2>=sameHeighwind){
        let spans=document.querySelectorAll(`.skills .skills-box .skills-progress span`);
        spans.forEach(ele=>{
            ele.style.width=ele.dataset.porgress;
        });
    }else
    if(windowsScrolltop+1<skillsOffsetTop){
        let spans=document.querySelectorAll(`.skills .skills-box .skills-progress span`);
        spans.forEach(ele=>{
            ele.style.width="0px";
            
        });
    }

}



// Start popup Gallery

let imgGallery=document.querySelectorAll(`.gallery .image-box img`);
console.log(imgGallery);

imgGallery.forEach(img=>{
    img.addEventListener("click",e=>{
        let popupOverlay=document.createElement("div");
        popupOverlay.classList.add("popup-overlay");

        let popupBox=document.createElement("div");
        popupBox.classList.add("popup-box");

        let popupImage=document.createElement("img");
        popupImage.src=img.src;
        popupBox.appendChild(popupImage);
        popupOverlay.appendChild(popupBox);
        document.body.appendChild(popupOverlay);

        //Create Header Image 
        let headerImge=document.createElement("h3");
        headerImge.classList.add("header-image");
    
        if(img.alt1!==""){
            console.log("imgeeeeeeeeee alt");
            headerImge.appendChild(document.createTextNode(img.alt));
            // popupBox.appendChild(headerImge);
            popupBox.insertBefore(headerImge,popupBox.firstChild);
            console.log(popupBox.firstChild);
        }


        //crete Exit Button

        let exitButton=document.createElement("span");
        exitButton.appendChild(document.createTextNode("X"));
        exitButton.classList.add("exit-button");
        exitButton.onclick=e=>{
            e.target.remove();
            popupOverlay.remove();
        }
         popupBox.appendChild(exitButton);

    });
});

// End popup Gallery

function loadSection(element){

    console.log(element);
    element.forEach(ele => {
        ele.addEventListener("click",e=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView(
                {
                    behavior:'smooth'
                }
            );
        });
    });
}

function handleActive(e){

    e.target.parentElement.querySelectorAll('.active').forEach(ele=>{
        ele.classList.remove('active');
    });
    e.target.classList.add('active');
}


// e.target.parentElement.querySelectorAll(".active").forEach(element=>{
        //     element.classList.remove("active");
        // });

        // e.target.classList.add("active");

let links=document.querySelectorAll('.links li a ');

loadSection(links);


// ==========================
// Start Togle Menu

let togleMenu=document.querySelector('.header-area .togle-menu');
let ulLinks=document.querySelector(`.header-area .links`);
let i=0;

togleMenu.onclick=e=>{
    togleMenu.classList.toggle('menu-active');
    ulLinks.classList.toggle(`open`);
    e.stopPropagation();
}

ulLinks.onclick=e=>{
  e.stopPropagation();
}
document.addEventListener("click",e=>{
    if(e.target!==togleMenu && e.target!==ulLinks){
        if(togleMenu.classList.contains("menu-active")){
            togleMenu.classList.toggle('menu-active');
            ulLinks.classList.toggle(`open`);
        }
    }
});

// End Togle Menu
// =========================


document.querySelector('.concat .right input[type="submit"]').onclick=e=>e.preventDefault();







