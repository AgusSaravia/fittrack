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
const DEFAULT_PAGE = 1;
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

const ExerciseDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialState = useCallback(
    () => ({
      page: parseInt(searchParams.get("page"), 10) || DEFAULT_PAGE,
      limit: parseInt(searchParams.get("limit"), 10) || DEFAULT_LIMIT,
      category: searchParams.get("category") || DEFAULT_CATEGORY,
      search: searchParams.get("search") || DEFAULT_SEARCH,
    }),
    [searchParams]
  );

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [view, setView] = useState("grid");

  const [searchTerm, setSearchTerm] = useState(getInitialState().search);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    getInitialState().search
  );
  const [selectedCategory, setSelectedCategory] = useState(
    getInitialState().category
  );
  const [page, setPage] = useState(getInitialState().page);
  const [limit] = useState(getInitialState().limit);

  const fetchExercises = useCallback(async (params) => {
    const { limit, page, category, search } = params;
    const searchQuery = search ? `&search=${encodeURIComponent(search)}` : "";
    let url;

    if (category && category !== DEFAULT_CATEGORY) {
      url = `${API_BASE_URL}/exercises/${category}?limit=${limit}&page=${page}${searchQuery}`;
    } else {
      url = `${API_BASE_URL}/exercises?limit=${limit}&page=${page}${searchQuery}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching exercises");
    }

    return response.json();
  }, []);

  const updateUrlParams = useCallback(
    (params) => {
      setSearchParams({
        limit: params.limit,
        page: params.page,
        category: params.category,
        search: params.search,
      });
    },
    [setSearchParams]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm !== searchParams.get("search")) {
      updateUrlParams({
        limit,
        page: DEFAULT_PAGE,
        category: selectedCategory,
        search: debouncedSearchTerm,
      });
    }
  }, [
    debouncedSearchTerm,
    limit,
    searchParams,
    selectedCategory,
    updateUrlParams,
  ]);

  useEffect(() => {
    const loadExercises = async () => {
      setLoading(true);

      try {
        const params = {
          limit,
          page,
          category: selectedCategory,
          search: debouncedSearchTerm,
        };

        const data = await fetchExercises(params);

        setExercises(data.exercises);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err, err.stack);
        setError(err.message);
        setLoading(false);
      }
    };

    loadExercises();
  }, [page, limit, selectedCategory, debouncedSearchTerm, fetchExercises]);

  const resetFilters = useCallback(() => {
    setSearchTerm(DEFAULT_SEARCH);
    setSelectedCategory(DEFAULT_CATEGORY);
    setPage(DEFAULT_PAGE);

    updateUrlParams({
      limit,
      page: DEFAULT_PAGE,
      category: DEFAULT_CATEGORY,
      search: DEFAULT_SEARCH,
    });
  }, [limit, updateUrlParams]);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage < 1) return;

      setPage(newPage);
      updateUrlParams({
        limit,
        page: newPage,
        category: selectedCategory,
        search: debouncedSearchTerm,
      });
    },
    [limit, selectedCategory, debouncedSearchTerm, updateUrlParams]
  );

  const handleCategoryChange = useCallback(
    (category) => {
      setSelectedCategory(category);
      setPage(DEFAULT_PAGE);

      updateUrlParams({
        limit,
        page: DEFAULT_PAGE,
        category,
        search: debouncedSearchTerm,
      });
    },
    [limit, debouncedSearchTerm, updateUrlParams]
  );

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div className="min-h-screen bg-base-200">
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
        categories={AVAILABLE_CATEGORIES}
        view={view}
        setView={setView}
      />

      <ResultsBreadcrumbs
        resultCount={exercises.length}
        selectedCategory={selectedCategory}
      />

      <div className="container mx-auto px-4">
        {exercises.length === 0 ? (
          <NoResultsFound resetFilters={resetFilters} />
        ) : (
          <>
            {view === "grid" ? (
              <ExercisesGrid exercises={exercises} />
            ) : (
              <ExercisesList exercises={exercises} />
            )}

            <div className="pagination mt-4 p-6 flex justify-center gap-4">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="btn btn-sm"
              >
                Previous
              </button>
              <span>Page {page}</span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="btn btn-sm"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExerciseDashboard;
