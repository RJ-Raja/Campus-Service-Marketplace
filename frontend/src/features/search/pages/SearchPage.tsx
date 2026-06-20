import React, { useEffect, useState } from 'react';
import searchAPI from '../api/searchAPI';
import ServiceCard from '../components/ServiceCard';
import SearchBar from '../components/SearchBar';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [services, setServices] = useState<any[]>([]);

  const doSearch = async () => {
    const res = await searchAPI.searchServices({ query, category });
    setServices(res.data.data || []);
  };

  useEffect(() => { doSearch(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Discover Services</h1>
      <SearchBar query={query} setQuery={setQuery} category={category} setCategory={setCategory} onSearch={doSearch} />
      <div className="grid grid-cols-3 gap-4">
        {services.map((s) => <ServiceCard key={s._id} service={s} />)}
      </div>
    </div>
  );
};

export default SearchPage;
