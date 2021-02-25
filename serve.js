'use strict';

const express = require('express');
const compression = require('compression');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(compression());
app.use(express.static('dist'));
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
