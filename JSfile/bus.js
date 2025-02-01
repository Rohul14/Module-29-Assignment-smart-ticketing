function busBtn() {
    ScrollElementById('ticket-section')
}

function ScrollElementById(elementId) {
    const element=document.getElementById(elementId);
    element.scrollIntoView({
        behavior:'smooth'
    })
}

const seats=document.getElementsByClassName('seat');
 let seatArray=[]

for(let i=0; i <seats.length;i++){
    seats[i].addEventListener('click',function(event){
        const clickedSeat=event.target;
        const index=seatArray.indexOf(clickedSeat.innerText);

        if (clickedSeat.classList.contains('bg-green-500')) {
            clickedSeat.classList.remove('bg-green-500','text-white')
            if (index >-1) {
                seatArray.splice(index,1)   
                updateValues() 
                checkInput()
            }
        }else{
            if (seatArray.length < 4) {
                clickedSeat.classList.add('bg-green-500','text-white')
                seatArray.push(clickedSeat.innerText)
                updateValues() 
                checkInput()
            }
            else{
                alert('You cant select more then 4 Seats')
            }
            
        }
    })
}

// updateValues 
function updateValues() {
    const seat_left=document.getElementById('seat_left');
    seat_left.innerText=(40-seatArray.length)

    const seatCount=document.getElementById('seat-count');
    seatCount.innerText=(0+seatArray.length)

    // select-seats 
    const selectSeats=document.getElementById('select-seats');
    selectSeats.innerHTML='';
     for(const seat of seatArray){
         const create_div=document.createElement('div');
         create_div.classList='flex flex-row justify-between py-2'
         create_div.innerHTML=`<span class="text-sm font-semibold">${(seat.toUpperCase())}</span>
         <span class="text-sm font-semibold">Economoy</span>
         <span class="text-sm font-semibold">550</span>`;
         selectSeats.appendChild(create_div);
    }

    const totalPrice=document.getElementById('total-price');
    totalPrice.innerText=550*seatArray.length;

    // applyBtn
    const applyBtn=document.getElementById('apply-btn');
    if (seatArray.length >= 3 ) {
        applyBtn.removeAttribute('disabled')
    }else{
        applyBtn.setAttribute('disabled',true)
    }
    
}

// discount function ----->

const applyBtn=document.getElementById('apply-btn');
    applyBtn.addEventListener('click',function(){
    const uesCoupon=document.getElementById('input-text').value ;
    if (uesCoupon.toUpperCase()==='NEW15') {
        const gdPrice=document.getElementById('gd-price');
        gdPrice.innerText=parseInt((seatArray.length*550)-(seatArray.length*550)*15/100);

    }else if (uesCoupon.toUpperCase()==='COUPLE20') {
        const gdPrice=document.getElementById('gd-price');
        gdPrice.innerText=parseInt((seatArray.length*550)-(seatArray.length*550)*20/100);
    }
})

// input section -------->
const nameInput=document.getElementById('name')
const numberInput=document.getElementById('number')
const emailInput=document.getElementById('email')
const nextBtn=document.getElementById('next-btn')

function checkInput() {
   const name=nameInput.value.trim();
   const number=numberInput.value.trim();
   const email=emailInput.value.trim();

   if (name && number&& email && seatArray.length >0 ) {
    nextBtn.removeAttribute('disabled')
   }else{
    nextBtn.setAttribute('disabled', true)
   }
}
nameInput.addEventListener('input',checkInput)
emailInput.addEventListener('input',checkInput)
numberInput.addEventListener('input',checkInput)

// click nextBtn go success page ----->

nextBtn.addEventListener('click',function(){
    const removeTicked=document.getElementById('total-html');
    removeTicked.classList.add('hidden');

    const addSuccess=document.getElementById('booking');
    addSuccess.classList.remove('hidden');

    nameInput.value=''
    numberInput.value=''
    emailInput.value=''
    seatArray=[]
    updateValues()
    for(const seat of seats){
        seat.classList.remove('bg-green-500' ,'text-white')
    }
    nextBtn.setAttribute('disabled', true)
})

document.getElementById('continue').addEventListener('click',function(){
    const removeTicked=document.getElementById('total-html');
    removeTicked.classList.remove('hidden');

    const addSuccess=document.getElementById('booking');
    addSuccess.classList.add('hidden');


})
