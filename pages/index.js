import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoPopup = new PopupWithForm({popupSelector: '#add-todo-popup', handleFormSubmit: (inputValues) => {
const name = inputValues.name;
  const dateInput = inputValues.date;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4(); // Generate a unique ID for the new todo

  const values = { name, date, id };
  const todo = generateTodo(values);
  todosList.append(todo);
  addTodoPopup.close();
}});

const todosList = document.querySelector(".todos__list");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
}



const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    todosList.append(todoElement);
  },
  containerSelector:".todos__list" 
});
  section.renderItems();


const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");

addTodoPopup.setEventListeners();


const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};


addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});




const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();