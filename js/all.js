Vue.component('show-list', {
    props: ['data'],
    template: '#showList',
    data: function () {
        return {
            todo: JSON.parse(localStorage.getItem('todoList')) || [],
            cacheText: '',
            cacheTodo: {}
        }
    },
    methods: {
        removeTodoInComponent(item) {
            this.$emit('remove-todo', item);
        },
        isCompletedInComponent(item) {
            this.$emit('is-completed', item);
        },
        editTodoInComponent(item) {
            const vm = this;
            vm.cacheTodo = item;
            vm.cacheText = item.text;
        },
        doneEditInComponent(item) {
            const vm = this;
            let index = vm.todo.findIndex(response => response.id == item.id);
            item.text = vm.cacheText;
            vm.todo[index].text = vm.cacheText;
            localStorage.setItem('todoList', JSON.stringify(vm.todo));
            vm.cacheTodo = {};
            vm.cacheText = '';
        },
        cancelEditInComponent() {
            const vm = this;
            vm.cacheTodo = {};
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todo: JSON.parse(localStorage.getItem('todoList')) || [],
        status: 'all',
    },
    computed: {
        unCompleted() {
            const vm = this;
            return vm.todo.filter(response => response.isCompleted == false).length;
        },
        filterTodoList() {
            const vm = this;
            if (vm.status == 'all') {
                return vm.todo;
            } else if (vm.status == 'completed') {
                return vm.todo.filter(response => response.isCompleted == true);
            } else if (vm.status == 'unCompleted') {
                return vm.todo.filter(response => response.isCompleted == false);
            }
        }
    },
    methods: {
        addTodo() {
            const vm = this;
            const value = vm.newTodo.trim();
            if (value == '') {return}
            const timestamp = Math.floor(Date.now());
            vm.todo.push({
                id: timestamp,
                text: value,
                isCompleted: false
            });
            vm.newTodo = '';
            this.saveTodo();
        },
        removeTodo(item) {
            const vm = this;
            let index = vm.todo.findIndex(response => response.id == item.id);
            vm.todo.splice(index, 1);
            this.saveTodo();
        },
        removeAllTodo() {
            const vm = this;
            let length = vm.todo.length;
            vm.todo.splice(0, length);
            this.saveTodo();
        },
        isCompleted(item) {
            const vm = this;
            let index = vm.todo.findIndex(response => response.id == item.id);
            vm.todo[index].isCompleted = !vm.todo[index].isCompleted;
            this.saveTodo();
        },
        saveTodo() {
            const vm = this;
            localStorage.setItem('todoList', JSON.stringify(vm.todo));
        }
    }
});