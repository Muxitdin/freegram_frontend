export default function Searchbar() {
    return (
        <input
            type="text"
            name="search"
            id="search"
            placeholder="type to search..."
            className="w-full px-4 py-1.5 rounded-3xl border-2 outline-none bg-gray-50 focus:bg-white shadow-lg" />
    )
}