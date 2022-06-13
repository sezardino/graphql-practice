interface Props {
  trigger: React.ReactNode;
  content: React.ReactNode;
  name: string;
  label: string;
}

export const Modal: React.FC<Props> = (props) => {
  const { content, name, trigger, label } = props;

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target={`#${name}`}
      >
        <div className="d-flex align-items-center">{trigger}</div>
      </button>

      <div
        className="modal fade"
        id={`${name}`}
        aria-labelledby={`${name}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                {label}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};
