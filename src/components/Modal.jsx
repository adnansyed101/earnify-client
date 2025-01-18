import PropTypes from "prop-types";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { format } from "date-fns";

const Modal = ({ isOpen, setIsOpen, submission }) => {
  console.log(submission);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-2xl space-y-4 border bg-white p-12">
          <DialogTitle className="text-3xl font-bold text-center mb-8">
            {submission.task.title}
          </DialogTitle>
          <Description>{submission.task.taskDetail}</Description>

          <p>
            <strong>Submission Detail:</strong> {submission.submissionDetail}
          </p>
          <p>
            <strong>Submission Date:</strong>{" "}
            {format(new Date(submission.currentDate), "PP")}
          </p>
          <div className="flex items-center mb-6">
            <div className="avatar mr-4">
              <div className="w-16 rounded-full">
                <img src={submission.worker.image} alt="Avatar" />
              </div>
            </div>
            <div>
              <p className="text-lg font-bold">{submission.worker.name}</p>
              <p className="text-gray-600">{submission.worker.email}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`badge ${
                submission.status === "approved"
                  ? "badge-success"
                  : submission.status === "pending"
                  ? "badge-warning"
                  : "badge-error"
              }`}
            >
              {submission.status}
            </span>
            <button className="btn btn-accent" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>

          <div className="flex gap-4"></div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  submission: PropTypes.object.isRequired,
};

export default Modal;
