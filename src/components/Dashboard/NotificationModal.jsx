import PropTypes from "prop-types";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { format } from "date-fns";

const notifications = [
  {
    id: 1,
    date: "2025-01-13",
    text: "Your submission for Task A has been approved!",
  },
  {
    id: 2,
    date: "2025-01-12",
    text: "New task posted: Design a logo for XYZ Company.",
  },
  {
    id: 3,
    date: "2025-01-11",
    text: "Your withdrawal request of $50 has been processed.",
  },
  {
    id: 4,
    date: "2025-01-10",
    text: "Update: Task B's deadline has been extended.",
  },
  {
    id: 5,
    date: "2025-01-09",
    text: "A new update is available on the platform.",
  },
];

const NotificationModal = ({ isOpen, setIsOpen }) => {
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
            Notification
          </DialogTitle>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Notification</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr key={notification.id}>
                  <td>{format(new Date(notification.date), "PP")}</td>
                  <td>{notification.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

NotificationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default NotificationModal;
