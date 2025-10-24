class WorkHiveToDoList:
    def __init__(self):
        self.tasks = []

    def display_tasks(self):
        """Display all tasks with their completion status."""
        if len(self.tasks) == 0:
            print("No tasks available!")
        else:
            print("\nTo-Do List:")
            for index, task in enumerate(self.tasks, 1):
                status = "(Completed)" if task['completed'] else ""
                print(f"{index}. {task['task']} {status}")

    def add_task(self, task_name):
        """Add a new task to the to-do list."""
        self.tasks.append({"task": task_name, "completed": False})
        print(f"Task '{task_name}' added successfully!")

    def delete_task(self, task_index):
        """Delete a task from the list based on index."""
        if 0 < task_index <= len(self.tasks):
            removed_task = self.tasks.pop(task_index - 1)
            print(f"Task '{removed_task['task']}' removed successfully!")
        else:
            print("Invalid task number!")

    def mark_task_completed(self, task_index):
        """Mark a specific task as completed."""
        if 0 < task_index <= len(self.tasks):
            self.tasks[task_index - 1]['completed'] = True
            print(f"Task '{self.tasks[task_index - 1]['task']}' marked as completed!")
        else:
            print("Invalid task number!")


def main():
    todo_list = WorkHiveToDoList()

    while True:
        print("\n--- Work Hive To-Do List Application ---")
        print("1. View Tasks")
        print("2. Add Task")
        print("3. Mark Task as Completed")
        print("4. Delete Task")
        print("5. Exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            todo_list.display_tasks()

        elif choice == '2':
            task_name = input("Enter the task: ")
            todo_list.add_task(task_name)

        elif choice == '3':
            todo_list.display_tasks()
            try:
                task_index = int(input("Enter task number to mark as completed: "))
                todo_list.mark_task_completed(task_index)
            except ValueError:
                print("Please enter a valid number!")

        elif choice == '4':
            todo_list.display_tasks()
            try:
                task_index = int(input("Enter task number to delete: "))
                todo_list.delete_task(task_index)
            except ValueError:
                print("Please enter a valid number!")

        elif choice == '5':
            print("Exiting the application. Goodbye!")
            break

        else:
            print("Invalid choice, please try again.")


if __name__ == "__main__":
    main()
