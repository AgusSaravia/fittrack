import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import SearchFilters from "./dashboard/SearchFilters";
import ResultsBreadcrumbs from "./dashboard/ResultsBreadcrumbs";
import NoResultsFound from "./dashboard/NoResultsFound";
import ExercisesGrid from "./dashboard/ExercisesGrid";
import ExercisesList from "./dashboard/ExercisesList";
import LoadingSpinner from "./dashboard/LoadingSpinner";
import ErrorDisplay from "./dashboard/ErrorDisplay";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const DEFAULT_OFFSET = 0; // Offset starts at 0
const DEFAULT_LIMIT = 10;
const DEFAULT_CATEGORY = "all";
const DEFAULT_SEARCH = "";
const DEBOUNCE_DELAY = 500;

const AVAILABLE_CATEGORIES = [
  "all",
  "back",
  "cardio",
  "chest",
  "lower arms",
  "lower legs",
  "neck",
  "shoulders",
  "upper arms",
  "upper legs",
  "waist",
];

const AVAILABLE_TARGETS = [
  "all",
  "abductors",
  "abs",
  "adductors",
  "biceps",
  "calves",
  "cardiovascular system",
  "delts",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "levator scapulae",
  "pectorals",
  "quads",
  "serratus anterior",
  "spine",
  "traps",
  "triceps",
  "upper back"
];

const ExerciseDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialState = useCallback(
    () => ({
      offset: parseInt(searchParams.get("offset"), 10) || DEFAULT_OFFSET,
      limit: parseInt(searchParams.get("limit"), 10) || DEFAULT_LIMIT,
      category: searchParams.get("category") || DEFAULT_CATEGORY,
      target: searchParams.get("target") || DEFAULT_CATEGORY,
      search: searchParams.get("search") || DEFAULT_SEARCH,
    }),
    [searchParams]
  );

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [view, setView] = useState("grid");

  const [searchTerm, setSearchTerm] = useState(getInitialState().search);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    getInitialState().search
  );
  const [selectedCategory, setSelectedCategory] = useState(
    getInitialState().category
  );
  const [selectedTarget, setSelectedTarget] = useState(
    getInitialState().target
  );
  const [offset, setOffset] = useState(getInitialState().offset);
  const [limit] = useState(getInitialState().limit);

  // Fetch exercises using offset-based pagination.
  const fetchExercises = useCallback(async (params) => {
    const { limit, offset, category, target, search } = params;
    const searchQuery = search ? `&search=${encodeURIComponent(search)}` : "";
    let url;

    if (target && target !== DEFAULT_CATEGORY) {
      url = `${API_BASE_URL}/exercises/target/${target}?limit=${limit}&offset=${offset}${searchQuery}`;
    } else if (category && category !== DEFAULT_CATEGORY) {
      url = `${API_BASE_URL}/exercises/bodyPart/${category}?limit=${limit}&offset=${offset}${searchQuery}`;
    } else {
      url = `${API_BASE_URL}/exercises?limit=${limit}&offset=${offset}${searchQuery}`;
    }

    console.log('Fetching exercises with URL:', url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error (${response.status}): ${errorData.message || 'Unknown error'}`);
      }
      const data = await response.json();
      console.log('API Response:', data);
      return data;
    } catch (err) {
      console.error('Error details:', {
        url,
        params,
        error: err.message,
        stack: err.stack
      });
      throw new Error(`Error fetching exercises: ${err.message}`);
    }
  }, []);

  const updateUrlParams = useCallback(
    (params) => {
      setSearchParams({
        limit: params.limit,
        offset: params.offset,
        category: params.category,
        target: params.target,
        search: params.search,
      });
    },
    [setSearchParams]
  );

  // Debounce search term changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // When debounced search term changes, update URL and reset offset.
  useEffect(() => {
    if (debouncedSearchTerm !== searchParams.get("search")) {
      updateUrlParams({
        limit,
        offset: DEFAULT_OFFSET,
        category: selectedCategory,
        target: selectedTarget,
        search: debouncedSearchTerm,
      });
      setOffset(DEFAULT_OFFSET);
    }
  }, [
    debouncedSearchTerm,
    limit,
    searchParams,
    selectedCategory,
    selectedTarget,
    updateUrlParams,
  ]);

  useEffect(() => {
    const loadExercises = async () => {
      setLoading(true);
      try {
        const params = {
          limit,
          offset,
          category: selectedCategory,
          target: selectedTarget,
          search: debouncedSearchTerm,
        };
        const data = await fetchExercises(params);
        console.log('API Response:', data); // Log the actual API response
        
        // The backend always returns this structure
        if (!data || !data.exercises) {
          throw new Error('Invalid API response format');
        }

        setExercises(data.exercises);
        setTotalItems(data.total);
        setHasNextPage(data.hasNextPage);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err, err.stack);
        setError(err.message);
        setLoading(false);
      }
    };
    loadExercises();
  }, [offset, limit, selectedCategory, selectedTarget, debouncedSearchTerm, fetchExercises]);

  const resetFilters = useCallback(() => {
    setSearchTerm(DEFAULT_SEARCH);
    setSelectedCategory(DEFAULT_CATEGORY);
    setSelectedTarget(DEFAULT_CATEGORY);
    setOffset(DEFAULT_OFFSET);
    updateUrlParams({
      limit,
      offset: DEFAULT_OFFSET,
      category: DEFAULT_CATEGORY,
      target: DEFAULT_CATEGORY,
      search: DEFAULT_SEARCH,
    });
  }, [limit, updateUrlParams]);

  const handleOffsetChange = useCallback(
    (newOffset) => {
      if (newOffset < 0) return;
      console.log(`Changing offset from ${offset} to ${newOffset}`);
      setOffset(newOffset);
      updateUrlParams({
        limit,
        offset: newOffset,
        category: selectedCategory,
        target: selectedTarget,
        search: debouncedSearchTerm,
      });
      // Scroll to top for better user experience
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [limit, selectedCategory, selectedTarget, debouncedSearchTerm, updateUrlParams, offset]
  );

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalItems / limit);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div className="min-h-screen bg-base-200 pb-10">
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={AVAILABLE_CATEGORIES}
        selectedTarget={selectedTarget}
        setSelectedTarget={setSelectedTarget}
        targets={AVAILABLE_TARGETS}
        view={view}
        setView={setView}
      />

      <ResultsBreadcrumbs
        resultCount={exercises.length}
        selectedCategory={selectedCategory}
        selectedTarget={selectedTarget}
      />

      <div className="w-full px-4 sm:px-6 md:container md:mx-auto md:max-w-7xl">
        {exercises.length === 0 ? (
          <NoResultsFound resetFilters={resetFilters} />
        ) : (
          <>
            {view === "grid" ? (
              <ExercisesGrid exercises={exercises} />
            ) : (
              <ExercisesList exercises={exercises} />
            )}

            <div className="pagination mt-8 p-6 flex justify-center gap-4  rounded-lg shadow-sm">
              <button
                onClick={() => handleOffsetChange(offset - limit)}
                disabled={offset === 0}
                className="btn btn-primary btn-sm px-4 py-2 transition-all hover:bg-blue-600"
              >
                &larr; Previous
              </button>
              <div className="flex items-center px-4 py-2 font-medium">
                <div>Page {Math.floor(offset / limit) + 1} of 133</div>
              </div>
              <button
                onClick={() => handleOffsetChange(offset + limit)}
                className="btn btn-primary btn-sm px-4 py-2 transition-all hover:bg-blue-600"
              >
                Next &rarr;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExerciseDashboard;
