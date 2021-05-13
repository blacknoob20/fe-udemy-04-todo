// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');

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