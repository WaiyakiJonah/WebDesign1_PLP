document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const dueDateTime = document.getElementById('dueDateTime');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    addBtn.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        const dueTime = dueDateTime.value;
        if (taskText !== '') {
            const li = createTaskElement(taskText, dueTime);
            taskList.appendChild(li);
            taskInput.value = '';
            dueDateTime.value = '';
            setReminder(dueTime, taskText);
        }
    }

    function createTaskElement(taskText, dueTime) {
        const li = document.createElement('li');
        li.textContent = taskText;
        li.setAttribute('data-due-time', dueTime);
        return li;
    }

    function setReminder(dueTime, taskText) {
        const dueDate = new Date(dueTime).getTime();
        const now = new Date().getTime();
        const timeDiff = dueDate - now;
        
        if (timeDiff > 0) {
            setTimeout(function() {
                showReminder(taskText);
            }, timeDiff);
        }
    }

    function showReminder(taskText) {
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification(`Reminder: ${taskText}`);
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(function(permission) {
                    if (permission === 'granted') {
                        new Notification(`Reminder: ${taskText}`);
                    }
                });
            }
        } else {
            // Fallback for browsers that do not support notifications
            alert(`Reminder: ${taskText}`);
        }
    }

    taskList.addEventListener('click', function(e) {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('completed');
        }
    });

    taskList.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        if (e.target.tagName === 'LI') {
            e.target.remove();
        }
    });
});
