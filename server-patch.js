const express = require('express');
const routerProto = express.Router.prototype;

const methodNames = ['all', 'get', 'post', 'put', 'delete', 'patch', 'options', 'head'];

function flattenHandlers(value) {
  if (Array.isArray(value)) {
    return value.flatMap(flattenHandlers);
  }

  return [value];
}

function patchRouterMethod(methodName) {
  const original = routerProto[methodName];
  if (!original || original.__patched) {
    return;
  }

  routerProto[methodName] = function patchedRoute(path, ...handlers) {
    const validHandlers = flattenHandlers(handlers)
      .filter((handler) => typeof handler === 'function');

    if (!validHandlers.length) {
      return original.call(this, path, function defaultNotImplemented(req, res) {
        res.status(501).json({
          success: false,
          message: 'This endpoint is not implemented yet.'
        });
      });
    }

    return original.call(this, path, ...validHandlers);
  };

  routerProto[methodName].__patched = true;
}

methodNames.forEach(patchRouterMethod);
