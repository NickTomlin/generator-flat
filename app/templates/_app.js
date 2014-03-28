'use strict';

<% if (options.browserify) { %>
var $ = require('jquery');
var _ = require('lodash');<% if (options.backbone) { %>
var backbone = require('backbone');
<%}%>
<% } %>
