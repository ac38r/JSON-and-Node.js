# To-Do List Manager

## Objective
Build a basic command-line To-Do List Manager using Node.js. The app will store tasks in a JSON file and allow the user to perform basic CRUD (Create, Read, Update, Delete) operations on the tasks.

## Features

1. **Add a Task**:
   - The user can add a new task by providing a task description.
   - Each task should have:
     - An `id` (unique identifier, e.g., timestamp or incrementing number).
     - A `description`.
     - A `status` (default: "incomplete").
     - A `category` (default: "uncategorized").

2. **List All Tasks**:
   - Display all tasks in the JSON file.
   - Show the task's ID, description, status, and category.

3. **Update a Task**:
   - The user can mark a task as "complete" or "incomplete" (also accepts "done" or "not done").
   - The user can also edit the task's description.

4. **Delete a Task**:
   - The user can remove a task by specifying its `id`.

5. **Filter Tasks by Category**:
   - List tasks only from a specific category.

6. **Filter Tasks by Status**:
   - List tasks based on their status (`complete` or `incomplete`).

## Requirements
- Use Node.js and its built-in modules (no database, just a JSON file).
- Store tasks in a `tasks.json` file.
- Use command-line arguments to trigger operations.

## Setup

1. **Initialize the Project**:
   ```bash
   npm init -y
   ```

2. **Create Required Files**:
   - Create a `todo.js` file for the logic.
   - Create an empty `tasks.json` file to act as the database.

## Commands

1. **Add a Task**:
   ```bash
   node todo.js add "Task description" category:"category_name"
   ```
   - Adds a new task with the specified description and optional category. If no category is provided, it defaults to "uncategorized".

2. **List All Tasks**:
   ```bash
   node todo.js list
   ```
   - Lists all tasks with their ID, description, status, and category.

3. **Update a Task**:
   ```bash
   node todo.js update "task_id" "new_description_or_status"
   ```
   - Updates the description or status of the task with the specified ID.

4. **Delete a Task**:
   ```bash
   node todo.js delete "task_id"
   ```
   - Deletes the task with the specified ID.

5. **Filter Tasks by Category**:
   ```bash
   node todo.js filter "category_name"
   ```
   - Lists tasks that belong to the specified category.

6. **Filter Tasks by Status**:
   ```bash
   node todo.js filter-status "status"
   ```
   - Lists tasks that have the specified status (`complete` or `incomplete`).

## Sample JSON Structure
```json
[
  {
    "id": 1,
    "description": "Buy groceries",
    "status": "incomplete",
    "category": "personal"
  },
  {
    "id": 2,
    "description": "Prepare project report",
    "status": "complete",
    "category": "work"
  }
]
```

## Extensions (Optional)
- Add a "due date" field for tasks and allow filtering by due date.
- Add a `priority` field (e.g., high, medium, low) and allow sorting tasks by priority.
- Use an external module like `yargs` to improve command-line argument parsing.

This project introduces basic file I/O, JSON manipulation, and working with command-line arguments in Node.js—perfect for beginners.
