'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { getCharacters, GetCharactersParams } from '@/services/api';
import { Character } from '@/app/dto/character';
import Pagination from '@/components/Pagination';
import StatsCard from '@/components/StatsCard';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  // Data states
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  // Filter states
  const [searchInput, setSearchInput] = useState(''); // Temporary input
  const [search, setSearch] = useState(''); // Debounced
  const [statusFilter, setStatusFilter] = useState<string>('');
  
  // Global statistics states
  const [aliveCount, setAliveCount] = useState(0);
  const [deadCount, setDeadCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);

  // Redirect if no user
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      fetchGlobalStats();
    }
  }, [user, router]);

  // Debounce for search (500ms)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1); // Reset to page 1 when searching
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  // Fetch characters when page or filters change
  useEffect(() => {
    if (user) {
      fetchCharacters();
    }
  }, [currentPage, search, statusFilter, user]);

  const fetchGlobalStats = async () => {
    try {
      const [alive, dead, unknown] = await Promise.all([
        getCharacters({ status: 'Alive', page: 1 }),
        getCharacters({ status: 'Dead', page: 1 }),
        getCharacters({ status: 'unknown', page: 1 })
      ]);
      
      setAliveCount(alive.info.count);
      setDeadCount(dead.info.count);
      setUnknownCount(unknown.info.count);
    } catch (err) {
      console.error('Error fetching global stats:', err);
    }
  };

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params: GetCharactersParams = { page: currentPage };
      if (search) params.name = search;
      if (statusFilter) params.status = statusFilter;

      const data = await getCharacters(params);

      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setTotalCount(data.info.count);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1); // Reset to page 1
  };

  if (error) {
    return (
      <div className="container-fluid p-4">
        <div className="alert alert-danger">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4 text-3xl font-bold">Rick and Morty Characters</h1>

      {/* Global Statistics */}
      <div className="row mb-4">
        <div className="col-md-4">
          <StatsCard 
            title="Alive" 
            value={aliveCount} 
            variant="success" 
          />
        </div>
        <div className="col-md-4">
          <StatsCard 
            title="Dead" 
            value={deadCount} 
            variant="danger" 
          />
        </div>
        <div className="col-md-4">
          <StatsCard 
            title="Unknown" 
            value={unknownCount} 
            variant="warning" 
          />
        </div>
      </div>

      {/* Info and Filters */}
      <div className="mb-4 p-4 rounded-lg bg-white shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search character
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Type a name..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
          </div>

          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="form-select"
              value={statusFilter}
              onChange={e => handleStatusChange(e.target.value)}
            >
              <option value="">All</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          <div className="text-sm text-gray-600 px-3 py-2 bg-blue-50 rounded-lg">
            📊 Total: <strong>{totalCount}</strong> characters
          </div>
        </div>
      </div>

      {/* Top Pagination */}
      {!loading && characters.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalCount}
          onPageChange={handlePageChange}
          loading={loading}
        />
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="spinner-border text-primary mb-2" role="status"></div>
            <p className="text-gray-600">Loading characters...</p>
          </div>
        </div>
      )}

      {/* Characters Grid */}
      {!loading && characters.length > 0 && (
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {characters.map(character => (
            <div 
              key={character.id} 
              className="h-full cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => router.push(`/character/${character.id}`)}
            >
              <div className="card h-100 shadow-sm hover:shadow-xl transition-shadow">
                <img
                  src={character.image}
                  alt={character.name}
                  className="card-img-top"
                  loading="lazy"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-lg font-bold mb-2">{character.name}</h5>
                  <div className="space-y-2">
                    <p className="mb-2">
                      <span
                        className={`badge ${
                          character.status === 'Alive'
                            ? 'bg-success'
                            : character.status === 'Dead'
                            ? 'bg-danger'
                            : 'bg-secondary'
                        }`}
                      >
                        {character.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Species:</strong> {character.species}
                    </p>
                    <p className="text-sm text-gray-600 mb-0">
                      <strong>Gender:</strong> {character.gender}
                    </p>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-xs text-blue-600 font-semibold">View details →</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && characters.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <span className="text-6xl mb-4">🔍</span>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Character not found</h3>
            <p className="text-gray-500">Try another name or adjust the filters</p>
          </div>
        </div>
      )}

      {/* Bottom Pagination */}
      {!loading && characters.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalCount}
          onPageChange={handlePageChange}
          loading={loading}
        />
      )}
    </div>
  );
}
