import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo') ;
const btnBorrar     = document.querySelector('.clear-completed') ;
const ulFiltros     = document.querySelector('.filters') ;
const anchorFiltros = document.querySelectorAll('.filtro') ;

export const crearTodoHtml = (todo) => {
    const div = document.createElement('div');
    const htmlTodo = `
    <li class="${todo.completado ? 'completed': ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div;
}

txtInput.addEventListener('keyup', (evt)=>{
    if(evt.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo(txtInput.value);

        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (evt) => {
    const nombreElemento = evt.target.localName;
    const todoElElemento = evt.target.parentElement.parentElement;
    const id = todoElElemento.getAttribute('data-id');

    console.log(nombreElemento.includes('input'));

    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(id);
        todoElElemento.classList.toggle('completado');
    } else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(id);
        divTodoList.removeChild(todoElElemento);
    }
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for (let i = divTodoList.children.length -1; i >= 0; i--) {
        const element = divTodoList.children[i];
        
        if (element.classList.contains('completed')) {
            divTodoList.removeChild(element);
        }
    }
});

ulFiltros.addEventListener('click', (evt) =>{
    const filtro = evt.target.text;

    if(!filtro){ return; }

    anchorFiltros.forEach(elm => elm.classList.remove('selected'));

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
                
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
            default:
                break;
        }
    }
});
