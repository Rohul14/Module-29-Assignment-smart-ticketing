function busBtn() {
    scrollTicket('ticket-section')
}

function scrollTicket(elementId) {
    const ticket=document.getElementById(elementId);
    ticket.scrollIntoView({
        behavior:'smooth'
    })
}

const seats=document.getElementsByClassName('seat');
let seatsArray=[];

for(let i=0; i < seats.length; i++ ){
    seats[i].addEventListener('click',function(event){
        const clickSeats=event.target; 
        const index=seatsArray.indexOf(clickSeats.innerText);

        if (clickSeats.classList.contains('bg-green-500','text-white')) {

            clickSeats.classList.remove('bg-green-500','text-white');
            if (index > -1) {
                seatsArray.splice(index ,1);
                updateValues();
                inputAllValueTrim();
            }

        }else{
            if (seatsArray.length < 4) {
            clickSeats.classList.add('bg-green-500','text-white');
            seatsArray.push(clickSeats.innerText);
            updateValues();
            inputAllValueTrim();

            }
        }
    }) 
}

// count section ------------>

function updateValues() {
    const seat_left=document.getElementById('seat_left');
    seat_left.innerText=(40-seatsArray.length);
    // select seat --->
    const seatCount=document.getElementById('seat-count');
    seatCount.innerText=seatsArray.length;

    // Select seats in innerHtml----->
    const selectSeats=document.getElementById('select-seats');
    selectSeats.innerHTML=''
    for(const seat of seatsArray){
        const create_div=document.createElement('div')
        create_div.classList='flex justify-between gap-2'
        create_div.innerHTML=`<span class="text-sm font-semibold">${(seat)}</span>
                            <span class="text-sm font-semibold">Economoy</span>
                            <span class="text-sm font-semibold">550</span>`;
        
        selectSeats.appendChild(create_div) ;                                      
    }   
    
    // total price ---->
    const totalPrice=document.getElementById('total-price');
    totalPrice.innerText=(550*seatsArray.length);

    // apply btn ------------->
    const applyBtn=document.getElementById('apply-btn');
    if (seatsArray.length >= 3) {
            applyBtn.removeAttribute('disabled');
    }else{
            applyBtn.setAttribute('disabled',true)
    }

}
 
// apply btn coupon used -------->>>>
document.getElementById('apply-btn').addEventListener('click',function(){
    const inputText=document.getElementById('input-text').value;
    const grandPrice=document.getElementById('gd-price')
    if (inputText.toUpperCase()==='NEW15') {
        grandPrice.innerText=parseInt((550*seatsArray.length)-(550*seatsArray.length)*15/100)

    }else if (inputText.toUpperCase()==='COUPLE20') {
        grandPrice.innerText=parseInt((550*seatsArray.length)-(550*seatsArray.length)*20/100)
    }
})

// input section -------.>
const inputName=document.getElementById('name');
const inputNumber=document.getElementById('number');
const inputEmail=document.getElementById('email');
const nextBtn=document.getElementById('next-btn');

function inputAllValueTrim() {
    const name =inputName.value.trim()
    const email =inputEmail.value.trim()
    const number =inputNumber.value.trim()

    if (name && email && number && seatsArray.length > 0) {
        nextBtn.removeAttribute('disabled')
    }else{
        nextBtn.setAttribute('disabled',true)
    }
}
inputName.addEventListener('input',inputAllValueTrim)
inputNumber.addEventListener('input',inputAllValueTrim)
inputEmail.addEventListener('input',inputAllValueTrim)


// goto next success page ------->
nextBtn.addEventListener('click',function(){
    const busSection=document.querySelectorAll('.bus');
    for(const bus of busSection){
        bus.classList.add('hidden');
    }

    const successSection=document.getElementById('success');
    successSection.classList.remove('hidden');

    for(const seat of seats){
        seat.classList.remove('bg-green-500','text-white')
    }
    seatsArray=[];
    updateValues()
    inputName.value=''
    inputNumber.value=''
    inputEmail.value=''
    nextBtn.setAttribute('disabled',true)
})

// comeback  bus page------>
const continue_btn=document.getElementById('continue-btn');

continue_btn.addEventListener('click',function(){
    const successSection=document.getElementById('success');
    successSection.classList.add('hidden')

    const busSection=document.querySelectorAll('.bus');
    for(const bus of busSection){
        bus.classList.remove('hidden')
    }
})