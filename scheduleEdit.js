// Selectors
var xhttp = new XMLHttpRequest();
const eventNameInput = document.querySelector('.eventNameInput');
const eventTypeInput = document.querySelector('.eventTypeInput');
const eventSlugInput = document.querySelector('.eventSlugInput');
const eventStartInput = document.querySelector('.eventStartInput');
const eventEndInput = document.querySelector('.eventEndInput');
const eventSubmit = document.querySelector(".eventSubmit");
const eventList = document.querySelector('.eventList');
// Event Listeners
eventSubmit.addEventListener("click",addEvent);
eventList.addEventListener("click", deleteCheck);
document.addEventListener('DOMContentLoaded', getEvents);
// Functions
function addEvent(event) {
    //Prevent form from submitting
    event.preventDefault();
    console.log("adding event");
    let newEventInputs = new Map();
    //Event Div
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event");
    //Create the Event Name LI
    const newEventName = document.createElement('li');
    newEventName.innerText = eventNameInput.value;
    newEventName.classList.add('eventItem');
    eventDiv.append(newEventName);
    newEventInputs.set("Name", eventNameInput.value);
    //Create the Event Type  LI
    const newEventType = document.createElement('li');
    newEventType.innerText = eventTypeInput.value;
    newEventType.classList.add('eventItem');
    eventDiv.append(newEventType);
    newEventInputs.set("Type", eventTypeInput.value);
    //Create the Event Slug  LI
    const newEventSlug = document.createElement('li');
    newEventSlug.innerText = eventSlugInput.value;
    newEventSlug.classList.add('eventItem');
    eventDiv.append(newEventSlug);
    newEventInputs.set("Slug", eventSlugInput.value);
    //Create the Event Start and End  LI
    const newEventTime = document.createElement('li');
    newEventTime.innerText = eventStartInput.value + " to " + eventEndInput.value;
    newEventTime.classList.add('eventItem');
    eventDiv.append(newEventTime);
    newEventInputs.set("Start", eventStartInput.value);
    newEventInputs.set("End", eventEndInput.value);
    //Create the Checkmark
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML =  "<i class = 'fas fa-trash'</i>";
    deleteButton.classList.add("deleteBtn");
    eventDiv.append(deleteButton);
    //Add to the Event List
    eventList.append(eventDiv);
    //Add Event to Local Storage
    saveLocalEvents(newEventInputs);
    //Clear the Inputs
    eventNameInput.value = "";
    eventTypeInput.value = "";
    eventSlugInput.value = "";
    eventStartInput.value = "";
    eventEndInput.value = "";
    console.log(newEventInputs);
    xhttp.open("POST", "dbWrite.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log("name="+newEventInputs.get("Name")+"&type="+newEventInputs.get("Type")+"&slug="+newEventInputs.get("Slug")+"&start="+newEventInputs.get("Start")+"&end="+newEventInputs.get("End")+"&act=INSERT");
    xhttp.send("name="+newEventInputs.get("Name")+"&type="+newEventInputs.get("Type")+"&slug="+newEventInputs.get("Slug")+"&start="+newEventInputs.get("Start")+"&end="+newEventInputs.get("End")+"&act=INSERT");
    console.log("adding local event");
}
function deleteCheck(event) {
    const item = event.target;
    //Delete the Event
    if(item.classList[0] === "deleteBtn"){
        const event = item.parentElement;
        //Falling Animation
        event.classList.add("fall");
        removeLocalEvent(event);
        //console.log(event);
        event.addEventListener('transitionend',() =>{
            event.remove();
        });
    }
}
function saveLocalEvents(newEvent){
    let events;
    if(localStorage.getItem('events') === null || localStorage.getItem('events') == ""){
        events = [];
    }
    else{
        events = JSON.parse(localStorage.getItem("events"));
    }
   // events = [];
    events.push(Array.from(newEvent));
    localStorage.setItem("events", JSON.stringify(events));
    console.log(newEvent);

    //localStorage.setItem("events", JSON.stringify([]));
}
function getEvents(){
    let events;
    if(localStorage.getItem('events') === null || localStorage.getItem('events') == ""){
        events = [];
    }
    else{
        events = JSON.parse(localStorage.getItem("events"));
        console.log(events);
        events.forEach(function (storedEvent){
        let eventMap = new Map(storedEvent);
        xhttp.open("POST", "dbWrite.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        console.log("name="+eventMap.get("Name")+"&type="+eventMap.get("Type")+"&slug="+eventMap.get("Slug")+"&start="+eventMap.get("Start")+"&end="+eventMap.get("End")+"&act=INSERT");
        xhttp.send("name="+eventMap.get("Name")+"&type="+eventMap.get("Type")+"&slug="+eventMap.get("Slug")+"&start="+eventMap.get("Start")+"&end="+eventMap.get("End")+"&act=INSERT");
             console.log("adding local event");
            //Event Div
            const eventDiv = document.createElement("div");
            eventDiv.classList.add("event");
            //Create the Event Name LI
            const newEventName = document.createElement('li');
            newEventName.innerText = eventMap.get("Name");
            newEventName.classList.add('eventItem');
            eventDiv.append(newEventName);
            //Create the Event Type  LI
            const newEventType = document.createElement('li');
            newEventType.innerText = eventMap.get("Type");
            newEventType.classList.add('eventItem');
            eventDiv.append(newEventType);
            //Create the Event Slug  LI
            const newEventSlug = document.createElement('li');
            newEventSlug.innerText = eventMap.get("Slug");
            newEventSlug.classList.add('eventItem');
            eventDiv.append(newEventSlug);
            //Create the Event Start and End  LI
            const newEventTime = document.createElement('li');
            newEventTime.innerText = eventMap.get("Start") + " to " +eventMap.get("End");
            newEventTime.classList.add('eventItem');
            eventDiv.append(newEventTime);
            //Create the Checkmark
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML =  "<i class = 'fas fa-trash'</i>";
            deleteButton.classList.add("deleteBtn");
            eventDiv.append(deleteButton);
            //Add to the Event List
            eventList.append(eventDiv);
          });
    }
}
function removeLocalEvent(toRemoveEvent){
    let events;
    if(localStorage.getItem('events') === null){
        events = [];
    }
    else{
        events = JSON.parse(localStorage.getItem("events"));
    }
    console.log(events);
    const childValues = toRemoveEvent.children;
    const name = childValues[0].innerText;
    const type = childValues[1].innerText;
    const slug = childValues[2].innerText;
    const split = (childValues[3].innerText).split(" ");
    const start = split[0];
    const end = split[2];
    const needle = JSON.stringify([["Name",name],["Type",type],["Slug",slug],["Start",start],["End",end]]);
    console.log("needle:");
    console.log(needle);
    for(let i = 0; i < events.length; i++){
        console.log("events:");
        console.log(JSON.stringify(events[i]));
        if(JSON.stringify(events[i]) === needle){
            console.log("found the needle");
            events.splice(i,1);
            localStorage.setItem("events",JSON.stringify(events));
            break;
        }
    }
    xhttp.open("POST", "dbWrite.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    console.log("name="+name+"&type="+type+"&slug="+slug+"&start="+start+"&end="+end+"&act=DELETE");
    xhttp.send("name="+name+"&type="+type+"&slug="+slug+"&start="+start+"&end="+end+"&act=DELETE");

}




