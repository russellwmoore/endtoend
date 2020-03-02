import React from 'react';

const Tasks = props => {
  return (
    <ul className="tasks">
      {props.tasks.map(t => {
        return (
          <li key={t.id}>
            <h3>{t.name}</h3>
            <p>{t.description}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Tasks;
