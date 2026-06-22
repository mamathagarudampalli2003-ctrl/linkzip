import Modal from "../common/Modal";

export default function InviteMemberModal({
  open,
  onClose,
  memberEmail,
  setMemberEmail,
  handleAddMember,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="➕ Invite Team Member"
    >

      <div className="space-y-4">

        {/* INPUT */}
        <input
          type="email"
          placeholder="Enter member email"
          value={memberEmail}
          onChange={(e) =>
            setMemberEmail(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />

        {/* BUTTON */}
        <button
          onClick={() => {
            handleAddMember();
            onClose();
          }}
          className="w-full bg-blue-500 py-3 rounded-lg font-semibold"
        >
          Invite Member
        </button>

      </div>

    </Modal>
  );
}