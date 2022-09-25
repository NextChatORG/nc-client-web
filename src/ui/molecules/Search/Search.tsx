import { SearchResponse, SearchVariables, SEARCH_QUERY } from '@nc-core/api';
import { useLazyQuery } from '@nc-core/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loading, TextField } from '../../atoms';
import classes from './Search.module.sass';
import { SearchResultPreview } from './SearchResultPreview';

export function Search(): JSX.Element {
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
    <div className={classes.search}>
      <div className={classes.search__input}>
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
        <div className={classes.search__results}>
          {searching || typing ? (
            <div className={classes.search__results__text}>
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
            <div className={classes.search__results__text}>Sin resultados</div>
          )}
        </div>
      )}
    </div>
  );
}
