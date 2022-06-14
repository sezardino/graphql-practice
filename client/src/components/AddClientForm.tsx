import { useState } from "react";
import { ClientInput } from "../types";

interface Props {
  submitHandler: (data: ClientInput) => void;
}

export const AddClientForm: React.FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const submitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!name || !email || !phone) {
      return;
    }

    try {
      props.submitHandler({ name, email, phone });
      setEmail("");
      setName("");
      setPhone("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3 row">
        <label className="form-label col">
          Name
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
        </label>
      </div>
      <div className="mb-3 row">
        <label className="form-label col">
          Email
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </label>
      </div>
      <div className="mb-3 row">
        <label className="form-label col">
          Phone
          <input
            type="text"
            className="form-control"
            name="phone"
            value={phone}
            onChange={(evt) => setPhone(evt.target.value)}
          />
        </label>
      </div>

      <button
        type="submit"
        data-bs-dismiss="modal"
        className="btn btn-secondary"
      >
        Submit
      </button>
    </form>
  );
};
