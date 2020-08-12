import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from "../add-item";

import './app.css';

export default class App extends Component {

    maxId = 100;

    createItem = (text) => {
        return {
            label: text,
            important: false,
            done: false,
            id: this.maxId++
        }
    };

    state = {
        todoData: [
            this.createItem('Learn React'),
            this.createItem('Learn Redux'),
            this.createItem('Drink coffee')
        ],
        term: '',
        filter: 'all'
    };

    deleteItem = (id) => {
        console.log(id);
        this.setState(({todoData}) => {
            const idx = todoData.findIndex(el => el.id === id);
            const newArr = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];
            return {
                todoData: newArr
            };
        })
    };

    addItem = (text) => {
        const newItem = this.createItem(text);

        this.setState(({todoData}) => {
            const newArr = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArr
            };
        })
    };

    toggleProp = (arr, id, propName) => {
        const idx = arr.findIndex(el => el.id === id);
        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        };
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    onImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProp(todoData, id, 'important')
            }
        })
    };

    onDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProp(todoData, id, 'done')
            }
        })
    };

    onSearchShange = (term) => {
        this.setState({term})
    };

    search = (items, text) => {
        if (text.length === 0) {
            return items
        }
        return items.filter(i => {
            return i.label.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });
    };

    myFilter(items, filter) {
        switch (filter) {
            case 'all' :
                return items;
            case 'active':
                return items.filter(i => !i.done);
            case 'done':
                return items.filter(i => i.done);
            default:
                return items;
        }
    }

    onFilterChange = (filter) => {
        this.setState({filter})
    };

    render() {
        const {todoData, term, filter} = this.state;
        const visible = this.myFilter(this.search(todoData, term), filter);
        const doneCount = todoData.filter(i => i.done === true).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchShange={this.onSearchShange}/>
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}/>
                </div>

                <TodoList
                    todos={visible}
                    onDeleted={this.deleteItem}
                    onDone={this.onDone}
                    onImportant={this.onImportant}

                />
                <AddItem
                    onAdd={this.addItem}
                />

            </div>
        );
    }
};
