export default function SubmitButton({ text }) {
  return (
    <button
      disabled
      className="h-10 min-w-10 px-5 bg-[#2e69ff] text-white rounded-full disabled:opacity-50"
    >
      {text}
    </button>
  );
}
