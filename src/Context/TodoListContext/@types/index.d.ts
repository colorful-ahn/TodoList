/**
 * 이렇게 파일을 만들고 타입을 정의하면 프로젝트 전반에 걸쳐서 사용할 수 있다.
 */


interface ITodoListContext {
    todoList : Array<string> ;
    addTodoList : (todo: string) => void;
    removeTodoList : (index: number) =>void;
}