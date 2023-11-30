export default function Input({ label, type, placeholder }) {
  return (
    <>
      <label className="block text-sm font-bold mb-1">{label}</label>
      <input
        className="w-full min-h-[45px] border rounded p-2 outline-none hover:border-[#2e69ff] focus-within:border-[#2e69ff] cursor-pointer focus-visible:ring-1 text-sm"
        type={type}
        placeholder={placeholder}
      />
    </>
  );
}
