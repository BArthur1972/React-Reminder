import React, { useState } from "react";
import "./App.css";
import Reminder from './components/Reminder';
import Header from './components/Header';

function App() {
  // this is the object to define the properties of a reminder
  const initialReminder = { title: "", completed: false, id: 0 }

  // state variables for a reminder
  const [reminder, setReminder] = useState(initialReminder)

  // state variable that stores the list of reminders
  const [reminders, setReminders] = useState([])

  // state variable used to toggle between displaying the oustanding or completed reminders on the page
  const [showCompletedReminders, setShowCompletedReminders] = useState(false)

  // Helper Functions

  /* Set's a new reminder object to the reminder state variable: */
  function setNewReminder(e) {
    const newReminder = {title: e.target.value, completed: false, id: Math.floor(Math.random() * 1000)};
    setReminder(newReminder);

  }

  /* Adds a reminder to the reminders array */
  function addReminder() {
    setReminders(prevReminders => [...prevReminders, reminder]);
  }

  /* Mark's the reminder with the "id" argument as completed. */
  function completeReminder(id) {
    const newReminders = [];
    reminders.forEach((reminder) => {
      if (reminder.id === id) {
        reminder.completed = true;
      }
      newReminders.push(reminder);
    });

    setReminders(newReminders);
  }

  /* Retrieves the reminders to be displayed
   based on showCompletedReminders value. */
  function displayedReminders() {
    let retrievedReminders = [];
    if (showCompletedReminders === false) {
      reminders.forEach((reminder) => {
        if (reminder.completed === false) {
          retrievedReminders.push(reminder);
        }
      });
    } else {
      reminders.forEach((reminder) => {
        if (reminder.completed === true) {
          retrievedReminders.push(reminder);
        }
      });
  }
    return retrievedReminders;
  }


  /* Deletes the reminder with the passed "id" */
  function deleteReminder(id) {
    setReminders((reminder) => reminders.filter(reminder => {
      return reminder.id !== id;
    }))
  }


  // Main part of app
  return (
    <div className="app">
      <Header />

      <input
        type="text"
        placeholder="Add a new reminder.."
        value={reminder.title}
        onChange={(e) => setNewReminder(e)}
      />

      <button onClick={() => addReminder()}>Add Reminder</button>

      <div>
        <p>Showing : {showCompletedReminders ? 'Completed' : 'Outstanding'} reminders</p>
        <p>Click to <button onClick={() => setShowCompletedReminders((showCompleted) => !showCompleted)}> Show {showCompletedReminders ? "outstanding" : "completed"} reminders</button></p>
      </div>

      {displayedReminders().map((reminder, index) => (
        <div key={index}>
          {/* Adds the Reminder component */}
          <Reminder reminderObject={reminder} showCompletedRemindersValue={showCompletedReminders} />

          {/* Adds a conditional complete button element that a user can use to indicate a reminder is completed. */}
           <>{(showCompletedReminders === false) ? <button className="my-button" onClick={() => completeReminder(reminder.id)}>Complete  ✅</button> : null}</>

          {/* Adds a delete button element to delete a reminder */}
          <button className="my-button" onClick={() => deleteReminder(reminder.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default App;
