import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks: { title: string, done: boolean, editing?: boolean }[] = [];
  newTask: string = '';
  filter: string = 'all';

  ngOnInit() {
    // Carica le note salvate dal localStorage quando l'applicazione viene avviata
    if (typeof localStorage !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    }
  }
  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push({ title: this.newTask.trim(), done: false });
      this.saveTasks();
      this.newTask = '';
    }
  }

  toggleTask(task: { title: string, done: boolean }) {
    task.done = !task.done;
    this.saveTasks();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  editTask(task: { title: string, done: boolean, editing?: boolean }) {
    task.editing = true;
  }

  saveTask(task: { title: string, done: boolean, editing?: boolean }, newTitle: string) {
    if (newTitle.trim() !== '') {
      task.title = newTitle.trim();
      this.saveTasks();
    }
    task.editing = false;
  }

  updateTaskStatus() {
    this.saveTasks();
  }

  saveTasks() {
    // Salva le note nel localStorage
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  filteredTasks() {
    if (this.filter === 'done') {
      return this.tasks.filter(task => task.done);
    } else if (this.filter === 'notDone') {
      return this.tasks.filter(task => !task.done);
    } else {
      return this.tasks;
    }
  }
}
