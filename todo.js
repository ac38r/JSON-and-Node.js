const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];
const description = args.slice(1).join(' ');

const tasksFile = path.join(__dirname, 'tasks.json');

// Helper function to read tasks from JSON file
const readTasks = () => {
  if (!fs.existsSync(tasksFile)) return [];
  const data = fs.readFileSync(tasksFile, 'utf-8');
  return data ? JSON.parse(data) : [];
};

// Helper function to write tasks to JSON file
const writeTasks = (tasks) => {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
};

// Main function to handle different commands
const main = () => {
  let tasks = readTasks();

  switch (command) {
    case 'add':
      if (!description) {
        console.log('Please provide a task description.');
        return;
      }
      const category = args[args.length - 1].startsWith('category:') ? args.pop().split(':')[1] : 'uncategorized';
      const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        description: args.join(' '),
        status: 'incomplete',
        category
      };
      tasks.push(newTask);
      writeTasks(tasks);
      console.log('Task added:', newTask);
      break;

    case 'list':
      if (!tasks.length) {
        console.log('No tasks found.');
        return;
      }
      tasks.forEach(task => {
        console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status} | Category: ${task.category}`);
      });
      break;

    case 'update':
      const idToUpdate = parseInt(args[1]);
      const statusOrDescription = args.slice(2).join(' ');
      const taskToUpdate = tasks.find(task => task.id === idToUpdate);
      if (!taskToUpdate) {
        console.log('Task not found.');
        return;
      }
      if (['complete', 'incomplete', 'done', 'not done'].includes(statusOrDescription)) {
        taskToUpdate.status = statusOrDescription === 'done' ? 'complete' : statusOrDescription === 'not done' ? 'incomplete' : statusOrDescription;
      } else {
        taskToUpdate.description = statusOrDescription;
      }
      writeTasks(tasks);
      console.log('Task updated:', taskToUpdate);
      break;

    case 'delete':
      const idToDelete = parseInt(args[1]);
      const remainingTasks = tasks.filter(task => task.id !== idToDelete);
      if (tasks.length === remainingTasks.length) {
        console.log('Task not found.');
        return;
      }
      writeTasks(remainingTasks);
      console.log('Task deleted.');
      break;

    case 'filter':
      const categoryToFilter = args[1];
      const filteredTasks = tasks.filter(task => task.category === categoryToFilter);
      if (!filteredTasks.length) {
        console.log('No tasks found in this category.');
        return;
      }
      filteredTasks.forEach(task => {
        console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status} | Category: ${task.category}`);
      });
      break;

    case 'filter-status':
      const statusToFilter = args[1];
      const statusFilteredTasks = tasks.filter(task => task.status === statusToFilter);
      if (!statusFilteredTasks.length) {
        console.log('No tasks found with this status.');
        return;
      }
      statusFilteredTasks.forEach(task => {
        console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status} | Category: ${task.category}`);
      });
      break;

    default:
      console.log('Unknown command:', command);
  }
};

main();
