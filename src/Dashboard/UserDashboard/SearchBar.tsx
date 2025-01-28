// components/SearchBar.tsx
interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
      <div className="px-6 py-4">
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          placeholder="Search members by name"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };
  