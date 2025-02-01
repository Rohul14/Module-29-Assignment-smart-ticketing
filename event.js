function busBtn() {
  ScrollElementById('ticket-section');
}


function ScrollElementById(elementId) {
    const element=document.getElementById(elementId);
    element.scrollIntoView({
        behavior: 'smooth'
    })
}

// function getBackgroundColorAdd(element) {
//     element.classList.add('bg-lime-500')
// }


const seats = document.getElementsByClassName('seat');
    let seatArr = [];
    let totalSeat=40;
    
        for (let i = 0; i < seats.length; i++) {
            seats[i].addEventListener('click', function(event){
                const clickedSeat = event.target;
                const index=seatArr.indexOf(clickedSeat.innerText);
                    if (clickedSeat.classList.contains('bg-green-400','text-white')) {
                      clickedSeat.classList.remove('bg-green-400','text-white')
                      // querySelector
                      if (index > -1) {
                        seatArr.splice(index,1);
                        updateValues()
                        validateInputs()
                      }
                    } else {
                        if (seatArr.length < 4) {
                            clickedSeat.classList.add('bg-green-400',"text-white");
                            seatArr.push(clickedSeat.innerText);
                            updateValues()
                            validateInputs()
                          } else {
                            alert('You can select only 4 seats');
                          }
                    }
            })

}

const discount=document.getElementById('apply-btn')
discount.addEventListener('click',function(){
  const inputText=document.getElementById('input-text').value;
  if (inputText.toUpperCase()==='NEW15' && seatArr.length===3) {
  document.getElementById('gd-price').innerText=parseInt((seatArr.length*550)- ((seatArr.length*550)*15/100))
  }else if (inputText.toUpperCase()==='COUPLE20' && seatArr.length===4) {
    document.getElementById('gd-price').innerText=parseInt((seatArr.length*550)- ((seatArr.length*550)*20/100))
    }
  else{
    document.getElementById('gd-price').innerText='0'
  }
})

const nameIn=document.getElementById('name')
const numberIn=document.getElementById('number')
const emailIn=document.getElementById('email')
const nextBtn=document.getElementById('next-btn')

function validateInputs() {
  const name=nameIn.value.trim();
  const number=numberIn.value.trim();
  const email=emailIn.value.trim();
  if (name && number && email && seatArr.length >0) {
    nextBtn.removeAttribute('disabled')
  }else{
    nextBtn.setAttribute('disabled',true)
  }
}

nextBtn.addEventListener('click',function(){
  const ticketSection=document.getElementById('total-html');
  ticketSection.classList.add('hidden');

  const bookingSuccess=document.getElementById('booking');
  bookingSuccess.classList.remove('hidden')
  
  nameIn.value=''
  numberIn.value=''
  emailIn.value=''
  seatArr=[]
  updateValues()
  for(const seat of seats){
    seat.classList.remove('bg-green-400')
  }

})

document.getElementById('continue').addEventListener('click',function(){
  const ticketSection=document.getElementById('total-html');
  ticketSection.classList.remove('hidden');

  const bookingSuccess=document.getElementById('booking');
  console.log(bookingSuccess.classList.add('hidden'));
  
})

nameIn.addEventListener('input',validateInputs)
numberIn.addEventListener('input',validateInputs)
emailIn.addEventListener('input',validateInputs)

function updateValues() {
    const currentSeat=document.getElementById('seat_left');
    currentSeat.innerText=totalSeat-seatArr.length;
    const statCount=document.getElementById('seat-count');
    statCount.innerText=0+seatArr.length;   
    if (seatArr.length>=3) {
      document.getElementById('apply-btn').removeAttribute('disabled');
    }else{
      document.getElementById('apply-btn').setAttribute('disabled',true);
    }

   
    
    const selectSeats=document.getElementById('select-seats');
    selectSeats.innerHTML='';
    for(const seat of seatArr){
      const createDiv=document.createElement('div');
      createDiv.className='flex flex-row justify-between py-2'
      createDiv.innerHTML=`<span class="text-sm font-semibold">${(seat.toUpperCase())}</span>
       <span class="text-sm font-semibold">Economy</span>
       <span class="text-sm font-semibold">550</span>`;
       selectSeats.appendChild(createDiv)  ;                   
    }
        const totalPrice= document.getElementById('total-price');
        totalPrice.innerText=(550*seatArr.length)              
}


