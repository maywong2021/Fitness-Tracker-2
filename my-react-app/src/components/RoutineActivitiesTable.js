const RoutineActivitiesTable = ({
  rows,
  isOwner,
  removeActivityFromRoutine,
  editRoutineActivity,
  navigateToRoutinesByActivity,
}) => {
  return (
    <>
      {rows && rows.length ? (
        <table className="table">
          <thead>
            <tr className="custom-row">
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Count</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, pos) => (
              <tr className="custom-row" key={`${row.id}_${pos}`}>
                <td
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToRoutinesByActivity(row);
                  }}
                >
                  <div className="btn btn-link app-btn p-0 text-primary">
                    {row.name}
                  </div>
                </td>
                <td>{row.description}</td>
                <td>{row.duration}</td>
                <td>{row.count}</td>
                <td>
                  {isOwner ? (
                    <div className="d-flex align-items-center">
                      <div
                        className="btn btn-link app-btn p-0 text-dark"
                        onClick={(e) => {
                          e.preventDefault();
                          editRoutineActivity(row);
                        }}
                      >
                        Edit
                      </div>
                      <div
                        className="btn btn-link app-btn p-0 text-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          removeActivityFromRoutine(row);
                        }}
                      >
                        Remove
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p
          className="text-secondary text-sm fst-italic"
          style={{ fontSize: "12px" }}
        >
          There is no activities
        </p>
      )}
    </>
  );
};

export default RoutineActivitiesTable;
