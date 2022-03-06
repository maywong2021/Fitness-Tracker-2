const ActivityRoutines = ({ routines }) => {
  return (
    <div>
      <header className="activity-name">Activity's Routines</header>
      <ul className="list-group">
        {routines?.length
          ? routines.map((routine) => (
              <li
                className="list-group-item routine-list-item"
                key={routine.id}
              >
                {routine.name}
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default ActivityRoutines;
