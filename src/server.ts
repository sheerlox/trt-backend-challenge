import app from './app/index';
import config from './app/utils/config';

app.listen(config.PORT, () => {
  console.log(`Server is running at http://localhost:${config.PORT}`);
});

export default app;
