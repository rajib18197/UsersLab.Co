export default function SearchUsers({ searchTerm, onSearchTermChange }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search Users by Name"
        // value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="w-28 rounded-full bg-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-600 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}
