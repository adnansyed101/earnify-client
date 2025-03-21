import PropTypes from "prop-types";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { format } from "date-fns";

const NotificationModal = ({ isOpen, setIsOpen, notifications }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-2xl space-y-4 border p-12 bg-base-100">
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
                <tr key={notification._id}>
                  <td>{format(new Date(notification.time), "PP")}</td>
                  <td>{notification.message}</td>
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
  notifications: PropTypes.array.isRequired,
};

export default NotificationModal;
