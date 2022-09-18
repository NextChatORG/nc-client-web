import { SearchVariables } from '@nc-core/api';
import { useUser } from '@nc-core/hooks';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Avatar, Grid, TextField } from '../../atoms';
import classes from './Header.module.sass';

export function Header(): JSX.Element {
  const { control, handleSubmit } = useForm<SearchVariables>();
  const { data } = useUser();

  function onSubmit(variables: SearchVariables) {
    console.log('Submit', variables);
  }

  return (
    <header className={classes.header}>
      <Grid container alignItems="center">
        <Grid item offsetXs={3} xs={6}>
          <TextField
            fullWidth
            control={control}
            defaultValue=""
            name="searchText"
            placeholder="Buscar en NextChat..."
            onSearchClick={handleSubmit(onSubmit)}
            type="search"
            variant="contained"
          />
        </Grid>
        <Grid item xs={3}>
          <Grid container justifyContent="flex-end">
            <Link className={classes.header__profile} to="/profile">
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <div className={classes.header__profile__information}>
                  <h3
                    className={classes.header__profile__information__username}
                  >
                    @{data?.username ?? ''}
                  </h3>
                </div>
                <Grid item>
                  <Grid container justifyContent="flex-end">
                    <Avatar url={data?.profileImage} />
                  </Grid>
                </Grid>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </header>
  );
}
