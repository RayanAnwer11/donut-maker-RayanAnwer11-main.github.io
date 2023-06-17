//Create a constant variable linked to div
const makeDonut=document.querySelector('.makeDonut')
const buyClick=document.querySelector('.buyClick')
const donutCount = document.querySelector('.donutCount')
const autoClickerCountValue=document.querySelector('.autoClickerCount')
const autoCost=document.querySelector('.autoCost')
const reset=document.querySelector('.reset')

//Initiate a counters 
    let donutClick = 0
    let donutCounter = 1
    let autoClickerCounter = 0
    let autoClickerCost = 100
    
    //function to write to the div's class
    function write(){
        donutCount.textContent = donutClick;
        autoClickerCountValue.textContent = autoClickerCounter;
        autoCost.textContent = autoClickerCost;
        //To save the values in local memory 
        donutCount.addEventListener("load",localStorage.setItem("donut_numb",donutClick))
        autoClickerCountValue.addEventListener("load",localStorage.setItem("auto_click_numb",autoClickerCounter))
        autoCost.addEventListener("load", localStorage.setItem("cost_numb",autoClickerCost))
        }
    
    //function to create event when button clicked
    function clickDonut(){
    makeDonut.addEventListener('click', function(){
        donutClick++
        write()
        check()
        });
    }
    
    //Function to restore the number from the local memory
function all_auto(){
    if (localStorage.getItem("donut_numb")){
        donutClick=localStorage.getItem("donut_numb")
        donutClick=parseInt(donutClick) //value stored in local memory as string, and need to be converted to Integer
    }

    if (localStorage.getItem("auto_click_numb")){
        autoClickerCounter=localStorage.getItem("auto_click_numb")
        autoClickerCounter=parseInt(autoClickerCounter) //value stored in local memory as string, and need to be converted to Integer
    }
    if (localStorage.getItem("cost_numb")){
        autoClickerCost=localStorage.getItem("cost_numb")
        autoClickerCost=parseInt(autoClickerCost) //value stored in local memory as string, and need to be converted to Integer
        }
        check()
        write()
        
}
    //to check the value of the cost thus disable/enable the button
    function check(){
        if(donutClick<autoClickerCost){
            disableClickerbtn()
        }
        else if(donutClick>=autoClickerCost){
            enableClickerbtn()
            } 
    }
    
    //disable the button and set the background to gray 
    function disableClickerbtn(){
        buyClick.disabled=true
        buyClick.style.background="gray"
    }
    //Enable the button and set the background to transparent 
    function enableClickerbtn(){
        buyClick.disabled=false
        buyClick.style.background="transparent"
    }
    
    //function to enable buy clicker and add 10% to the clicker cost
    function buyClicker(){
        update_second()
        buyClick.addEventListener('click',()=>{
            donutClick=donutClick-autoClickerCost
            autoClickerCounter++
            autoClickerCost = parseInt(autoClickerCost)
            autoClickerCost=autoClickerCost+Math.trunc(autoClickerCost*0.1)
            write()
            check()
            
        })
    }
    //set a timer for 1 second
    function update_second(){
        
        myInterval = setInterval(()=>{
            donutClick=donutClick+autoClickerCounter
            write()
            check()
        },1000)
    }
    //rest all the values and clear the local storage
    function resetValues(){
        reset.addEventListener('click',()=>{
            reset.style.background='red'
            window.location.reload()
            localStorage.clear()
        })
    }

    //Calling the Functions
    all_auto()
    clickDonut()
    check()
    resetValues()
    buyClicker()
    