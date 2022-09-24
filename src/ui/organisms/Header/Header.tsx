import { SearchResponse, SearchVariables, SEARCH_QUERY } from '@nc-core/api';
import { useLazyQuery, useUser } from '@nc-core/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Avatar, Grid, Loading, TextField } from '../../atoms';
import { NotificationsBox, SearchResultPreview } from '../../molecules';
import classes from './Header.module.sass';

export function Header(): JSX.Element {
  const [typing, setTyping] = useState<boolean>(false);

  const { control, getValues, setValue, watch } = useForm<SearchVariables>();
  const { data } = useUser();

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
    <header className={classes.header} id="nc-header">
      <Grid container alignItems="center">
        <Grid item offsetXs={3} xs={6}>
          <div className={classes.header__search}>
            <div className={classes.header__search__input}>
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
              <div className={classes.header__search__results}>
                {searching || typing ? (
                  <div className={classes.header__search__results__text}>
                    <Loading id="search-loading-text" text="Buscando" />
                  </div>
                ) : searchData && searchData.search.length > 0 ? (
                  searchData.search.map((data, i) => (
                    <SearchResultPreview
                      data={data}
                      key={`search_result_${i}`}
                      onClick={() => setValue('searchText', '')}
                    />
                  ))
                ) : (
                  <div className={classes.header__search__results__text}>
                    Sin resultados
                  </div>
                )}
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={3}>
          <Grid
            container
            alignItems="center"
            justifyContent="flex-end"
            spacing={12}
          >
            <Grid item>
              <Link className={classes.header__profile} to="/profile">
                <Grid
                  container
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={12}
                >
                  <Grid item>
                    <div className={classes.header__profile__information}>
                      <h3
                        className={
                          classes.header__profile__information__username
                        }
                      >
                        {data?.username ?? ''}
                      </h3>
                    </div>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="flex-end">
                      <Avatar url={data?.profileImage} />
                    </Grid>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
            <Grid item>
              <NotificationsBox />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </header>
  );
}
