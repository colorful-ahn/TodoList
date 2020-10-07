import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
    children : JSX.Element | Array<JSX.Element>;

}
//*createContext로 Context를 생성한다
const TodoListContext = createContext<ITodoListContext>({
    todoList : [],
    addTodoList : (todo : string) : void => {},
    removeTodoList : (index : number): void => {},
});
//useState로 생성한 State 데이터를 Context 안에 저장한다. (수정가능)
const TodoListContextProvider = ({children} : Props) => {
    const [todoList, setTodoList] = useState<Array<string>>([]);

    const addTodoList = (todo : string): void =>{
        const list = [...todoList, todo];
        setTodoList(list);
        AsyncStorage.setItem('todoList',JSON.stringify(list));
    };
    
    const removeTodoList = (index : number) : void =>{
        let list = [...todoList];
        list.splice(index, 1);
        setTodoList(list);
        AsyncStorage.setItem('todoList',JSON.stringify(list));
    };

    const initData = async () => {
        try {
            const list = await AsyncStorage.getItem('todoList');
            if (list !== null) {
                setTodoList(JSON.parse(list));
            }
        }catch(e){
            console.log(e);
        }
    };
    //라이프 사이클 함수와 비슷한 역할을 하는 useEffect를 가지고 스토리지에 저장된 데이터를 가져와 설정한다. 
    useEffect(()=>{
        initData();

    },[]);

    return (
        <TodoListContext.Provider
            value={{
                todoList,
                addTodoList,
                removeTodoList,
            }}>
                {children}
            </TodoListContext.Provider>
    );
};

export { TodoListContextProvider, TodoListContext};