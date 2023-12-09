//showing all the previous save task when page refresh
showTask();
let mydisplay = document.getElementById("updatetaskbtn");
mydisplay.style.visibility = "hidden";

//getting the input and the add button
let addNewTask = document.getElementById("addNewTask");
let addtaskbtn = document.getElementById("addTaskbtn");
//adding an event listener on add button
addtaskbtn.addEventListener("click", function () {
    //condition for not empty input  
    addTaskInputValue = addNewTask.value;
    if (addTaskInputValue != 0) {
        //storing the input into the local storage with key of localtask
        let webtask = localStorage.getItem("localtask");
        //if nodata in localstorage create the obj
        if (webtask == null) {
            taskObj = [];
        }
        else {
            //if already data present then parse it 
            taskObj = JSON.parse(webtask);
        }
        //pushing the new input into the obj
        taskObj.push({ mykey: `${addTaskInputValue}` });
        //again storing it to local storage
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        //displaying the task 
        showTask();
        addNewTask.value = '';
    }

})
// task display function
function showTask() {
    let mydisplay = document.getElementById("updatetaskbtn");
    mydisplay.style.visibility = "hidden";

    //getting item from localstorage if empty then create an obj
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
        taskObj = [];
    }
    else {
        //if data present then show it
        taskObj = JSON.parse(webtask);
    }
    // now adding the html data to the tasklist div in html
    let html = '';
    let taskList = document.getElementById("taskList");
    taskObj.forEach((item, index) => {
        //adding the html element to the js and then adding via innerHtml to our tasklist div
        html += `<tr>
            <th >${index + 1}</th>
           <td> ${item['mykey']}</td>
            <td><button type="button" class="btn btn-primary" id="editbtn" onclick="edittask(${index})">Edit</button></td>
            <td><button type="button" class="btn btn-danger" onclick="deleteitem(${index})">Delete</button></td>
            <td><input type="checkbox" id="checkbox" name="" value="">
            <label for="chekbox"> Completed</label></td>
        </tr>`

    });
    //adding the value to the tasklist as table
    taskList.innerHTML = html;

}
//editing part of the todo list

function edittask(index) {
    let mydisplay = document.getElementById("updatetaskbtn");
    mydisplay.style.visibility = "visible";
    //getting data ad parse it
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    // now ressaigning the value to edit value to input box when click on edit via index
    addNewTask.value = taskObj[index]['mykey'];
    // update button
    let updatetaskbtn = document.getElementById('updatetaskbtn');
    //addding the event listener to update button
    updatetaskbtn.addEventListener("click", function () {
        //getting data from local storage
        let webtask = localStorage.getItem("localtask");
        let taskObj = JSON.parse(webtask);
        // editing at the value of selected index
        taskObj[index]['mykey'] = addNewTask.value;
        //again storing and showing the list
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        showTask();
        addNewTask.value = '';
    })
}
// deleting the value using the index

function deleteitem(index) {
    //getting the data stored in the localstorage
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    //slicing the object from selected index to only 1 no. of item
    taskObj.splice(index, 1);
    //again geeting the data from local storage and displaying the list
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showTask();
    addNewTask.value = '';
}
