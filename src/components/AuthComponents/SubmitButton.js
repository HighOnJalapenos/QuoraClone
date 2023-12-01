export default function SubmitButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="h-10 min-w-10 px-5 bg-[#2e69ff] text-white rounded-full disabled:opacity-50"
      type="submit"
    >
      {text}
    </button>
  );
}
