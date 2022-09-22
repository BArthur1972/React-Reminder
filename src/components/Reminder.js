import React, {} from "react";

function Reminder(props) {

    // Returns header in span or strikethrough based on the value of showCompletedReminders
    return (
    (props.showCompletedRemindersValue === false) ? <span>{props.reminderObject.title}</span> : <s>{props.reminderObject.title}</s>
    );
}

export default Reminder;
