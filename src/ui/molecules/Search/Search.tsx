import { SEARCH_QUERY } from '@nc-core/api';
import { useLazyQuery } from '@nc-core/hooks';
import { SearchResponse, SearchVariables } from '@nc-core/interfaces/api';
import { Loading, TextField } from '@nc-ui';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SearchResultPreview } from './SearchResultPreview';

export interface SearchProps {
  className?: string;
}

export function Search({ className }: SearchProps): JSX.Element {
  const [typing, setTyping] = useState<boolean>(false);

  const { control, getValues, setValue, watch } = useForm<SearchVariables>();

  const [search, { data: searchData, loading: searching }] = useLazyQuery<
    SearchResponse,
    SearchVariables
  >(SEARCH_QUERY);

  function onSubmit(variables: SearchVariables) {
    return search({ variables });
  }

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length >= 3) {
      setTyping(true);
    }
  }

  const searchText = watch('searchText') ?? '';

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (typing) {
      timeout = setTimeout(() => {
        onSubmit(getValues());
        setTyping(false);
      }, 600);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [typing]);

  return (
    <div className={clsx(className, 'relative z-header')}>
      <div className="relative z-2">
        <TextField
          fullWidth
          control={control}
          defaultValue=""
          name="searchText"
          placeholder="Buscar en NextChat..."
          onChange={handleChangeSearch}
          type="search"
          variant="contained"
        />
      </div>
      {searchText.length >= 3 && (
        <div
          className={clsx(
            'absolute top-0 z-0 shadow-md shadow-black/75 rounded-t-[26px] rounded-b-[12px]',
            'maz-h-[500px] w-full pt-6 pb-1 bg-dark-600 overflow-auto',
          )}
        >
          {searching || typing ? (
            <div className="py-[6px] text-[14px] text-center tracking-wide">
              <Loading id="search-loading-text" text="Buscando" />
            </div>
          ) : searchData && searchData.search.length > 0 ? (
            searchData.search.map((data, i) => (
              <SearchResultPreview
                data={data}
                key={`search_result_${i}`}
                onClick={() => setValue('searchText', '')}
                searchText={searchText}
              />
            ))
          ) : (
            <div className="py-[6px] text-[14px] text-center tracking-wide">
              Sin resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
}
