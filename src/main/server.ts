/* eslint-disabled */
import 'module-alias/register';


import DbConnection from "@infrastructure/db/mongodb/helpers/db-connection";
import setupApp from '@main/config/app';
import env from '@main/config/env';


DbConnection.connect(env.mongoUrl).then(() => {
    const app = setupApp()
    app.listen(env.port, () => console.log(`Server is running on port ${env.port}`));
}).catch(console.error)

