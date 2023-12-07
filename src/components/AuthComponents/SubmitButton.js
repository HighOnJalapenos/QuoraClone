export default function SubmitButton({ text, onClick, buttonDisabled }) {
  return (
    <button
      disabled={buttonDisabled}
      onClick={onClick}
      className="h-10 min-w-10 px-5 bg-[#2e69ff] text-white rounded-full disabled:opacity-50 disabled:bg-blue-900 disabled:cursor-wait"
      type="submit"
    >
      {text}
    </button>
  );
}
