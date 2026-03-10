import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useData } from '../providers';
import { API_ENDPOINTS } from '../../constants/api';
import { COLORS, TRANSITIONS } from '../../constants/theme';

const FILTER_OPTIONS = {
  status: [
    { value: '', label: 'All Statuses' },
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' }
  ],
  species: [
    { value: '', label: 'All Species' },
    { value: 'human', label: 'Human' },
    { value: 'alien', label: 'Alien' }
  ],
  gender: [
    { value: '', label: 'All Genders' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'genderless', label: 'Genderless' },
    { value: 'unknown', label: 'Unknown' }
  ]
};

const INITIAL_FILTERS = {
  name: '',
  status: '',
  species: '',
  gender: ''
};

export function Filters() {
  const { setApiURL, setActivePage } = useData();
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleFilterChange = useCallback((filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value
    }));
  }, []);

  const handleNameChange = useCallback(
    (e) => handleFilterChange('name', e.target.value),
    [handleFilterChange]
  );

  const handleStatusChange = useCallback(
    (e) => handleFilterChange('status', e.target.value),
    [handleFilterChange]
  );

  const handleSpeciesChange = useCallback(
    (e) => handleFilterChange('species', e.target.value),
    [handleFilterChange]
  );

  const handleGenderChange = useCallback(
    (e) => handleFilterChange('gender', e.target.value),
    [handleFilterChange]
  );

  const applyFilters = useCallback(() => {
    const url = new URL(API_ENDPOINTS.characters);

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });

    setActivePage(0);
    setApiURL(url.toString());
  }, [filters, setApiURL, setActivePage]);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setActivePage(0);
    setApiURL(API_ENDPOINTS.characters);
  }, [setApiURL, setActivePage]);

  return (
    <FiltersContainer>
      <FilterGroup>
        <FilterInput
          type="text"
          placeholder="Search by name..."
          value={filters.name}
          onChange={handleNameChange}
        />
      </FilterGroup>

      <FilterGroup>
        <FilterSelect value={filters.status} onChange={handleStatusChange}>
          {FILTER_OPTIONS.status.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterSelect value={filters.species} onChange={handleSpeciesChange}>
          {FILTER_OPTIONS.species.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterSelect value={filters.gender} onChange={handleGenderChange}>
          {FILTER_OPTIONS.gender.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>

      <ButtonGroup>
        <ResetButton onClick={resetFilters}>Reset</ResetButton>
        <ApplyButton onClick={applyFilters}>Apply</ApplyButton>
      </ButtonGroup>
    </FiltersContainer>
  );
}

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #1e2a3a;
  border-radius: 10px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterInput = styled.input`
  padding: 10px 15px;
  border: 2px solid ${COLORS.border};
  border-radius: 5px;
  background: ${COLORS.cardBackground};
  color: ${COLORS.text};
  font-size: 14px;
  min-width: 200px;
  transition: border-color ${TRANSITIONS.normal};

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }

  &::placeholder {
    color: ${COLORS.textDim};
  }

  @media (max-width: 600px) {
    min-width: 100%;
  }
`;

const FilterSelect = styled.select`
  padding: 10px 15px;
  border: 2px solid ${COLORS.border};
  border-radius: 5px;
  background: ${COLORS.cardBackground};
  color: ${COLORS.text};
  font-size: 14px;
  min-width: 150px;
  cursor: pointer;
  transition: border-color ${TRANSITIONS.normal};

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }

  option {
    background: ${COLORS.cardBackground};
    color: ${COLORS.text};
  }

  @media (max-width: 600px) {
    min-width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ApplyButton = styled.button`
  padding: 10px 20px;
  background: ${COLORS.primary};
  color: ${COLORS.text};
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background ${TRANSITIONS.normal};

  &:hover {
    background: ${COLORS.primaryDim};
  }
`;

const ResetButton = styled.button`
  padding: 10px 20px;
  background: ${COLORS.border};
  color: ${COLORS.text};
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background ${TRANSITIONS.normal};

  &:hover {
    background: #2d4560;
  }
`;
