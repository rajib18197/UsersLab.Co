export default function SearchUsers({ searchTerm, onSearchTermChange }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search Users by Name"
        value={searchTerm}
        onChange={onSearchTermChange}
        className="w-28 rounded-full bg-pink-300 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-pink-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}
