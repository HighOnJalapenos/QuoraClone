export default function Input({
  label,
  type,
  placeholder,
  name,
  onChange,
  value,
  isError,
}) {
  return (
    <>
      <label className="block text-sm font-bold mb-1">{label}</label>
      <input
        required
        onChange={onChange}
        className={`w-full min-h-[45px] border rounded p-2 outline-none ${
          isError
            ? "hover:border-red-500 border-red-500 focus-visible:ring-red-200 focus-visible:ring-1"
            : "hover:border-[#2e69ff] focus-within:border-[#2e69ff] focus-visible:ring-1"
        } cursor-pointer text-sm`}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
      />
    </>
  );
}
