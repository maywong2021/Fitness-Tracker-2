const ActivityRoutines = ({ routines }) => {
  return (
    <div>
      <header className="activity-name">Activity's Routines</header>
      <ul className="list-group">
        {routines?.length
          ? routines.map((routine) => (
              <li className="list-group-item routine-list-item">
                {routine.name}
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
};

export default ActivityRoutines;
