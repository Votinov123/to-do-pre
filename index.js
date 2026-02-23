let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

const loadTasks = () => {
	let tasks = localStorage.getItem('tasks');
	if(!tasks){
		return items;
	}
	tasks = JSON.parse(tasks);
	if(tasks.length > 0){
		return tasks;
	}
	return items;
}

const saveTasksDOM = () => {
	const items = getTasksFromDOM();
	saveTasks(items);
}

const createItem = (item) => {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  
  textElement.textContent = item;

  deleteButton.addEventListener("click", (event) => {
	clone.remove();
	saveTasksDOM();
  });

  duplicateButton.addEventListener("click", (event) => {
	const itemName = textElement.textContent;
	const newItem = createItem(itemName);
	listElement.prepend(newItem);
	saveTasksDOM();
  });

  editButton.addEventListener("click", (event) => {
	textElement.setAttribute("contenteditable", "true");
	textElement.focus();
  });
  
  textElement.addEventListener("blur", (event) => {
	textElement.setAttribute("contenteditable", "false");
	saveTasksDOM();
  });

  return clone;

}

const getTasksFromDOM = () => {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];
	itemsNamesElements.forEach((itemNameElement) => {
		const taskText = itemNameElement.textContent;
		tasks.push(taskText);
	});
	return tasks;
}

const saveTasks = (tasks) => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

formElement.addEventListener("submit", (event) => {
	event.preventDefault();
	const taskText = inputElement.value;
	if (taskText){
		const newTask = createItem(taskText);
		listElement.prepend(newTask);
	}
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = '';
});

items = loadTasks();

items.forEach((item)=>{
	listElement.append(createItem(item));
});
